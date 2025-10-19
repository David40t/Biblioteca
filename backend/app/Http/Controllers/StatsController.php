<?php

namespace App\Http\Controllers;

use App\Models\Loan;



class StatsController extends Controller
{
    public function books_loans()
    {
        $loans = Loan::with('book', 'user')->get();
        return response()->json($loans);
    }

    public function users_loans()
    {
        $loans = Loan::with('book', 'user')->where('status', '=', 0)->get();
        return response()->json($loans);
    }

    public function loan_defeated()
    {
        $loans = Loan::with('book', 'user')->where('status', '=', 0)->where('return_date', '<', date('Y-m-d'))->get();
        return response()->json($loans);
    }

    public function books_more_loans_top_5()
{
    $topBooks = Loan::select('book_id', \DB::raw('COUNT(*) as loan_count'))
        ->groupBy('book_id')
        ->orderByDesc('loan_count')
        ->take(5)
        ->with('book') 
        ->get();

    return response()->json($topBooks);
}

}
