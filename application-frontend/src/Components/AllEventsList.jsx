import React, { useState, useEffect } from "react";
import api from "../api/axios";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  CardImg
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function AllEventsList() {
  const [event, setevent] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/Event/AllEvents", {
          params: {
            page: page,
            limit: 10,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setevent(response.data.events);
        setTotalPages(response.data.totalPages);

      } catch (error) {
        console.log(error);
      }
    };

    fetchEventData();
  }, [page]); // refetch when page changes

  const handleClick = (id) => {
    navigate(`/EventDetail/${id}`);
  };

  return (
    <div className="container-fluid mt-4">
      <h1 className="mb-4 text-center">All Events List</h1>
  <Link
  
            to={'/MyClender'}
            style={{ color: "red", fontWeight: "bold" }}
          >
          <p className="mb-4 text-center">Show My Meetings</p> 
          </Link>
      <div className="row">
        {event.map((event, index) => (
          <div
            onClick={() => handleClick(event._id)}
            key={event._id || index}
            className="col-12 col-sm-6 col-md-3 mb-4"
            style={{ cursor: "pointer" }}
          >
            <Card className="shadow-sm h-100 border-0">
              <CardImg
                top
                src={
                  event.banner_image
                    ? event.banner_image
                    : "https://picsum.photos/400/300"
                }
                style={{
                  height: "12rem",
                  objectFit: "cover"
                }}
              />

              <CardBody className="d-flex flex-column">
                <CardTitle tag="h5">
                  {event.title || "Dummy Event Title"}
                </CardTitle>

                <CardSubtitle
                  className="mb-2 text-muted"
                  tag="h6"
                >
                  {event.Eventtype || "General"}
                </CardSubtitle>

                <CardText className="flex-grow-1">
                  {event.description ||
                    "This is a sample event description."}
                </CardText>

                <Button color="primary" className="mt-auto">
                  View Detail
                </Button>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>

      {/* ✅ Pagination Buttons at Bottom */}
      <div className="d-flex justify-content-center align-items-center mt-4 mb-5">

        <Button
          color="secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>

        <span style={{ margin: "0 15px" }}>
          Page {page} of {totalPages}
        </span>

        <Button
          color="secondary"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>

      </div>
    </div>
  );
}