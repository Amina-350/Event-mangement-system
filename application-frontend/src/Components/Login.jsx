import React, { useState } from 'react';
import './style.css';
import api from '../api/axios'; // your axios instance
import { useNavigate } from 'react-router-dom'; // ✅ import navigate
const Login = () => {
 const navigate = useNavigate(); // ✅ initialize
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const res = await api.post("/user/login", {  // adjust route if needed
        email: formData.email,
        password: formData.password
      });

      setSuccess("Login successful 🎉");
      navigate("/profile");
      console.log("Login Response:", res.data);

      // Optional: store token in localStorage if backend sends JWT
      if(res.data.token){
        localStorage.setItem("token", res.data.token);
      }

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <h2>Login</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form className="registration-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>
    </div>
  );
};

export default Login;
