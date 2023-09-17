const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");

const app = express();
const cors = require("cors");
const port = process.env.PORT || 5500;

//routes
const actorRoute = require("./src/api/routes/actors.js");
const movieRoute = require("./src/api/routes/movies.js");
const categoryRoute = require("./src/api/routes/categories.js");

dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://azra:v2oYtxHemMQ4MHTM@cluster0.r8ydkmh.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

//middleware
app.use(express.json());
app.use(cors());

app.use("/api", actorRoute);
app.use("/api", movieRoute);
app.use("/api", categoryRoute);

app.listen(port, () => {
  connect();
  console.log(`Server ${port} portunda çalışıyor.`);
});
