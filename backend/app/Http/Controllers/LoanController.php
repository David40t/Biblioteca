<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Loan;
use App\Models\Book;
use App\Models\User;

class LoanController extends Controller
{
    public function index()
    {
        return response()->json(Loan::all());
    }

    public function show($id)
    {
        return response()->json(Loan::find($id));
    }

    public function store(Request $request)
    {
        Request::validate([
            'book_id' => 'required|integer',
            'user_id' => 'required|integer',
            'status' => 'required|string|max:100',
            'loan_date' => 'required|date',
            'return_date' => 'required|date',
        ]);

        $book = Book::findOrFail($request->book_id);
        
        if (!$book){
            return response()->json(['error' => 'Libro Incorrecto'], 400);
        }

        $user = User::findOrFail($request->user_id);
        
        if (!$user){
            return response()->json(['error' => 'Usuario Incorrecto'], 400);
        }

        $loan = new Loan();
        $loan->book_id = $request->book_id;
        $loan->user_id = $request->user_id;
        $loan->status = $request->status;
        $loan->loan_date = $request->loan_date;
        $loan->return_date = $request->return_date;
        $loan->save();
        
        return response()->json($loan);
    }

    public function update(Request $request, $id)
    {
        Request::validate([
            'book_id' => 'required|integer',
            'user_id' => 'required|integer',
            'status' => 'required|string|max:100',
            'loan_date' => 'required|date',
            'return_date' => 'required|date',
        ]);

        $book = Book::findOrFail($request->book_id);
        
        if (!$book){
            return response()->json(['error' => 'Libro Incorrecto'], 400);
        }

        $user = User::findOrFail($request->user_id);
        
        if (!$user){
            return response()->json(['error' => 'Usuario Incorrecto'], 400);
        }

        $loan = Loan::find($id);
        $loan->book_id = $request->book_id;
        $loan->user_id = $request->user_id;
        $loan->status = $request->status;
        $loan->loan_date = $request->loan_date;
        $loan->return_date = $request->return_date;
        $loan->save();

        return response()->json($loan);
    }

    public function destroy($id)
    {
        $loan = Loan::find($id);
        $loan->delete();

        return response()->json(null, 204);
    }
}
