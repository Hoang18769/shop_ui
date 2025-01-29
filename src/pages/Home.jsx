import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { Link } from "react-router-dom";
import Product from "../components/Product";
export default function Home() {
  useEffect(() => {
    document.title = "Noc";
  }, []);

  const carouselImages = [
    require("../assets/images/banner/Banner-Web-1.jpg"),
    require("../assets/images/banner/Banner-Web-2.jpg"),
    require("../assets/images/banner/Banner-Web-3.jpg"),
    require("../assets/images/banner/Banner-Web-4.jpg"),
    require("../assets/images/banner/Banner-Web-5.jpg"),
  ];

  const categoryImages = [
    require("../assets/images/category/category-1.jpg"),
    require("../assets/images/category/category-2.jpg"),
    require("../assets/images/category/category-3.jpg"),
    require("../assets/images/category/category-4.jpg"),
  ];
  const vid1 = require("../assets/videos/vid1.mp4");

  const [newProducts, setNewProducts] = useState();
  const [bestSellers, setBestSellers] = useState();

  const fetchNewProducts = (newProductsPage) => {
    fetch(
      `${process.env.REACT_APP_BE_ORIGIN}/products/search?sort=createdAt,desc&size=12`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) setNewProducts(data.body.content);
      })
      .catch((error) => console.error(error));
  };

  const fetchBestSellers = (bestSellersPage) => {
    fetch(`${process.env.REACT_APP_BE_ORIGIN}/products/hottest?&size=12`)
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) setBestSellers(data.body.content);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchBestSellers();
    fetchNewProducts();
  }, [])

  return (
    <div className="flex flex-col gap-5">
      <Carousel images={carouselImages} />
      <div className="flex justify-center gap-4 my-5 uppercase">
        <Link to="/product-category/top" className="w-1/4 group relative">
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white font-extrabold text-lg lg:text-3xl drop-shadow-md">
            top
          </h2>
          <img
            src={categoryImages[0]}
            alt="top"
            className="h-[200px] lg:h-[450px] object-cover group-hover:scale-105 rounded-md transition-transform duration-300"
          />
        </Link>
        <Link to="/product-category/bottom" className="w-1/4 group relative">
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white font-extrabold text-lg lg:text-3xl drop-shadow-md">
            bottom
          </h2>
          <img
            src={categoryImages[1]}
            alt="bottom"
            className="h-[200px] lg:h-[450px] object-cover group-hover:scale-105 rounded-md transition-transform duration-300"
          />
        </Link>
        <Link
          to="/product-category/top/hoodies-sweaters"
          className="w-1/4 group relative"
        >
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white font-extrabold text-lg lg:text-3xl drop-shadow-md">
            outerwear
          </h2>
          <img
            src={categoryImages[2]}
            alt="outerwear"
            className="h-[200px] lg:h-[450px] object-cover group-hover:scale-105 rounded-md transition-transform duration-300"
          />
        </Link>
        <Link to="/product-category/accessory" className="w-1/4 group relative">
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white font-extrabold text-lg lg:text-3xl drop-shadow-md">
            accessories
          </h2>
          <img
            src={categoryImages[3]}
            alt="accessories"
            className="h-[200px] lg:h-[450px] object-cover group-hover:scale-105 rounded-md transition-transform duration-300"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h2 className="font-bold text-4xl">New Arrivals</h2>
          <Link to="/product-category" className="hover:underline">
            View all
          </Link>
        </div>
        <div className="new-products-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {newProducts?.map((p, index) => (
            <Product key={index} product={p} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h2 className="font-bold text-4xl">Best Sellers</h2>
          <Link to="/product-category" className="hover:underline">
            View all
          </Link>
        </div>
        <div className="new-products-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bestSellers?.map((p, index) => (
            <Product key={index} product={p} />
          ))}
        </div>
      </div>
      <hr className="w-full" />
      <div className="flex gap-5 flex-col lg:flex-row">
        <div className="lg:w-2/3 border-b-2 pb-5 lg:border-r-2 lg:pr-5 lg:pb-0 lg:border-b-0 border-black dark:border-white">
          <video autoPlay muted loop>
            <source src={vid1} type="video/mp4" />
          </video>
        </div>
        <div className="lg:w-1/3 text-justify">
          <h2 className="font-bold text-4xl">About us</h2>
          <p>
            Launched in Saigon in 2022, Nocturnal® is not only a local brand,
            but also a symbol of creativity and passion. Founded by a group of
            young, passionate designers, Nocturnal ® bears the spirit of the
            people who love to live the nightlife.
          </p>
          <p>
            Nocturnal® not only creates fashion, but also creates a story, a
            lifestyle and personality 💙 Step by step, Nocturnal® is now a
            familiar name among Vietnamese youth, Now, they are determined to
            spread their enthusiasm at night to every corner of Asia.
          </p>
        </div>
      </div>
    </div>
  );
}
