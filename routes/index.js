const config = require('../config');
var express = require('express');
var router = express.Router();
const knex = require('knex').knex;
knex.knex = knex(config.connection);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/sakila/src/index.html', { root: __dirname });
});

router.get("/testroute", function(req,res,next) {
  res.send("ok")
})


router.get("/api/actors/:limit?/:startat?", async function(req,res,next){
  let limit = req.params.limit || "10";
  let startAt = req.params.startat || "0"
  let numOfActors = await knex("actor").count('actor_id as CNT').then(data=>{return data[0].CNT})
  knex("actor")
  .select("*")
  .join("address","actor.actor_id","=","address.address_id")
  .join("city","address.city_id", "=", "city.city_id")
  .join("profiles","profiles.id", "=", "actor.actor_id")
  .join(
    knex("country").as("X"), "x.country_id", "city.country_id"
  )
  .limit(limit)
  .then(data=>{
    res.json({
      startAt:startAt,
      numOfActors:numOfActors,
      result:data
    })
  })
  .catch(err=>{
    res.json({err:"no actors found"})
  })

})



router.get("/api/cities/:country_id", function(req,res,next){
  knex("country")
  .select("city_id","city")
  .join("city", "city.country_id","=","country.country_id")
  .where({
    "country.country_id":req.params.country_id
  })
  .then(data=>{
    console.log(data)
    res.json({result:data})
  })
  .catch(err=>{
    res.json({err:err})
  })



})

router.get("/api/getById/:id?", async function (req,res,next) {
  let numOfActors = await knex("actor").count('actor_id as CNT').then(data=>{return data[0].CNT})
  knex("actor")
  .where({actor_id:req.params.id})
  .then(data=>{
    res.json({
      numOfActors:numOfActors,
      result:data})
  })
})

router.get("/api/countries", function(req,res,next){
  knex('country')
  .select("country_id", "country")
  .then(data=>{
    res.json({result:data})
  })
  .catch(err=>{
    res.json({err:"no countries found"})
  })
})

module.exports = router;
