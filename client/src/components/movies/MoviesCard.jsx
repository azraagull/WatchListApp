import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Pagination } from 'antd';

const { Meta } = Card;

const ActorList = () => {
  const [actors, setActors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // Her sayfada gösterilecek aktör sayısı

  useEffect(() => {
    // Sunucu tarafındaki API rotasını çağıralım
    axios.get('/api/actors') // Sunucu tarafında belirttiğiniz API rotasına göre güncelleyin
      .then((response) => {
        // API'den gelen aktör verilerini state'e kaydedelim
        setActors(response.data);
      })
      .catch((error) => {
        console.error('Veri çekme hatası:', error);
      });
  }, []);

  const currentActors = actors.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const cardStyle = {
    width: '200px', // Genişlik
    marginBottom: '20px', // Alt boşluk
  };

  return (
    <div className="container mx-auto mt-4 mb-4">
      <div className="flex flex-wrap">
        {currentActors.map((actor) => (
          <div key={actor._id} className="p-5">
            <Card
              hoverable
              style={cardStyle}
            >
              <Meta title={actor.primaryName} description={`Profession: ${actor.primaryProfession}`} />
            </Card>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          total={actors.length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default ActorList;
