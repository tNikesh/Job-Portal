<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CandidateApplication extends Model
{
    protected $table="candidate_applications";
    protected $fillable = [
        'user_id',
        'job_id',
        'resume_path',
        'status',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function job()
    {
        return $this->belongsTo(Job::class);
    }
}
