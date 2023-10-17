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
    image:String,
    birthDate:String,
    birthPlace:String,
    height:String,
    sign:String,
    details:String,
    moviesKnownFor:Array,
    seriesKnownFor:Array
  },
  { timestamps: true }
);

ActorSchema.plugin(mongoosePaginate);
const Actor = mongoose.model("actors", ActorSchema);
module.exports = Actor;
