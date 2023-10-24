import React, { useState } from "react";
import MovieList from "../components/movies/MoviesCard";
import LatestMovies from "../components/movies/LatestMovies";
import CategoryFiltering from "../components/movies/CategoryFiltering";

const MoviesPage = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  return (
    <div className="flex">
      <div className="w-3/4">
        <MovieList selectedGenres={selectedGenres} />
        <LatestMovies />
      </div>
      <div className="w-1/4">
        <CategoryFiltering
          onFilterChange={setSelectedGenres}
          selectedGenres={selectedGenres}
        />
      </div>
    </div>
  );
};

export default MoviesPage;
