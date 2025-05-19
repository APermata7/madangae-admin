@extends('layouts.app')

@section('content')
<div class="container">
    <h2 class="mb-4">Daftar Resep</h2>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    @if($recipes->isEmpty())
        <p>Belum ada resep yang ditambahkan.</p>
    @else
        <div class="row">
            @foreach($recipes as $recipe)
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        @if($recipe->image)
                            <img src="{{ asset('storage/' . $recipe->image) }}" class="card-img-top" alt="{{ $recipe->title }}">
                        @endif
                        <div class="card-body">
                            <h5 class="card-title">{{ $recipe->title }}</h5>
                            <p class="card-text">{{ Str::limit($recipe->description, 100) }}</p>
                            <a href="{{ route('recipes.show', $recipe->id) }}" class="btn btn-primary">Lihat Detail</a>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    @endif
</div>
@endsection
