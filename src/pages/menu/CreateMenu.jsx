import React, { useReducer } from "react";
import cocktailsData from "../../data/db.json";
import menuService from "../../services/menuService";
import styles from "../../styles/CreateMenu.module.css";
import ButtonComponent from "../../components/ui/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const initialState = {
  title: "",
  selectedCocktails: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };

    case "SELECT_COCKTAIL":
      const isSelected = state.selectedCocktails.some(
        (c) => c.id === action.payload
      );
      const updatedCocktails = isSelected
        ? state.selectedCocktails.filter((c) => c.id !== action.payload)
        : [
            ...state.selectedCocktails,
            { id: action.payload, order: state.selectedCocktails.length },
          ];
      return { ...state, selectedCocktails: updatedCocktails };

    case "MOVE_COCKTAIL":
      const { index, direction } = action.payload;
      const newSelected = [...state.selectedCocktails];
      const [movedCocktail] = newSelected.splice(index, 1);
      newSelected.splice(index + direction, 0, movedCocktail);
      return {
        ...state,
        selectedCocktails: newSelected.map((c, i) => ({ ...c, order: i })),
      };

    case "RESET_SELECTION":
      return { ...state, selectedCocktails: [] };

    default:
      return state;
  }
}

const CreateMenu = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleSaveMenu = async () => {
    if (state.title.trim() === "" || state.selectedCocktails.length < 3) {
      alert("Please enter a title and select at least 3 cocktails.");
      return;
    }

    const newMenu = {
      title: state.title,
      cocktailIds: state.selectedCocktails.map((c) => c.id),
      dateCreated: new Date().toISOString(),
    };

    try {
      await menuService.createMenu(newMenu);
    } catch (error) {
      console.error("Error saving menu:", error);
      alert("There was an error saving your menu. Please try again.");
    }
    navigate("/", { state: { status: "Menu was created" } });
  };

  return (
    <div className={styles.createMenu}>
      <h1>Create Menu</h1>
      <input
        type="text"
        value={state.title}
        onChange={(e) =>
          dispatch({ type: "SET_TITLE", payload: e.target.value })
        }
        placeholder="Menu Title"
        required
        className={styles.inputField}
      />
      <div className={styles.columnsContainer}>
        <div className={styles.mobileWrapper}>
          <div className={styles.cocktailSelection}>
            {cocktailsData.savedCocktails.map((cocktail) => (
              <label
                key={cocktail.id}
                className={`${styles.cocktailLabel} ${
                  state.selectedCocktails.some((c) => c.id === cocktail.id)
                    ? styles.selectedCocktail
                    : ""
                }`}
                onClick={() =>
                  dispatch({ type: "SELECT_COCKTAIL", payload: cocktail.id })
                }
              >
                <input
                  type="checkbox"
                  value={cocktail.id}
                  checked={state.selectedCocktails.some(
                    (c) => c.id === cocktail.id
                  )}
                  onChange={() =>
                    dispatch({ type: "SELECT_COCKTAIL", payload: cocktail.id })
                  }
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

        <div className={styles.selectedCocktails}>
          {state.selectedCocktails.map((cocktail, index) => (
            <div key={cocktail.id} className={styles.selectedCocktailItem}>
              <span>
                {
                  cocktailsData.savedCocktails.find((c) => c.id === cocktail.id)
                    .name
                }
              </span>
              <div className={styles.buttonsOrder}>
                <button
                  className={styles.orderButton}
                  onClick={() =>
                    dispatch({
                      type: "MOVE_COCKTAIL",
                      payload: { index, direction: -1 },
                    })
                  }
                  disabled={index === 0}
                >
                  <FontAwesomeIcon icon={faArrowUp} />
                </button>
                <button
                  className={styles.orderButton}
                  onClick={() =>
                    dispatch({
                      type: "MOVE_COCKTAIL",
                      payload: { index, direction: 1 },
                    })
                  }
                  disabled={index === state.selectedCocktails.length - 1}
                >
                  <FontAwesomeIcon icon={faArrowDown} />
                </button>
              </div>
            </div>
          ))}
          {state.selectedCocktails.length > 0 && (
            <h3>Selected Cocktails ({state.selectedCocktails.length})</h3>
          )}
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <ButtonComponent onClick={() => dispatch({ type: "RESET_SELECTION" })} category="reset">
          Reset Menu
        </ButtonComponent>
        <ButtonComponent onClick={handleSaveMenu} category="save">
          Save Menu
        </ButtonComponent>
      </div>
    </div>
  );
};

export default CreateMenu;
