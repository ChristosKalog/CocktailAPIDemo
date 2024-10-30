import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import recipeService from "../../services/recipeService";
import ButtonComponent from "../../components/ui/ButtonComponent";
import RecipeComponent from "../../components/ui/RecipeComponent";
import styles from "../../styles/thisfileplease.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaAsc,
  faSortAlphaDesc,
} from "@fortawesome/free-solid-svg-icons";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState("");
  const [complexity, setComplexity] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const clearFilters = () => {
    setFilter("");
    setComplexity("");
    setIngredient("");
    setSearchTerm(""); // Clear search bar as well
  };

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const retrievedRecipes = recipeService.getAllRecipes();
        setRecipes(retrievedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchCocktails();
  }, []);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const filteredRecipes = recipes
    .filter((cocktail) => {
      const matchesStyle = filter ? cocktail.style === filter : true;
      const matchesComplexity = complexity
        ? cocktail.complexityLevel === complexity
        : true;
      const matchesIngredient = ingredient
        ? cocktail.ingredients.some((ing) =>
            ing.name.toLowerCase().includes(ingredient.toLowerCase())
          )
        : true;

      const matchesSearchTerm = searchTerm
        ? cocktail.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cocktail.ingredients.some((ing) =>
            ing.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          cocktail.style.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cocktail.description?.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      return (
        matchesStyle &&
        matchesComplexity &&
        matchesIngredient &&
        matchesSearchTerm
      );
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  const stylesOptions = [...new Set(recipes.map((cocktail) => cocktail.style))];
  const complexityOptions = [
    ...new Set(recipes.map((cocktail) => cocktail.complexityLevel)),
  ];

  const ingredientOptions = [
    ...new Set(
      recipes.flatMap((cocktail) => cocktail.ingredients.map((ing) => ing.name))
    ),
  ].sort((a, b) => a.localeCompare(b)); // Sort alphabetically

  return (
    <div className={styles.recipeList}>
      <h1>Cocktail Recipes</h1>
      <div className={styles.filtersContainer}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search for recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.inputField}
          />
        </div>
        <div className={styles.mobileWrap}>
          <select
            aria-label="Filter by Style"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="header" disabled>
              Style
            </option>
            <option value="">All Styles</option>
            {stylesOptions.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by Complexity"
            onChange={(e) => setComplexity(e.target.value)}
            value={complexity}
          >
            <option value="header" disabled>
              Complexity
            </option>

            <option value="">All</option>
            {complexityOptions.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by Ingredient"
            onChange={(e) => setIngredient(e.target.value)}
            value={ingredient}
          >
            <option value="header" disabled>
              Ingredient
            </option>

            <option value="">All ingredients</option>
            {ingredientOptions.map((ing) => (
              <option key={ing} value={ing}>
                {ing}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.mobileWrap2}>
          <button onClick={toggleSortOrder} className={styles.sortButton}>
            <FontAwesomeIcon
              icon={sortOrder === "asc" ? faSortAlphaAsc : faSortAlphaDesc}
            />
          </button>
          <button className={styles.sortButton} onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>

      <div className={styles.recipeGrid}>
        {filteredRecipes.map((cocktail) => (
          <RecipeComponent key={cocktail.id} cocktail={cocktail} />
        ))}
      </div>

      <div className={styles.buttonContainer}>
        <ButtonComponent category="add">
          <Link to="/recipe/Add">Add Recipe</Link>
        </ButtonComponent>
      </div>
    </div>
  );
};

export default RecipeList;
