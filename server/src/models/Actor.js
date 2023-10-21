const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ActorSchema = new mongoose.Schema(
  {
    imdbId: String,
    name: String,
    birthYear: String,
    deathYear: String,
    primaryProfession: Array,
    popularTitles: Array,
    image:String,
    birthDate:Date,
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
