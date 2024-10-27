import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import cocktailsData from "../../data/db.json"; // import the cocktails data
import recipeService from "../../services/recipeService";
import styles from "../../styles/EditRecipe.module.css"; // Import CSS module
import rangeStyles from "../../styles/Range.module.css"; // Import CSS module
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome
import { faClose, faAdd } from "@fortawesome/free-solid-svg-icons"; // Import icons

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const cocktail = cocktailsData.savedCocktails.find(cocktail => cocktail.id === id);
  
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    recipe: "",
    cocktailStyle: "",
    complexityLevel: "",
    ingredients: [{ name: "", quantity: "", id: Date.now() }], // Temporary for adding new ingredients
    alcoholValue: 0,
    price: "",
    smallPicture: "" // Added for smallPicture
  });

  // Load the cocktail data into state for editing
  useEffect(() => {
    if (cocktail) {
      setRecipe({
        name: cocktail.name,
        description: cocktail.description,
        recipe: cocktail.recipe,
        cocktailStyle: cocktail.cocktailStyle,
        complexityLevel: cocktail.complexityLevel,
        ingredients: cocktail.ingredients, // Keep existing IDs
        alcoholValue: cocktail.alcoholValue,
        price: cocktail.price,
        smallPicture: cocktail.smallPicture // Added for smallPicture
      });
    }
  }, [cocktail]);

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
    const newId = Date.now(); // Temporary ID for new ingredient
    setRecipe({
      ...recipe,
      ingredients: [
        ...recipe.ingredients,
        { name: "", quantity: "", id: newId },
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
      // Update the recipe with the updated data
      await recipeService.updateRecipe(id, { ...recipe }); // Pass the updated recipe
      navigate(`/recipes/${id}`); // Redirect to the recipe detail page after saving
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Edit Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            className={styles.textarea}
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            placeholder="Recipe Name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <textarea
            className={styles.recipeArea}
            name="description"
            value={recipe.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <select
            name="cocktailStyle"
            value={recipe.cocktailStyle}
            onChange={handleChange}
            required
            className={styles.selectInput}
          >
            <option value="" disabled>
              Cocktail Style
            </option>
            <option value="Classic">Classic</option>
            <option value="Modern">Modern</option>
            <option value="Tropical">Tropical</option>
            <option value="Tiki">Tiki</option>
            <option value="Sour">Sour</option>
            <option value="Highballs">Highballs</option>
          </select>
          <select
            name="complexityLevel"
            value={recipe.complexityLevel}
            onChange={handleChange}
            required
            className={styles.selectInput}
          >
            <option value="" disabled>
              Complexity
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
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
          <div className={styles.formGroup} key={ingredient.id}>
            <div className={styles.ingredients}>
              <input
                className={styles.ingredient}
                type="text"
                name="name"
                value={ingredient.name}
                onChange={(e) => handleChange(e, index)}
                placeholder="Ingredient"
                required
              />
              <input
                className={styles.ingredient}
                type="number"
                name="quantity"
                step="1"
                min="1"
                max="1500"
                value={ingredient.quantity}
                onChange={(e) => handleChange(e, index)}
                placeholder="Quantity (ml)"
              />
              {index > 0 && (
                <div
                  onClick={() => handleRemove(index)}
                  className={styles.removeIngredient}
                >
                  <FontAwesomeIcon icon={faClose} />
                </div>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddIngredient}
          className={styles.addMoreButton}
        >
          <FontAwesomeIcon icon={faAdd} />
          Add More
        </button>
        <div className={styles.formGroup}>
          <label htmlFor="price">Recipe Price</label>
          <input
            className={styles.recipePrice}
            type="number"
            name="price"
            min="1"
            value={recipe.price}
            onChange={handleChange}
            placeholder="--"
            required
          />
          <span>EUR</span> {/* Added span for currency display */}
        </div>
        <div className={styles.formGroup}>
          <textarea
            className={styles.recipeArea}
            name="recipe"
            value={recipe.recipe}
            onChange={handleChange}
            placeholder="Recipe Instructions"
            required
          />
        </div>
        <button className={styles.submitButton} type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
