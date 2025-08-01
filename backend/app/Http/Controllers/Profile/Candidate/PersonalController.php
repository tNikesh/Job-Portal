<?php

namespace App\Http\Controllers\Profile\Candidate;

use App\Http\Controllers\Controller;
use App\Models\Candidate\PersonalInformation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PersonalController extends Controller
{
    public function store(Request $req)
    {

        $validated = $req->validate([
            'full_name' => 'required|string|max:255',
            'phone'     => 'required|digits_between:7,15',
            'country'   => 'required|string|max:255',
            'state'     => 'required|string|max:255',
            'city'      => 'required|string|max:255',
            'dob' => 'required|date|before_or_equal:' . now()->subYears(18)->toDateString(),
            'gender'    => 'required|in:male,female,other',
        ], [
            'full_name.required' => 'Full name is required.',
            'full_name.string'   => 'Full name must be a valid string.',
            'full_name.max'      => 'Full name must not exceed 255 characters.',

            'phone.required'         => 'Phone is required.',
            'phone.digits_between'   => 'Phone number must be between 7 and 15 digits.',

            'country.required' => 'Country is required.',
            'state.required'   => 'State is required.',
            'city.required'    => 'City is required.',

            'dob.required' => 'Date of birth is required.',
            'dob.date' => 'Please enter a valid date.',
           'dob.before_or_equal' => 'You must be at least 18 years old to register.',

            'gender.required' => 'Gender is required.',
            'gender.in'       => 'Gender must be male, female, or other.',
        ]);


        try {
            $userId = $req->user()->id;
            $personal = PersonalInformation::updateOrCreate(
                ['user_id'       => $userId],
                [
                    'full_name' => $validated['full_name'],
                    'dob'        => $validated['dob'],
                    'phone'         => $validated['phone'],
                    'country'  => $validated['country'],
                    'state'      => $validated['state'],
                    'city'      => $validated['city'],
                    'gender'      =>strtolower($validated['gender']),
                ]
            );
            return response()->json(['personal' => $personal], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message', "something went wrong try again"], 500);
        }
    }
}
