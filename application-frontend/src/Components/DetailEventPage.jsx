import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";

const DetailEventPage = () => {
  const { id } = useParams();
  const [eventDetail, setEventDetail] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get(`/Event/GetSingleEvent/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setEventDetail(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvent();
  }, [id]);

  if (!eventDetail) {
    return <p>Loading...</p>;
  }

  return (
    <div className="event-container">
      <div className="banner">
        <img
          src={eventDetail.banner_image || "https://picsum.photos/1200/500"}
          alt="Event Banner"
        />
      </div>

      <div className="event-content">
        <div className="sub-event-container">
          <h1>{eventDetail.title||"title"}</h1>

          <Link
            to={`/BookMeetingForm/${eventDetail._id}/${eventDetail.createdBy}`}
            style={{ color: "red", fontWeight: "bold" }}
          >
            Book a Meeting
          </Link>
          <br></br>
            <Link
            to={`/vendordetailpage/${eventDetail.createdBy}`}
            style={{ color: "red", fontWeight: "bold" }}
          >
           check vendor detail
          </Link>
        </div>

        <p className="category">
          {eventDetail.category} • {eventDetail.eventType}
        </p>

        <div className="status-badge">{eventDetail.status}</div>

        <p className="description">{eventDetail.description}</p>

        <div className="info-grid">
          <div>
            <h4>Date</h4>
            <p>{eventDetail.date}</p>
          </div>

          <div>
            <h4>Time</h4>
            <p>{eventDetail.time}</p>
          </div>

          <div>
            <h4>Audience Size</h4>
            <p>{eventDetail.audienceSize}</p>
          </div>

          <div>
            <h4>Price</h4>
            <p>{eventDetail.isPaid ? `Rs ${eventDetail.price}` : "Free"}</p>
          </div>
        </div>

        <div className="section">
          <h3>Location</h3>
          <p>{eventDetail.location?.address}</p>
          <p>
            {eventDetail.location?.city}, {eventDetail.location?.state},{" "}
            {eventDetail.location?.country}
          </p>
        </div>

        <div className="section">
          <h3>Contact Information</h3>
          <p>Email: {eventDetail.contactEmail}</p>
          <p>Phone: {eventDetail.contactPhone}</p>
        </div>

        <div className="section">
          <h3>Tags</h3>
          <div className="tags">
            {eventDetail.tags?.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="section">
          <h3>Event Duration</h3>
          <p>Start: {eventDetail.startDateTime}</p>
          <p>End: {eventDetail.endDateTime}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailEventPage;