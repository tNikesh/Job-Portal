<?php

namespace App\Models\Candidate;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $table = "educations";
    protected $fillable = [
        'user_id',
        'institute_name',
        'degree',
        'field',
        'start_year',
        'end_year',
    ];

    // Cast years as integers
    protected $casts = [
        'start_year' => 'integer',
        'end_year' => 'integer',
    ];

    // Relationship to User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function skills()
    {
        return $this->hasMany(Skill::class);
    }
}
