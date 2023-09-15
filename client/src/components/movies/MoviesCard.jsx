import React from "react";
import { Card, Pagination } from "antd";

const { Meta } = Card;

const MovieCard = () => {
  // Örnek film verileri
  const movies = [
    {
      title: "Europe Street Beat 1",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 2",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 1",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 2",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 1",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 2",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 1",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 2",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 1",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 2",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 1",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 2",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 1",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 2",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 1",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 2",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 1",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 2",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 1",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 2",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
  ];

  // Sayfa numarası ve her sayfada gösterilecek kart sayısı
  const pageSize = 12; // 2 sıra x 4 sütun = 8 kart
  const [currentPage, setCurrentPage] = React.useState(1);

  // Şu anki sayfadaki filmleri hesapla
  const currentMovies = movies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Kartların boyutunu küçültmek için kullanılan stil
  const cardStyle = {
    width: "150px", // Genişlik
    height: "250px", // Yükseklik
  };

  return (
    <div className="container mx-auto mt-4 mb-4">
      {" "}
      {/* Üstten ve alttan boşluk ekleyin */}
      <div className="flex flex-wrap">
        {currentMovies.map((movie, index) => (
          <div key={index} className="p-5">
            <Card
              hoverable
              style={cardStyle}
              cover={<img alt="example" src={movie.imageUrl} />}
            >
              <Meta title={movie.title} />
            </Card>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          total={movies.length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default MovieCard;
