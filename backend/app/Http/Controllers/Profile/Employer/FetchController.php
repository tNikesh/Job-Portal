<?php

namespace App\Http\Controllers\Profile\Employer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FetchController extends Controller
{
    public function fetch(Request $req){
        $user=$req->user()->load(['employer']);
        return response()->json(['user'=>$user],200);
    }
}
