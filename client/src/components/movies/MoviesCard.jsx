import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Pagination } from "antd";

const apiURL = "http://localhost:5500/api/movies";
const { Meta } = Card;

const MoviesCard = ({ selectedGenres }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiURL, {
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
        });

        setAllMovies(response.data.docs);
        const filteredMovies = filterMovies(allMovies, selectedGenres);
        setTotalPages(Math.ceil(filteredMovies.length / itemsPerPage));
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchData();
  }, [currentPage, selectedGenres]);

  const filterMovies = (movies, genres) => {
    if (genres.length === 0) {
      return movies; // Eğer hiçbir kategori seçilmemişse, tüm filmleri göster
    }
    return movies.filter((movie) => {
      for (const genre of genres) {
        if (movie.genres && movie.genres.includes(genre)) {
          return true;
        }
      }
      return false;
    });
  };

  const filteredMovies = filterMovies(allMovies, selectedGenres);

  return (
    <div>
      <div className="container">
        <div className="flex flex-wrap justify-center">
          {filteredMovies
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((movie) => (
              <div key={movie._id} className="p-5">
                <Card hoverable className="w-52 h-80">
                  <div className="w-full h-60">
                    <img
                      src={movie.poster}
                      className="object-cover w-full h-full"
                      alt={movie.name}
                    />
                  </div>
                  <Meta title={movie.name} className="pt-5 text-center" />
                </Card>
              </div>
            ))}
        </div>
      </div>

      <div className="pagination-container flex items-center justify-center">
        <Pagination
          current={currentPage}
          total={filteredMovies.length}
          pageSize={itemsPerPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default MoviesCard;
