import React from "react";
const { DateTime } = require("luxon");

function MealBox(props) {
  const {
    title,
    description,
    price,
    createdAt,
    availability,
    max_number_of_guests,
    reserved,
    imageURL
  } = props.meal;

  return (
    <div
      style={{
        backgroundColor: "#125447",
        borderRadius: "3px",
        width:"65%",
        display: "flex",
        flexDirection:"column",
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
            margin: "0 auto",
            border: "1px solid #fff",
            borderRadius: "3px",
          }}
          
        >
            <img
                  src={
                   imageURL
                  }
                  alt={title}
                  style={{ display: "block", width: "100%" }}
                />
        </div>
      <div style={{ display:"flex", paddingLeft:"15px", paddingRight:"15px", justifyContent:"space-between" }}>
        <p>
          Event date:{" "}
          {DateTime.fromISO(createdAt).toLocaleString(
            DateTime.DATE_MED_WITH_WEEKDAY
          )}
        </p>
        <p>Price: {price}</p>
        {availability
          ? (<p>Available {max_number_of_guests - reserved} </p>)
          : (<p>"Fully booked"</p>)}
      </div>
    </div>
  );
}

export default MealBox;
