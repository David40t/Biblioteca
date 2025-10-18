<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'gender_id',
        'author_id',
    ];

    public function gender()
    {
        return $this->belongsTo(Gender::class);
    }

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function loans()
    {
        return $this->hasMany(Loan::class);
    }
}
