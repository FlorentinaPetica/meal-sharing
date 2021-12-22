import React, { useState, useEffect } from "react";

const ReviewsContext = React.createContext();

const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    const API_URL = `./api/reviews`;
    try {
      await fetch(API_URL)
        .then((response) => {
          if (!response.ok) {
            throw Error("Could not fetch the data ");
          } else {
            return response.json();
          }
        })
        .then((data) => {
          setReviews(data);
          setLoading(false);
        });
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (error) {
      setLoading(false);
    } else {
      setLoading(true);
      fetchReviews();
    }
  }, [error]);

  return (
    <ReviewsContext.Provider value={{ reviews, loading }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => React.useContext(ReviewsContext);

export default ReviewsProvider;
