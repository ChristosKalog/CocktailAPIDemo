import React from "react";
import styles from "../../styles/DeleteConfirmation.module.css"; // Adjust path as necessary

const DeleteConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.confirmationDialog}>
      <p>Are you sure?</p>
      <div styles={styles.buttonContainer}>
        <button className={styles.confirmButton} onClick={onConfirm}>
          Yes
        </button>
        <button className={styles.cancelButton} onClick={onCancel}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
