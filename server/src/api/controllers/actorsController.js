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
      allActors = allActors.concat(actors);
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
    const actors = await Actor.find(); // Movie koleksiyonundaki tüm filmleri getir
    const apiKey = 'e7c680bb91msh7cefc06feb84bf0p16346fjsn68ee6f3b768b';


    let errorCount = 0; // Hata sayacı

    for (let i = 150; i < 400; i++) {
      const actorId = actors[i].nconst; // Koleksiyondaki filmin OMDb ID'sini alın
      const options = {
        method: 'GET',
        url: `https://moviesminidatabase.p.rapidapi.com/actor/id/${actorId}`,
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        const actorDetails = response.data.results;

        // Movie modelinizde details alanını güncelleyin
        await Actor.updateOne({ nconst: actorId }, { $set: { image: actorDetails.image_url,birthDate: actorDetails.birth_date, birthPlace: actorDetails.birth_place,height: actorDetails.height,sign: actorDetails.star_sign,details: actorDetails.partial_bio} });
      } catch (error) {
        console.error(`ID ${actorId} için hata: `, error);
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

exports.getActorById = async (req, res) => {
  const actorId = req.params.id;

  const options = {
    method: "GET",
    url: `https://moviesminidatabase.p.rapidapi.com/actor/id/${actorId}`,
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const actorData = response.data;

    if (!actorData) {
      return res.status(404).json({ error: "Aktör bulunamadı" });
    }

    res.json(actorData);
  } catch (error) {
    console.error("Hata:", error);
    return res.status(500).json({ error: "Veri çekme hatası" });
  }
};
