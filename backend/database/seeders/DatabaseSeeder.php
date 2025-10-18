<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Author;
use App\Models\Gender;
use App\Models\Book;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Author::factory(20)->create();
        Gender::factory(20)->create();
        Book::factory(20)->create();
    }
}
