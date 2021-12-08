import React, { useEffect, useState } from "react";
import ReservationForm from "./ReservationForm";
import MealBox from "./MealBox";

function MealDetail({ match }) {
  const [meal, setMeal] = useState({});

  useEffect(() => {
    setMeal((prev) => ({ ...prev, loading: true }));
    fetchMeal();
  }, []);

  const fetchMeal = async () => {
    const fetchItem = await fetch(
      `https://meal-sharing-fp.herokuapp.com/api/meals/${match.params.id}`
    );
    const meal = await fetchItem.json();
    setMeal(meal[0]);
  };

  if (meal.loading) {
    return <p>Loading meal...</p>;
  }
  if (meal.max_number_of_guests > meal.reserved || meal.reserved === null) {
      meal.availability = true;
    } else meal.availability = false;
  console.log(meal);

  return (
    <div>
      {meal.availability ? <ReservationForm idmeals={match.params.id} /> : null}
      <MealBox meal={meal} />
      
    </div>
  );
}

export default MealDetail;
