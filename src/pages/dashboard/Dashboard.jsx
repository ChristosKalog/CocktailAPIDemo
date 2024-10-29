import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useNavigate
import styles from "../../styles/Dashboard.module.css";
import menuService from "../../services/menuService";
import recipeService from "../../services/recipeService";
import ButtonComponent from "../../components/ui/ButtonComponent";

const Dashboard = () => {
  const [menus, setMenus] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const { state } = useLocation();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (state?.status) {
      setMessage(state.status);
      setTimeout(() => setMessage(""), 2000);
    }
  }, [state]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const retrievedMenus = await menuService.fetchMenus();
        setMenus(retrievedMenus);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();

    const fetchCocktails = async () => {
      try {
        const retrievedRecipes = await recipeService.getAllRecipes();
        setRecipes(retrievedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchCocktails();
  }, []);

  const latestMenus = menus.slice(-5);
  const latestRecipes = recipes.slice(-5);

  return (
    <div className={styles.dashboard}>
      <div className={styles.bigContainer}>
        <div className={styles.menusList}>
          <div className={styles.menuTitle}>
            <h3>Your Latest Menus</h3>{" "}
            <Link to="/menus" className={styles.viewAllLink}>
              <p>View All</p>{" "}
            </Link>
          </div>
          {latestMenus.length > 0 ? (
            <div className={styles.menuItemsContainer}>
              {latestMenus.map((menu) => (
                <div key={menu.id} className={styles.itemContainer}>
                  <Link className={styles.menuLink} to={`/viewmenu/${menu.id}`}>
                    {menu.title}
                  </Link>
                </div>
              ))}
              <ButtonComponent category="add">
                <Link to="/menu/create">Create Menu</Link>
              </ButtonComponent>
            </div>
          ) : (
            <>
              <p>
                No menus yet!
                <Link className={styles.link} to="/menu/create">
                  {" "}
                  Create your first!
                </Link>
              </p>
            </>
          )}
        </div>

        <div className={styles.menusList}>
          <div className={styles.menuTitle}>
            <h3>Your Latest Cocktails</h3>{" "}
            <Link to="/recipes" className={styles.viewAllLink}>
              <p>View All</p>
            </Link>
          </div>
          {latestRecipes.length > 0 ? (
            <div className={styles.menuItemsContainer}>
              {latestRecipes.map((recipe) => (
                <div key={recipe.id} className={styles.itemContainer}>
                  <Link
                    className={styles.menuLink}
                    to={`/recipes/${recipe.id}`}
                  >
                    {recipe.name}
                  </Link>
                </div>
              ))}
              <ButtonComponent category="add">
                <Link to="/recipe/Add">Add Recipe</Link>
              </ButtonComponent>
            </div>
          ) : (
            <>
              <p>
                No cocktails yet!
                <Link className={styles.link} to="/recipe/Add">
                  {" "}
                  Add your first!
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
      {message && <div className={styles.messageContainer}>{message}</div>}
    </div>
  );
};

export default Dashboard;
