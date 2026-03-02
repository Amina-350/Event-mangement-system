import React, { useEffect, useState } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const VendorDetailPage = () => {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState(null);
console.log("the users detail is ---?",userDetail)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get(`/user/getsingleuser/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserDetail(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [id]);

  if (!userDetail) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <div className="event-container">
      

      <div className="event-content">
        <div className="sub-event-container">
          <h1>{userDetail.name || "John Doe"}</h1>
        </div>

        <div className="status-badge">
          {userDetail.role || "user"}
        </div>

        {/* Basic Info */}
        <div className="info-grid">
          <div>
            <h4>Email</h4>
            <p>{userDetail.email || "johndoe@email.com"}</p>
          </div>

          <div>
            <h4>Phone</h4>
            <p>{userDetail.phone || "+91 9876543210"}</p>
          </div>

          <div>
            <h4>Gender</h4>
            <p>{userDetail.gender || "Not Specified"}</p>
          </div>

          <div>
            <h4>Joined On</h4>
            <p>
              {userDetail.createdAt
                ? new Date(userDetail.createdAt).toLocaleDateString()
                : "01/01/2024"}
            </p>
          </div>
        </div>

        {/* Address Section */}
        <div className="section">
          <h3>Address Information</h3>
          <p>{userDetail.address || "123 Street Name"}</p>
          <p>
            {userDetail.city || "Mumbai"}, {userDetail.country || "India"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorDetailPage;