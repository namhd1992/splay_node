const Game = require("../models/model.js");

exports.findAll = (req, res) => {
  Game.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Game."
      });
    else res.send(data);
  });
};

// Find a single Game by Id
exports.findOne = (req, res) => {
  Game.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Game with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Game with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};
