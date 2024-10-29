import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../../styles/Login.module.css";
import ButtonComponent from "../../components/ui/ButtonComponent";
import authService from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me"
  const navigate = useNavigate();
  const { login: contextLogin } = useAuth(); // Access login function from Auth context

  // Check local storage for saved user data on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      // If a user is found in local storage, redirect to the dashboard
      if (user && user.isAuthenticated) {
        navigate("/"); // Redirect to the dashboard
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await authService.login(username, password);

      contextLogin(user); // Update authentication context

      if (rememberMe) {
        localStorage.setItem("loggedInUser", JSON.stringify({ ...user, isAuthenticated: true }));
      } else {
        localStorage.removeItem("loggedInUser");
      }

      navigate("/"); // Redirect to the dashboard
    } catch (error) {
      alert("Invalid username or password");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Welcome Back</h2>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
            autoComplete="on"
          />
        </div>
        <div className={styles.formGroupCheckbox}>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember Me
          </label>
        </div>
        <ButtonComponent type="submit" category="login">
          Log In
        </ButtonComponent>
      </form>
      <Link to="/register">New User? Register Here</Link>
    </div>
  );
};

export default Login;
