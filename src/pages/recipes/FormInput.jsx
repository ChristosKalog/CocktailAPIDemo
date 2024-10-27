import React from "react";
import styles from "../../styles/AddRecipe.module.css";

const FormInput = ({ type, name, value, handleChange, options, placeholder }) => {
  if (type === "select") {
    return (
      <select
        name={name}
        value={value}
        onChange={handleChange}
        required
        className={styles.selectInput}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      className={styles.textarea}
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      required
    />
  );
};

export default FormInput;
