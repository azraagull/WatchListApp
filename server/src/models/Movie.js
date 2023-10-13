const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const MovieSchema = new mongoose.Schema(
  {
    imdbId: { type: String, required: true},
    titleType: { type: String, required: true },
    name: { type: String, required: true },
    year: { type: String },
    released: { type: String },
    runTime: { type: String },
    poster: { type: String },
    rating: { type: String },
    vote: { type: String },
    genres: { type: String },
    plot: { type: String },
    director: { type: String },
    writer: { type: String },
    actors: { type: String }
  },
  { timestamps: true }
);

MovieSchema.plugin(mongoosePaginate);

const Movie = mongoose.model("movies", MovieSchema);
module.exports = Movie;
