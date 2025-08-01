<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('educations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('institute_name');     // e.g., Computer Science, Data Science
            $table->string('degree')->nullable();             // e.g., Bachelor of Science, MBA
            $table->string('field');         // e.g., Kathmandu University
            $table->unsignedSmallInteger('start_year');
            $table->unsignedSmallInteger('end_year')->nullable(); // Or expected end date if ongoing
        
            $table->timestamps();
        
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('educations');
    }
};
