import React from "react";
import MoviesCard from "../components/movies/MoviesCard";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ActorList from "../components/movies/MoviesCard";

const moviesPage = () => {
  return (
    <div>
      <Header />
      <ActorList />
      <Footer />
    </div>
  );
};

export default moviesPage;
