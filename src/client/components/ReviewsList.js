import React from "react";
import { useReviews } from "../contexts/ReviewsContext";
import { BsFillStarFill } from "react-icons/bs";

function ReviewsList(props) {
  const { reviews } = useReviews();

  const newReviews = [...reviews];

  const filter = newReviews.filter(
    (review) => review.meal_id === props.idmeals
  );

  return (
    <div style={{ display: "flex", flexDirection: "column-reverse" }}>
      {filter.length > 0 ? (
        filter.map((review) => (
          <div className="ReviewContainer">
            <h4>
              {review.title} : {review.stars} <BsFillStarFill />
            </h4>
            <p>{review.description}</p>
          </div>
        ))
      ) : (
        <p>No reviews for this meal.</p>
      )}
    </div>
  );
}

export default ReviewsList;
