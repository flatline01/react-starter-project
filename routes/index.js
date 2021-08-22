const config = require('../config');
var express = require('express');
var router = express.Router();
const knex = require('knex').knex;
knex.knex = knex(config.connection);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/sakila/src/index.html', { root: __dirname });
});


router.get("/api/actors/", function(req,res,next){
  knex("actor")
  .select("*")
  .join("address","actor.actor_id","=","address.address_id")
  .join("city","address.city_id", "=", "city.city_id")
  .join(
    knex("country").as("X"), "x.country_id", "city.country_id"
  )
  .then(data=>{
    res.json({result:data})
  })
  .catch(err=>{
    res.json({err:"no actors found"})
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
