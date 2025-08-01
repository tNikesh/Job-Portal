<?php

namespace App\Models;

use App\Models\Employer\Employer;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $table="employer_jobs";
    protected $fillable = [
        'employer_id',
        'title',
        'description',
        'responsibilities',
        'qualifications',
        'experience_required',
        'skills',
        'salary_from',
        'salary_to',
        'job_type',
        'employment_type',
        'deadline',
        'status',
    ];

    /**
     * The employer that posted this job.
     */
    public function employer()
    {
        return $this->belongsTo(Employer::class);
    }

    public function applications()
{
    return $this->hasMany(CandidateApplication::class, 'job_id');
}


    /**
     * Scope to filter jobs by status (active/inactive).
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope to filter jobs by status (inactive).
     */
    public function scopeInactive($query)
    {
        return $query->where('status', 'inactive');
    }

    /**
     * Get the job's salary range.
     */
    public function getSalaryRangeAttribute()
    {
        return $this->salary_from . ' - ' . $this->salary_to;
    }
}
