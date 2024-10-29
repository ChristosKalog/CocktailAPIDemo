import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import cocktailsData from "../../data/db.json";
import styles from "../../styles/RecipeDetail.module.css";
import recipeService from "../../services/recipeService";
import menuService from "../../services/menuService";

import DeleteConfirmation from "../../components/ui/DeleteConfirmationComponent";
import ButtonComponent from "../../components/ui/ButtonComponent";
import GoBackButton from "../../components/ui/GoBackButton";

import placeholder1 from "../../assets/images/placeholder1.png";
import placeholder2 from "../../assets/images/placeholder2.png";
import placeholder3 from "../../assets/images/placeholder3.png";
import placeholder4 from "../../assets/images/placeholder4.png";
import placeholder5 from "../../assets/images/placeholder5.png";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const cocktail = cocktailsData.savedCocktails.find(
    (cocktail) => cocktail.id === id
  );

  const images = [
    { id: 1, src: placeholder1, alt: "Pic 1" },
    { id: 2, src: placeholder2, alt: "Pic 2" },
    { id: 3, src: placeholder3, alt: "Pic 3" },
    { id: 4, src: placeholder4, alt: "Pic 4" },
    { id: 5, src: placeholder5, alt: "Pic 5" },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false); // State to manage confirmation dialog
  const [deletedMessage, setDeletedMessage] = useState(false); // State for deletion message

  const mainImage = images[currentImageIndex].src; // Set the main image based on index

  const handleTouchStart = (e) => {
    const touchStartX = e.touches[0].clientX;
    setTouchStart(touchStartX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;

    if (touchStart - touchEndX > 50) {
      nextImage();
    } else if (touchStart - touchEndX < -50) {
      previousImage();
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const getABVClass = (alcoholValue) => {
    if (alcoholValue < 0) return styles["abv0"];
    if (alcoholValue <= 5) return styles["abv05"];
    if (alcoholValue <= 15) return styles["abv515"];
    if (alcoholValue <= 25) return styles["abv1525"];
    if (alcoholValue <= 40) return styles["abv2540"];
    if (alcoholValue > 41) return styles["abv40"];
    return styles["abv-40"]; // For 40% and above
  };

  if (!cocktail) {
    return <div className={styles.error}>Cocktail not found!</div>;
  }

  const deleteHandle = async () => {
    setShowConfirmation(true); // Show confirmation dialog
  };

  const editHandle = async () => {
    navigate(`/edit-recipe/${id}`); // Navigate to the EditRecipe component
  };

  const confirmDelete = async () => {
    try {
      // Fetch all menus to find where this cocktail ID is used
      const menus = await menuService.fetchMenus();
      const updatedMenus = menus.map((menu) => {
        if (menu.cocktailIds.includes(id)) {
          // Filter out the current cocktail ID
          return {
            ...menu,
            cocktailIds: menu.cocktailIds.filter(
              (cocktailId) => cocktailId !== id
            ),
          };
        }
        return menu;
      });

      // Update menus in the database where changes were made
      for (const menu of updatedMenus) {
        if (
          menu.cocktailIds.length !==
          menus.find((m) => m.id === menu.id).cocktailIds.length
        ) {
          await menuService.updateMenu(menu, menu.id);
          
        }
      }

      // Delete the cocktail from the recipe service
      await recipeService.deleteRecipe(id);

      // Show deletion message, hide confirmation, and navigate back
      setDeletedMessage(true);
      setShowConfirmation(false);
      navigate("/recipes");
      setTimeout(() => {
        setDeletedMessage(false);
      }, 2000);
    } catch (error) {
      console.error("Error deleting cocktail or updating menus:", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false); // Close confirmation dialog without deletion
  };

  return (
    <>
      <div className={styles.recipeDetailWrapper}>
        <div className={styles.recipeDetail}>
          <div className={styles.leftContainer}>
            <div
              className={styles.imageContainer}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={mainImage}
                className={styles.image}
                alt={cocktail.name}
              />
            </div>
            <div className={styles.carousel}>
              {images.map((image) => (
                <img
                  key={image.id}
                  src={image.src}
                  alt={image.alt}
                  className={`${styles.carouselImage} ${
                    image.src === mainImage ? styles.carouselImageActive : ""
                  }`}
                  onClick={() => setCurrentImageIndex(image.id - 1)} // Change image on click
                />
              ))}
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.mobileTitle}>
              <h1>{cocktail.name}</h1>
            </div>
            <div className={styles.info}>
              <div className={styles.infoContainer}>
                <h2>Complexity:</h2>
                <div className={styles.barContainer}>
                  <div
                    className={`${styles.bar} ${
                      ["easy", "medium", "hard"].includes(
                        cocktail.complexityLevel.toLowerCase()
                      )
                        ? styles.barActive
                        : ""
                    }`}
                  ></div>
                  <div
                    className={`${styles.bar} ${
                      ["medium", "hard"].includes(
                        cocktail.complexityLevel.toLowerCase()
                      )
                        ? styles.barActive
                        : ""
                    }`}
                  ></div>
                  <div
                    className={`${styles.bar} ${
                      cocktail.complexityLevel.toLowerCase() === "hard"
                        ? styles.barActive
                        : ""
                    }`}
                  ></div>
                </div>
              </div>
              <div className={styles.infoContainer}>
                <h2>Style:</h2>
                <p>{cocktail.cocktailStyle}</p>
              </div>
              <div className={styles.infoContainer}>
                <h2>ABV: </h2>
                <p>
                  <span
                    className={`${styles.abv} ${getABVClass(
                      cocktail.alcoholValue
                    )}`}
                  >
                    {cocktail.alcoholValue}%
                  </span>
                </p>
              </div>
            </div>
            <h4>Ingredients:</h4>
            <div className={styles.ingredientsContainer}>
              {cocktail.ingredients.map((ingredient, index) => (
                <div className={styles.ingredient} key={index}>
                  {ingredient.name} {ingredient.quantity}
                  {ingredient.quantity && "ml"}
                </div>
              ))}
            </div>
            <h4>Recipe:</h4>
            <div className={styles.recipeContainer}>
              <p>{cocktail.recipe}</p>
            </div>
            <h5>Made At:</h5>
            <div className={styles.recipeContainer}>
              <p>{cocktail.date}</p>
            </div>
            <div className={styles.bigContainer}>
              <div className={styles.buttonsContainer}>
                <ButtonComponent onClick={editHandle} category="edit">
                  Edit
                </ButtonComponent>
                <ButtonComponent onClick={deleteHandle} category="delete">
                  Delete
                </ButtonComponent>
              </div>
              <div className={styles.confirmationContainer}>
                {showConfirmation && (
                  <DeleteConfirmation
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.goBackContainer}>
          <Link to="/recipes">
            <GoBackButton> Go Back</GoBackButton>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
