import React, { useState } from "react";
import ReviewsList from "./ReviewsList";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import ReviewForm from "./ReviewForm";

function ReviewBox(props) {
  const [viewReviews, setViewReviews] = useState(false);
  const [showAvg, setShowAvg] = useState();

  const viewReview = () => {
    setViewReviews(!viewReviews);
    setShowAvg("false");
  };

  return (
    <div>
      <ReviewForm idmeals={props.id} />
      {!viewReviews ? (
        <button className="ButtonNone" onClick={viewReview}>
          <BsFillEyeSlashFill
            style={{ marginRight: "5px", alignSelf: "stretch" }}
          />
          Reviews
        </button>
      ) : (
        <div>
          <button className="ButtonNone" onClick={viewReview}>
            <BsFillEyeFill style={{ marginRight: "5px" }} /> Reviews
          </button>
          {/* <ReviewsList id={props.id} /> */}
        </div>
      )}
    </div>
  );
}

export default ReviewBox;
