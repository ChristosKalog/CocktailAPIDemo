import React, { useState } from "react";
import styles from "../../styles/AddRecipe.module.css";
import rangeStyles from "../../styles/Range.module.css";
import recipeService from "../../services/recipeService";
import ButtonComponent from "../../components/ui/ButtonComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faAdd } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    id: Date.now().toString(),
    name: "",
    description: "This is description",
    date: "",
    cocktailStyle: "",
    complexityLevel: "",
    glassType: "",
    recipe: "",
    alcoholValue: 0,
    price: "",
    ingredients: [{ name: "", quantity: "", id: Date.now() }],
    smallPicture: "placeholder_small.png",
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const ingredientSuggestions = [
    "Absinthe",
    "Amaretto",
    "Angostura Bitters",
    "Aperol",
    "Aquavit",
    "Bénédictine",
    "Brandy",
    "Campari",
    "Cachaça",
    "Chartreuse",
    "Cider",
    "Cognac",
    "Creme de Cacao",
    "Creme de Cassis",
    "Curaçao",
    "Dry Vermouth",
    "Falernum",
    "Galliano",
    "Gin",
    "Grand Marnier",
    "Grenadine",
    "Irish Whiskey",
    "Kahlúa",
    "Limoncello",
    "Mezcal",
    "Orange Bitters",
    "Pimm's",
    "Port",
    "Rye Whiskey",
    "Rum",
    "Sake",
    "Scotch",
    "Sherry",
    "Simple Syrup",
    "Sloe Gin",
    "St-Germain",
    "Sweet Vermouth",
    "Tequila",
    "Triple Sec",
    "Vodka",
    "Whiskey",
  ];

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    if (index !== undefined) {
      const newIngredients = [...recipe.ingredients];
      if (name === "name") {
        newIngredients[index][name] = capitalizeFirstLetter(value);
      } else {
        newIngredients[index][name] = value;
      }
      setRecipe({ ...recipe, ingredients: newIngredients });
    } else {
      if (name === "name") {
        setRecipe({ ...recipe, [name]: capitalizeFirstLetter(value) });
      } else {
        setRecipe({ ...recipe, [name]: value });
      }
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
      await recipeService.saveRecipe({ ...recipe, date: formattedDate });
      setRecipe({
        // Reset the form fields
        id: Date.now().toString(), // Reset ID for new recipe
        name: "",
        cocktailStyle: "",
        complexityLevel: "",
        glassType: "",
        ingredients: [{ name: "", quantity: "", id: Date.now() }],
        recipe: "",
        alcoholValue: 0,
        price: "",
        date: "",
        description: "",
        smallPicture: "placeholder_small.png", // Reset to placeholder
      });
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
    navigate("/whereto", { state: { key: recipe.id } });
  };

  return (
    <div className={styles.formContainer}>
      <h1>Add New Recipe</h1>
      <form onSubmit={handleSubmit}>
        {/* Recipe form inputs */}
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
          <select
            name="cocktailStyle"
            value={recipe.cocktailStyle}
            onChange={handleChange}
            required
            className={styles.selectInput}
          >
            <option value="" disabled>
              Style
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
          <select
            name="glassType"
            value={recipe.glassType}
            onChange={handleChange}
            required
            className={styles.selectInput}
          >
            <option value="" disabled>
              Glass Type
            </option>
            <option value="Martini">Martini</option>
            <option value="Highball">Highball</option>
            <option value="Old Fashioned">Old Fashioned</option>
            <option value="Coupe">Coupe</option>
            <option value="Wine Glass">Wine Glass</option>
            <option value="Shot Glass">Shot Glass</option>
            <option value="Collins">Collins</option>
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
                list="suggestions"
              />
              <datalist id="suggestions">
                {ingredientSuggestions.map((suggestion, idx) => (
                  <option key={idx} value={suggestion} />
                ))}
              </datalist>
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
          <p>Add More</p>
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
          <span>EUR</span>
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

        <ButtonComponent type="submit" category="save">
          Save Recipe
        </ButtonComponent>
      </form>
    </div>
  );
};

export default AddRecipe;
