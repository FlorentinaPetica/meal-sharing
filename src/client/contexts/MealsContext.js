import React, { useState, useEffect } from "react";

const MealsContext = React.createContext();

const MealsProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [titles, setTitles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMeals = async () => {
    const API_URL = `https://meal-sharing-fp.herokuapp.com/api/meals`;
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
          const allTitles = data.map((data) => data.title)
          setTitles(allTitles);
          setMeals(data);
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
      fetchMeals();
    }
  }, [error]);

  return (
    <MealsContext.Provider
      value={{ meals, titles, setTitles, loading, error }}
    >
      {children}
    </MealsContext.Provider>
  );
};

export const useMeals = () => React.useContext(MealsContext);

export default MealsProvider;
