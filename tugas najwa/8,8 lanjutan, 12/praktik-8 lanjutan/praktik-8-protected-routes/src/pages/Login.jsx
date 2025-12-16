import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Komponen utama Login
const Login = () => {
  return (
    <div>
      <div>
        <h1>Login Page</h1>
        <p>Please enter your credentials to log in.</p>
      </div>
      <FormLogin />
    </div>
  );
};

// Komponen FormLogin yang berisi logika login
const FormLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    if (username && password) {
      // Logic autentikasi sederhana
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", username);
      alert("Login successful!");
      navigate("/"); // Redirect ke halaman utama
    } else {
      alert("Please enter username and password.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;