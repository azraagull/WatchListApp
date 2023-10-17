import React from "react";
import MoviesCard from "../components/movies/MoviesCard";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MovieList from "../components/movies/MoviesCard";

const moviesPage = () => {
  return (
    <div>
      <Header />
      <MovieList />
      <Footer />
    </div>
  );
};

export default moviesPage;
