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
  .then(data=>{
    res.json(data)
  })

})


module.exports = router;
