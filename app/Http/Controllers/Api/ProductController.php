<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use App\Http\Controllers\Controller;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Product::query()
            ->select('id', 'name', 'slug', 'price', 'short_description')
            ->orderBy('name', 'ASC')
            ->paginate(20);

        return response()->json(['products' => $data]);
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
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
        $data = $request->only([
            'name',
            'short_description',
            'description',
            'price',
            'category_id'
        ]);

        $data = $data + ['creator_id' => auth()->id()];
        $product = Product::query()->create($data);

        return response()->json(['message' => 'success', 'slug' => $product->slug], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $slug
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $product = Product::query()
            ->select('*')
            ->with(['user', 'category','images'])
            ->whereSlug($slug)
            ->first();

        return response()->json(['product' => $product]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, $slug)
    {
        Product::query()
            ->whereSlug($slug)
            ->update($request->only([
                'name',
                'short_description',
                'description',
                'price',
                'category_id'
            ]));

        return response()->json(['message' => 'success'], 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($slug)
    {
        $product = Product::query()->whereSlug($slug)->with('images')->first();
        foreach($product->images as $image) {
            Storage::delete('public/products/' . $image->name);
        }

        $product->delete();
        return response()->json(['message' => 'success'], 204);
    }


    /**
     * @param Request $request
     * @throws \Illuminate\Validation\ValidationException
     */
    public function uploadImages(Request $request)
    {
        $this->validate($request, [
            'file'     => 'required',
            'file.*'   => 'image',
            'slug' => 'required|exists:products,slug'
        ]);


        $files = $request->file('file');
        $productId = Product::query()->whereSlug($request->slug)->first()->id;
        foreach ($files as $file) {
            $img = Image::make($file)->fit(400)->encode('jpg');

            $name = uniqid() . '.jpg';
            $imgName = '/products/' . $name;


            ProductImage::query()->create([
               'name' => $name,
               'product_id' => $productId
            ]);

            Storage::put('public/' .  $imgName, $img->__toString());
        }

        return response()->json(['message' => 'success'], 201);
    }
}
