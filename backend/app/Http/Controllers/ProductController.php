<?php

namespace App\Http\Controllers;
use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Product::with('category')->get();
    }

    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $product = new Product();
        $product->name = request('name');
        $product->reference = request('reference');
        $product->price = request('price');
        $product->weight = request('weight');
        $product->category_id = request('category_id');
        $product->stock = request('stock');
        $product->save();
        $product->category;
        return response()->json(['success' => true, 'data' => $product]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        $product->name = request('name');
        $product->reference = request('reference');
        $product->price = request('price');
        $product->weight = request('weight');
        $product->category_id = request('category_id');
        $product->stock = request('stock');
        $product->save();
        $product->category;
        return response()->json(['success' => true, 'data' => $product]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        return response()->json(['success' => $product->delete()]);
    }

    public function sell($id)
    {
        $product = Product::find($id);
        if($product->stock > 0){
            $product->stock--;
            $product->sold_at = date('Y-m-d H:i:s');
            return response()->json(['success' => $product->save()]);
        }
        return response()->json(['success' => false, 'data' => $product->sold_at]);
    }
}
