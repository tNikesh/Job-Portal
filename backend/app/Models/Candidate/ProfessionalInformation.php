<?php

namespace App\Models\Candidate;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class ProfessionalInformation extends Model
{
    protected $table="professional_informations";
    protected $fillable=["user_id","skills","preferred_jobs","interested_industries","employment_status"];

    protected $casts=[
        "preferred_jobs"=>'array',
        // "interested_industries"=>'array',
    ];

    public function user(){
        $this->belongsTo(User::class);
    }
}
