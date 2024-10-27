import React from 'react';
import styles from '../../styles/searchbar.module.css';

const SearchBar = ({ placeholder, onSearch }) => {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        onChange={onSearch}
      />
      <button className={styles.searchButton}>Search</button>
    </div>
  );
};

export default SearchBar;
