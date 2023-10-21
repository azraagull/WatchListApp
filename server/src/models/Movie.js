const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const MovieSchema = new mongoose.Schema(
  {
    imdbId: { type: String, required: true },
    titleType: { type: String, required: true },
    name: { type: String, required: true },
    year: { type: Number },
    released: { type: Date },
    runTime: { type: String },
    poster: { type: String },
    rating: { type: Number },
    vote: { type: Number },
    genres: { type: Array },
    plot: { type: String },
    director: { type: Array },
    writer: { type: Array },
    actors: { type: Array },
  },
  { timestamps: true }
);

MovieSchema.plugin(mongoosePaginate);

const Movie = mongoose.model("movies", MovieSchema);
module.exports = Movie;
