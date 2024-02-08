const axios = require("axios");
const Category = require("../../models/Category.js");

const apiKey = process.env.RAPIDAPI_KEY;
const host = process.env.RAPIDAPI_HOST;

exports.getCategories = async (req, res) => {
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
};
