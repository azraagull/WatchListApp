const express = require("express");
const router = express.Router();
const axios = require("axios");
const Actor = require("../../models/Actor.js");

const apiKey = "e7c680bb91msh7cefc06feb84bf0p16346fjsn68ee6f3b768b";
const host = "moviesdatabase.p.rapidapi.com";
const limitPerPage = 50;
const totalPages = 50;

router.get("/actors", async (req, res) => {
  let allActors = [];
  for (let page = 1; page <= totalPages; page++) {
    const options = {
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

    try {
      const response = await axios.request(options);
      const actors = response.data.results;
      allActors = allActors.concat(actors);
    } catch (error) {
      console.error("Hata:", error);
      return res.status(500).json({ error: "Veri çekme hatası" });
    }
  }
  res.json(allActors);
  await Actor.insertMany(allActors);
});

router.get("/actors/:id", async (req, res) => {
  const actorId = req.params.id;

  const options = {
    method: "GET",
    url: `https://moviesdatabase.p.rapidapi.com/actors/${actorId}`,
    headers: {
      "X-RapidAPI-Key": "e7c680bb91msh7cefc06feb84bf0p16346fjsn68ee6f3b768b",
      "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
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
});

module.exports = router;
