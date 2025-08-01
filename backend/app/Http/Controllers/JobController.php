<?php

namespace App\Http\Controllers;

use App\Models\CandidateApplication;
use App\Models\Employer\Employer;
use App\Models\Job;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class JobController extends Controller
{
    public function index(Request $request)
    {
        try {
            $filter = $request->query('filter', 'latest'); // default filter

            
            $query = Job::query()
                ->with(['employer:id,company_name'])
                ->where('status', 'active') 
                ->whereDate('deadline', '>=', Carbon::today()) // only jobs not expired
                ->select('id', 'employer_id','title', 'skills', 'description', 'salary_from','salary_to','job_type','employment_type','deadline');

            // Apply filter
            switch ($filter) {
                case 'latest':
                    $query->orderBy('created_at', 'desc');
                    break;

                case 'part-time':
                    $query->where('job_type','part-time');
                    break;

                case 'full-time':
                        $query->where('job_type','full-time');
                        break;
                        case 'high-salary':
                            $query->orderByRaw('((salary_from + salary_to) / 2) DESC');
                            break;
                        
                        case 'low-salary':
                            $query->orderByRaw('((salary_from + salary_to) / 2) ASC');
                            break;
                        
            }

            $jobs = $query->paginate(10);
    
        return response()->json([
                'message' => 'Job filter successfully',
                'jobs' => $jobs
            ],200);
        } catch (\Throwable $e) {
            // Log the error for debugging
            Log::error('Job fetch error: '.$e->getMessage());

            return response()->json([
                'status' => 'error',
                'message' => 'Something went wrong while fetching jobs.'
            ], 500);
        }
    }
    public function recentJobs()
    {
        try {
           
            $jobs = Job::with(['employer:id,company_name'])
                ->where('status', 'active') 
                ->whereDate('deadline', '>=', Carbon::today()) // only jobs not expired
                ->latest()
                ->select('id', 'employer_id','title', 'skills', 'description', 'salary_from','salary_to','job_type','employment_type','deadline')
                ->take(5)
                ->get();

        return response()->json([
                'message' => 'Job filter successfully',
                'jobs' => $jobs
            ],200);
        } catch (\Throwable $e) {
            // Log the error for debugging
            Log::error('Job fetch error: '.$e->getMessage());

            return response()->json([
                'status' => 'error',
                'message' => 'Something went wrong while fetching jobs.'
            ], 500);
        }
    }

    public function store(Request $request){
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'skills' => 'required|string',
            // 'responsibilities' => 'nullable|string',
            // 'qualifications' => 'nullable|string',
            'experience_required' => 'nullable|string',
            'salary_from' => 'required|numeric|min:100',
            'salary_to' => 'required|numeric|min:1000|gte:salary_from',
            'job_type' => ['required', Rule::in(['full-time', 'part-time', 'contract', 'internship'])],
            'employment_type' => ['required', Rule::in(['remote', 'on-site', 'hybrid'])],
            'deadline' => 'required|date|after:today|before_or_equal:' . now()->addMonths(6)->toDateString(),
            'status' => ['required', Rule::in(['active', 'inactive'])],
        ],[
            'deadline.required' => 'Job deadline is required.',
            'deadline.date' => 'Please enter a valid date.',
            'deadline.after' => 'Job deadline must be in the future.',
            'deadline.before_or_equal' => 'Job deadline cannot be more than 6 months from today.',
        ]);

        try {
           
            $userId = $request->user()->id;

            $employer=Employer::where('user_id',$userId)->first();

            if(!$employer){
                return response()->json([
                    "message" => "No employer profile found. Please create your profile before posting a job."
                ], 404);
            }

             $employer->jobs()->create([

                 'title' => $request->input('title'),
                 'description' => $request->input('description'),
                'skills' => $request->input('skills'),
                // 'responsibilities' => $request->input('responsibilities'),
                // 'qualifications' => $request->input('qualifications'),
                'experience_required' => $request->input('experience_required'),
                'salary_from' => $request->input('salary_from'),
                'salary_to' => $request->input('salary_to'),
                'job_type' => $request->input('job_type'),
                'employment_type' => $request->input('employment_type'),
                'deadline' => $request->input('deadline'),
                'status' =>$request->input('status'),
                ]
            );


            return response()->json([
                'message' => 'Job Posted successfully.',
            ], 200);
        } catch (\Exception $e) {
            Log::error('Failed to post job: ' . $e->getMessage());

            return response()->json([
                'message' =>$e->getMessage(),
                'error' => $e->getMessage(),
            ], 500);
        }

    }
    public function update(Request $request,$id){
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'skills' => 'required|string',
            // 'responsibilities' => 'nullable|string',
            // 'qualifications' => 'nullable|string',
            'experience_required' => 'nullable|string',
            'salary_from' => 'required|numeric|min:100',
            'salary_to' => 'required|numeric|min:10|gte:salary_from',
            'job_type' => ['required', Rule::in(['full-time', 'part-time', 'contract', 'internship'])],
            'employment_type' => ['required', Rule::in(['remote', 'on-site', 'hybrid'])],
            'deadline' => 'required|date|after:today|before_or_equal:' . now()->addMonths(6)->toDateString(),
            'status' => ['required', Rule::in(['active', 'inactive'])],
        ],[
            'deadline.required' => 'Job deadline is required.',
            'deadline.date' => 'Please enter a valid date.',
            'deadline.after' => 'Job deadline must be in the future.',
            'deadline.before_or_equal' => 'Job deadline cannot be more than 6 months from today.',
        ]);

        try {
           
            

            $job=Job::find($id);

            if(!$job){
                return response()->json([
                    'message' => 'Job not found !',
                ], 400);
            }

             $job->update([

                 'title' => $request->input('title'),
                 'description' => $request->input('description'),
                'skills' => $request->input('skills'),
                // 'responsibilities' => $request->input('responsibilities'),
                // 'qualifications' => $request->input('qualifications'),
                'experience_required' => $request->input('experience_required'),
                'salary_from' => $request->input('salary_from'),
                'salary_to' => $request->input('salary_to'),
                'job_type' => $request->input('job_type'),
                'employment_type' => $request->input('employment_type'),
                'deadline' => $request->input('deadline'),
                'status' =>$request->input('status'),
                ]
            );


            return response()->json([
                'message' => 'Job Updated successfully.',
            ], 200);
        } catch (\Exception $e) {
            Log::error('Failed to update job: ' . $e->getMessage());

            return response()->json([
                'message' =>$e->getMessage(),
                'error' => $e->getMessage(),
            ], 500);
        }

    }

    public function show($id)
{
    $job = Job::with('employer:id,company_name,contact_person,user_id')->find($id);

    if (!$job) {
        return response()->json(['message' => 'Job not found'], 404);
    }

    return response()->json(['job' => $job],200);
}

public function myJobs(Request $request)
{
    $userId = $request->user()->id;
    $employer = Employer::where('user_id', $userId)->first();

    if (!$employer) {
        return response()->json(['message' => 'Employer profile not found'], 404);
    }

    $jobs = Job::where('employer_id', $employer->id)
    ->withCount('applications')
    ->orderByRaw("CASE WHEN status = 'active' THEN 1 ELSE 2 END") // ✅ active jobs first
    ->orderByRaw("CASE WHEN deadline >= CURDATE() THEN 1 ELSE 2 END") // ✅ future deadlines first
    ->orderBy('created_at', 'desc') // ✅ newest jobs first
    ->paginate(10);


    return response()->json(['jobs' => $jobs], 200);
}

public function getApplication($jobId)
{
   

    $applications = CandidateApplication::with(['user:id,username','job:id,title'])->where('job_id', $jobId)->get();

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
        // ✅ Check if job belongs to authenticated employer
        // if ($job->employer_id !== $request->user()->id) {
        //     return response()->json(['message' => 'Unauthorized'], 403);
        // }

        // ✅ Validate new status
        $validated = $request->validate([
            'status' => 'required|in:active,inactive',
        ]);
            $job=Job::find($id);
            if(!$job){
                return response()->json(['message'=>'Job not found',400]);
            }
        // ✅ If deadline is over, prevent setting "active"
        if ($validated['status'] === 'active' && now()->gt($job->deadline)) {
            return response()->json([
                'message' => 'Cannot activate job after deadline.'
            ], 422);
        }

        $job->update(['status' => $validated['status']]);

        return response()->json([
            'message' => 'Job status updated successfully!',

        ],200);
    }
    

}
