import React from "react";
import styles from "../../styles/SmallButtonComponent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const SmallButtonComponent = ({ onClick, category, children, type }) => {
  const iconValue = category === "view" ? faEye : null;

  const typeValue = type === "submit" ? "submit" : "";

  return (
    <button
      className={styles.buttonComponent}
      type={typeValue}
      onClick={onClick}
    >
      {iconValue && (
        <FontAwesomeIcon className={styles.buttonIcon} icon={iconValue} />
      )}
      {children}
    </button>
  );
};

export default SmallButtonComponent;
