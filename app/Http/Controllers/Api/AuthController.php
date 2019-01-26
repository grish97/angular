<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Requests\RegisterRequest;
use App\Mail\VerificationEmail;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;


class AuthController extends Controller
{
    /**
     * AuthController constructor.
     */
    public function __construct() {
        $this->middleware('auth:api',['except' => ['login','register']]);
    }


    /**
     * @param RegisterRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterRequest $request)
    {
        $token = base64_encode(str_random(140));
        $user =  User::query()->create([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'verification_token' => $token
        ]);

        Mail::to($user)->queue(new VerificationEmail($user));

        return response()->json(['message' => 'success'], 201);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */

    public function verify (Request $request) {
        $this->validate($request,[
           'token' => 'required|exist:users,verification_token'
        ]);

        User::query()->whereVerificationToken($request->token)
            ->update([
               'verification_token' => null,
                'email_verified' => Carbon::now()
            ]);
        return response()->json(['success'=>true],204);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }


}
