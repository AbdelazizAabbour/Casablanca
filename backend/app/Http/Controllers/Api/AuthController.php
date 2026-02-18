<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        if (!$user->is_admin) {
            return response()->json(['message' => 'Unauthorized access'], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }


    public function redirectToGoogle()
    {
        return \Laravel\Socialite\Facades\Socialite::driver('google')->stateless()->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = \Laravel\Socialite\Facades\Socialite::driver('google')->stateless()->user();

            $user = User::where('email', $googleUser->getEmail())->first();

            if (!$user || !$user->is_admin) {
                return redirect('http://localhost:3000/admin/login?error=Unauthorized_Access');
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            return redirect('http://localhost:3000/admin/login?token=' . $token); // Redirect to login page first to handle token storage logic or direct to dashboard? 
            // Better redirect to a special route or login page that handles ?token=...
            // Or direct to dashboard if AdminDashboard checks URL param? 
            // AdminDashboard checks localStorage. 
            // So we need a way to put token into localStorage.
            // Usually we redirect to a frontend route like /admin/google-callback?token=... which then saves to LS and redirects to dashboard.
            // I'll redirect to /admin/login?token=... and update AdminLogin.jsx to check for token in URL.
        } catch (\Exception $e) {
            return redirect('http://localhost:3000/admin/login?error=Google_Auth_Failed');
        }
    }
}
