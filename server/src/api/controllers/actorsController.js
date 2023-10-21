const axios = require("axios");
const Actor = require("../../models/Actor.js");

const apiKey = "e7c680bb91msh7cefc06feb84bf0p16346fjsn68ee6f3b768b";
const host = "moviesdatabase.p.rapidapi.com";

const limitPerPage = 50;
const totalPages = 50;

exports.getActors = async (req, res) => {
  try {
    const page = req.query.page || 1; //http://localhost:5500/api/movies?page=3
    const paginateOptions = {
      page: page,
      limit: limitPerPage,
    };

    const existingActors = await Actor.paginate({}, paginateOptions);
    if (existingActors.docs.length > 0) {
      return res.json(existingActors);
    }

    let allActors = [];
    for (let page = 1; page <= totalPages; page++) {
      const apiOptions = {
        method: "GET",
        url: "https://moviesdatabase.p.rapidapi.com/actors",
        params: {
          page: page,
          limit: limitPerPage,
        },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": host,
        },
      };

      const response = await axios.request(apiOptions);
      const actors = response.data.results;
      const transformedActors = actors.map((actor) => {
        return {
          imdbId: actor.nconst,
          name: actor.primaryName,
          birthYear: actor.birthYear,
          deathYear: actor.deathYear,
          primaryProfession: actor.primaryProfession.split(','),
          popularTitles: actor.knownForTitles.split(','),
        };
      });

      allActors = allActors.concat(transformedActors);
    }

    await Actor.insertMany(allActors);
    res.json(allActors);
  } catch (error) {
    console.error("Hata:", error);
    return res.status(500).json({ error: "Veri çekme hatası" });
  }
};
exports.getActorDetails = async (req, res) => {
  try {
    const actors = await Actor.find();
    const apiKey = "e7c680bb91msh7cefc06feb84bf0p16346fjsn68ee6f3b768b";

    let errorCount = 0;
//0-100 eklendi
    for (let i = 0; i < 100; i++) {
      const imdbId = actors[i].imdbId;
      const options = {
        method: "GET",
        url: `https://moviesminidatabase.p.rapidapi.com/actor/id/${imdbId}`,
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        const actorDetails = response.data.results;
        await Actor.updateOne(
          { imdbId: imdbId },
          {
            $set: {
              image: actorDetails.image_url,
              birthDate: actorDetails.birth_date ? new Date(actorDetails.birth_date) : undefined,
              birthPlace: actorDetails.birth_place,
              height: actorDetails.height,
              sign: actorDetails.star_sign,
              details: actorDetails.partial_bio,
            },
          }
        );
      } catch (error) {
        console.error(`ID ${imdbId} için hata: `, error);
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
exports.getActorMoviesKnownFor = async (req, res) => {
  try {
    const actors = await Actor.find();
    const apiKey = "e7c680bb91msh7cefc06feb84bf0p16346fjsn68ee6f3b768b";

    let errorCount = 0;
//0-97 arası eklendi
    for (let i = 197; i < 300; i++) {
      const imdbId = actors[i].imdbId;
      const options = {
        method: "GET",
        url: `https://moviesminidatabase.p.rapidapi.com/actor/id/${imdbId}/movies_knownFor/`,
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        const actorData = response.data.results.map((result) => result[0]);

        await Actor.updateOne(
          { imdbId: imdbId },
          { $set: { moviesKnownFor: actorData } }
        );
      } catch (error) {
        console.error(`ID ${imdbId} için hata: `, error);
        errorCount++;
      }
    }

    if (errorCount === 0) {
      res.json({ message: "Bilindiği filmler başarıyla eklendi" });
    } else {
      res
        .status(500)
        .json({ error: `Toplam ${errorCount} veride hata oluştu` });
    }
  } catch (error) {
    console.error("Hata:", error);
    return res.status(500).json({ error: "Bilindiği filmleri alma hatası" });
  }
};
exports.getActorSeriesKnownFor = async (req, res) => {
  try {
    const actors = await Actor.find();
    const apiKey = "e7c680bb91msh7cefc06feb84bf0p16346fjsn68ee6f3b768b";

    let errorCount = 0;
//eklenmedi
    for (let i = 0; i < 10; i++) {
      const imdbId = actors[i].imdbId;
      const options = {
        method: "GET",
        url: `https://moviesminidatabase.p.rapidapi.com/actor/id/${imdbId}/series_knownFor/`,
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        const actorData = response.data.results.map((result) => result[0]);

        await Actor.updateOne(
          { imdbId: imdbId },
          { $set: { seriesKnownFor: actorData } }
        );
      } catch (error) {
        console.error(`ID ${imdbId} için hata: `, error);
        errorCount++;
      }
    }

    if (errorCount === 0) {
      res.json({ message: "Bilindiği diziler başarıyla eklendi" });
    } else {
      res
        .status(500)
        .json({ error: `Toplam ${errorCount} veride hata oluştu` });
    }
  } catch (error) {
    console.error("Hata:", error);
    return res.status(500).json({ error: "Bilindiği dizileri alma hatası" });
  }
};
exports.getActorById = async (req, res) => {
  const imdbId = req.params.id;

  const options = {
    method: "GET",
    url: `https://moviesminidatabase.p.rapidapi.com/actor/id/nm0000136/movies_knownFor/`,
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const actorData = response.data.results.map((result) => result[0]);

    if (!actorData) {
      return res.status(404).json({ error: "Aktör bulunamadı" });
    }

    res.json(actorData);
  } catch (error) {
    console.error("Hata:", error);
    return res.status(500).json({ error: "Veri çekme hatası" });
  }
};
