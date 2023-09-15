const Actor = require("../../models/Actor.js");
const express = require("express");
const router = express.Router();
const axios = require("axios");

const apiKey = "e7c680bb91msh7cefc06feb84bf0p16346fjsn68ee6f3b768b";
const host = "moviesdatabase.p.rapidapi.com";
const limitPerPage = 50;
const totalPages = 50;

for (let page = 1; page <= totalPages; page++) {
  router.get(`/actors/${page}`, async (req, res) => {
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
      await Actor.insertMany(actors);
      res.json(response.data);
    } catch (error) {
      console.error("Hata:", error);
      return res.status(500).json({ error: "Veri çekme hatası" });
    }
  });
}

module.exports = router;
