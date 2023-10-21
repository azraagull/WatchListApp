import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Carousel } from "antd";
const { Meta } = Card;

const LatestMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchLatestMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/movies", {
          params: { page: 1 },
        });

        setMovies(response.data.docs); // "released" alanı zaten doğru veri türünde olduğu için dönüş yapmanıza gerek yok
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchLatestMovies();
  }, []);

  return (
    <div className="container mx-auto mt-4 mb-4">
      <div className="max-w-screen-xl mx-auto">
        <Carousel
          dots={false}
          slidesToShow={4}
          slidesToScroll={4}
          draggable={true}
        >
          {movies.map((movie, index) => (
            <div key={index} className="p-3">
              <Card
                hoverable
                className="w-full"
                cover={<img alt="example" src={movie.poster} />}
              >
                <Meta title={movie.name} />
                <p>Released: {new Date(movie.released).toDateString()}</p>
              </Card>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default LatestMovies;
