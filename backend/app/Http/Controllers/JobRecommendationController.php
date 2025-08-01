<?php

namespace App\Http\Controllers;

use App\Models\Candidate\ProfessionalInformation;
use App\Models\Job;
use Illuminate\Http\Request;

class JobRecommendationController extends Controller
{
    public function recommendJobs(Request $request)
    {
        $user = $request->user();

        // 1️⃣ Get user skills from professional information
        $userInfo = ProfessionalInformation::where('user_id', $user->id)->first();

        if (!$userInfo || !$userInfo->skills) {
            return response()->json(['message' => 'No skills found for user'], 404);
        }

        $userSkills = collect(explode(',', $userInfo->skills))
            ->map(fn($s) => strtolower(trim($s)))
            ->filter()
            ->values()
            ->toArray();

        // 2️⃣ Get all jobs
        $jobs = Job::with(['employer:id,company_name'])
        ->where('status', 'active')
        ->where('deadline', '>=', now())
        ->select('id','employer_id', 'title', 'skills', 'description', 'salary_from','salary_to','job_type','employment_type','deadline')
        ->get();

        $recommendations = [];

        foreach ($jobs as $job) {
            $jobSkills = collect(explode(',', $job->skills))
                ->map(fn($s) => strtolower(trim($s)))
                ->filter()
                ->values()
                ->toArray();

            // 3️⃣ Calculate Cosine Similarity
            $similarity = $this->cosineSimilarity($userSkills, $jobSkills);

            $recommendations[] = [
                'job' => $job,
                'similarity' => $similarity,
            ];
        }

        // 4️⃣ Sort by similarity score (desc)
        usort($recommendations, fn($a, $b) => $b['similarity'] <=> $a['similarity']);

        // 5️⃣ Return top 10 jobs
        return response()->json([
            'jobs' => collect($recommendations)
                ->where('similarity', '>', 0) // ignore 0 similarity
                ->take(10)
                ->pluck('job')
                ->values() 
                ->toArray(),
        ]);
    }

    // 📌 Cosine Similarity Function
    private function cosineSimilarity(array $userSkills, array $jobSkills): float
    {
        if (empty($userSkills) || empty($jobSkills)) return 0;

        $allSkills = array_unique(array_merge($userSkills, $jobSkills));

        // Create vectors
        $userVector = [];
        $jobVector = [];

        foreach ($allSkills as $skill) {
            $userVector[] = in_array($skill, $userSkills) ? 1 : 0;
            $jobVector[] = in_array($skill, $jobSkills) ? 1 : 0;
        }

        // Dot product
        $dotProduct = 0;
        for ($i = 0; $i < count($allSkills); $i++) {
            $dotProduct += $userVector[$i] * $jobVector[$i];
        }

        // Magnitudes
        $magnitudeA = sqrt(array_sum(array_map(fn($x) => $x * $x, $userVector)));
        $magnitudeB = sqrt(array_sum(array_map(fn($x) => $x * $x, $jobVector)));

        if ($magnitudeA == 0 || $magnitudeB == 0) return 0;

        return $dotProduct / ($magnitudeA * $magnitudeB);
    }
}
