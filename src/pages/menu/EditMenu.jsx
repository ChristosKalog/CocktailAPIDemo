import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import cocktailsData from "../../data/db.json";
import menuService from "../../services/menuService";
import styles from "../../styles/CreateMenu.module.css";
import ButtonComponent from "../../components/ui/ButtonComponent";

const EditMenu = () => {
  const [title, setTitle] = useState("");
  const [selectedCocktails, setSelectedCocktails] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const menu = cocktailsData.savedMenus.find((menu) => menu.id === id);

  const resetSelection = () => {
    setSelectedCocktails([]);
  };

  // Load the menu data into state for editing
  useEffect(() => {
    if (menu) {
      setTitle(menu.title);
      setSelectedCocktails(menu.cocktailIds || []);
    }
  }, [menu]);

  const handleCocktailSelect = (cocktailId) => {
    setSelectedCocktails((prevSelected) =>
      prevSelected.includes(cocktailId)
        ? prevSelected.filter((id) => id !== cocktailId)
        : [...prevSelected, cocktailId]
    );
  };

  const handleSaveMenu = async () => {
    if (title.trim() === "" || selectedCocktails.length < 3) {
      alert("Please enter a title and select at least 3 cocktails.");
      return;
    }

    const newMenu = {
      id,
      title,
      cocktailIds: selectedCocktails,
      dateCreated: new Date().toISOString(),
    };

    try {
      const savedMenu = await menuService.updateMenu(newMenu, id); 
    } catch (error) {
      console.error("Error saving menu:", error);
      alert("There was an error saving your menu. Please try again.");
    }
    navigate("/", { state: { status: "Menu was updated" } });
  };

  return (
    <div className={styles.createMenu}>
      <h1>Edit Menu</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Menu Title"
        required
        className={styles.inputField}
      />

      <div className={styles.mobileWrapper}>
        <div className={styles.cocktailSelection}>
          {cocktailsData.savedCocktails.map((cocktail) => (
            <label
              key={cocktail.id}
              className={`${styles.cocktailLabel} ${
                selectedCocktails.includes(cocktail.id)
                  ? styles.selectedCocktail
                  : ""
              }`}
              onClick={() => handleCocktailSelect(cocktail.id)}
            >
              <input
                type="checkbox"
                value={cocktail.id}
                checked={selectedCocktails.includes(cocktail.id)}
                onChange={() => handleCocktailSelect(cocktail.id)}
                className={styles.cocktailCheckbox}
              />
              <div className={styles.cocktailInfo}>
                <span>{cocktail.name}</span>
                <span>${cocktail.price}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
      <h3>Selected Cocktails ({selectedCocktails.length})</h3>
      <>
        <ButtonComponent onClick={resetSelection} category="reset">
          Reset Menu
        </ButtonComponent>
        <ButtonComponent onClick={handleSaveMenu} category="save">
          Save Menu
        </ButtonComponent>
      </>
    </div>
  );
};

export default EditMenu;
