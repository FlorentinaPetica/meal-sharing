import React from "react";
import { useMeals } from "../contexts/MealsContext";
import { Link } from "react-router-dom";
import MealBox from "./MealBox";

const MealsList = () => {
  const { meals, loading, error } = useMeals();

  const newMeals = [...meals];

  newMeals.map((meal) => {
    if (meal.max_number_of_guests > meal.reserved || meal.reserved === null) {
      meal.availability = true;
    } else meal.availability = false;
  });

  return (
    <div>
      <ul style={{ listStyleType: "none" }}>
        {loading ? (
          <li>Loading...</li>
        ) : error ? (
          <li>{error}</li>
        ) : (
          newMeals.map((meal) => {
            return (
              <li key={meal.idmeals}>
                <Link to={`/meals/${meal.idmeals}`}>
                  <MealBox meal={meal} view={true} />
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default MealsList;