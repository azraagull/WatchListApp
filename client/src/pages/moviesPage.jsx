import React from "react";
import MovieList from "../components/movies/MoviesCard";
import LatestMovies from "../components/movies/LatestMovies";
import CategoryFiltering from "../components/movies/CategoryFiltering";

const MoviesPage = () => {
  return (
    <div className="flex">
      <div className="w-3/4">
        <MovieList />
        <LatestMovies />
      </div>
      <div className="w-1/4">
        <CategoryFiltering />
      </div>
    </div>
  );
};

export default MoviesPage;
