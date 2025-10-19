<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use App\Models\Author;
use App\Models\Gender;

class BookController extends Controller
{
    public function index()
    {
        return response()->json(Book::with('author', 'gender')->get());
    }

    public function show($id)
    {
        return response()->json(Book::with('author', 'gender')->find($id));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:100',
            'author_id' => 'required|integer',
            'description' => 'required|string|max:255',
            'gender_id' => 'required|integer'
        ]);

        $author = Author::find($request->author_id);
        
        if (!$author){
            return response()->json(['error' => 'Autor Incorrecto'], 400);
        }

        $gender = Gender::find($request->gender_id);

        if (!$gender){
            return response()->json(['error' => 'Genero Incorrecto'], 400);
        }

        $book = new Book();
        $book->title = $request->title;
        $book->description = $request->description;
        $book->author_id = $request->author_id;
        $book->gender_id = $request->gender_id;
        $book->save();

        return response()->json($book);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:100',
            'author_id' => 'required|integer',
            'description' => 'required|string|max:255',
            'gender_id' => 'required|integer'
        ]);

        $author = Author::find($request->author_id);
        
        if (!$author){
            return response()->json(['error' => 'Autor Incorrecto'], 400);
        }

        $gender = Gender::find($request->gender_id);

        if (!$gender){
            return response()->json(['error' => 'Genero Incorrecto'], 400);
        }
        $book = Book::find($id);
        $book->title = $request->title;
        $book->description = $request->description;
        $book->author_id = $request->author_id;
        $book->gender_id = $request->gender_id;
        $book->save();

        return response()->json($book);
    }

    public function destroy($id)
    {
        $book = Book::find($id);
        $book->delete();

        return response()->json(null, 204);
    }
}
