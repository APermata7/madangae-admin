@extends('layouts.app')

@section('content')
<h2 class="mb-4">All Recipes</h2>

<a href="{{ route('recipes.create') }}" class="btn btn-success mb-3">Add New Recipe</a>

@if($recipes->count())
    <div class="list-group">
        @foreach ($recipes as $recipe)
            <div class="list-group-item">
                <h5>{{ $recipe->title }}</h5>
                <p><strong>Ingredients:</strong> {{ $recipe->ingredients }}</p>
                <p><strong>Instructions:</strong> {{ $recipe->instructions }}</p>

                @if ($recipe->images->count())
                    <div class="mb-2">
                        @foreach ($recipe->images as $image)
                            <img src="{{ asset($image->image) }}" class="img-thumbnail" style="max-width: 150px;">
                        @endforeach
                    </div>
                @endif

                <a href="{{ route('recipes.edit', $recipe->id) }}" class="btn btn-sm btn-warning">Edit</a>
            </div>
        @endforeach
    </div>
@else
    <p>No recipes available.</p>
@endif
@endsection
