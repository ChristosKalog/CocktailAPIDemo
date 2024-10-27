import axios from "axios";

const API_URL = "http://192.168.77.124:5001/savedCocktails";

const saveRecipe = async (recipe) => {
  try {
    const response = await axios.post(API_URL, recipe);
    console.log("Recipe saved successfully!", response.data);
    return response.data; // You can return the saved recipe or an ID for further actions
  } catch (error) {
    console.error("Error saving recipe:", error);
    throw error; // Handle the error accordingly in your component
  }
};

const getAllRecipes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error retrieving recipes:", error);
    return [];
  }
};

const deleteRecipe = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log("Recipe deleted successfully!", response.data);
    return response.data; // You can return any useful information after deletion
  } catch (error) {
    console.error("Error deleting recipe:", error);
    throw error; // Handle the error accordingly in your component
  }
};

const updateRecipe = async (id, recipeData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update recipe: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error; // re-throw the error after logging it
  }
};

export default { saveRecipe, getAllRecipes, deleteRecipe, updateRecipe };
