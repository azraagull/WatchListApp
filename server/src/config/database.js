const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://azra:CSvWTiRN3r8P5HPc@cluster0.r8ydkmh.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("MongoDB'ye bağlandı.");
  } catch (error) {
    console.error("MongoDB Bağlantı Hatası:", error);
  }
};

module.exports = { connectToDatabase };
