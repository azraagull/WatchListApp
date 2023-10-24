import React from 'react';
import { Carousel, Card, Row, Col,Button } from 'antd';

function HomePage() {
    const carouselSettings = {
      autoplay: true,
      prevArrow: <Button icon="left" />,
      nextArrow: <Button icon="right" />,
    };
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <Row gutter={16}>
        <Col span={16}>
          <Carousel {...carouselSettings}>
            <div className="relative">
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/classic-movies-1661199935.jpg?crop=1.00xw:0.502xh;0,0&resize=1200:*"
                alt="Film 1"
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <h3 className="text-xl font-semibold bg-white bg-opacity-70 p-2 rounded-md">
                  Film 1
                </h3>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://lifeatthemovies.com/wp-content/uploads/2016/11/2004-672x372.png"
                alt="Film 2"
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <h3 className="text-xl font-semibold bg-white bg-opacity-70 p-2 rounded-md">
                  Film 2
                </h3>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://wallpapers.com/images/hd/movie-background-96xhj51yykiu3p6z.jpg"
                alt="Film 3"
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <h3 className="text-xl font-semibold bg-white bg-opacity-70 p-2 rounded-md">
                  Film 3
                </h3>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://lifeatthemovies.com/wp-content/uploads/2016/11/2004-672x372.png"
                alt="Film 4"
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <h3 className="text-xl font-semibold bg-white bg-opacity-70 p-2 rounded-md">
                  Film 4
                </h3>
              </div>
            </div>
          </Carousel>
        </Col>
        <Col span={8}>
          <Card title="Yakında Çıkacak Filmler">
            {/* Yakında Çıkacak Filmler listesi buraya gelir */}
          </Card>
        </Col>
      </Row>
      <Card title="Popüler Filmler" className="mt-8">
        {/* Popüler filmler listesi buraya gelir */}
      </Card>
      <Card title="Popüler Diziler" className="mt-8">
        {/* En çok izlenen diziler listesi buraya gelir */}
      </Card>
    </div>
  );
}

export default HomePage;
