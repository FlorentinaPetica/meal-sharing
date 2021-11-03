const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const knex = require("../database");

//Returns all reservations
router.get("/", async (request, response) => {
    try {
        console.log("in/api/reservations")
        const reservations = await knex("reservations").select("*");
        response.send(`${reservations}`)
      } catch (error) {
        response.status(500).end()
        throw error;     
    }
})

//Adds a new reservation
router.post("/", async (request, response) => {
    try {
      const newReservation = await knex("reservations").insert(request.body)
      response.send(`${newReservation}`)
    } catch (error) {
      response.status(500).end()
      throw error;     
    }
  })

  //Returns reservation by id
router.get("/:id", async (request, response) => {
    try {
      const reservation = await knex("reservations").where({id: request.params.id});
      response.json(reservation);
    } catch (error) {
      throw error;
    }
  });
  
  //Updates the reservation by id
  router.put("/:id", async (request, response) => {
    try {
      const updateReservation = await knex("reservations").where({id: request.params.id}).update(request.body, ['id', ...Object.keys(request.body)]);
      response.json(updateReservation);
    } catch (error) {
      throw error;
    }
  });
  
  //Deletes the reservation by id
  router.delete("/:id", async (request, response) => {
    try {
      const deleteReservation = await knex("reservations").where({id: request.params.id}).delete();
      response.status(200).send(`Reservation with id = ${request.params.id} was deleted`);
    } catch (error) {
      throw error;
    }
  });
  

  module.exports = router;