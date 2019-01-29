<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\RegisterRequest;
use App\Mail\ResetMail;
use App\Mail\VerificationEmail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;


class AuthController extends Controller
{
    /**
     * AuthController constructor.
     */
    public function __construct() {
        $this->middleware('auth:api',['except' => ['login','register','reset','setPassword', 'verify']]);
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
           'token' => 'required|exists:users,verification_token'
        ]);

        User::query()->whereVerificationToken($request->token)
            ->update([
               'verification_token' => null,
                'email_verified_at' => Carbon::now()
        ]);

        return response()->json(['message'=>'success'],204);
    }


    /**
     * @param RegisterRequest $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function reset(Request $request) {
        $this->validate($request,[
            'email' => 'required|min:8|max:60|exists:users,email'
        ]);

       $token = str_random(100);
       $email = $request->input("email");
       DB::table('password_resets')->updateOrInsert([
            'email' => $email,
       ], [
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
       ]);
       $user = User::query()
            ->whereEmail($email)
            ->first();

       Mail::to($user)->queue(new ResetMail($user,$token));

       return response()->json(['message' => 'success'],201);
    }

    /**
     * @param RegisterRequest $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function setPassword(Request $request) {
        $this->validate($request, [
            'password' => 'required|min:2|max:30|string|confirmed',
            'token' => 'required|string|exists:password_resets,token'
        ]);

        $info = DB::table('password_resets')
                ->where('token', '=', $request->input('token'));
        $infoFirst = $info->first();

        User::query()
            ->whereEmail($infoFirst->email)
            ->update(['password' => bcrypt($request->password)]);

        $info->delete();

        return response()->json(['message' => 'success'],201); 
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
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }


}