const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ActorSchema = new mongoose.Schema(
  {
    nconst: String,
    primaryName: String,
    birthYear: String,
    deathYear: String,
    primaryProfession: String,
    knownForTitles: String,
  },
  { timestamps: true }
);
ActorSchema.plugin(mongoosePaginate);

const Actor = mongoose.model("actors", ActorSchema);
module.exports = Actor;
