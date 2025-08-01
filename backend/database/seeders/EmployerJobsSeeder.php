<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmployerJobsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $jobTitles = [
            'Frontend Developer',
            'Backend Developer',
            'Full Stack Developer',
            'Laravel Developer',
            'React Developer',
            'Node.js Engineer',
            'Python Developer',
            'PHP Developer',
            'DevOps Engineer',
            'Cloud Engineer',
            'Software Engineer',
            'Web Application Developer',
            'Database Administrator',
            'Mobile App Developer',
            'UI/UX Designer',
        ];
        
        $jobDescriptions = [
            'We are looking for a skilled developer to build and maintain web applications with modern technologies.',
            'Join our team to work on exciting projects, building scalable applications for global clients.',
            'The ideal candidate will be responsible for designing, developing, and maintaining web applications.',
            'We are seeking a passionate software engineer to contribute to high-quality code and system design.',
            'Collaborate with our team to develop user-friendly, responsive, and high-performing applications.',
        ];
        
        $skillsList = ['Java', 'PHP', 'Laravel', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'Kubernetes'];
        
        for ($i = 1; $i <= 50; $i++) {
            $title = $jobTitles[array_rand($jobTitles)];
            $description = $jobDescriptions[array_rand($jobDescriptions)];
        
            $skills = collect($skillsList)
                ->random(rand(2, 4))
                ->implode(', ');
        
            DB::table('employer_jobs')->insert([
                'employer_id' => rand(1, 2), // random employer_id 1 or 2
                'title' => $title,
                'description' => $description,
                'experience_required' => rand(1, 10) . ' years',
                'skills' => $skills,
                'salary_from' => rand(20000, 50000),
                'salary_to' => rand(60000, 120000),
                'deadline' => Carbon::now()->addDays(rand(10, 90)),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        
    
    }
}
