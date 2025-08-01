<?php

namespace App\Http\Controllers\Profile\Employer;

use App\Http\Controllers\Controller;
use App\Models\Employer\EmployerVerification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class EmployerVerificationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'employer_id' => 'required|exists:employers,id',
            'document_type' => 'required|string|max:100',
            'document_number' => 'required|string|max:255',
            'document_file' => 'required|file|mimes:pdf,jpeg,png,jpg|max:5120', // max 5MB
        ], [
            'document_file.required' => 'Please upload a verification document.',
            'document_file.mimes' => 'Only PDF, JPEG, JPG, and PNG files are allowed.',
            'document_file.max' => 'File size must not exceed 5MB.',
        ]);

        try {
            $path = $request->file('document_file')->store('verification_docs', 'public');
            $validated['document_file'] = $path;

            $verification = EmployerVerification::create($validated);

            $verification->document_file_url = url(Storage::url($verification->document_file));

            return response()->json([
                'message' => 'Verification document added successfully.',
                'verification' => $verification,
            ], 201);
        } catch (\Exception $e) {
            Log::error('Failed to add employer verification: ' . $e->getMessage());

            return response()->json([
                'message' => 'Failed to add verification document.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        // Custom validation rules for update
        $rules = [
            'document_type' => 'sometimes|required|string|max:100',
            'document_number' => 'sometimes|required|string|max:255',
            'document_file' => 'sometimes|required|file|mimes:pdf,jpeg,png,jpg|max:5120',

        ];

        $messages = [
            'document_file.mimes' => 'Only PDF, JPEG, JPG, and PNG files are allowed.',
            'document_file.max' => 'File size must not exceed 5MB.',
        ];

        $validated = $request->validate($rules, $messages);

        try {
            $validated['verified_at']=null;
            $verification = EmployerVerification::find($id);

            if (!$verification) {
                return response()->json(['message' => 'Verification record not found'], 404);
            }

            // If new file uploaded, store it and update path
            if ($request->hasFile('document_file')) {
                $path = $request->file('document_file')->store('verification_docs', 'public');
                $validated['document_file'] = $path;
            }

            $verification->update($validated);

            $verification->document_file_url = url(Storage::url($verification->document_file));

            return response()->json([
                'message' => 'Verification document updated successfully.',
                'verification' => $verification,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Failed to update employer verification: ' . $e->getMessage());

            return response()->json([
                'message' => 'Failed to update verification document.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
