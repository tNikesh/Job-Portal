<?php

namespace App\Models\Employer;

use App\Models\Job;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Employer extends Model
{
    protected $fillable = [
        'user_id',
        'company_name',
        'company_website',
        'company_description',
        'contact_person',
        'designation',
        'phone',
        'alternate_phone',
        'company_size',
        'company_type',
        'company_address',
        'country',
        'state',
        'city',
    ];

 

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function jobs()
    {
        return $this->hasMany(Job::class);
    }
}
