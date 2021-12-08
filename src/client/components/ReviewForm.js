import React, { useState } from "react";

function ReviewForm({ idmeals }) {

  const [createReview, setCreateReview] = useState({
    title: "",
    meal_id: idmeals,
    description: "",
    stars: "",
    created_date: new Date().toISOString(),
  });

  const addReview = async (createReview) => {
    setCreateReview({ submitting: false });

    const response = await fetch("./api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createReview),
    });

    const data = await response.json();
    setCreateReview({ submitting: true });

    if (response.status === 200) {
      window.location.reload(false);
    } else {
      alert("Received unexpected error");
      console.error(
        "Received unexpected error from api/reviews",
        response.status
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addReview(createReview)
      .then(
        setCreateReview({
          title: "",
          description: "",
          stars: "",
        })
      )
      .catch((e) => {
        alert(`Unexpected error: ${e}`);
        console.error(e);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="ReviewForm">
        <input
          required
          type="text"
          placeholder="Give a short description..."
          onChange={(e) =>
            setCreateReview({
              ...createReview,
              title: e.target.value,
            })
          }
          value={createReview.title}
        ></input>
        <textarea
          placeholder="Description"
          onChange={(e) =>
            setCreateReview({
              ...createReview,
              description: e.target.value,
            })
          }
          value={createReview.description}
        ></textarea>
        <input
          required
          type="number"
          placeholder="Number of stars"
          onChange={(e) =>
            setCreateReview({
              ...createReview,
              stars: e.target.value,
            })
          }
          value={createReview.stars}
        ></input>
        <button style={{ display: "flow", marginLeft: "10px" }}>Submit</button>
      </form>
    </div>
  );
}

export default ReviewForm;
