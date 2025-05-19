@extends('layouts.app')

@section('content')
<h1 class="text-center mb-5">Login</h1>
<form method="POST" action="{{ route('login') }}" class="mx-auto" style="max-width: 400px;">
    @csrf
    <div class="mb-3">
        <input type="text" name="username" class="form-control" placeholder="Username" required>
    </div>
    <div class="mb-3">
        <input type="password" name="password" class="form-control" placeholder="Password" required>
    </div>
    <div class="d-grid">
        <input type="submit" value="Login" class="btn btn-primary">
    </div>
</form>
@endsection
