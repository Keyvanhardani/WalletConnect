<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class Web3AuthController extends Controller
{
    /**
     * Handle the Web3 registration/login request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticate(Request $request)
    {
        $validated = $request->validate([
            'wallet_address' => 'required|string',
            'signature' => 'required|string',
            'message' => 'required|string',
            'network' => 'required|string|in:solana,fantom,ethereum',
        ]);

        // Verify signature (This is a simplified example - in production, you'd need proper crypto verification)
        // The actual verification would depend on the blockchain network
        $verified = true; // In a real implementation, you would verify the signature here

        if (!$verified) {
            throw ValidationException::withMessages([
                'signature' => ['The signature could not be verified.'],
            ]);
        }

        // Find or create user
        $user = User::firstOrCreate(
            ['wallet_address' => $validated['wallet_address']],
            [
                'name' => 'User_' . Str::random(6),
                'email' => $validated['wallet_address'] . '@web3.user',
                'password' => bcrypt(Str::random(40)),
                'wallet_network' => $validated['network'],
            ]
        );

        // Log the user in
        Auth::login($user);

        return response()->json([
            'user' => $user,
            'redirectUrl' => '/dashboard'
        ]);
    }

    /**
     * Log the user out.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['success' => true]);
    }
}
