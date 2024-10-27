import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import menuService from "../../services/menuService";
import styles from "../../styles/Menus.module.css";
import ButtonComponent from "../../components/ui/ButtonComponent";

const Menus = () => {
  const [menus, setMenus] = useState([]);
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
  }, []);

  return (
    <div className={styles.menusContainer}>
      <h1 className={styles.menusTitle}>Menus</h1>
      {menus.length > 0 ? (
        <div className={styles.menuList}>
          {menus.map((menu) => (
            <Link to={`/viewmenu/${menu.id}`} className={styles.menuLink}>
              <div key={menu.id} className={styles.menuCard}>
                <p>{menu.title}</p>
                <span className={styles.menuDate}>
                  Created on {new Date(menu.dateCreated).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
          <ButtonComponent category="add">
            <Link to="/menu/create">Create menu</Link>
          </ButtonComponent>
        </div>
      ) : (
        <p className={styles.emptyMessage}>No menus available</p>
      )}
    </div>
  );
};

export default Menus;
