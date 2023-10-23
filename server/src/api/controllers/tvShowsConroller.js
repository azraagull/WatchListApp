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
        name: tvShow.titleText.text,
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
    const tvShows = await TvShow.find();
    // const apiKey = 'e7c680bb91msh7cefc06feb84bf0p16346fjsn68ee6f3b768b';
    const apiKey = "7dafd82";

    let errorCount = 0;
    //0-1480 arasına istek atıldı
    for (let i = 500; i < 1000; i++) {
      const tvShowId = tvShows[i].imdbId;
      const options = {
        method: "GET",
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

        const year =
          tvShowDetails.Year === "N/A"
            ? null
            : parseInt(tvShowDetails.Year, 10);
        const released =
          tvShowDetails.Released === "N/A"
            ? null
            : new Date(tvShowDetails.Released);
        const rating =
          tvShowDetails.imdbRating === "N/A"
            ? null
            : parseFloat(tvShowDetails.imdbRating);
        const vote =
          tvShowDetails.imdbVotes === "N/A"
            ? null
            : parseFloat(tvShowDetails.imdbVotes);
        const seasons =
          tvShowDetails?.totalSeasons === "N/A"
            ? null
            : parseFloat(tvShowDetails.totalSeasons) || null;
        await TvShow.updateOne(
          { imdbId: tvShowId },
          {
            $set: {
              year: year,
              released: released,
              runTime:
                tvShowDetails.Runtime === "N/A" ? null : tvShowDetails.Runtime,
              poster:
                tvShowDetails.Poster === "N/A" ? null : tvShowDetails.Poster,
              rating: rating,
              vote: vote,
              genres:
                tvShowDetails.Genre === "N/A"
                  ? null
                  : tvShowDetails.Genre.split(","),
              plot: tvShowDetails.Plot,
              director:
                tvShowDetails.Director === "N/A"
                  ? null
                  : tvShowDetails.Director.split(","),
              Writer:
                tvShowDetails.Writer === "N/A"
                  ? null
                  : tvShowDetails.Actors.split(","),
              actors:
                tvShowDetails.Actors === "N/A"
                  ? null
                  : tvShowDetails.Actors.split(","),
              seasons: seasons,
            },
          }
        );
      } catch (error) {
        console.error(`ID ${tvShowId} için hata: `, error);
        errorCount++;
      }
    }

    if (errorCount === 0) {
      res.json({ message: "Detaylar başarıyla eklendi" });
    } else {
      res
        .status(500)
        .json({ error: `Toplam ${errorCount} dizide hata oluştu` });
    }
  } catch (error) {
    console.error("Hata:", error);
    return res.status(500).json({ error: "Detayları alma hatası" });
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
