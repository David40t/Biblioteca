<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function index()
    {
        return response()->json(Author::all());
    }

    public function show($id)
    {
        return response()->json(Author::find($id));
    }

    public function store(Request $request)
    {
        Request::validate([
            'name' => 'required|string|max:100',
        ]);

        $author = new Author();
        $author->name = $request->name;
        $author->save();

        return response()->json($author);
    }

    public function update(Request $request, $id)
    {
        Request::validate([
            'name' => 'required|string|max:100',
        ]);
        $author = Author::find($id);
        $author->name = $request->name;
        $author->save();

        return response()->json($author);
    }

    public function destroy($id)
    {
        $author = Author::find($id);
        $author->delete();

        return response()->json(null, 204);
    }
}
