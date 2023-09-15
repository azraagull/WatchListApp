const mongoose = require("mongoose");

const ActorSchema = new mongoose.Schema({
  nconst: String,
  primaryName: String,
  birthYear: String,
  deathYear: String,
  primaryProfession: String,
  knownForTitles: String,
});

const Actor = mongoose.model("actors", ActorSchema);
module.exports = Actor;
