import React, { useEffect, useState } from "react";
import axios from "../api/axios";

import { DndContext, closestCorners } from "@dnd-kit/core";

import Dropablekanban from "./Dropablekanban";

const columns = ["start", "pending", "on-going", "Finish", "draft"];

export default function AllMeetingList() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("/Meeting/getallmeetings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }); // your API
    const formatted = res.data.map((m) => ({
      ...m,
      status: m.status || "draft",
    }));

    setMeetings(formatted);
  };

  const getMeetingsByStatus = (status) => {
    return meetings.filter((m) => m.status === status);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const meetingId = active.id; //the meeting that is dragging
    const newStatus = over.id;// the column where you dropped it

    setMeetings((prev) =>
      prev.map((m) => (m._id === meetingId ? { ...m, status: newStatus } : m)),
    );

    // optional backend update
    try {
      await axios.put(`/Meeting/updatemeetingstatus/${meetingId}`, {
        status: newStatus,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    //closestCorners decide which column is closest to drop
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        {columns.map((col) => (
          <Dropablekanban
            key={col}
            id={col}
            title={col}
            meetings={getMeetingsByStatus(col)}
          />
        ))}
      </div>
    </DndContext>
  );
}
