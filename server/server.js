const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectToDatabase } = require("./src/config/database.js");

const actorRoute = require("./src/api/routes/actors.js");
const movieRoute = require("./src/api/routes/movies.js");
const categoryRoute = require("./src/api/routes/categories.js");
const tvShowRoute = require("./src/api/routes/tvShows.js");
const userRoute = require("./src/api/routes/users.js");

dotenv.config();

const app = express();
const port = process.env.PORT || 5500;

app.use(express.json());
app.use(cors());

app.use("/api", actorRoute);
app.use("/api", movieRoute);
app.use("/api", categoryRoute);
app.use("/api", tvShowRoute);
app.use("/api", userRoute);

connectToDatabase();

app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor.`);
});
