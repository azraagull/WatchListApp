const express = require("express");
const router = express.Router();
const axios = require("axios");
const Movie = require("../../models/Movie.js");

const limitPerPage = 50;
const totalPages = 50;

router.get("/movies", async (req, res) => {
  let allMovies = [];
  for (let page = 1; page <= totalPages; page++) {
    const options = {
      method: "GET",
      url: "https://moviesdatabase.p.rapidapi.com/titles",
      params: {
        page: page,
        limit: limitPerPage,
        titleType: "movie",
      },
      headers: {
        "X-RapidAPI-Key": "e7c680bb91msh7cefc06feb84bf0p16346fjsn68ee6f3b768b",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const movies = response.data.results;
      allMovies = allMovies.concat(movies);
    } catch (error) {
      console.error("Hata:", error);
      return res.status(500).json({ error: "Veri çekme hatası" });
    }
  }
  res.json(allMovies);
  await Movie.insertMany(allMovies);
});

router.get("/movies/:id", async (req, res) => {
  const movieId = req.params.id;

  const options = {
    method: "GET",
    url: `https://moviesdatabase.p.rapidapi.com/titles/${movieId}`,
    headers: {
      "X-RapidAPI-Key": "e7c680bb91msh7cefc06feb84bf0p16346fjsn68ee6f3b768b",
      "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const movieData = response.data;

    if (!movieData) {
      return res.status(404).json({ error: "Film bulunamadı" });
    }

    res.json(movieData);
  } catch (error) {
    console.error("Hata:", error);
    return res.status(500).json({ error: "Veri çekme hatası" });
  }
});

module.exports = router;
