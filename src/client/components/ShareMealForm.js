import React, { useState } from "react";
import { Link } from "react-router-dom";

function ShareMealForm() {
  const [idmeals, setIdmeals] = useState(null);
  const [createMeal, setCreateMeal] = useState({
    title: "",
    price: "",
    createdAt: new Date().toISOString(),
    max_number_of_guests: "",
    description: "",
    imageURL: "",
  });

  const addMeal = async (createMeal) => {
    setCreateMeal({ submitting: false });

    const response = await fetch("https://meal-sharing-fp.herokuapp.com/api/meals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createMeal),
    });

    const data = await response.json();
    setIdmeals(data[0]);
    setCreateMeal({ submitting: true });

    if (response.status === 200) {
      alert("You've shared a new meal");
    } else {
      alert("Received unexpected error");
      console.error(
        "Received unexpected error from api/meals",
        response.status
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addMeal(createMeal)
      .then(
        setCreateMeal({
          title: "",
          price: "",
          createdAt: "",
          max_number_of_guests: "",
          description: "",
          imageURL: "",
        })
      )
      .catch((e) => {
        alert(`Unexpected error: ${e}`);
        console.error(e);
      });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent:"center", marginBottom:"25px" }}>
      <h3 style={{ textAlign: "center" }}>
        Add a new meal, to create a new event!
      </h3>
      <form style={{ display: "flex", flexDirection: "column" }} className="shareMealForm" onSubmit={handleSubmit}>
        <label>
          <span>Meal title</span>
          <input
            type="text"
            required
            onChange={(e) =>
              setCreateMeal({ ...createMeal, title: e.target.value })
            }
          ></input>
        </label>
        <label>
          <span>Meal Image</span>
          <input
            type="text"
            placeholder="Add an URL for the image"
            required
            onChange={(e) =>
              setCreateMeal({ ...createMeal, imageURL: e.target.value })
            }
          ></input>
        </label>
        <label>
          <span>Meal price for 1 person</span>
          <input
            type="number"
            required
            onChange={(e) =>
              setCreateMeal({ ...createMeal, price: e.target.value })
            }
            placeholder="price"
          ></input>
        </label>
        <label>
          <span>Date of the event.</span>
          <input
            type="date"
            required
            onChange={(e) =>
              setCreateMeal({ ...createMeal, createdAt: e.target.value })
            }
          ></input>
        </label>
        <label>
          <span>Max number of guests.</span>
          <input
            required
            type="number"
            onChange={(e) =>
              setCreateMeal({
                ...createMeal,
                max_number_of_guests: e.target.value,
              })
            }
            placeholder="number of guests"
          ></input>
        </label>
        <label>
          <span>Add a description for your meal.</span>
          <textarea
            onChange={(e) =>
              setCreateMeal({ ...createMeal, description: e.target.value })
            }
          ></textarea>
        </label>
      <div style={{ alignSelf:"center" }}>
        {createMeal.submitting ? (
          <Link to={`/meals/${idmeals}`}>
            <button>View your meal</button>
          </Link>
        ) : (<button style={{ alignSelf:"center" }}>Share your meal</button>)}
      </div>
      </form>
    </div>
  );
}

export default ShareMealForm;
