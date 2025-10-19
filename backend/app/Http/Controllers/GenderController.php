<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gender;

class GenderController extends Controller
{
    public function index()
    {
        return response()->json(Gender::all());
    }

    public function show($id)
    {
        return response()->json(Gender::find($id));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
        ]);

        $gender = new Gender();
        $gender->name = $request->name;
        $gender->save();

        return response()->json($gender);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:100',
        ]);
        $gender = Gender::find($id);
        $gender->name = $request->name;
        $gender->save();

        return response()->json($gender);
    }

    public function destroy($id)
    {
        $gender = Gender::find($id);
        $gender->delete();

        return response()->json(null, 204);
    }
}
