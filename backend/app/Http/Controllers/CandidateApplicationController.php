<?php

namespace App\Http\Controllers;

use App\Models\CandidateApplication;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CandidateApplicationController extends Controller
{
    public function store(Request $request)
    {
        // ✅ Validation
        $validated = $request->validate([
            'resume' => 'required|file|mimes:pdf|max:2048', // Only PDF, max 2MB
        ]);
        try {
            $user = $request->user(); // ✅ Get full user object

            $job = Job::find($request->input('job_id'));
            if (!$job) {
                return response()->json([
                    'message' => 'Job not found.',
                ], 404);
            }

            // ✅ Prevent duplicate applications
            $exists = CandidateApplication::where('user_id', $user->id)
                ->where('job_id', $request->input('job_id'))
                ->exists();

            if ($exists) {
                return response()->json([
                    'message' => 'You have already applied for this job.',
                ], 409);
            }

            // ✅ Generate unique file name
            DB::beginTransaction();
            $file = $request->file('resume');
            $uniqueName = uniqid() . '_' . time() . '.' . $file->getClientOriginalExtension();

            // ✅ Store CV in storage/app/public/resumes
            $path = $file->storeAs('resumes', $uniqueName, 'public');

            // ✅ Save application
            CandidateApplication::create([
                'user_id' => $user->id,
                'job_id' => $request->input('job_id'),
                'resume_path' => $path, // e.g. resumes/unique_filename.pdf
                'status' => 'pending',
            ]);
            DB::commit();

            return response()->json([
                'message' => 'Job Application submitted successfully!',
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Failed to submit job application:" . $e->getMessage());
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Request $req)

    {
        $applications = CandidateApplication::with('job:id,title')->where('user_id', $req->user()->id)->get();

        if (!$applications->isEmpty()) {
            // Map through each application and add resume_url
            $applications->transform(function ($application) {
                $application->resume_url = asset('storage/' . $application->resume_path);
                return $application;
            });
        }


        return response()->json(['applications' => $applications], 200);
    }

    public function updateStatus(Request $request, $id)
    {

        $validated = $request->validate([
            'status' => 'required|in:pending,accepted,rejected,review',
        ]);
        $application = CandidateApplication::find($id);
        if (!$application) {
            return response()->json(['message' => 'Job application not found', 400]);
        }


        $application->update(['status' => $validated['status']]);

        return response()->json([
            'message' => 'Job application status updated successfully!',

        ], 200);
    }
}
