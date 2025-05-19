@extends('layouts.app')

@section('content')
<h2 class="mb-4">Edit Recipe</h2>

<form action="{{ route('recipes.update', $recipe->id) }}" method="POST" enctype="multipart/form-data">
    @csrf
    @method('PUT')

    <div class="mb-3">
        <label for="title" class="form-label">Recipe Title</label>
        <input type="text" name="title" class="form-control" value="{{ $recipe->title }}" required>
    </div>

    <div class="mb-3">
        <label for="ingredients" class="form-label">Ingredients</label>
        <textarea name="ingredients" class="form-control" rows="4" required>{{ $recipe->ingredients }}</textarea>
    </div>

    <div class="mb-3">
        <label for="instructions" class="form-label">Instructions</label>
        <textarea name="instructions" class="form-control" rows="4" required>{{ $recipe->instructions }}</textarea>
    </div>

    <div class="mb-3">
        <label class="form-label">Existing Images</label><br>
        @foreach ($recipe->images as $image)
            <img src="{{ asset($image->image) }}" alt="Recipe Image" class="img-thumbnail" style="max-width: 150px;">
        @endforeach
    </div>

    <div class="mb-3">
        <label for="images[]" class="form-label">Add New Images (Optional)</label>
        <input type="file" name="images[]" class="form-control" multiple>
    </div>

    <button type="submit" class="btn btn-primary">Update Recipe</button>
</form>
@endsection
