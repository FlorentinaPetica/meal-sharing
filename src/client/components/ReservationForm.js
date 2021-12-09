import React, { useState } from "react";

function ReservationForm({ idmeals }) {
  const [createReservation, setCreateReservation] = useState({
    number_of_guests: "",
    meal_id: idmeals,
    created_date: new Date().toISOString(),
    contact_name: "",
    contact_email: "",
    phone_number: "",
  });

  const addReservation = async () => {
    setCreateReservation({ submitting: false });

    const response = await fetch("./api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createReservation),
    });

    const data = await response.json();
    setCreateReservation({ submitting: true });

    if (response.status === 200) {
      alert("You've booked a meal");
      window.location.reload(false);
    } else {
      alert("Received unexpected error");
      console.error(
        "Received unexpected error from api/reservations",
        response.status
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addReservation(createReservation)
      .then(
        setCreateReservation({
          number_of_guests: "",
          contact_name: "",
          contact_email: "",
          phone_number: "",
        })
      )
      .catch((e) => {
        alert(`Unexpected error: ${e}`);
        console.error(e);
      });
  };

  return (
    <div className="Reservation">
      <form onSubmit={handleSubmit} className="ReservationForm">
        <div>
          <label>
            <span>Name</span>
            <input
              type="text"
              value={createReservation.contact_name}
              required
              onChange={(e) =>
                setCreateReservation({
                  ...createReservation,
                  contact_name: e.target.value,
                })
              }
            ></input>
          </label>
          <label>
            <span>Email</span>
            <input
              type="email"
              value={createReservation.contact_email}
              required
              onChange={(e) =>
                setCreateReservation({
                  ...createReservation,
                  contact_email: e.target.value,
                })
              }
              placeholder="email"
            ></input>
          </label>
        </div>
        <div>
          <label>
            <span>Number of guests</span>
            <input
              required
              type="number"
              value={createReservation.number_of_guests}
              onChange={(e) =>
                setCreateReservation({
                  ...createReservation,
                  number_of_guests: e.target.value,
                })
              }
              placeholder="number of guests"
            ></input>
          </label>
          <label>
            <span>Phone number</span>
            <input
              required
              type="number"
              value={createReservation.phone_number}
              onChange={(e) =>
                setCreateReservation({
                  ...createReservation,
                  phone_number: e.target.value,
                })
              }
              placeholder="Phone Number"
            ></input>
          </label>
        </div>
        <button className="BookButton">
          {createReservation.submitting ? "New booking" : "Book"}
        </button>
      </form>
    </div>
  );
}

export default ReservationForm;
