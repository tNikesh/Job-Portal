<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next,$role): Response
    {
        $user = $request->user();

        if (!$user || $user->role !== $role) {
            // You can return 403 Forbidden or redirect as needed
            return response()->json(['message' => 'Forbidden - Insufficient role'], 403);
        }

        return $next($request);
    }
}
