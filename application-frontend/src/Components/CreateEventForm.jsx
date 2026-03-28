import React, { useState } from "react";
import api from "../api/axios";
import "./style.css";

const EVENT_TYPES = ["online", "physical", "hybrid"];
const AUDIENCE_SIZES = ["small", "medium", "large"];
const STATUS_OPTIONS = ["draft", "published", "cancelled", "completed"];
const PREFER_EVENTS = [
  "corporateEvents",
  "socialAndPersonalEvents",
  "educationalEvents",
  "culturalAndEntertainment",
  "sportsEvents",
  "brandEvents",
];

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
    banner_image: null,
    contactEmail: "",
    contactPhone: "",
    tags: "",
    startDateTime: "",
    endDateTime: "",
    preferEvent: [],
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

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePreferEventChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      preferEvent: checked
        ? [...prev.preferEvent, value]
        : prev.preferEvent.filter((item) => item !== value),
    }));
  };

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

  const validateForm = () => {
   
    if (!formData.Eventtype) return "Event type is required";
    if (!formData.audienceSize) return "Audience size is required";
   
    if (formData.preferEvent.length === 0)
      return "Select at least one event category";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "location") {
          data.append("location", JSON.stringify(formData.location));
        } else if (key === "preferEvent") {
          formData.preferEvent.forEach((item) => {
            data.append("preferEvent", item);
          });
        } else if (key === "tags") {
          const tagsArray = formData.tags
            .split(",")
            .map((tag) => tag.trim());
          tagsArray.forEach((tag) => data.append("tags", tag));
        } else {
          data.append(key, formData[key]);
        }
      });

      const token = localStorage.getItem("token");

      await api.post("/Event/createEvent", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Event Created Successfully");
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
          <option value="">Select event type</option>
          {EVENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <input type="date" name="date" onChange={handleChange} />
        <input type="time" name="time" onChange={handleChange} />

        <h4>Location Details</h4>
        <input name="address" placeholder="Address" onChange={handleLocationChange} />
        <input name="city" placeholder="City" onChange={handleLocationChange} />
        <input name="state" placeholder="State" onChange={handleLocationChange} />
        <input name="country" placeholder="Country" onChange={handleLocationChange} />
        <input name="postalCode" placeholder="Postal Code" onChange={handleLocationChange} />
        <input name="latitude" placeholder="Latitude" onChange={handleLocationChange} />
        <input name="longitude" placeholder="Longitude" onChange={handleLocationChange} />




<span>Audience size</span>

        <select required name="audienceSize" onChange={handleChange}>
          <option value="">select audience size</option>
          {AUDIENCE_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span>Event Status</span>

        <select name="status" onChange={handleChange}>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <label>
          <input type="checkbox" name="isPaid" onChange={handleChange} /> Paid Event
        </label>

        {formData.isPaid && (
          <input type="number" name="price" placeholder="Price" onChange={handleChange} />
        )}

        <input type="file" name="banner_image" accept="image/*" onChange={handleChange} />

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

        <h4>Event Categories *</h4>
        {PREFER_EVENTS.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              value={option}
              checked={formData.preferEvent.includes(option)}
              onChange={handlePreferEventChange}
            />
            {option}
          </label>
        ))}

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
