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
        name: movie.titleText.text,
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
    const movies = await Movie.find();
    // const apiKey = 'e7c680bb91msh7cefc06feb84bf0p16346fjsn68ee6f3b768b';
    const apiKey = "7dafd82";

    let errorCount = 0; // Hata sayacı
    //0-2500 arasına istek atıldı
    for (let i = 2000; i < 2500; i++) {
      const movieId = movies[i].imdbId;
      const options = {
        method: "GET",
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
        const year =
          movieDetails.Year === "N/A" ? null : parseInt(movieDetails.Year, 10);
        const released =
          movieDetails.Released === "N/A"
            ? null
            : new Date(movieDetails.Released);
        const rating =
          movieDetails.imdbRating === "N/A"
            ? null
            : parseFloat(movieDetails.imdbRating);
        const vote =
          movieDetails.imdbVotes === "N/A"
            ? null
            : parseFloat(movieDetails.imdbVotes);

        await Movie.updateOne(
          { imdbId: movieId },
          {
            $set: {
              year: year,
              released: released,
              runTime:
                movieDetails.Runtime === "N/A" ? null : movieDetails.Runtime,
              poster:
                movieDetails.Poster === "N/A" ? null : movieDetails.Poster,
              rating: rating,
              vote: vote,
              genres:
                movieDetails.Genre === "N/A"
                  ? null
                  : movieDetails.Genre.split(","),
              plot: movieDetails.Plot === "N/A" ? null : movieDetails.Plot,
              director:
                movieDetails.Director === "N/A"
                  ? null
                  : movieDetails.Director.split(","),
              Writer:
                movieDetails.Writer === "N/A"
                  ? null
                  : movieDetails.Writer.split(","),
              actors:
                movieDetails.Actors === "N/A"
                  ? null
                  : movieDetails.Actors.split(","),
            },
          }
        );
      } catch (error) {
        console.error(`ID ${movieId} için hata: `, error);
        errorCount++;
      }
    }

    if (errorCount === 0) {
      res.json({ message: "Detaylar başarıyla eklendi" });
    } else {
      res
        .status(500)
        .json({ error: `Toplam ${errorCount} filmde hata oluştu` });
    }
  } catch (error) {
    console.error("Hata:", error);
    return res.status(500).json({ error: "Detayları alma hatası" });
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

exports.getLatestMovies = async (req, res) => {
  try {
    // Son çıkan filmleri, "released" alanına göre sıralayarak getirin ve ilk 10 filmden oluşan bir liste döndürün
    const latestMovies = await Movie.find({ released: { $lte: new Date() } })
      .sort({ released: -1 })
      .limit(10);

    res.json(latestMovies);
  } catch (error) {
    console.error("Hata:", error);
    return res.status(500).json({ error: "Son çıkan filmleri getirme hatası" });
  }
};

// exports.getMoviesByGenres = async (req, res) => {
//   try {
//     const selectedGenres = req.query.genres; // Kullanıcının seçtiği kategoriler
//     const page = req.query.page || 1;

//     const paginateOptions = {
//       page: page,
//       limit: limitPerPage,
//     };

//     const query = { genres: { $in: selectedGenres } }; // Seçilen kategorilere göre filtrele

//     const filteredMovies = await Movie.paginate(query, paginateOptions);
//     res.json(filteredMovies);
//   } catch (error) {
//     console.error("Hata:", error);
//     return res.status(500).json({ error: "Veri çekme hatası" });
//   }
// };
