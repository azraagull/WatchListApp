import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card} from 'antd';
const apiURL = 'http://localhost:5500/api/movies'
const { Meta } = Card;

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Sunucu tarafındaki API rotasını çağıralım
    axios.get(apiURL) // Sunucu tarafında belirttiğiniz API rotasına göre güncelleyin
      .then((response) => {
        // API'den gelen aktör verilerini state'e kaydedelim
        setMovies(response.data.docs);
      })
      .catch((error) => {
        console.error('Veri çekme hatası:', error);
      });
  }, []);


  const cardStyle = {
    width: '200px', // Genişlik
    marginBottom: '20px', // Alt boşluk
  };

  return (
    <div className="container mx-auto mt-4 mb-4">
      <div className="flex flex-wrap">
        {movies.map(movie => (
          <div key={movie._id} className="p-5">
          <Card
            hoverable
            style={cardStyle}
            cover={<img alt={movie.name} src={movie.poster} />}
          >
            <Meta
              title={movie.name}
            />
          </Card>
        </div>
        ))}
      </div>
      
    </div>
  );
};

export default MovieList;
