import React from "react";
import { useDraggable } from "@dnd-kit/core";
export default function MeetingCardDrang({ meeting }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: meeting._id,
  });
  const style = {
    background: "white",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    cursor: "grab",
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <p>
        <b>Date:</b> {meeting.Date?.slice(0, 10)}
      </p>
      <p>
        <b>Time:</b> {meeting.Time}
      </p>
      <p>
        <b>Venue:</b> {meeting.Venue}
      </p>
      <p>
        <b>status:</b> {meeting.status}
      </p>

      {meeting.Venue === "online" && <p>Link: {meeting.OnlineMeetingLink}</p>}

      {meeting.Venue === "onsite" && <p>Location: {meeting.location}</p>}
    </div>
  );
}
