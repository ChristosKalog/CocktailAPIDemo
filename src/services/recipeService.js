// Key for localStorage
const STORAGE_KEY = 'savedCocktails';

// Helper function to load data from localStorage
const loadRecipes = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Helper function to save data to localStorage
const saveToLocalStorage = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Save recipe
const saveRecipe = async (recipe) => {
  try {
    const savedCocktails = loadRecipes();
    const newRecipe = { ...recipe, id: Date.now() };
    savedCocktails.push(newRecipe);
    saveToLocalStorage(savedCocktails); // Save to localStorage
    console.log("Recipe saved successfully!", newRecipe);
    return newRecipe;
  } catch (error) {
    console.error("Error saving recipe:", error);
    throw error;
  }
};

// Get all recipes
const getAllRecipes = async () => {
  try {
    return loadRecipes(); // Load from localStorage
  } catch (error) {
    console.error("Error retrieving recipes:", error);
    return [];
  }
};

// Delete recipe
const deleteRecipe = async (id) => {
  try {
    const savedCocktails = loadRecipes();
    const index = savedCocktails.findIndex(recipe => recipe.id === id);
    if (index === -1) throw new Error('Recipe not found');
    
    const deletedRecipe = savedCocktails.splice(index, 1); // Remove the recipe
    saveToLocalStorage(savedCocktails); // Update localStorage
    console.log("Recipe deleted successfully!", deletedRecipe);
    return deletedRecipe;
  } catch (error) {
    console.error("Error deleting recipe:", error);
    throw error;
  }
};

// Update recipe
const updateRecipe = async (id, recipeData) => {
  try {
    const savedCocktails = loadRecipes();
    const index = savedCocktails.findIndex(recipe => recipe.id === id);
    if (index === -1) throw new Error('Recipe not found');

    savedCocktails[index] = { ...savedCocktails[index], ...recipeData };
    saveToLocalStorage(savedCocktails); // Save updated list to localStorage
    console.log("Recipe updated successfully!", savedCocktails[index]);
    return savedCocktails[index];
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error;
  }
};

export default { saveRecipe, getAllRecipes, deleteRecipe, updateRecipe };
