const axios = require("axios");
const TvShow = require("../../models/TvShow.js");

const apiKey = "e7c680bb91msh7cefc06feb84bf0p16346fjsn68ee6f3b768b";
const host = "moviesdatabase.p.rapidapi.com";

const limitPerPage = 50;
const totalPages = 50;

exports.getTvShows = async (req, res) => {
  try {
    const page = req.query.page || 1; //http://localhost:5500/api/movies?page=3
    const paginateOptions = {
      page: page,
      limit: limitPerPage,
    };

    const existingTvShows = await TvShow.paginate({}, paginateOptions);
    if (existingTvShows.docs.length > 0) {
      return res.json(existingTvShows);
    }

    let allTvShows = [];
    for (let page = 1; page <= totalPages; page++) {
      const apiOptions = {
        method: "GET",
        url: "https://moviesdatabase.p.rapidapi.com/titles",
        params: {
          page: page,
          limit: limitPerPage,
          titleType: "tvSeries",
        },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": host,
        },
      };

      const response = await axios.request(apiOptions);
      const tvShows = response.data.results;
      allTvShows = allTvShows.concat(tvShows);
    }
    const transformedTvShows = allTvShows.map((tvShow) => {
      return {
        imdbId: tvShow.id,
        titleType: tvShow.titleType.text,
        name: tvShow.titleText.text
      };
    });
    await TvShow.insertMany(transformedTvShows);
    res.json(transformedTvShows);
  } catch (error) {
    console.error("Hata:", error);
    return res.status(500).json({ error: "Veri çekme hatası" });
  }
};
exports.getTvShowDetails = async (req, res) => {
  try {
    const tvShows = await TvShow.find(); // Movie koleksiyonundaki tüm filmleri getir
    // const apiKey = 'e7c680bb91msh7cefc06feb84bf0p16346fjsn68ee6f3b768b';
    const apiKey = 'a3a60537';


    let errorCount = 0; // Hata sayacı

    for (let i = 0; i < 1000; i++) {
      const tvShowId = tvShows[i].imdbId; // Koleksiyondaki filmin OMDb ID'sini alın
      const options = {
        method: 'GET',
        url: `http://www.omdbapi.com/?i=${tvShowId}&apikey=${apiKey}`,
        // url: `https://moviesminidatabase.p.rapidapi.com/movie/id/${movieId}`,
        // headers: {
        //   'X-RapidAPI-Key': apiKey,
        //   'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
        // }
      };

      try {
        const response = await axios.request(options);
        const tvShowDetails = response.data;

        // TvShow modelinizde details alanını güncelleyin
        await TvShow.updateOne({ imdbId: tvShowId }, { $set: { year: tvShowDetails.Year, released: tvShowDetails.Released, runTime: tvShowDetails.Runtime, poster: tvShowDetails.Poster, rating: tvShowDetails.imdbRating, vote: tvShowDetails.imdbVotes, genres: tvShowDetails.Genre, plot:tvShowDetails.Plot,
        director: tvShowDetails.Director, Writer: tvShowDetails.Writer, actors: tvShowDetails.Actors, seasons: tvShowDetails.totalSeasons } });
      } catch (error) {
        console.error(`ID ${tvShowId} için hata: `, error);
        errorCount++; // Hata sayacını artırın
      }
    }

    if (errorCount === 0) {
      res.json({ message: 'Detaylar başarıyla eklendi' });
    } else {
      res.status(500).json({ error: `Toplam ${errorCount} dizide hata oluştu` });
    }
  } catch (error) {
    console.error('Hata:', error);
    return res.status(500).json({ error: 'Detayları alma hatası' });
  }
};

exports.getTvShowById = async (req, res) => {
  const tvShowId = req.params.id;

  const options = {
    method: "GET",
    url: `https://moviesminidatabase.p.rapidapi.com/series/id/${tvShowId}/`,
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const tvShowData = response.data;

    if (!tvShowData) {
      return res.status(404).json({ error: "Dizi bulunamadı" });
    }

    res.json(tvShowData);
  } catch (error) {
    console.error("Hata:", error);
    return res.status(500).json({ error: "Veri çekme hatası" });
  }
};
