import React from 'react';
import styles from '../../styles/Footer.module.css'; // Import the CSS module
import {Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.left}>
          <p>&copy; {new Date().getFullYear()} Cocktail App. All Rights Reserved.</p>
        </div>
        <div className={styles.right}>
          <div className={styles.socialLinks}>
            <button onClick={() => window.open('https://facebook.com')} className={styles.linkButton}>Facebook</button>
            <button onClick={() => window.open('https://twitter.com')} className={styles.linkButton}>Twitter</button>
            <button onClick={() => window.open('https://instagram.com')} className={styles.linkButton}>Instagram</button>
            <Link to ="/faq">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
