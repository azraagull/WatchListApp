const express = require("express");
const router = express.Router();
const actorsController = require("../controllers/actorsController.js");

router.get("/actors", actorsController.getActors);
router.get("/actors/details", actorsController.getActorDetails);
router.get("/actors/a", actorsController.getActorById);
router.get("/actors/moviesKnownFor", actorsController.getActorMoviesKnownFor);
router.get("/actors/seriesKnownFor", actorsController.getActorSeriesKnownFor);

module.exports = router;
