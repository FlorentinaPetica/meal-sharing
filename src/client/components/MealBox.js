import React, { useState } from "react";
const { DateTime } = require("luxon");
import ReservationForm from "./ReservationForm";
import ReviewsList from "./ReviewsList";
import { BsFillEyeFill } from "react-icons/bs";
import ReviewForm from "./ReviewForm";

function MealBox(props) {
  const {
    title,
    description,
    price,
    createdAt,
    availability,
    max_number_of_guests,
    reserved,
    imageURL,
    idmeals,
  } = props.meal;

  const [view, setView] = useState(props.view);
  const [container, setContainer] = useState("");

  return (
    <div
      style={{
        backgroundColor: "#125447",
        borderRadius: "3px",
        width: "65%",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        color: "#fff",
        paddingTop: "15px",
        paddingBottom: "15px",
        marginTop: "15px",
        marginBottom: "15px",
      }}
    >
      <div
        style={{
          paddingLeft: "15px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div
        style={{
          display: "flex",
          paddingLeft: "15px",
          paddingRight: "15px",
          justifyContent: "space-between",
        }}
      >
        <p>
          Event date:{" "}
          {DateTime.fromISO(createdAt).toLocaleString(
            DateTime.DATE_MED_WITH_WEEKDAY
          )}
        </p>
        <p>Price: {price} DKK</p>
        {availability ? (
          <p>Available {max_number_of_guests - reserved} </p>
        ) : (
          <p>Fully booked</p>
        )}
      </div>
      <div
        style={{
          margin: "0 auto",
          border: "1px solid #fff",
          borderRadius: "3px",
          marginBottom: "20px",
        }}
      >
        <img
          src={imageURL}
          alt={title}
          style={{ display: "block", width: "100%" }}
        />
      </div>
      <div>
        {view ? null : (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              className="ButtonNone"
              onClick={() => {
                setContainer("addReview");
              }}
            >
              Add Review
            </button>
            {availability ? (
              <button
                className="ButtonNone"
                onClick={() => {
                  setContainer("addReservation");
                }}
              >
                Make a reservation
              </button>
            ) : null}
            <button
              className="ButtonNone"
              onClick={() => {
                setContainer("seeReviews");
              }}
            >
              <BsFillEyeFill
                style={{ marginRight: "5px", alignSelf: "stretch" }}
              />
              Reviews
            </button>
            {container != "" && (
              <button
                className="ButtonNone"
                style={{ width: "45px", marginRight: "10px" }}
                onClick={() => {
                  setContainer("");
                }}
              >
                Close
              </button>
            )}
          </div>
        )}
        {container === "addReservation" && (
          <ReservationForm idmeals={idmeals} />
        )}
        {container === "seeReviews" && <ReviewsList idmeals={idmeals} />}
        {container === "addReview" && <ReviewForm idmeals={idmeals} />}
      </div>
    </div>
  );
}

export default MealBox;
