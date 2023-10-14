const express = require("express");
const router = express.Router();
const tvShowsController = require("../controllers/tvShowsConroller.js");

router.get("/tvShows", tvShowsController.getTvShows);
router.get("/tvShows/details", tvShowsController.getTvShowDetails);
router.get("/tvShows/:id", tvShowsController.getTvShowById);


module.exports = router;