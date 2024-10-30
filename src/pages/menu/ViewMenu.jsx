import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { handleDownloadPDF } from "./download";
import styles from '../../styles/ViewMenu.module.css';
import menuService from "../../services/menuService";
import cocktailsData from "../../data/db.json";
import ButtonComponent from "../../components/ui/ButtonComponent";
import CocktailComponent from "../../components/ui/CocktailComponent";
import DeleteConfirmation from "../../components/ui/DeleteConfirmationComponent"; 

const ViewMenu = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);
  const [cocktailDetails, setCocktailDetails] = useState([]); 
  const [showConfirmation, setShowConfirmation] = useState(false); 
  const [deletedMessage, setDeletedMessage] = useState(false); 

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const retrievedMenus = await menuService.fetchMenus();
        const foundMenu = retrievedMenus.find((menu) => menu.id === id);
        if (foundMenu) {
          setMenu(foundMenu);
          const selectedCocktails = foundMenu.cocktailIds
            .map((cocktailId) =>
              cocktailsData.savedCocktails.find(
                (cocktail) => cocktail.id === cocktailId
              )
            )
            .filter(Boolean); 
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
    setShowConfirmation(true); 
  };

  const confirmDelete = async () => {
    try {
      await menuService.deleteMenu(id); 
      setDeletedMessage(true); 
      setShowConfirmation(false); 
      navigate("/", { state: { status: "Menu was deleted" } });
      setTimeout(() => {
        setDeletedMessage(false);
      }, 2000); 
    } catch (error) {
      console.error("Error deleting menu:", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const editHandle = async () => {
    navigate(`/menu/edit-menu/${id}`); 
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.menuTitle}>
        <h3>the</h3>
        <h1>{menu.title}</h1>
        <h3>menu</h3>
      </div>
      <div className={styles.viewMenu}>
        {cocktailDetails.map((cocktail) => (
          <CocktailComponent key={cocktail.id} cocktail={cocktail} />
        ))}
      </div>

      <div className={styles.buttonContainer}>
        <ButtonComponent
          onClick={() => handleDownloadPDF(menu, cocktailDetails)} 
          category="download"
        >
          PDF
        </ButtonComponent>
        <ButtonComponent onClick={deleteHandle} category="delete">
          Delete
        </ButtonComponent>
        <ButtonComponent onClick={editHandle} category="edit">
          Edit
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
