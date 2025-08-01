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
        Schema::create('employer_jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employer_id')->constrained('employers')->onDelete('cascade'); // Foreign key to employers table
            $table->string('title'); 
            $table->text('description'); 
            $table->text('skills'); 
            $table->text('responsibilities')->nullable(); // Job responsibilities (can include rich text)
            $table->text('qualifications')->nullable(); // Job qualifications (can include rich text)
            $table->string('experience_required')->nullable(); // Required years of experience
            $table->decimal('salary_from', 10, 2)->nullable(); // Salary lower range
            $table->decimal('salary_to', 10, 2)->nullable(); // Salary upper range
            $table->enum('job_type', ['full-time', 'part-time', 'contract', 'internship'])->default('full-time'); // Job type
            $table->enum('employment_type', ['remote', 'on-site', 'hybrid'])->default('on-site'); // Employment type
            $table->timestamp('deadline')->nullable(); // Last date to apply
            $table->enum('status', ['active', 'inactive'])->default('active'); // Job status
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employer_jobs');
    }
};
