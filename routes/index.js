const config = require('../config');
var express = require('express');
var router = express.Router();
const knex = require('knex').knex;
knex.knex = knex(config.connection);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.all("/api/actors/", function(req,res,next){
  knex("actor").select("*")
  .join("address","actor.actor_id","=","address.address_id")
  .join("city","address.city_id", "=", "city.city_id")
  .then(data=>{
    res.json({result:data})
  })

})


module.exports = router;
