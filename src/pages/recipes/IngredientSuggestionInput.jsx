import React from "react";
import styles from "../../styles/AddRecipe.module.css";

const IngredientSuggestionInput = ({ suggestions, value, handleChange, placeholder }) => (
  <div className={styles.formGroup}>
    <input
      className={styles.textarea}
      type="text"
      list="ingredient-suggestions"
      name="name"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      required
    />
    <datalist id="ingredient-suggestions">
      {suggestions.map((suggestion, index) => (
        <option key={index} value={suggestion} />
      ))}
    </datalist>
  </div>
);

export default IngredientSuggestionInput;
