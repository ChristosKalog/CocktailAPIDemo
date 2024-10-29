// src/pages/auth/Register.jsx

import React, { useState } from "react";
import styles from "../../styles/Register.module.css"; // Import the CSS module
import ButtonComponent from "../../components/ui/ButtonComponent";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState(""); // Default role can be set as needed
  const [bar, setBar] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();
    // Add your registration logic here
    if (password !== confirmPassword) {
      console.error("Passwords don't match!");
      return;
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2>Register</h2>
      <form onSubmit={handleRegister} className={styles.registerForm}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={styles.inputField}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.inputField}
        />
        <input
          type="text"
          placeholder="Full Name (optional)"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="text"
          placeholder="Role (optional)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="text"
          placeholder="Bar (optional)"
          value={bar}
          onChange={(e) => setBar(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className={styles.inputField}
        />
        <ButtonComponent type="submit" category="register">
          Register
        </ButtonComponent>{" "}
      </form>
      <Link to="/login">Already a user? Login Here</Link>
    </div>
  );
};

export default Register;
