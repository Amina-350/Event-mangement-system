import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import api from "../api/axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);
const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/Meeting/getMyMeetings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("the meetings are---->", res);
        const formattedEvents = res.data.meetings
          .filter((meeting) => {
            const year = new Date(meeting.Date).getFullYear();
            return year !== 1970; // skip invalid dates
          })
          .map((meeting) => {
            const meetingDate = new Date(meeting.Date);

            // Use moment to parse time safely
            const timeMoment = moment(meeting.Time, ["hh:mm A", "HH:mm"]);

            meetingDate.setHours(timeMoment.hours());
            meetingDate.setMinutes(timeMoment.minutes());

            const endDate = new Date(meetingDate);
            endDate.setHours(meetingDate.getHours() + 1);

            return {
              title:
                meeting.Venue === "online"
                  ? "Online Meeting"
                  : `Onsite - ${meeting.location}`,
              start: meetingDate,
              end: endDate,
            };
          });

        setEvents(formattedEvents);

        setEvents(formattedEvents);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMeetings();
  }, []);
  console.log("the meetings events are ", events);
  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};

export default MyCalendar;
