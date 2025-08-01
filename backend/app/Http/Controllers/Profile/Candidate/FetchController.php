<?php

namespace App\Http\Controllers\Profile\Candidate;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FetchController extends Controller
{
    public function fetch(Request $req){
        $user=$req->user()->load(['skills.education:id,degree,institute_name','skills.experience:id,position,institute_name','educations','experiences','personalInformation','professionalInformation']);
        return response()->json(['user'=>$user],200);
    }
}
