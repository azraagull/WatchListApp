import React from "react";
import { Card, Carousel } from "antd";
const { Meta } = Card;

const LatestMovies = () => {
  // Örnek film verileri
  const movies = [
    {
      title: "Europe Street Beat 1",
      description: "www.instagram.com",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 2",
      description: "www.instagram.com",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 1",
      description: "www.instagram.com",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 2",
      description: "www.instagram.com",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 1",
      description: "www.instagram.com",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 2",
      description: "www.instagram.com",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 1",
      description: "www.instagram.com",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Europe Street Beat 2",
      description: "www.instagram.com",
      imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    // Diğer filmler buraya eklenebilir
  ];

  return (
    <div className="container mx-auto mt-4 mb-4">
      {" "}
      <div className="max-w-screen-xl mx-auto">
        <Carousel
          dots={false}
          slidesToShow={4}
          slidesToScroll={4}
          draggable={true} // Mouse ile sürükleme etkinleştirildi
        >
          {movies.map((movie, index) => (
            <div key={index} className="p-3">
              <Card
                hoverable
                className="w-full"
                cover={<img alt="example" src={movie.imageUrl} />}
              >
                <Meta title={movie.title} description={movie.description} />
              </Card>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default LatestMovies;
