import React from "react";
import { Carousel, Card, Row, Col, Button } from "antd";

function HomePage() {
  const carouselSettings = {
    autoplay: true,
    prevArrow: <Button icon="left" />,
    nextArrow: <Button icon="right" />,
  };
  const features = [
    { name: 'Add the desired movie to your favorites list.', description: 'Designed by Good Goods, Inc.' },
    { name: 'Add it to your watched list while watching', description: 'Solid walnut base with rare earth magnets and powder coated steel card cover' },
    { name: 'Mark where you left off.', description: '6.25" x 3.55" x 1.15"' },
    { name: 'Write episode-end reviews.', description: 'Hand sanded and finished with natural oil' },
    { name: 'Come back and check when you want to remember.', description: 'Wood card tray and 3 refill packs' },
    { name: 'Share with your friends.', description: 'Made from natural materials. Grain and color vary with each item.' },
  ]
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
      <div className="relative my-10 overflow-hidden">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                WatchList to Remember
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                Watch, follow, rate, comment, share with friends and more. You
                will never forget which movie the scene comes to your mind from
                again.
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-5xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            src="https://www.movieposters.com/cdn/shop/files/scan_af722215-7d13-4828-b20a-eea0ad296ea9_240x360_crop_center.progressive.jpg?v=1695238505"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://www.movieposters.com/cdn/shop/products/inglourious-basterds-style1.11x17_480x.progressive.jpg?v=1615395835"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://www.movieposters.com/cdn/shop/files/EP_Priscilla_Cineplex_1080x1600_a55ef888-8b06-422b-93ca-3e8ecd9beefc_240x360_crop_center.progressive.jpg?v=1695994612"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://www.movieposters.com/cdn/shop/files/oppenheimer_ver3_480x.progressive.jpg?v=1685026118"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://www.movieposters.com/cdn/shop/products/inglourious-basterds-style4_37d01d94-318d-4840-a290-6fc5aa7b8072_480x.progressive.jpg?v=1615396029"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://www.movieposters.com/cdn/shop/products/star_wars_episode_two_attack_of_the_clones_ver2_xlg_480x.progressive.jpg?v=1628177081"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="#"
                  className="inline-block rounded-md border border-transparent bg-pink-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                >
                  Go Fav List
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-1 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What is WatchList?</h2>
          <p className="mt-4 text-gray-500">
          This application  as a platform that allows users to manage various content. It offers features such as adding movies to favorites, tracking watched content, marking the progress of watching, writing reviews at the end of episodes, sharing with friends, and setting reminders for content to watch later, all aimed at personalizing and sharing.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <Row gutter={16}>
  <Col span={24} md={16}>
    <Carousel {...carouselSettings} dots={true} className="mb-8">
      <div className="relative">
        <img
          src="https://hips.hearstapps.com/hmg-prod/images/classic-movies-1661199935.jpg?crop=1.00xw:0.502xh;0,0&resize=1200:*"
          alt="Film 1"
          className="w-full h-96 object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h3 className="text-xl font-semibold bg-white bg-opacity-70 p-2 rounded-md">

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

          </h3>
        </div>
      </div>
    </Carousel>
  </Col>
  <Col span={24} md={8}>
    <Card title="Upcoming Movies" >
      {/* Yakında Çıkacak Filmler listesi buraya gelir */}
    </Card>
  </Col>
</Row>
<Card title="Most Rated Movies" className="mt-8">
  {/* Popüler filmler listesi buraya gelir */}
</Card>
<Card title="Most Rated Tv-Shows" className="mt-8">
  {/* En çok izlenen diziler listesi buraya gelir */}
</Card>

    </div>
  );
}

export default HomePage;
