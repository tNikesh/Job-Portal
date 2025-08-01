<?php

namespace App\Http\Controllers\Profile\Candidate;

use App\Http\Controllers\Controller;
use App\Models\Candidate\Experience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ExperienceController extends Controller
{
    public function store(Request $req)
    {
        $validated = $req->validate([
            'institute_name' => 'required|string|max:255',
            'institute_address' => 'required|string|max:255',
            'position'         => 'required|string|max:255',
            'job_type'          => 'required|string|max:255',
            'started_date' => [
                'required',
                'date',
                'after_or_equal:1900-01-01',
                'before_or_equal:' . now()->toDateString(),
            ],
            'end_date' => [
                'nullable',
                'date',
                'after:started_date',
                'before_or_equal:' . now()->toDateString(),
            ],
        ], [
            'institute_name.required' => 'Institution name is required.',
            'institute_name.string'   => 'Institution name must be a valid string.',
            'institute_name.max'      => 'Institution name must not exceed 255 characters.',
           
            'institute_address.required' => 'Institution address is required.',
            'institute_address.string'   => 'Institution address must be a valid string.',
            'institute_address.max'      => 'Institution address must not exceed 255 characters.',

            'position.required' => 'Position is required.',
            'position.string'   => 'Position must be a valid string.',
            'position.max'      => 'Position must not exceed 255 characters.',

            'job_type.required' => 'Job type is required.',
            'job_type.string'   => 'Job type must be a valid string.',
            'job_type.max'      => 'Job type must not exceed 255 characters.',


            'started_date.required' => 'Start date is required.',
            'started_date.date' => 'Start date must be a valid date.',
            'started_date.after_or_equal' => 'Start date must not be before the year 1900.',
            'started_date.before_or_equal' => 'Start date cannot be in the future.',
        
            'end_date.date' => 'End date must be a valid date.',
            'end_date.after' => 'End date must be after the start date.',
            'end_date.before_or_equal' => 'End date cannot be in the future.',
        ]);
        try {
            $userId = $req->user()->id;
            $experience = Experience::create([
                'user_id'       => $userId,
                'institute_name' => $validated['institute_name'],
                'institute_address' => $validated['institute_address'],
                'position'        => $validated['position'],
                'job_type'        => $validated['job_type'],
                'started_date'  => $validated['started_date'],
                'end_date'      => $validated['end_date'] ?? null,
            ]);
            return response()->json(['experience' => $experience], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message', "something went wrong try again"], 500);
        }
    }

    public function update(Request $req, $id)
    {
        $validated = $req->validate([
            'institute_name' => 'required|string|max:255',
            'institute_address' => 'required|string|max:255',
            'position'         => 'required|string|max:255',
            'job_type'          => 'required|string|max:255',
            'started_date' => [
                'required',
                'date',
                'after_or_equal:1900-01-01',
                'before_or_equal:' . now()->toDateString(),
            ],
            'end_date' => [
                'nullable',
                'date',
                'after:started_date',
                'before_or_equal:' . now()->toDateString(),
            ],
        ], [
            'institute_name.required' => 'Institution name is required.',
            'institute_name.string'   => 'Institution name must be a valid string.',
            'institute_name.max'      => 'Institution name must not exceed 255 characters.',
           
            'institute_address.required' => 'Institution address is required.',
            'institute_address.string'   => 'Institution address must be a valid string.',
            'institute_address.max'      => 'Institution address must not exceed 255 characters.',

            'position.required' => 'Position is required.',
            'position.string'   => 'Position must be a valid string.',
            'position.max'      => 'Position must not exceed 255 characters.',

            'job_type.required' => 'Job type is required.',
            'job_type.string'   => 'Job type must be a valid string.',
            'job_type.max'      => 'Job type must not exceed 255 characters.',


            'started_date.required' => 'Start date is required.',
            'started_date.date' => 'Start date must be a valid date.',
            'started_date.after_or_equal' => 'Start date must not be before the year 1900.',
            'started_date.before_or_equal' => 'Start date cannot be in the future.',
        
            'end_date.date' => 'End date must be a valid date.',
            'end_date.after' => 'End date must be after the start date.',
            'end_date.before_or_equal' => 'End date cannot be in the future.',
        ]);

        try {
            $experience = Experience::find($id);
            if (!$experience) {
                return response()->json(['message', 'Record not found, try again !', 404]);
            }
            $experience->update([
                'institute_name' => $validated['institute_name'],
                'institute_address' => $validated['institute_address'],
                'position'        => $validated['position'],
                'job_type'        => $validated['job_type'],
                'started_date'  => $validated['started_date'],
                'end_date'      => $validated['end_date'] ?? null,
            ]);
            return response()->json(['experience' => $experience], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message', "something went wrong try again"], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $experience = Experience::findOrFail($id); // throws 404 if not found
            $experience->delete();
            return response()->json(['message' => "Record deleted successfully !", 200]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message', "something went wrong try again"], 500);
        }
    }
}
