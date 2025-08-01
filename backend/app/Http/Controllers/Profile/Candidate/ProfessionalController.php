<?php

namespace App\Http\Controllers\Profile\Candidate;

use App\Http\Controllers\Controller;
use App\Models\Candidate\ProfessionalInformation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class ProfessionalController extends Controller
{
    public function store(Request $req)
    {

        $validated = $req->validate([
            'preferred_jobs' => ['required', 'array', 'min:1'],
            'preferred_jobs.*' => ['required', Rule::in(['remote', 'fulltime', 'parttime', 'hybrid'])],

            'interested_industries' => ['required','min:2','max:255'],
            'skills' => ['required','min:2','max:255'],

            'employment_status' => ['required', 'string', 'max:255'],
        ], [
            'preferred_jobs.required' => 'Please select at least one preferred job type.',
            'preferred_jobs.array' => 'Preferred jobs must be an array.',
            'preferred_jobs.*.in' => 'Invalid job type selected.',

            'interested_industries.required' => 'Please enter at least one industry.',
            'skills.required' => 'Please enter at least one industry.',


            'employment_status.required' => 'Employment status is required.',
        ]);


        try {
            $userId = $req->user()->id;

            $validated['preferred_jobs'] = array_values(array_filter($validated['preferred_jobs'], fn ($job) => trim($job) !== ''));

            if (empty($validated['preferred_jobs'])) {
                return response()->json([
                    'message' => 'Preferred jobs cannot contain empty values.',
                ], 422);
            }

            $professional = ProfessionalInformation::updateOrCreate(
                ['user_id'       => $userId],
                [
                    'skills' => $validated['skills'],
                    'preferred_jobs' => $validated['preferred_jobs'],
                    'interested_industries' => $validated['interested_industries'],
                    'employment_status' => $validated['employment_status'],
                ]
            );
            return response()->json(['professional' => $professional], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message',$e->getMessage()], 500);
        }
    }
}
