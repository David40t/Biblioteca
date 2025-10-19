<?php

use App\Models\Gender;

test('can get all genders', function () {
    // Arrange
    Gender::factory()->count(3)->create();

    // Act
    $response = test()->get('/api/genders');

    // Assert
    $response->assertStatus(200)
             ->assertJsonCount(3);
});

test('can get a single gender', function () {
    // Arrange
    $gender = Gender::factory()->create();

    // Act
    $response = test()->get("/api/genders/{$gender->id}");

    // Assert
    $response->assertStatus(200)
             ->assertJson([
                 'id' => $gender->id,
                 'name' => $gender->name,
             ]);
});

test('can create a gender', function () {
    // Arrange
    $genderData = [
        'name' => 'Ciencia Ficción'
    ];

    // Act
    $response = test()->post('/api/genders', $genderData);

    // Assert
    $response->assertStatus(200)
             ->assertJson([
                 'name' => $genderData['name']
             ]);

    $this->assertDatabaseHas('genders', $genderData);
});

test('can update a gender', function () {
    // Arrange
    $gender = Gender::factory()->create();
    $updatedData = [
        'name' => 'Aventura'
    ];

    // Act
    $response = test()->put("/api/genders/{$gender->id}", $updatedData);

    // Assert
    $response->assertStatus(200)
             ->assertJson([
                 'id' => $gender->id,
                 'name' => $updatedData['name']
             ]);

    $this->assertDatabaseHas('genders', $updatedData);
});

test('can delete a gender', function () {
    // Arrange
    $gender = Gender::factory()->create();

    // Act
    $response = test()->delete("/api/genders/{$gender->id}");

    // Assert
    $response->assertStatus(204);
    $this->assertDatabaseMissing('genders', ['id' => $gender->id]);
});