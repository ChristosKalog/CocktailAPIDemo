import React, { useState } from "react";
import styles from "../../styles/AddRecipe.module.css";
import rangeStyles from "../../styles/Range.module.css";
import { saveRecipe } from "../../services/recipeService";
import ButtonComponent from "../../components/ui/ButtonComponent";
import IngredientInput from "./IngredientInput";
import FormInput from "./FormInput";
import IngredientSuggestionInput from "./IngredientSuggestionInput";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    cocktailStyle: "",
    complexityLevel: "",
    ingredients: [{ name: "", quantity: "", id: Date.now() }],
    recipe: "",
    alcoholValue: 0,
    price: "",
    date: "",
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const newIngredients = [...recipe.ingredients];
      newIngredients[index][name] = value;
      setRecipe({ ...recipe, ingredients: newIngredients });
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
  };

  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [
        ...recipe.ingredients,
        { name: "", quantity: "", id: Date.now() },
      ],
    });
  };

  const handleRemove = (index) => {
    const updatedIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDate = new Date();
      const formattedDate = `${String(currentDate.getHours()).padStart(
        2,
        "0"
      )}:${String(currentDate.getMinutes()).padStart(2, "0")} ${String(
        currentDate.getDate()
      ).padStart(2, "0")}/${String(currentDate.getMonth() + 1).padStart(
        2,
        "0"
      )}/${currentDate.getFullYear()}`;

      await saveRecipe({ ...recipe, date: formattedDate });

      setRecipe({
        name: "",
        cocktailStyle: "",
        complexityLevel: "",
        ingredients: [{ name: "", quantity: "" }],
        recipe: "",
        alcoholValue: 0,
        price: "",
        date: "",
      });
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  const ingredientSuggestions = [
    "Vodka",
    "Tequila",
    "Gin",
    "Rum",
    "Whiskey",
    "Bourbon",
    "Brandy",
    "Scotch",
    "Cognac",
    "Mezcal",
  ];

  return (
    <div className={styles.formContainer}>
      <h1>Add New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="name"
          value={recipe.name}
          handleChange={handleChange}
          placeholder="Recipe Name"
        />
        <FormInput
          type="select"
          name="cocktailStyle"
          value={recipe.cocktailStyle}
          handleChange={handleChange}
          options={["Classic", "Modern", "Tropical", "Tiki", "Sour", "Highballs"]}
          placeholder="Cocktail Style"
        />
        <FormInput
          type="select"
          name="complexityLevel"
          value={recipe.complexityLevel}
          handleChange={handleChange}
          options={["easy", "medium", "hard"]}
          placeholder="Complexity"
        />
        <div className={styles.formGroup}>
          <label htmlFor="alcoholValue">Alc/Vol:</label>
          <input
            type="range"
            name="alcoholValue"
            min="0"
            max="100"
            step="5"
            value={recipe.alcoholValue}
            onChange={handleChange}
            className={rangeStyles.rangeInput}
          />
          <p>{recipe.alcoholValue} %</p>
        </div>
        {recipe.ingredients.map((ingredient, index) => (
          <IngredientInput
            key={ingredient.id}
            ingredient={ingredient}
            index={index}
            handleChange={handleChange}
            handleRemove={handleRemove}
          />
        ))}
        <button
          type="button"
          onClick={handleAddIngredient}
          className={styles.addMoreButton}
        >
          Add More
        </button>
        <IngredientSuggestionInput
          suggestions={ingredientSuggestions}
          value={recipe.ingredients[0].name}
          handleChange={handleChange}
          placeholder="Search for ingredient..."
        />
        <FormInput
          type="number"
          name="price"
          value={recipe.price}
          handleChange={handleChange}
          placeholder="Recipe Price"
        />
        <textarea
          className={styles.recipeArea}
          name="recipe"
          value={recipe.recipe}
          onChange={handleChange}
          placeholder="Recipe Instructions"
          required
        />
        <ButtonComponent type="submit" category="save">
          Save Recipe
        </ButtonComponent>
      </form>
    </div>
  );
};

export default AddRecipe;
