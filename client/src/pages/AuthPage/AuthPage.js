import React, { useState, useContext } from "react";
import { loginUser, registerUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (isLogin) {
      // LogIn Flow
      const data = await loginUser({
        email: form.email,
        password: form.password,
      });
      if (data.token) {
        login({ username: data.username }, data.token);
        navigate("/");
      } else {
        setMessage(data.message);
      }
    } else {
      // SignUp Flow
      const data = await registerUser(form);
      if (data.message === "User registered successfully.") {
        setIsLogin(true);
        setMessage("Account created! Please log in.");
      } else {
        setMessage(data.message);
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Log In" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>
      </form>
      {message && <p>{message}</p>}

      <p
        onClick={() => setIsLogin(!isLogin)}
        className="toggle-link"
        style={{ color: isLogin ? "#777" : "#777" }}
      >
        {isLogin ? "New? Sign Up Here!" : "Log In Please!"}
      </p>
    </div>
  );
};

export default AuthPage;
