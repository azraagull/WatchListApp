const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const TvShowSchema = new mongoose.Schema(
  {
    imdbId: { type: String, required: true},
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
    seasons:{type: Number}
  },
  { timestamps: true }
);

TvShowSchema.plugin(mongoosePaginate);

const TvShow = mongoose.model("tvShows", TvShowSchema);
module.exports = TvShow;
