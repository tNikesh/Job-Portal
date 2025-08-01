<?php

namespace App\Models\Candidate;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $table="skills";

    protected $fillable = [
        'user_id',
        'education_id',
        'experience_id',
        'name',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function education()
    {
        return $this->belongsTo(Education::class);
    }
    public function experience()
    {
        return $this->belongsTo(Experience::class);
    }
}
