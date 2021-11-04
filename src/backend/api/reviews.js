const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const knex = require("../database");

//Returns all reviews
router.get("/", async (request, response) => {
    try {
        console.log("in/api/reviews")
        const reviews = await knex("reviews").select("*");
        response.json(reviews)
      } catch (error) {
        response.status(500).end()
        throw error;     
    }
})

//Adds a new review
router.post("/", async (request, response) => {
    try {
      const newReview = await knex("reviews").insert(request.body)
      response.json(newReview)
    } catch (error) {
      response.status(500).end()
      throw error;     
    }
  })

  //Returns review by id
router.get("/:id", async (request, response) => {
    try {
      const review = await knex("reviews").where({id: request.params.id});
      response.json(review);
    } catch (error) {
      throw error;
    }
  });
  
  //Updates the review by id
  router.put("/:id", async (request, response) => {
    try {
      const updateReview = await knex("reviews").where({id: request.params.id}).update(request.body, ['id', ...Object.keys(request.body)]);
      response.json(updateReview);
    } catch (error) {
      throw error;
    }
  });
  
  //Deletes the review by id
  router.delete("/:id", async (request, response) => {
    try {
      const deleteReview = await knex("reviews").where({id: request.params.id}).delete();
      response.status(200).send(`Review with id = ${request.params.id} was deleted`);
    } catch (error) {
      throw error;
    }
  });
  
  module.exports = router;