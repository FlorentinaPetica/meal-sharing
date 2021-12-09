import React, { useEffect, useState } from "react";
import MealBox from "./MealBox";

function MealDetail({ match }) {
  const [meal, setMeal] = useState({});

  useEffect(() => {
    setMeal((prev) => ({ ...prev, loading: true }));
    fetchMeal();
  }, []);

  const fetchMeal = async () => {
    const fetchItem = await fetch(`./api/meals/${match.params.id}`);
    const meal = await fetchItem.json();
    setMeal(meal[0]);
  };

  if (meal.loading) {
    return <p>Loading meal...</p>;
  }
  if (meal.max_number_of_guests > meal.reserved || meal.reserved === null) {
    meal.availability = true;
  } else {
    meal.availability = false;
  }

  return (
    <div>
<<<<<<< HEAD
      <MealBox meal={meal} view={false} />
=======
      {meal.availability ? <ReservationForm idmeals={match.params.id} /> : null}
      <MealBox meal={meal} />
      
>>>>>>> fde9f77a084d4cbea385b584a9db5dc58f87edd6
    </div>
  );
}

export default MealDetail;
