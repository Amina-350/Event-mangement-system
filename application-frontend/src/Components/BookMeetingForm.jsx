import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api/axios";

const BookMeetingForm = () => {
  const { UserId, EventId } = useParams();

  const [eventData, setEventData] = useState(null);

  const [formData, setFormData] = useState({
    UserId,
    EventId,
    Date: null,
    Time: null,
    Venue: "",
    location: "",
    OnlineMeetingLink: ""
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get(
          `/Event/GetSingleEvent/${EventId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setEventData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvent();
  }, [EventId]);

  const handleVenueChange = (e) => {
    const value = e.target.value;

    if (value === "onsite" && eventData) {
      setFormData({
        ...formData,
        Venue: value,
        location: eventData.location?.address || "",
        OnlineMeetingLink: ""
      });
    } else if (value === "online") {
      setFormData({
        ...formData,
        Venue: value,
        location: "",
        OnlineMeetingLink: ""
      });
    }
  };

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
              minute: "2-digit"
            })
          : ""
      };

      const response = await api.post(
        "/Meeting/BookMeeting",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Meeting Booked Successfully!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Error booking meeting");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Book Meeting</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
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

        {formData.Venue === "online" && (
          <input
            type="text"
            name="OnlineMeetingLink"
            placeholder="Enter Online Meeting Link"
            value={formData.OnlineMeetingLink}
            onChange={(e) =>
              setFormData({
                ...formData,
                OnlineMeetingLink: e.target.value
              })
            }
            required
            style={styles.input}
          />
        )}

        {formData.Venue === "onsite" && (
          <input
            type="text"
            name="location"
            value={formData.location}
            readOnly
            style={styles.input}
          />
        )}

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
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    margin: "10px 0",
    padding: "10px",
    fontSize: "16px"
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  }
};

export default BookMeetingForm;