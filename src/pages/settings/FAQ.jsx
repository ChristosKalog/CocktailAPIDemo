import React, { useState } from 'react';
import styles from '../../styles/FAQ.module.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What is this app about?",
      answer: "This app allows you to explore and manage a variety of cocktail recipes. You can create, edit, and save your own menus of favorite cocktails."
    },
    {
      question: "How can I create a new recipe?",
      answer: "To create a new recipe, simply log in, go to the 'Add Recipe' section, and fill out the required fields such as ingredients, style, and instructions."
    },
    {
      question: "Can I edit or delete my recipes?",
      answer: "Yes, you can edit or delete your recipes by navigating to the recipe page and selecting the respective options."
    },
    {
      question: "How do I create and view menus?",
      answer: "You can create a menu by selecting cocktails and adding them to a new menu. Once created, menus can be viewed on the 'View Menus' page."
    },
    {
      question: "Is there a search or filter option for recipes?",
      answer: "Yes, you can search and filter recipes based on style, ingredients, and complexity using the filters at the top of the recipe page."
    },
    {
      question: "What is the 'Remember Me' option?",
      answer: "The 'Remember Me' option allows you to stay logged in on the same device, so you don’t have to enter your credentials every time."
    }
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      <h1 className={styles.faqTitle}>Frequently Asked Questions</h1>
      {faqData.map((item, index) => (
        <div key={index} className={styles.faqItem}>
          <h2 className={styles.question} onClick={() => toggleAnswer(index)}>
            {item.question}
          </h2>
          {activeIndex === index && <p className={styles.answer}>{item.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
