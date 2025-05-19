namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;
use App\Models\RecipeImage;
use Illuminate\Support\Facades\Storage;

class RecipeController extends Controller
{
    public function index()
    {
        $recipes = Recipe::with('images')->get();
        return view('recipes.index', compact('recipes'));
    }

    public function create()
    {
        return view('recipes.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'ingredients' => 'required',
            'instructions' => 'required',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $recipe = Recipe::create($request->only(['title', 'ingredients', 'instructions']));

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('uploads', 'public');
                RecipeImage::create([
                    'recipe_id' => $recipe->id,
                    'image' => 'storage/' . $path,
                ]);
            }
        }

        return redirect()->route('recipes.index');
    }

    public function edit(Recipe $recipe)
    {
        return view('recipes.edit', compact('recipe'));
    }

    public function update(Request $request, Recipe $recipe)
    {
        $recipe->update($request->only(['title', 'ingredients', 'instructions']));
        return redirect()->route('recipes.index');
    }
}
