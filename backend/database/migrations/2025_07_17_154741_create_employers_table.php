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
        Schema::create('employers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->onDelete('cascade');
            
            $table->string('company_name');
            $table->string('company_website')->nullable();
            $table->string('industry')->nullable(); // normalized industry
            $table->text('company_description')->nullable();
            $table->string('company_logo')->nullable();

            $table->string('contact_person');
            $table->string('designation')->nullable();
            $table->string('phone');
            $table->string('alternate_phone')->nullable();

            $table->string('company_size')->nullable(); // e.g., '1-10', '11-50'
            $table->string('company_type')->nullable();

 
            $table->string('company_address');
            $table->string('country');
            $table->string('state');
            $table->string('city');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employers');
    }
};
