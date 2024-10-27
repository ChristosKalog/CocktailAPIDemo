import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { handleDownloadPDF } from "./download";
import styles from "../../styles/ViewMenu.module.css";
import menuService from "../../services/menuService";
import cocktailsData from "../../data/db.json";
import ButtonComponent from "../../components/ui/ButtonComponent";
import CocktailComponent from "../../components/ui/CocktailComponent";
import DeleteConfirmation from "../../components/ui/DeleteConfirmationComponent"; // Import the confirmation dialog

const ViewMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // For navigation after deletion
  const [menu, setMenu] = useState(null);
  const [cocktailDetails, setCocktailDetails] = useState([]); // Store the actual cocktail details
  const [showConfirmation, setShowConfirmation] = useState(false); // State to manage confirmation dialog
  const [deletedMessage, setDeletedMessage] = useState(false); // State for deletion message

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const retrievedMenus = await menuService.fetchMenus();
        const foundMenu = retrievedMenus.find((menu) => menu.id === id);
        if (foundMenu) {
          setMenu(foundMenu);
          const selectedCocktails = foundMenu.cocktailIds.map((cocktailId) =>
            cocktailsData.savedCocktails.find(
              (cocktail) => cocktail.id === cocktailId
            )
          );
          setCocktailDetails(selectedCocktails);
        }
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenu();
  }, [id]);

  if (!menu) {
    return <p>Menu not found</p>;
  }

  const deleteHandle = () => {
    setShowConfirmation(true); // Show confirmation dialog
  };

  const confirmDelete = async () => {
    try {
      await menuService.deleteMenu(id); // Call deleteMenu function
      setDeletedMessage(true); // Show deletion message
      setShowConfirmation(false); // Close confirmation dialog
      navigate("/"); // Redirect to menus list after deletion
      setTimeout(() => {
        setDeletedMessage(false);
      }, 2000); // Remove message after 2 seconds
    } catch (error) {
      console.error("Error deleting menu:", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false); // Close confirmation dialog without deletion
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.menuTitle}>
        <h3>The</h3>
        <h1>{menu.title}</h1>
        <h3>Menu</h3>
      </div>
      <div className={styles.viewMenu}>
        {cocktailDetails.map((cocktail) => (
          <CocktailComponent key={cocktail.id} cocktail={cocktail} />
        ))}
      </div>

      <div className={styles.buttonContainer}>
        <ButtonComponent
          onClick={() => handleDownloadPDF(menu, cocktailDetails)} // Pass menu and cocktailDetails here
          category="download"
        >
          PDF
        </ButtonComponent>
        <ButtonComponent onClick={deleteHandle} category="delete">
          Delete Menu
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

      {deletedMessage && (
        <div className={styles.deletedMessage}>
          <p>Menu deleted successfully!</p>
        </div>
      )}
    </div>
  );
};

export default ViewMenu;
