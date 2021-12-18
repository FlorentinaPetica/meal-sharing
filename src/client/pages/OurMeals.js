import React from "react";
import InputSearchMeals from "../components/InputSearchMeals";
import MealsList from "../components/MealsList";

function OurMeals() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Search for your favourite food, and get inspired!
      </h1>
      <InputSearchMeals />
      <MealsList />
    </div>
  );
}

export default OurMeals;
