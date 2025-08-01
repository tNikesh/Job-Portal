<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Models\Candidate\Education;
use App\Models\Candidate\Experience;
use App\Models\Candidate\PersonalInformation;
use App\Models\Candidate\ProfessionalInformation;
use App\Models\Candidate\Skill;
use App\Models\Employer\Employer;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'role',
        'is_verified',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function professionalInformation()
    {
        return $this->hasOne(ProfessionalInformation::class);
    }

    public function personalInformation()
    { 
        return $this->hasOne(PersonalInformation::class);
    }

    public function skills()
    {
        return $this->hasMany(Skill::class);
    }
    public function educations()
    {
        return $this->hasMany(Education::class);
    }
    public function experiences()
    {
        return $this->hasMany(Experience::class);
    }
    public function employer()
    {
        return $this->hasOne(Employer::class);
    }
    public function applications()
{
    return $this->hasMany(CandidateApplication::class, 'user_id');
}

}
