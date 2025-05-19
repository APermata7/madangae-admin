<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'ingredients', 'instructions'];

    public function images()
    {
        return $this->hasMany(RecipeImage::class);
    }
}
