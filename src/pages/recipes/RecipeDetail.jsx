import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import mockCocktails from "../../data/mockCocktails.js";
import styles from "../../styles/recipedetail.module.css";

import GoBackButton from "../../components/ui/GoBackButton";
import placeholder1 from "../../assets/images/placeholder1.png";
import placeholder2 from "../../assets/images/placeholder2.png";
import placeholder3 from "../../assets/images/placeholder3.png";
import placeholder4 from "../../assets/images/placeholder4.png";
import placeholder5 from "../../assets/images/placeholder5.png";

const RecipeDetail = () => {
  const { id } = useParams();

  const COCKTAIL_STORAGE_KEY = "savedCocktails";
  const [cocktails, setCocktails] = useState([]);

  const loadLocalStorageCocktails = () => {
    const data = localStorage.getItem(COCKTAIL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  };

  useEffect(() => {
    // Load cocktails from mock data and localStorage
    const localCocktails = loadLocalStorageCocktails();
    setCocktails([...mockCocktails, ...localCocktails]);
  }, []);

  const cocktail = cocktails.find((cocktail) => cocktail.id === id);
  console.log(cocktail )


  const images = [
    { id: 1, src: placeholder1, alt: "Pic 1" },
    { id: 2, src: placeholder2, alt: "Pic 2" },
    { id: 3, src: placeholder3, alt: "Pic 3" },
    { id: 4, src: placeholder4, alt: "Pic 4" },
    { id: 5, src: placeholder5, alt: "Pic 5" },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const mainImage = images[currentImageIndex].src;

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStart - touchEndX > 50) nextImage();
    else if (touchStart - touchEndX < -50) previousImage();
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const getABVClass = (alcoholValue) => {
    if (alcoholValue <= 5) return styles["abv05"];
    if (alcoholValue <= 15) return styles["abv515"];
    if (alcoholValue <= 25) return styles["abv1525"];
    if (alcoholValue <= 40) return styles["abv2540"];
    return styles["abv40"];
  };

  if (!cocktail) {
    return <div className={styles.error}>Cocktail not found!!!</div>;
  }

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
              <img src={mainImage} className={styles.image} alt={cocktail.name} />
            </div>
            <div className={styles.carousel}>
              {images.map((image) => (
                <img
                  key={image.id}
                  src={image.src}
                  alt={image.alt}
                  className={`${styles.carouselImage} ${image.src === mainImage ? styles.carouselImageActive : ""}`}
                  onClick={() => setCurrentImageIndex(image.id - 1)}
                />
              ))}
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.mobileTitle}>
              <h1>{cocktail.name}</h1>
            </div>
            <div className={styles.info}>
              <div className={styles.complexicityContainer}>
                <h2>Complexity:</h2>
                <div className={styles.barContainer}>
                  <div className={`${styles.bar} ${["easy", "medium", "hard"].includes(cocktail.complexityLevel.toLowerCase()) ? styles.barActive : ""}`}></div>
                  <div className={`${styles.bar} ${["medium", "hard"].includes(cocktail.complexityLevel.toLowerCase()) ? styles.barActive : ""}`}></div>
                  <div className={`${styles.bar} ${cocktail.complexityLevel.toLowerCase() === "hard" ? styles.barActive : ""}`}></div>
                </div>
              </div>
              <div className={styles.startInfo}>
                <h2>Style: {cocktail.style}</h2>
              </div>
              <div className={styles.startInfo}>
                <h2>
                  ABV: <span className={`${styles.abv} ${getABVClass(cocktail.alcoholValue)}`}>{cocktail.alcoholValue}%</span>
                </h2>
              </div>
            </div>
            <h4>Ingredients:</h4>
            <div className={styles.ingredientsContainer}>
              {cocktail.ingredients.map((ingredient, index) => (
                <div className={styles.ingredient} key={index}>
                  {ingredient.name} {ingredient.quantity}ml
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
          </div>
        </div>
        <div className={styles.goBackContainer}>
          <Link to="/recipes">
            <GoBackButton category="back"> Go Back</GoBackButton>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
