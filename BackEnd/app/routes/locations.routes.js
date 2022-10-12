module.exports = (app) => {
  const Offices = require("../controllers/locations.controllers.js");

  var router = require("express").Router();

  //Retrieve All Offices
  router.get("/", Offices.findAll);

  //Post to A Office
  router.post("/", Offices.create);

  app.use("/api/locations", router);
};
