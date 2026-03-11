import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import api from "../api/axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Link, useParams } from "react-router-dom";
const localizer = momentLocalizer(moment);

// ✅ Status Colors
const STATUS_COLORS = {
  start: "#007bff", // blue
  pending: "#28a745", // green
  "on-going": "#ffc107", // yellow
  Finish: "#17a2b8", // teal
  draft: "#6c757d", // grey
};

const MyCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/Meeting/getMyMeetings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
console.log("the res isss0--->",res.data.meetings)
        const formattedEvents = res.data.meetings
          .filter((meeting) => new Date(meeting.Date).getFullYear() !== 1970)
          .map((meeting) => {
            const meetingDate = new Date(meeting.Date);
            const timeMoment = moment(meeting.Time, ["hh:mm A", "HH:mm"]);
            meetingDate.setHours(timeMoment.hours());
            meetingDate.setMinutes(timeMoment.minutes());

            const endDate = new Date(meetingDate);
            endDate.setHours(meetingDate.getHours() + 1);

            return {
              title:
                meeting.Venue === "online"
                  ? `Online Meeting`
                  : `Onsite - ${meeting.location}`,
              start: meetingDate,
              end: endDate,
              status: meeting.status,
              userid:meeting.userId,
              EventId:meeting.EventId,
              meetingonline:meeting.OnlineMeetingLink,
              meetingid:meeting._id,

            };
          });

        setEvents(formattedEvents);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMeetings();
  }, []);

console.log("the meeting id is--->",events)
  return (
   
    <div style={{ height: "650px", padding: "20px" }}>
      {/* Status Legend */}
        <Link to="/AllMeetingList" style={{ textDecoration: "none",display:"flex",alignItems:"center",justifyContent:"right",fontWeight:"bold",color:"red"}}>
Show All Meeting List
    </Link>
      <div style={{ display: "flex", gap: "15px", marginBottom: "10px" }}>
        {Object.keys(STATUS_COLORS).map((status) => (
          <div
            key={status}
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <span
              style={{
                display: "inline-block",
                width: "18px",
                height: "18px",
                backgroundColor: STATUS_COLORS[status],
                borderRadius: "3px",
              }}
            ></span>
            <span style={{ fontSize: "14px", textTransform: "capitalize" }}>
              {status}
            </span>
          </div>
        ))}
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        components={{
          toolbar: CustomToolbar,
          event: CustomEvent,
        }}
        popup
        // the style of the box
        eventPropGetter={(event) => {
          const color = STATUS_COLORS[event.status] || "#f2c9c9";
          return {
            style: {
              backgroundColor: "#ffe5e5",
              color: "black",
              borderRadius: "6px",
              border: "none",
              padding: "4px",
              fontWeight: "bold",
            },
          };
        }}
      />
    </div>
  );
};

export default MyCalendar;

// ------------------- Toolbar -------------------
const CustomToolbar = ({ label, onNavigate }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        gap: "20px",
        marginBottom: "15px",
        fontSize: "18px",
        marginLeft: "20px",
      }}
    >
      <span
        style={{ cursor: "pointer", fontSize: "22px", color: "grey" }}
        onClick={() => onNavigate("PREV")}
      >
        &#60;
      </span>
      <span style={{ fontWeight: "bold" }}>{label}</span>
      <span
        style={{ cursor: "pointer", fontSize: "22px", color: "grey" }}
        onClick={() => onNavigate("NEXT")}
      >
        &#62;
      </span>
    </div>
  );
};

// ------------------- Custom Event-- what the content appear inside the event box  -------------------
const CustomEvent = ({ event }) => {
  const color = STATUS_COLORS[event.status] || "#f2c9c9";
  return (
    <Link to={`/MeetingDetailPage/${event.meetingid}`} style={{ textDecoration: "none", color: "inherit" }}>
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <span style={{ fontSize: "12px" }}>{event.title}</span>
      <span
        style={{
          marginTop: "2px",
          color: color,
          fontSize: "10px",
        }}
      >
        {event.status}
      </span>
    </div>
    </Link>
  );
};
