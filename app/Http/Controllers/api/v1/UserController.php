<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegisterPostRequest;
use App\Http\Requests\LoginPostRequest;

class UserController extends Controller
{
    public function login(LoginPostRequest $request)
    {
        $credentials = $request->only('email', 'password');

        $user = User::where('email', $credentials['email'])->first();

        if (Auth::attempt($credentials)) {
            return response()->json([
                "user" => $user,
            ], 200);
        } else {
            return response()->json('Invalid email or password', 400);
        }
    }

    public function register(RegisterPostRequest $request)
    {
        User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => bcrypt($request->get('password')),
        ]);

        return response()->json('Register Successful', 200);
    }
}
