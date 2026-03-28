import React from "react";
import { useDroppable } from "@dnd-kit/core";
import MeetingCardDrang from "./MeetingCardDrag";

export default function Dropablekanban({ id, title, meetings }) {

  const { setNodeRef } = useDroppable({
    id: id
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        width: "260px",
        background: "#f4f4f4",
        borderRadius: "10px",
        padding: "10px",
        minHeight: "400px"
      }}
    >
      <h3>{title}</h3>

      {meetings.map((meeting) => (
        <MeetingCardDrang key={meeting._id} meeting={meeting} />
      ))}
    </div>
  );
}