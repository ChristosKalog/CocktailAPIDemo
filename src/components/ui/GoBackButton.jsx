import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/GoBackButton.module.css";

const BackButton = ({ onClick }) => {
  return (
    <button className={styles.backButton} onClick={onClick}>
      <FontAwesomeIcon icon={faArrowLeft} className={styles.backIcon} />
      <span>Back</span>
      <FontAwesomeIcon icon={faArrowLeft} className={styles.rightIcon} />
    </button>
  );
};

export default BackButton;
