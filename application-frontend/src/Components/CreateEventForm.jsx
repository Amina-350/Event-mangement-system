import React, { useState } from "react";
import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
import "./style.css";

const CreateEventForm = () => {


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    Eventtype: "",
    date: "",
    time: "",
    audienceSize: "",
    status: "draft",
    isPaid: false,
    price: 0,
    banner_image: "",
    contactEmail: "",
    contactPhone: "",
    tags: "",
    startDateTime: "",
    endDateTime: "",

    location: {
      address: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      latitude: "",
      longitude: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Normal fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Location fields
  const handleLocationChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      location: {
        ...formData.location,
        [name]: value,
      },
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "location") {
        data.append("location", JSON.stringify(formData.location));
      } else {
        data.append(key, formData[key]);
      }
    });
const token = localStorage.getItem("token");
    const res = await api.post("/Event/createEvent", data, {
      headers: {
        "Content-Type": "multipart/form-data",
         Authorization: `Bearer ${token}`,
      },
    });

    setSuccess("Event Created Successfully",res);
    // navigate("/dashboard");

  } catch (err) {
    setError(err.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="registration-container">
      <h2>Create Event</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form className="registration-form" onSubmit={handleSubmit}>

        <input name="title" placeholder="Event Title" onChange={handleChange} />

        <textarea
          name="description"
          placeholder="Event Description"
          onChange={handleChange}
        />

        <input name="category" placeholder="Category" onChange={handleChange} />

        <select name="Eventtype" onChange={handleChange}>
          <option value="">Select Event Type</option>
          <option value="online">online</option>
          <option value="physical">physical</option>
          <option value="hybrid">hybrid</option>
        </select>

        <input type="date" name="date" onChange={handleChange} />
        <input type="time" name="time" onChange={handleChange} />

        {/* Location Section */}
        <h4>Location Details</h4>
        <input name="address" placeholder="Address" onChange={handleLocationChange} />
        <input name="city" placeholder="City" onChange={handleLocationChange} />
        <input name="state" placeholder="State" onChange={handleLocationChange} />
        <input name="country" placeholder="Country" onChange={handleLocationChange} />
        <input name="postalCode" placeholder="Postal Code" onChange={handleLocationChange} />
        <input name="latitude" placeholder="Latitude" onChange={handleLocationChange} />
        <input name="longitude" placeholder="Longitude" onChange={handleLocationChange} />

        <select name="audienceSize" onChange={handleChange}>
          <option value="">Audience Size</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

        <select name="status" onChange={handleChange}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>

        <label>
          <input
            type="checkbox"
            name="isPaid"
            onChange={handleChange}
          />
          Paid Event
        </label>

        {formData.isPaid && (
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
          />
        )}

      <input
  type="file"
  name="banner_image"
  accept="image/*"
  onChange={handleChange}
/>


        <input
          name="contactEmail"
          type="email"
          placeholder="Contact Email"
          onChange={handleChange}
        />

        <input
          name="contactPhone"
          placeholder="Contact Phone"
          onChange={handleChange}
        />

        <input
          name="tags"
          placeholder="Tags (comma separated)"
          onChange={handleChange}
        />

        <label>Start Date & Time</label>
        <input type="datetime-local" name="startDateTime" onChange={handleChange} />

        <label>End Date & Time</label>
        <input type="datetime-local" name="endDateTime" onChange={handleChange} />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </button>

      </form>
    </div>
  );
};

export default CreateEventForm;
