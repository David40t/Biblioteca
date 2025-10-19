<?php

use App\Models\Author;

test('can get all authors', function () {
    // Arrange
    Author::factory()->count(3)->create();

    // Act
    $response = test()->get('/api/authors');

    // Assert
    $response->assertStatus(200)
             ->assertJsonCount(3);
});

test('can get a single author', function () {
    // Arrange
    $author = Author::factory()->create();

    // Act
    $response = test()->get("/api/authors/{$author->id}");

    // Assert
    $response->assertStatus(200)
             ->assertJson([
                 'id' => $author->id,
                 'name' => $author->name,
                 'lastname' => $author->lastname,
             ]);
});

test('can create an author', function () {
    // Arrange
    $authorData = [
        'name' => 'Gabriel',
        'lastname' => 'García Márquez'
    ];

    // Act
    $response = test()->post('/api/authors', $authorData);

    // Assert
    $response->assertStatus(200)
             ->assertJson([
                 'name' => $authorData['name'],
                 'lastname' => $authorData['lastname']
             ]);

    $this->assertDatabaseHas('authors', $authorData);
});

test('can update an author', function () {
    // Arrange
    $author = Author::factory()->create();
    $updatedData = [
        'name' => 'Jorge Luis',
        'lastname' => 'Borges'
    ];

    // Act
    $response = test()->put("/api/authors/{$author->id}", $updatedData);

    // Assert
    $response->assertStatus(200)
             ->assertJson([
                 'id' => $author->id,
                 'name' => $updatedData['name'],
                 'lastname' => $updatedData['lastname']
             ]);

    $this->assertDatabaseHas('authors', $updatedData);
});

test('can delete an author', function () {
    // Arrange
    $author = Author::factory()->create();

    // Act
    $response = test()->delete("/api/authors/{$author->id}");

    // Assert
    $response->assertStatus(204);
    $this->assertDatabaseMissing('authors', ['id' => $author->id]);
});