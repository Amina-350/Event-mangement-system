import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api/axios";

const BookMeetingForm = () => {
  const { EventId } = useParams();

  const [eventData, setEventData] = useState(null);

  const [formData, setFormData] = useState({
    EventId,
    Date: null,
    Time: null,
    Venue: "",
    location: "",
    OnlineMeetingLink: "",
    status: "start", // default status
  });

  // Fetch Event Details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get(
          `/Event/GetSingleEvent/${EventId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setEventData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvent();
  }, [EventId]);

  // Handle Venue Change
  const handleVenueChange = (e) => {
    const value = e.target.value;

    if (value === "onsite" && eventData) {
      setFormData({
        ...formData,
        Venue: value,
        location: eventData.location?.address || "",
        OnlineMeetingLink: "",
      });
    } else if (value === "online") {
      setFormData({
        ...formData,
        Venue: value,
        location: "",
        OnlineMeetingLink: "",
      });
    }
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...formData,
        Date: formData.Date
          ? formData.Date.toISOString().split("T")[0]
          : "",
        Time: formData.Time
          ? formData.Time.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
      };

      const response = await api.post(
        "/Meeting/BookMeeting",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Meeting Booked Successfully!");
      console.log(response.data);

      // Reset form
      setFormData({
        EventId,
        Date: null,
        Time: null,
        Venue: "",
        location: "",
        OnlineMeetingLink: "",
        status: "start",
      });

    } catch (error) {
      console.error(error);
      alert("Error booking meeting");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Book Meeting</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
<label className="meeting-label">Select Meeting Date</label>
        {/* Date */}
        <DatePicker
          selected={formData.Date}
          onChange={(date) =>
            setFormData({ ...formData, Date: date })
          }
          dateFormat="dd MMMM yyyy"
          placeholderText="Select date"
          minDate={new Date()}
          className="input"
        />
<label className="meeting-label">Select Meeting Time</label>
        {/* Time */}
        <DatePicker
          selected={formData.Time}
          onChange={(time) =>
            setFormData({ ...formData, Time: time })
          }
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="hh:mm aa"
          placeholderText="Select time"
          className="input"
        />
<label  className="meeting-label">Meeting Venue </label>
        {/* Venue */}
        <select
          name="Venue"
          value={formData.Venue}
          onChange={handleVenueChange}
          required
          style={styles.input}
        >
          <option value="">Select Venue</option>
          <option value="online">Online</option>
          <option value="onsite">Onsite</option>
        </select>

        {/* Online Link */}
        {formData.Venue === "online" && (
          <input
            type="text"
            placeholder="Enter Online Meeting Link"
            value={formData.OnlineMeetingLink}
            onChange={(e) =>
              setFormData({
                ...formData,
                OnlineMeetingLink: e.target.value,
              })
            }
            required
            style={styles.input}
          />
        )}

        {/* Location */}
        {formData.Venue === "onsite" && (
          <input
            type="text"
            value={formData.location}
            readOnly
            style={styles.input}
          />
        )}

<label  className="meeting-label">Meeting Status</label>
        {/* Status Dropdown */}
        <select
          name="status"
          value={formData.status}
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.value })
          }
          style={styles.input}
        >
          <option value="start">Start</option>
          <option value="pending">Pending</option>
          <option value="on-going">On Going</option>
          <option value="finish">Finish</option>
          <option value="draft">Draft</option>
        </select>

        <button type="submit" style={styles.button}>
          Book Meeting
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",

  },
  input: {
    margin: "10px 0",
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },

 
};

export default BookMeetingForm;