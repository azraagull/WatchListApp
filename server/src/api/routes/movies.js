const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController.js");

router.get("/movies", moviesController.getMovies);
router.get("/movies/details", moviesController.getMovieDetails);
router.get("/movies/:id", moviesController.getMovieById);
router.get("/movies/latest", moviesController.getLatestMovies);
router.get("/movies/byGenres", moviesController.getMoviesByGenres); // Yeni eklenen rota

module.exports = router;
