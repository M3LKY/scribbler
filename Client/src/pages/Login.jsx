import React from 'react'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import log from '../css/login.module.css'
import { AuthContext } from "../context/authContext";
const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className={log.login}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Login</label>
        <input type="text" 
        required
        name="username"
        placeholder='Username'
        
        onChange={handleChange}  />

        <input type="password" 
        required
        name="password"
        placeholder='Password' 
        onChange={handleChange} />
        <button type="submit">Login</button>
        {err && <p>{err}</p>}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  )
}

export default Login