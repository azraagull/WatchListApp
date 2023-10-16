const express = require("express");
const router = express.Router();
const actorsController = require("../controllers/actorsController.js");

router.get("/actors", actorsController.getActors);
router.get("/actors/details", actorsController.getActorDetails);
router.get("/actors/:id", actorsController.getActorById);

module.exports = router;
