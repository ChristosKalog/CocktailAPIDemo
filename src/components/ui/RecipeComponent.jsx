import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Recipecomponent.module.css";

const RecipeComponent = ({ cocktail }) => {
  const truncateDescription = (description, maxLength = 80) => {
    if (!description) return ""; 
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  };

  const complexityLevel = cocktail.complexityLevel[0].toUpperCase() + cocktail.complexityLevel.slice(1)
  return (
    <Link
      key={cocktail.id}
      to={`/recipes/${cocktail.id}`}
      className={styles.recipeLink}
    >
      <div className={styles.recipeCard}>
        <div className={styles.imageContainer}>
          <img
            src={require(`../../assets/images/${cocktail.smallPicture}`)}
            alt=""
          />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.headerInfo}>
            <p>{cocktail.cocktailStyle}</p>
            <p>|</p>
            <p>{complexityLevel}</p>
          </div>
          <h2>{cocktail.name}</h2>
          <div className={styles.moreInfo}>
            <p>{truncateDescription(cocktail.description)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeComponent;
