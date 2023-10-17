import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Pagination } from 'antd';
const apiURL = 'http://localhost:5500/api/movies';
const { Meta } = Card;


const MoviesCard = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 50;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiURL, {
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
        });

        setMovies(response.data.docs);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const cardStyle = {
    width: "200px",
    height: "320px", // Düzenlemek istediğiniz yüksekliği buradan ayarlayın
    // marginBottom: "20px",
  };

  const imageStyle = {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  }

  return (
    <div className="container mx-auto mt-4 mb-4">
      <div className="flex flex-wrap">
        {movies.map((movie) => (
          <div key={movie._id} className="p-5">
            <Card hoverable style={cardStyle}>
              <div style={{ width: "100%", height: "250px" }}>
                <img alt={movie.name} src={movie.poster} style={imageStyle} />
              </div>
              <Meta title={movie.name} style={{ marginTop: "20px" }} />
            </Card>
          </div>
        ))}
      </div>

      <div className="pagination-container items-center justify-between">
        <Pagination
          current={currentPage}
          total={totalPages * itemsPerPage}
          pageSize={itemsPerPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default MoviesCard;
