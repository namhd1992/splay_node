module.exports = app => {
  const game = require("../controllers/controller.js");

  var router = require("express").Router();


  // Retrieve all Game
  router.get("/", game.findAll);

  // Retrieve a single Game with id
  router.get("/:id", game.findOne);

  app.use('/api', router);
};
