const db = require("../models");
const Offices = db.Offices;

// Create a New Office
exports.create = (req, res) => {
  if (!req.body.address) {
    res.status(400).send({ message: "You must include an address" });
    return;
  }

  const Office = new Offices({
    address: req.body.address,
    city: req.body.city,
    stateOrProvince: req.body.stateOrProvince,
    zipOrPostalCode: req.body.zipOrPostalCode,
    empolyee: req.body.empolyee,
    locationUrl: req.body.locationUrl,
    status: req.body.status,
  });

  Office
    .save(Office)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error encountered while creating the Office",
      });
    });
};

// Find all Offices in Database
exports.findAll = (req, res) => {
  const address = req.query.address;
  var condition = address
    ? { address: { $regex: new RegExp(address), $options: "i" } }
    : {};

    Offices.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while retrivieng Offices data",
      });
    });
};
