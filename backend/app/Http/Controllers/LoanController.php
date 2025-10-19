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
        return response()->json(Loan::with('book', 'user')->get()->sortByDesc('loan_date'));
    }

    public function show($id)
    {
        return response()->json(Loan::with('book', 'user')->find($id));
    }

    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|integer',
            'user_id' => 'required|integer',
            'status' => 'required|integer',
            'loan_date' => 'required|date',
            'return_date' => 'required|date',
        ]);

        $book = Book::find($request->book_id);
        
        if (!$book){
            return response()->json(['error' => 'Libro Incorrecto'], 400);
        }

        $user = User::find($request->user_id);
        
        if (!$user){
            return response()->json(['error' => 'Usuario Incorrecto'], 400);
        }

        $loanUser = Loan::where('book_id', $request->book_id)->where('user_id', $request->user_id)->where('status', '=', 0)->count();

        if ($loanUser > 0){
            return response()->json(['error' => 'Ya existe un préstamo para este usuario'], 400);
        }
        
        $bookStatus = Loan::where('book_id', $request->book_id)->where('status', '=', 0)->count();
        
        if ($bookStatus > 0){
            return response()->json(['error' => 'Ya existe un préstamo para este libro'], 400);
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
        $request->validate([
            'book_id' => 'required|integer',
            'user_id' => 'required|integer',
            'status' => 'required|integer',
            'loan_date' => 'required|date',
            'return_date' => 'required|date',
        ]);

        $book = Book::find($request->book_id);
        
        if (!$book){
            return response()->json(['error' => 'Libro Incorrecto'], 400);
        }

        $user = User::find($request->user_id);
        
        if (!$user){
            return response()->json(['error' => 'Usuario Incorrecto'], 400);
        }

        $loan = Loan::find($id);

        if (!$loan){
            return response()->json(['error' => 'Préstamo Incorrecto'], 400);
        }

        $loanBook = Loan::where('book_id', $request->book_id)->where('status', '=', 0)->count();

        if ($loanBook > 0){
            return response()->json(['error' => 'Ya existe un préstamo para este libro'], 400);
        }

        $loanUser = Loan::where('book_id', $request->book_id)->where('user_id', $request->user_id)->where('status', '=', 0)->count();

        if ($loanUser > 0){
            return response()->json(['error' => 'Ya existe un préstamo para este usuario'], 400);
        }

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
