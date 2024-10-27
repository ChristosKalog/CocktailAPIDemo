import React from "react";
import styles from "../../styles/CocktailComponent.module.css";

const CocktailComponent = ({ cocktail }) => {
  return (
    <div className={styles.CocktailComponent} key={cocktail.id}>
      <div className={styles.cocktailInfo}>
        <h1>{cocktail.name}</h1>
        <p>€{cocktail.price}</p>
      </div>
      <div className={styles.cocktailDescription}>
        <p>{cocktail.description}</p>
      </div>
    </div>
  );
};

export default CocktailComponent;
