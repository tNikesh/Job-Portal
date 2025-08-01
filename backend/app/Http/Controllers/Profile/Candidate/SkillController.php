<?php

namespace App\Http\Controllers\Profile\Candidate;

use App\Http\Controllers\Controller;
use App\Models\Candidate\Education;
use App\Models\Candidate\Experience;
use App\Models\Candidate\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SkillController extends Controller
{
    public function store(Request $req)
    {

        $validated = $req->validate([
            'name' => 'required|string|max:255',
            'education_id'=> 'nullable|exists:educations,id',
            'experience_id' => 'nullable|exists:experiences,id',
        ], [
            'name.required' => 'Skill name is required.',
            'name.string'   => 'Skill name must be a valid string.',
            'name.max'      => 'Skill name must not exceed 255 characters.',
        ]);
        try {
            $userId = $req->user()->id;

            if (!empty($validated['education_id'])) {
                if (!Education::where('id', $validated['education_id'])->where('user_id', $userId)->exists()) {
                    return response()->json(['errors' => [
                        'education_id' => ['The selected education does not belong to you.']
                    ]], 422);
                }
            }
            
            if (!empty($validated['experience_id'])) {
                if (!Experience::where('id', $validated['experience_id'])->where('user_id', $userId)->exists()) {
                    return response()->json(['errors' => [
                        'experience_id' => ['The selected experience does not belong to you.']
                    ]], 422);
                }
            }
            
            $skill = Skill::create([
                'user_id'       => $userId,
                'education_id'       => $validated['education_id']??null,
                'experience_id'       => $validated['experience_id']??null,
                'name' => $validated['name'],
            ]);
            return response()->json(['skill' => $skill->load(['education:id,degree,institute_name','experience:id,position,institute_name'])], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message', "something went wrong try again"], 500);
        }
    }
    public function update(Request $req,$id)
    {

        $validated = $req->validate([
            'name' => 'required|string|max:255',
            'education_id'=> 'nullable|exists:educations,id',
            'experience_id' => 'nullable|exists:experiences,id',
        ], [
            'name.required' => 'Skill name is required.',
            'name.string'   => 'Skill name must be a valid string.',
            'name.max'      => 'Skill name must not exceed 255 characters.',
        ]);
        try {
            $userId = $req->user()->id;

            if (!empty($validated['education_id'])) {
                if (!Education::where('id', $validated['education_id'])->where('user_id', $userId)->exists()) {
                    return response()->json(['errors' => [
                        'education_id' => ['The selected education does not belong to you.']
                    ]], 422);
                }
            }
            
            if (!empty($validated['experience_id'])) {
                if (!Experience::where('id', $validated['experience_id'])->where('user_id', $userId)->exists()) {
                    return response()->json(['errors' => [
                        'experience_id' => ['The selected experience does not belong to you.']
                    ]], 422);
                }
            }
            $skill=Skill::find($id);

            if(!$skill){
                return response()->json(['message'=>'Record not found !',404]);
            }

            $skill->update([
                'education_id'       => $validated['education_id']??null,
                'experience_id'       => $validated['experience_id']??null,
                'name' => $validated['name'],
            ]);
            
            return response()->json(['skill' => $skill->load(['education:id,degree,institute_name','experience:id,position,institute_name'])], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message', "something went wrong try again"], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $skill = Skill::findOrFail($id); // throws 404 if not found
            $skill->delete();
            return response()->json(['message' => "Record deleted successfully !", 200]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message', "something went wrong try again"], 500);
        }
    }
}
