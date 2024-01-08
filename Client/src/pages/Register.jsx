import React from 'react';
import registerStyles from '../css/register.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null); 

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
      console.log(err)
    }
  };

  return (
    <div className={registerStyles.register}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Register</label>
        <input
          type="text"
          name="username"
          id="username"
          className={registerStyles.inp}
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          className={registerStyles.inp}
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          className={registerStyles.inp}
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Save</button>
        {err && <p>{err}</p>}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
