import React from "react";
import MovieList from "../components/movies/MoviesCard";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

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
