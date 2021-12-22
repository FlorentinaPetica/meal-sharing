import React, { useState } from "react";
import { useMeals } from "../contexts/MealsContext";
import { BsSearch } from "react-icons/bs";
import { FiDelete } from "react-icons/fi";
import { Link } from "react-router-dom";

function InputSearchMeals() {
  const { meals } = useMeals();
  const [filtered, setFiltered] = useState([]);
  const [value, setValue] = useState("");

  const onChangeInput = (e) => {
    const searchValue = e.target.value;
    const filterTitles = meals.filter((meal) => {
      return meal.title.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFiltered(filterTitles);
    setValue(searchValue);
  };

  const clearSearch = (e) => {
    setFiltered([]);
    setValue("");
  };

  return (
    <div className="MealsSearch">
      <div>
        <label>
          <input
            className="MealsSearchInput"
            onChange={onChangeInput}
            placeholder="Search for meals"
            value={value}
          />
          {value.length === 0 ? (
            <BsSearch style={{ paddingTop: "2px" }} />
          ) : (
            <button onClick={clearSearch} className="ClearSearch">
              <FiDelete style={{ color: "#125447" }} />
            </button>
          )}
        </label>
      </div>
      {filtered.length != 0 && (
        <div className="searchResult" style={{ backgroundColor: "#fff" }}>
          {filtered.map((meal) => (
            <Link key={meal.idmeals} to={`/meals/${meal.idmeals}`}>
              <h4>{meal.title}</h4>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default InputSearchMeals;
