<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = User::query()->select(
            'id','name','email')
            ->orderBy('name', 'DESC')
            ->paginate(20);

        $count = $data->count();
        return response()->json(['users' => $data,'count' => $count]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RegisterRequest $request)
    {
        $data = $request->only([
            'name',
            'email',
            'password'
        ]);

        $user = User::query()->create($data);
        return response()->json(['message' => 'success', 'id' => $user->id],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::query()
            ->whereId($id)
            ->first();

        return response()->json(['message' => 'success', 'user' => $user]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        dd('edit');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        $this->validate($request,[
            'name' => "required|max:60|string",
            'email' => "required|max:60|email|unique:users,email,$id",
            'password' => "required|max:40|min:6|string",
        ]);

        User::query()
            ->whereId($id)
            ->update($request->only([
                'name',
                'email',
                bcrypt('password')
            ]));

        return response()->json(['message' => 'success'],201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        User::query()->whereId($id)->first()->delete();
        return response()->json(['message' => 'success'],204);
    }
}
