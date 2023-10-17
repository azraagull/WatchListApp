import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "antd";
const { Meta } = Card;
const apiURL = "http://localhost:5500/api/movies";

const MoviesCard = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(apiURL)
      .then((response) => {
        setMovies(response.data.docs);
      })
      .catch((error) => {
        console.error("Veri çekme hatası:", error);
      });
  }, []);

  const cardStyle = {
    width: "200px",
    height: "320px", // Düzenlemek istediğiniz yüksekliği buradan ayarlayın
    // marginBottom: "20px",
  };

  const imageStyle = {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  };

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
    </div>
  );
};

export default MoviesCard;
