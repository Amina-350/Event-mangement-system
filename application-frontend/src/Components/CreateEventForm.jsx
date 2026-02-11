import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom'; // ✅ import navigate
const CreateEventForm = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    Eventtype: "",
    date: "",
    time: "",
    location: "",
    audienceSize: "",
    createdBy: "",
    
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/user/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        type: formData.type,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        country: formData.country
      });

      setSuccess("Registration successful 🎉");
        navigate("/Login");
      console.log(res.data);

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form className="registration-form" onSubmit={handleSubmit}>

        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />

        <select name="gender" onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

  <select name="type" onChange={handleChange}>
          <option value="">Select type</option>
          <option value="male">User</option>
          <option value="female">Vendor</option>
          <option value="other">admin</option>
        </select>

        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <textarea name="address" placeholder="Address" onChange={handleChange} />
        <input name="city" placeholder="City" onChange={handleChange} />
        <input name="country" placeholder="Country" onChange={handleChange} />

        <button type="submit" className="submit-btn"  disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <br></br>
        <Link to="/Login">Login</Link>
      </form>
    </div>
  );
};

export default CreateEventForm;
