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
    const transformedMovies = allMovies.map((movie) => {
      return {
        imdbId: movie.id,
        titleType: movie.titleType.text,
        name: movie.titleText.text
      };
    });
    await Movie.insertMany(transformedMovies);
    res.json(transformedMovies);
  } catch (error) {
    console.error("Hata:", error);
    return res.status(500).json({ error: "Veri çekme hatası" });
  }
};
exports.getMovieDetails = async (req, res) => {
  try {
    const movies = await Movie.find(); // Movie koleksiyonundaki tüm filmleri getir
    // const apiKey = 'e7c680bb91msh7cefc06feb84bf0p16346fjsn68ee6f3b768b';
    const apiKey = 'a3a60537';


    let errorCount = 0; // Hata sayacı

    for (let i = 0; i < 1000; i++) {
      const movieId = movies[i].imdbId; // Koleksiyondaki filmin OMDb ID'sini alın
      const options = {
        method: 'GET',
        url: `http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`,
        // url: `https://moviesminidatabase.p.rapidapi.com/movie/id/${movieId}`,
        // headers: {
        //   'X-RapidAPI-Key': apiKey,
        //   'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
        // }
      };

      try {
        const response = await axios.request(options);
        const movieDetails = response.data;

        // Movie modelinizde details alanını güncelleyin
        await Movie.updateOne({ imdbId: movieId }, { $set: { year: movieDetails.Year, released: movieDetails.Released, runTime: movieDetails.Runtime, poster: movieDetails.Poster, rating: movieDetails.imdbRating, vote: movieDetails.imdbVotes, genres: movieDetails.Genre, plot:movieDetails.Plot,
        director: movieDetails.Director, Writer: movieDetails.Writer, actors: movieDetails.Actors } });
      } catch (error) {
        console.error(`ID ${movieId} için hata: `, error);
        errorCount++; // Hata sayacını artırın
      }
    }

    if (errorCount === 0) {
      res.json({ message: 'Detaylar başarıyla eklendi' });
    } else {
      res.status(500).json({ error: `Toplam ${errorCount} filmde hata oluştu` });
    }
  } catch (error) {
    console.error('Hata:', error);
    return res.status(500).json({ error: 'Detayları alma hatası' });
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
