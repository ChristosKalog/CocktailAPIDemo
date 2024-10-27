import React, {  useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import styles from "../../styles/Navbar.module.css"; // Import the CSS module
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"; // Import the download icon
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"; // Import the download icon

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(true);
  const { user, logout } = useAuth(); // Access user and logout function from Auth context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from the Auth context
    navigate("/login"); // Redirect to the login page
  };

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <nav className={`${styles.navbar} ${isHidden ? styles.collapse : ""}`}>
      <div className={styles.navbar__logo}>
        <NavLink to="/">Cocktails App</NavLink>
        <div onClick={toggleHidden} className={styles.iconContainer}>
          {isHidden ? <p>Show Menu</p> : <p>Hide Menu</p>}
          <FontAwesomeIcon
            className={styles.icon}
            icon={isHidden ? faArrowDown : faArrowUp}
          />
        </div>
      </div>
      <ul className={styles.navbar__links}>
        <li>
          <NavLink to="/" activeclassname={styles.active}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/recipes" activeclassname={styles.active}>
            Recipes
          </NavLink>
        </li>
        <li>
          <NavLink to="/menus" activeclassname={styles.active}>
            Menus
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" activeclassname={styles.active}>
            Profile
          </NavLink>
        </li>
      </ul>
      <div className={styles.navbar__auth}>
        {user ? (
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button> // Show Logout button if user is logged in
        ) : (
          <NavLink to="/login" activeclassname={styles.active}>
            Login
          </NavLink> // Show Login link if user is not logged in
        )}
      </div>
    </nav>
  );
};

export default Navbar;
