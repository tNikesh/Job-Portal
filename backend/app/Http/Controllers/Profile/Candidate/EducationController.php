<?php

namespace App\Http\Controllers\Profile\Candidate;

use App\Http\Controllers\Controller;
use App\Models\Candidate\Education;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EducationController extends Controller
{
    public function store(Request $req)
    {

        $validated = $req->validate([
            'institute_name' => 'required|string|max:255',
            'degree'         => 'required|string|max:255',
            'field'          => 'required|string|max:255',
            'start_year'   => 'required|integer|min:1900|max:' . date('Y'),
            'end_year'       => [
                'nullable',
                'integer',
                'min:1900',
                'max:' . date('Y'),
                function ($attribute, $value, $fail) use ($req) {
                    if ($value && $req->start_year && $value < $req->start_year) {
                        $fail('End year must be greater than or equal to the start year.');
                    }
                },
            ],
        ], [
            'institute_name.required' => 'Institution name is required.',
            'institute_name.string'   => 'Institution name must be a valid string.',
            'institute_name.max'      => 'Institution name must not exceed 255 characters.',

            'degree.required' => 'Degree is required.',
            'degree.string'   => 'Degree must be a valid string.',
            'degree.max'      => 'Degree must not exceed 255 characters.',

            'field.required' => 'Field of study is required.',
            'field.string'   => 'Field of study must be a valid string.',
            'field.max'      => 'Field of study must not exceed 255 characters.',

            'start_year.required' => 'Start year is required.',
            'start_year.integer'  => 'Start year must be a valid number.',
            'start_year.min'      => 'Start year must be at least 1900.',
            'start_year.max'      => 'Start year cannot be in the future.',

            'end_year.integer' => 'End year must be a valid number.',
            'end_year.min'     => 'End year must be at least 1900.',
            'end_year.max'     => 'End year cannot be in the future.',
        ]);
        try {
            $userId = $req->user()->id;
            $education = Education::create([
                'user_id'       => $userId,
                'institute_name' => $validated['institute_name'],
                'degree'        => $validated['degree'],
                'field'         => $validated['field'],
                'start_year'  => $validated['start_year'],
                'end_year'      => $validated['end_year'] ?? null,
            ]);
            return response()->json(['education' => $education], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message', "something went wrong try again"], 500);
        }
    }
    public function update(Request $req, $id)
    {

        $validated = $req->validate([
            'institute_name' => 'required|string|max:255',
            'degree'         => 'required|string|max:255',
            'field'          => 'required|string|max:255',
            'start_year'   => 'required|integer|min:1900|max:' . date('Y'),
            'end_year'       => [
                'nullable',
                'integer',
                'min:1900',
                'max:' . date('Y'),
                function ($attribute, $value, $fail) use ($req) {
                    if ($value && $req->start_year && $value < $req->start_year) {
                        $fail('End year must be greater than or equal to the start year.');
                    }
                },
            ],
        ], [
            'institute_name.required' => 'Institution name is required.',
            'institute_name.string'   => 'Institution name must be a valid string.',
            'institute_name.max'      => 'Institution name must not exceed 255 characters.',

            'degree.required' => 'Degree is required.',
            'degree.string'   => 'Degree must be a valid string.',
            'degree.max'      => 'Degree must not exceed 255 characters.',

            'field.required' => 'Field of study is required.',
            'field.string'   => 'Field of study must be a valid string.',
            'field.max'      => 'Field of study must not exceed 255 characters.',

            'start_year.required' => 'Start year is required.',
            'start_year.integer'  => 'Start year must be a valid number.',
            'start_year.min'      => 'Start year must be at least 1900.',
            'start_year.max'      => 'Start year cannot be in the future.',

            'end_year.integer' => 'End year must be a valid number.',
            'end_year.min'     => 'End year must be at least 1900.',
            'end_year.max'     => 'End year cannot be in the future.',
        ]);
        
        try {
            $education = Education::find($id);
            if (!$education) {
                return response()->json(['message', 'Record not found, try again !', 404]);
            }
            $education->update([
                'institute_name' => $validated['institute_name'],
                'degree'        => $validated['degree'],
                'field'         => $validated['field'],
                'start_year'  => $validated['start_year'],
                'end_year'      => $validated['end_year'] ?? null,
            ]);
            return response()->json(['education' => $education], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message', "something went wrong try again"], 500);
        }
    }
    public function destroy($id)
    {
        try {
            $education = Education::findOrFail($id); // throws 404 if not found
            $education->delete();
            return response()->json(['message' => "Record deleted successfully !", 200]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message', "something went wrong try again"], 500);
        }
    }
}
