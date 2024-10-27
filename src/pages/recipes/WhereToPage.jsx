import React from "react";
import styles from "../../styles/WhereToPage.module.css";
import ButtonComponent from "../../components/ui/ButtonComponent";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link,  useLocation} from "react-router-dom"; // Import useNavigate

const WhereToPage = () => {

  const { state } = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.module}>

      <p>Recipe Created!</p>
      <div className={styles.buttonContainer}>
      <ButtonComponent category="add">
        <Link to="/recipe/Add">add more</Link>
      </ButtonComponent>{" "}
      <ButtonComponent category="see">
        <Link to={`/recipes/${state.key}`}>See the recipe</Link>
      </ButtonComponent>{" "}
      </div>
      </div>
    </div>
  );
};

export default WhereToPage;
