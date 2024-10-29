import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profilePic from "../../assets/images/profile.jpg";
import barPic from "../../assets/images/bar.png";
import styles from "../../styles/Profile.module.css";
import { useAuth } from "../../context/AuthContext"; 
import mockCocktails from "../../data/mockCocktails"; 
import mockUsers from "../../data/mockUsers"; 
import DeleteConfirmation from "../../components/ui/DeleteConfirmationComponent"; 
import ButtonComponent from "../../components/ui/ButtonComponent"; 

const ProfilePage = () => {
  const [cocktailsArray, setCocktailsArray] = useState([]);
  const { user } = useAuth(); 
  const [showEmpty, setShowEmpty] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDeletedMessage, setShowDeletedMessage] = useState(false);

  const handleDeleteClick = () => {
    if (localStorage.length === 0) {
      setShowEmpty(true);
      setTimeout(() => {
        setShowEmpty(false);
      }, 2000);
    } else {
      setShowConfirmation(true);
    }
  };

  const confirmDelete = () => {
    localStorage.clear();
    setShowConfirmation(false);
    setShowDeletedMessage(true);
    setTimeout(() => {
      setShowDeletedMessage(false);
    }, 2000);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  useEffect(() => {
    const favCocktails = () => {
      const favoriteCocktails = [];
      const foundUser = mockUsers.find(
        (mockUser) => mockUser.fullName === user.fullName
      );

      if (foundUser) {
        foundUser.favorites.forEach((favorite) => {
          const matchingCocktail = mockCocktails.find(
            (mockCocktail) => mockCocktail.id === favorite
          );

          if (matchingCocktail) {
            favoriteCocktails.push({
              id: matchingCocktail.id,
              name: matchingCocktail.name,
            });
          }
        });
      }

      setCocktailsArray(
        favoriteCocktails.sort((a, b) => {
          return a.name.localeCompare(b.name); // Compare names
        })
      );
    };

    favCocktails();
  }, [user]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.bigSection}>
        <div className={styles.section}>
          <h1>{user.fullName}</h1>
          <div className={styles.imageContainer}>
            <img className={styles.image} src={profilePic} alt="Profile" />
          </div>
          <h2>{user.role}</h2>
          <h3>{user.menusCreated} menus created</h3>
          <h3>Last logged in: {user.lastLogin}</h3>
        </div>
        <div className={styles.section}>
          <h1>{user.bar}</h1>
          <div className={styles.imageContainer}>
            <img className={styles.image} src={barPic} alt="Bar" />
          </div>
          <h2>{user.barAddress}</h2>
          <h3
            onClick={() => window.open(user.fbPage)}
            className={styles.linkButton}
          >
            FB page
          </h3>
          <h3
            onClick={() => window.open(user.instaPage)}
            className={styles.linkButton}
          >
            Insta page
          </h3>
        </div>
      </div>
      <div className={styles.bigSection}>
        <div className={styles.section}>
          <h1>Personal Favorites</h1>
          <div className={styles.favoriteCocktails}>
            {cocktailsArray.map((item) => (
              <Link
                key={item.id}
                to={`/recipes/${item.id}`}
                className={styles.recipeLink}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h1>Actions</h1>
          <div className={styles.buttonContainer}>
            <ButtonComponent category="delete" icon="faTrash" onClick={handleDeleteClick}>
              Delete Menus
            </ButtonComponent>
            {showConfirmation && (
              <DeleteConfirmation
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
              />
            )}
            {/* Conditional rendering for the "Menus deleted" message */}
            {showDeletedMessage && (
              <div className={styles.deletedMessage}>
                <p>Menus deleted</p>
              </div>
            )}
            {showEmpty && (
              <div className={styles.deletedMessage}>
                <p>You do not have any menus!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
