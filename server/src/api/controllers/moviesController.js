const axios = require("axios");
const Movie = require("../../models/Movie.js");

const apiKey = "e7c680bb91msh7cefc06feb84bf0p16346fjsn68ee6f3b768b";
const host = "moviesdatabase.p.rapidapi.com";

const limitPerPage = 50;
const totalPages = 50;

exports.getMovies = async (req, res) => {
  try {
    const page = req.query.page || 1; //http://localhost:5500/api/movies?page=3
    const paginateOptions = {
      page: page,
      limit: limitPerPage,
    };

    const existingMovies = await Movie.paginate({}, paginateOptions);
    if (existingMovies.docs.length > 0) {
      return res.json(existingMovies);
    }

    let allMovies = [];
    for (let page = 1; page <= totalPages; page++) {
      const apiOptions = {
        method: "GET",
        url: "https://moviesdatabase.p.rapidapi.com/titles",
        params: {
          page: page,
          limit: limitPerPage,
          titleType: "movie",
        },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": host,
        },
      };

      const response = await axios.request(apiOptions);
      const movies = response.data.results;
      allMovies = allMovies.concat(movies);
    }

    await Movie.insertMany(allMovies);
    res.json(allMovies);
  } catch (error) {
    console.error("Hata:", error);
    return res.status(500).json({ error: "Veri çekme hatası" });
  }
};

exports.getMovieById = async (req, res) => {
  const movieId = req.params.id;

  const options = {
    method: "GET",
    url: `https://moviesminidatabase.p.rapidapi.com/series/id/${movieId}/`,
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
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
};
