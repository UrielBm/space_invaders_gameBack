const express = require("express");
const router = express.Router();

//controllers
const RegisterController = require("./../controller/RegisterController");
//services
const RecordsServices = require("./../services/RecordServices");
//intances
const IntancesRegister = new RegisterController(new RecordsServices());
/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Bienvenido al servidor back de space-invaders game by Uriel");
});

/*Rutas de registros */
router.get("/record/:id", (req, res) => {
  IntancesRegister.getRecord(req);
});
router.get("/records", (req, res) => {
  IntancesRegister.getRecords(req, res);
});
router.get("/bestplaces", (req, res) => {
  IntancesRegister.getTopTen(req, res);
});
router.post("/registerrecord", (req, res) => {
  IntancesRegister.registerRecord(req, res);
});
module.exports = router;
