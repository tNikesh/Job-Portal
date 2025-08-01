<?php

namespace App\Models\Employer;

use Illuminate\Database\Eloquent\Model;

class EmployerVerification extends Model
{
    protected $fillable = [
        'employer_id',
        'document_type',
        'document_number',
        'document_file',
        'verified_at',
    ];

    protected $dates = ['verified_at'];

    public function employer()
    {
        return $this->belongsTo(Employer::class);
    }
}
