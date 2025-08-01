<?php

use App\Http\Controllers\Auth\LoginUserController;
use App\Http\Controllers\Auth\RegisterUserController;
use App\Http\Controllers\CandidateApplicationController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\JobRecommendationController;
use App\Http\Controllers\Profile\Candidate\EducationController;
use App\Http\Controllers\Profile\Candidate\ExperienceController;
use App\Http\Controllers\Profile\Candidate\FetchController;
use App\Http\Controllers\Profile\Candidate\PersonalController;
use App\Http\Controllers\Profile\Candidate\ProfessionalController;
use App\Http\Controllers\Profile\Employer\EmployerController;
use App\Http\Controllers\Profile\Employer\FetchController as EmployerFetchController;

use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

  

    Route::post('/login', [LoginUserController::class, 'login']);
    Route::post('/register', [RegisterUserController::class, 'register']);

    Route::get('/candidate/profile',[FetchController::class,'fetch'])->middleware(['auth:sanctum','role:candidate']);

    Route::post('/candidate/profile/education',[EducationController::class,'store'])->middleware(['auth:sanctum','role:candidate']);
    Route::patch('/candidate/profile/education/{id}',[EducationController::class,'update'])->middleware(['auth:sanctum','role:candidate']);
    Route::delete('/candidate/profile/education/{id}',[EducationController::class,'destroy'])->middleware(['auth:sanctum','role:candidate']);
  
    Route::post('/candidate/profile/experience',[ExperienceController::class,'store'])->middleware(['auth:sanctum','role:candidate']);
    Route::patch('/candidate/profile/experience/{id}',[ExperienceController::class,'update'])->middleware(['auth:sanctum','role:candidate']);
    Route::delete('/candidate/profile/experience/{id}',[ExperienceController::class,'destroy'])->middleware(['auth:sanctum','role:candidate']);
   
    // Route::post('/profile/skill',[SkillController::class,'store'])->middleware('auth:sanctum');
    // Route::patch('/profile/skill/{id}',[SkillController::class,'update'])->middleware('auth:sanctum');
    // Route::delete('/profile/skill/{id}',[SkillController::class,'destroy'])->middleware('auth:sanctum');

    Route::post('/candidate/profile/personal',[PersonalController::class,'store'])->middleware(['auth:sanctum','role:candidate']);
    Route::post('/candidate/profile/professional',[ProfessionalController::class,'store'])->middleware(['auth:sanctum','role:candidate']);

    Route::get('/employer/profile', [EmployerFetchController::class, 'fetch'])->middleware(['auth:sanctum','role:employer']);
    Route::get('/employer/profile/detail', [EmployerController::class, 'fetch'])->middleware(['auth:sanctum','role:employer']);
    Route::post('/employer/profile/detail', [EmployerController::class, 'store'])->middleware(['auth:sanctum','role:employer']);
    Route::patch('/employer/profile/detail', [EmployerController::class, 'update'])->middleware(['auth:sanctum','role:employer']);
    Route::put('/employer/profile/employer/{employer}', [EmployerController::class, 'update'])->middleware(['auth:sanctum','role:employer']);
    
    // Route::post('/profile/employer-verifications', [EmployerVerificationController::class, 'store'])->middleware('auth:sanctum');
    // Route::patch('/profile/employer-verifications/{id}', [EmployerVerificationController::class, 'update'])->middleware('auth:sanctum');


    Route::get('/user/{id}', [RegisterUserController::class, 'getUser']);
    Route::get('/recent-jobs', [JobController::class, 'recentJobs']);
    Route::get('/jobs', [JobController::class, 'index']);
    Route::get('/jobs/{id}', [JobController::class, 'show']);

    Route::post('/post-job', [JobController::class, 'store'])->middleware(['auth:sanctum','role:employer']);
    Route::patch('/jobs/{id}', [JobController::class, 'update'])->middleware(['auth:sanctum','role:employer']);
    Route::patch('/jobs/{job}/status', [JobController::class, 'updateStatus'])->middleware(['auth:sanctum','role:employer']);
    Route::get('/job-recommendation', [JobRecommendationController::class, 'recommendJobs'])->middleware(['auth:sanctum','role:candidate']);
    
    Route::get('/employer/jobs', [JobController::class, 'myJobs'])->middleware(['auth:sanctum','role:employer']);
    Route::get('/employer/job-applications/{id}', [JobController::class, 'getApplication'])->middleware(['auth:sanctum','role:employer']);
    
    
    Route::post('/candidate-application', [CandidateApplicationController::class, 'store'])->middleware(['auth:sanctum','role:candidate']);
    Route::get('/my-job-applications', [CandidateApplicationController::class, 'show'])->middleware(['auth:sanctum','role:candidate']);
    Route::patch('/candidate-application/{job}/status', [CandidateApplicationController::class, 'updateStatus'])->middleware(['auth:sanctum','role:employer']);
