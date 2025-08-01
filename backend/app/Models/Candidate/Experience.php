<?php

namespace App\Models\Candidate;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $table = "experiences";
    protected $fillable = [
        'user_id',
        'institute_name',
        'institute_address',
        'position',
        'job_type',
        'started_date',
        'end_date',
    ];

    protected $casts = [
        'started_date' => 'date',
        'end_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function skills()
    {
        return $this->hasMany(Skill::class);
    }
}
