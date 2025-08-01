<?php

namespace App\Http\Controllers\Profile\Employer;

use App\Http\Controllers\Controller;
use App\Models\Employer\Employer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class EmployerController extends Controller
{
    public function fetch(Request $request){
       $employer= Employer::where('user_id',$request->user()->id)->first();
       if(!$employer){
        return response()->json(['message'=>'Employer Detail not found !'],404);
       }
       return response()->json(['employer'=>$employer],200);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'company_website' => 'nullable|url',
            'company_description' => 'nullable|string',
            'company_type' => 'required|string',
    
            'contact_person' => 'required|string|max:255',
            'designation' => 'nullable|string|max:255',
            'phone' => 'required|digits_between:7,15', 
            'alternate_phone' => 'nullable|digits_between:7,15',

    
            'company_size' => 'nullable|string|max:50',
            'company_address' => 'required|string|max:255',
            'country' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'city' => 'required|string|max:100',
        ]);

        try {
           

            $employer = Employer::updateOrCreate(
                ['user_id'=>$request->user()->id],
                $validated
            );


            return response()->json([
                'message' => 'Employer profile added successfully.',
                // 'employer' => $employer,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Failed to create employer profile: ' . $e->getMessage());

            return response()->json([
                'message' =>$e->getMessage(),
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function update(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'company_website' => 'nullable|url',
            'company_description' => 'nullable|string',
            'company_type' => 'required|string',
    
            'contact_person' => 'required|string|max:255',
            'designation' => 'nullable|string|max:255',
            'phone' => 'required|digits_between:7,15', 
            'alternate_phone' => 'nullable|digits_between:7,15',

    
            'company_size' => 'nullable|string|max:50',
            'company_address' => 'required|string|max:255',
            'country' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'city' => 'required|string|max:100',
        ]);

        try {
           

             Employer::updateOrCreate(
                ['user_id'=>$request->user()->id],
                $validated
            );


            return response()->json([
                'message' => 'Employer profile updated successfully.',
            ], 200);
        } catch (\Exception $e) {
            Log::error('Failed to update employer profile: ' . $e->getMessage());

            return response()->json([
                'message' =>$e->getMessage(),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

   
}
