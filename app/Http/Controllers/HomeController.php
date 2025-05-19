public function index()
{
    $recipes = Recipe::latest()->get();
    return view('home', compact('recipes'));
}
