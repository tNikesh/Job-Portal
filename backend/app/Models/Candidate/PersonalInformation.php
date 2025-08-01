<?php

namespace App\Models\Candidate;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class PersonalInformation extends Model
{
    protected $table="personal_informations";
    protected $fillable=["user_id","full_name","phone","dob","gender","country","state","city"];

    protected $casts=[
        'dob'=>'date'
    ];

    public function user(){
        $this->belongsTo(User::class);
    }
}
