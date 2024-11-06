import React, { useEffect } from "react";
import Carousel from "../components/Carousel";
import { Link } from "react-router-dom";

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

  return (
    <div className="flex flex-col gap-5">
      <Carousel images={carouselImages} />
      <div className="flex justify-center gap-4 my-5 uppercase">
        <Link to="/product-category/top" className="w-1/5 group relative">
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white font-extrabold text-lg lg:text-3xl drop-shadow-md">
            top
          </h2>
          <img
            src={categoryImages[0]}
            alt="top"
            className="h-[200px] lg:h-[450px] object-cover group-hover:scale-105 rounded-md transition-transform duration-300"
          />
        </Link>
        <Link to="/product-category/bottom" className="w-1/5 group relative">
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
          className="w-1/5 group relative"
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
        <Link to="/product-category/accessory" className="w-1/5 group relative">
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
    </div>
  );
}
