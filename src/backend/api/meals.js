const { request, response } = require("express");
const express = require("express");
const Knex = require("knex");
const router = express.Router();
const knex = require("../database");

//Returns all meals
router.get("/", async (request, response) => {
  try {
    console.log("in/api/meals");
    // variable for all the querys I am using so that I can check if one of the requested queryes from the user doesn't match/exists
    const querys = ["maxPrice", "title", "createdAfter", "limit", "availableReservations"];
    const requestQuerys = Object.keys(request.query);
    const matchQuerys = [];
    requestQuerys.some((item) => {
      if (querys.includes(item)) {
        matchQuerys.push(item);
      }
    });
    
    let sortedMeals = await knex("meals");
    const { maxPrice, title, createdAfter, limit, availableReservations } = request.query;
    
    if (matchQuerys.length === requestQuerys.length) {
      // maxPrice	Get meals that has a price smaller than maxPrice	Number	/api/meals?maxPrice=90
      if (maxPrice) {
        sortedMeals = await knex.select('*').from('meals').where('price', '<', `${maxPrice}`)
        }
        // Get meals that still has available reservations
        if (availableReservations) {
          let reserved = await knex('meals').select('title', 'idmeals', 'meals.max_number_of_guests').sum('reservations.number_of_guests as reserved').groupBy('idmeals').leftJoin('reservations', 'reservations.meal_id', 'meals.idmeals')
          sortedMeals = reserved.filter((meal) => { 
            if(meal.max_number_of_guests > meal.reserved || meal.reserved === null) {
              return meal
            }})
        }
        // title	Get meals that partially match a title. Rød grød med will match the meal with the title Rød grød med fløde	String	/api/meals?title=Indian%20platter
        if (title) {
          sortedMeals = await knex.select('*').from('meals').where('title', 'like', `%${title}%`)
        }
        // createdAfter	Get meals that has been created after the date /api/meals?createdAfter=2019-04-05
        if (createdAfter) {
          sortedMeals = await knex.select('*').from('meals').where('createdAt', '>', `${createdAfter}`)
          }
          // limit	Only specific number of meals	Number /api/meals?limit=4
          if (limit) {
            sortedMeals = await knex.select('*').from('meals').limit(`${limit}`);
          }
          if (sortedMeals < 1) {
            return response.status(200).json({ Message: "No meals found" });
          }
          // /api/meals -	Respond with the json for all the meals
          response.json(sortedMeals);
        } else {
          response.status(400).json({ error: "Bad request" });
        }
  } catch (error) {
    throw error;
  }
});

//Adds a new meal
router.post("/", async (request, response) => {
  try {
    const newMeal = await knex("meals").insert(request.body)
    response.send(`${newMeal}`)
  } catch (error) {
    response.status(500).end()
    throw error  
  }
})

//Returns meal by id
router.get("/:id", async (request, response) => {
  try {
    const meal = await knex("meals").where({idmeals: request.params.id});
    response.json(meal);
  } catch (error) {
    throw error;
  }
});

//Updates the meal by id
router.put("/:id", async (request, response) => {
  try {
    const updateMeal = await knex("meals").where({idmeals: request.params.id}).update(request.body, ['id', ...Object.keys(request.body)]);
    response.json(updateMeal);
  } catch (error) {
    throw error;
  }
});

//Deletes the meal by id
router.delete("/:id", async (request, response) => {
  try {
    const deleteMeal = await knex("meals").where({idmeals: request.params.id}).delete();
    response.status(200).send(`Meal with id = ${request.params.id} was deleted`);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
