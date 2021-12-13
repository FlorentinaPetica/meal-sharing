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

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="Meals">
        {newMeals.map((meal) => {
          return (
            <div key={meal.idmeals}>
              <Link to={`/meals/${meal.idmeals}`}>
                <MealBox meal={meal} view={true} />
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default MealsList;
