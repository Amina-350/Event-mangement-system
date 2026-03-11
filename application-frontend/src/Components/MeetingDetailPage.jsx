import React, { useEffect, useState } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const MeetingDetailPage = () => {
  const { id } = useParams();
  const [meetingDetail, setMeetingDetail] = useState(null);
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getMeetingDetail = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get(`/Meeting/getsinglemeeting/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMeetingDetail(res.data.singlemeeting);
        setStatus(res.data.singlemeeting.status);
      } catch (error) {
        console.log("Error fetching meeting detail:", error);
      }
    };

    if (id) {
      getMeetingDetail();
    }
  }, [id]);

  // ✅ Update Status API
  const updateStatus = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.patch(
        `/Meeting/updatemeetingstatus/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMeetingDetail(res.data.updatedMeeting);
      setShowModal(false);

      alert("Status updated successfully");
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  if (!meetingDetail) {
    return <p>Loading...</p>;
  }

  return (
    <div className="event-container" style={{display:"flex",justifyContent:"space-between"}}>
      <div className="event-content">

        <h2>Meeting Detail</h2>

        <div className="section">
          <h4>Status</h4>
          <p>{meetingDetail.status}</p>

          <button
            className="update-btn"
            onClick={() => setShowModal(true)}
          >
            Update Status
          </button>
        </div>

        <div className="section">
          <h4>Date</h4>
          <p>{meetingDetail.Date}</p>
        </div>

        <div className="section">
          <h4>Time</h4>
          <p>{meetingDetail.Time}</p>
        </div>

        <div className="section">
          <h4>Venue</h4>
          <p>{meetingDetail.Venue}</p>
        </div>

        {meetingDetail.Venue === "online" && (
          <div className="section">
            <h4>Online Meeting Link</h4>
            <p>{meetingDetail.OnlineMeetingLink}</p>
          </div>
        )}

        {meetingDetail.Venue === "onsite" && (
          <div className="section">
            <h4>Location</h4>
            <p>{meetingDetail.location}</p>
          </div>
        )}
      </div>

      {/* ✅ Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h3>Update Meeting Status</h3>

         <select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
>
  <option value="Start">Start</option>
  <option value="pending">Pending</option>
  <option value="on-going">On-going</option>
  <option value="Finish">Finish</option>
  <option value="draft">Draft</option>
</select>

            <div className="modal-buttons">
              <button onClick={updateStatus}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingDetailPage;