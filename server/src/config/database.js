const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("MongoDB'ye bağlandı.");
  } catch (error) {
    console.error("MongoDB Bağlantı Hatası:", error);
  }
};

module.exports = { connectToDatabase };
