import mockCocktails from "../data/mockCocktails"; // Adjust the path as necessary

const LOCAL_STORAGE_KEY = "savedRecipes"; // Key for local storage

const saveRecipe = (recipe) => {
  const recipes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  recipes.push(recipe);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  return recipe; // Return the saved recipe
};

const getAllRecipes = () => {
  const localRecipes =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  return [...localRecipes, ...mockCocktails]; // Combine local storage recipes with mock data
};

const deleteRecipe = (id) => {
  const recipes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedRecipes));
  return Promise.resolve(); // Return a resolved promise
};

const updateRecipe = (id, recipeData) => {
  const recipes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);
  if (recipeIndex !== -1) {
    recipes[recipeIndex] = { ...recipes[recipeIndex], ...recipeData };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }
  return Promise.resolve(recipes[recipeIndex]); // Return the updated recipe
};

export default { saveRecipe, getAllRecipes, deleteRecipe, updateRecipe };
