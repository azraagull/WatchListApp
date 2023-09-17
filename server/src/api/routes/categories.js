const express = require("express");
const router = express.Router();
const axios = require("axios");
const Category = require("../../models/Category.js");

const apiKey = "e7c680bb91msh7cefc06feb84bf0p16346fjsn68ee6f3b768b";
const host = "moviesdatabase.p.rapidapi.com";

router.get("/categories", async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: "https://moviesdatabase.p.rapidapi.com/titles/utils/genres",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": host,
      },
    };

    const response = await axios.request(options);

    const formattedCategories = response.data.results.map((categoryName) => ({
      name: categoryName,
    }));

    await Category.insertMany(formattedCategories);

    res.json(formattedCategories);
  } catch (error) {
    console.error("Hata:", error);
    return res
      .status(500)
      .json({ error: "Veri çekme hatası", message: error.message });
  }
});

module.exports = router;
