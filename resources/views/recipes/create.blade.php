@extends('layouts.app')

@section('content')
<h2 class="mb-4">Add New Recipe</h2>

<form action="{{ route('recipes.store') }}" method="POST" enctype="multipart/form-data">
    @csrf

    <div class="mb-3">
        <label for="title" class="form-label">Recipe Title</label>
        <input type="text" name="title" class="form-control" required>
    </div>

    <div class="mb-3">
        <label for="ingredients" class="form-label">Ingredients</label>
        <textarea name="ingredients" class="form-control" rows="4" required></textarea>
    </div>

    <div class="mb-3">
        <label for="instructions" class="form-label">Instructions</label>
        <textarea name="instructions" class="form-control" rows="4" required></textarea>
    </div>

    <div class="mb-3">
        <label for="images[]" class="form-label">Upload Images</label>
        <input type="file" name="images[]" class="form-control" multiple>
    </div>

    <button type="submit" class="btn btn-success">Add Recipe</button>
</form>
@endsection
