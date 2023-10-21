import React from "react";
import MovieList from "../components/movies/MoviesCard";
import LatestMovies from "../components/movies/LatestMovies";

const moviesPage = () => {
  return (
    <div>
      <MovieList />
      <LatestMovies />
    </div>
  );
};

export default moviesPage;
