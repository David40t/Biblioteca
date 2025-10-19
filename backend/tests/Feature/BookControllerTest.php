<?php

use App\Models\Book;
use App\Models\Author;
use App\Models\Gender;

test('can get all books with author and gender', function () {
    // Arrange
    $author = Author::factory()->create();
    $gender = Gender::factory()->create();
    Book::factory()->count(3)->create([
        'author_id' => $author->id,
        'gender_id' => $gender->id
    ]);

    // Act
    $response = test()->get('/api/books');

    // Assert
    $response->assertStatus(200)
             ->assertJsonCount(3)
             ->assertJsonStructure([
                 '*' => [
                     'id',
                     'title',
                     'description',
                     'author_id',
                     'gender_id',
                     'author' => ['id', 'name', 'lastname'],
                     'gender' => ['id', 'name']
                 ]
             ]);
});

test('can get a single book with author and gender', function () {
    // Arrange
    $author = Author::factory()->create();
    $gender = Gender::factory()->create();
    $book = Book::factory()->create([
        'author_id' => $author->id,
        'gender_id' => $gender->id
    ]);

    // Act
    $response = test()->get("/api/books/{$book->id}");

    // Assert
    $response->assertStatus(200)
             ->assertJson([
                 'id' => $book->id,
                 'title' => $book->title,
                 'description' => $book->description,
                 'author_id' => $author->id,
                 'gender_id' => $gender->id,
             ]);
});

test('can create a book', function () {
    // Arrange
    $author = Author::factory()->create();
    $gender = Gender::factory()->create();
    
    $bookData = [
        'title' => 'Cien años de soledad',
        'description' => 'Una obra maestra de la literatura',
        'author_id' => $author->id,
        'gender_id' => $gender->id
    ];

    // Act
    $response = test()->post('/api/books', $bookData);

    // Assert
    $response->assertStatus(200)
             ->assertJson([
                 'title' => $bookData['title'],
                 'description' => $bookData['description'],
                 'author_id' => $bookData['author_id'],
                 'gender_id' => $bookData['gender_id']
             ]);

    $this->assertDatabaseHas('books', $bookData);
});

test('cannot create a book with invalid author', function () {
    // Arrange
    $gender = Gender::factory()->create();
    $bookData = [
        'title' => 'Cien años de soledad',
        'description' => 'Una obra maestra de la literatura',
        'author_id' => 999999, // ID inexistente
        'gender_id' => $gender->id
    ];

    // Act
    $response = test()->post('/api/books', $bookData);

    // Assert
    $response->assertStatus(400)
             ->assertJson(['error' => 'Autor Incorrecto']);
});

test('cannot create a book with invalid gender', function () {
    // Arrange
    $author = Author::factory()->create();
    $bookData = [
        'title' => 'Cien años de soledad',
        'description' => 'Una obra maestra de la literatura',
        'author_id' => $author->id,
        'gender_id' => 999999 // ID inexistente
    ];

    // Act
    $response = test()->post('/api/books', $bookData);

    // Assert
    $response->assertStatus(400)
             ->assertJson(['error' => 'Genero Incorrecto']);
});