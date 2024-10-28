import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import mockCocktails from "../../data/mockCocktails.js";
import ButtonComponent from "../../components/ui/ButtonComponent";
import RecipeComponent from "../../components/ui/RecipeComponent";
import styles from "../../styles/recipelist.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlphaAsc, faSortAlphaDesc } from "@fortawesome/free-solid-svg-icons";

// Key for localStorage cocktails
const COCKTAIL_STORAGE_KEY = 'savedCocktails';

// Load cocktails from localStorage
const loadLocalStorageCocktails = () => {
  const data = localStorage.getItem(COCKTAIL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const RecipeList = () => {
  const [filter, setFilter] = useState("");
  const [complexity, setComplexity] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    // Load cocktails from mock data and localStorage
    const localCocktails = loadLocalStorageCocktails();
    setCocktails([...mockCocktails, ...localCocktails]);
  }, []);

  const clearFilters = () => {
    setFilter("");
    setComplexity("");
    setIngredient("");
    setSearchTerm("");
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Filter cocktails by style, complexity, ingredient, and search term
  const filteredCocktails = cocktails
    .filter((cocktail) => {
      const matchesStyle = filter ? cocktail.cocktailStyle === filter : true;
      const matchesComplexity = complexity
        ? cocktail.complexityLevel === complexity
        : true;
      const matchesIngredient = ingredient
        ? cocktail.ingredients.some((ing) =>
            ing.toLowerCase().includes(ingredient.toLowerCase())
          )
        : true;

      const matchesSearchTerm = searchTerm
        ? cocktail.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cocktail.ingredients.some((ing) =>
            ing.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          cocktail.cocktailStyle
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          cocktail.description?.toLowerCase().includes(searchTerm.toLowerCase()) // Optional description
        : true;

      return (
        matchesStyle &&
        matchesComplexity &&
        matchesIngredient &&
        matchesSearchTerm
      );
    })
    .sort((a, b) => {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

  const stylesOptions = [
    ...new Set(cocktails.map((cocktail) => cocktail.cocktailStyle)),
  ];
  const complexityOptions = [
    ...new Set(cocktails.map((cocktail) => cocktail.complexityLevel)),
  ];

  const ingredientOptions = [
    ...new Set(
      cocktails.flatMap((cocktail) =>
        cocktail.ingredients.map((ing) => String(ing)) // Ensure each ingredient is a string
      )
    ),
  ].sort((a, b) => a.localeCompare(b)); 
  

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
        {filteredCocktails.map((cocktail) => (
          <RecipeComponent key={cocktail.id} cocktail={cocktail} />
        ))}
      </div>

      <div className={styles.buttonContainer}>
        <ButtonComponent category="add">
          <Link to="/recipe/Add">add more</Link>
        </ButtonComponent>
      </div>
    </div>
  );
};

export default RecipeList;
