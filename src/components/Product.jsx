import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Product({ product }) {
  const navigate = useNavigate();
  return (
    <div
      className="shadow border border-gray-300 rounded-lg"
      onClick={() => navigate(`/product/${product?.path}`)}
    >
      <div className="w-full relative flex justify-center group cursor-pointer">
        <img
          src={product.imgs[0]}
          alt={product.name}
          className="group-hover:hidden aspect-[1/1] object-cover rounded-t-lg"
        />
        <img
          src={product.imgs[1]}
          alt={product.name}
          className="hidden group-hover:block aspect-[1/1] object-cover rounded-t-lg"
        />
        <div className="absolute rounded-full group/cart top-4 right-5 size-14 items-center justify-center bg-gray-50 shadow hidden group-hover:flex text-gray-900">
          <FontAwesomeIcon
            className="group-hover/cart:text-xl"
            icon={faCartPlus}
          />
        </div>
      </div>
      <p className="m-4 text-xl font-semibold">{product.name}</p>
      <div className="m-4 text-2xl font-semibold">
        {product?.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </div>
      <div className="flex gap-2 m-4">
        {product?.colors?.map((color, index) => (
          <div
            key={index}
            className="rounded-full w-10 aspect-1 border-2 border-black dark:border-white text-transparent hover:opacity-30 cursor-pointer" // Điều chỉnh kích thước và thêm margin
            style={{ backgroundColor: color.code }}
            title={color?.name}
          ></div>
        ))}
      </div>
    </div>
  );
}
