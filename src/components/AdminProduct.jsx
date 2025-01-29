import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminProduct({ product }) {
  const navigate = useNavigate();
  return (
    <div
      className="shadow border border-gray-300 rounded-lg flex"
      onClick={() => navigate(`/admin/product/${product?.path}`)}
    >
      <div className="w-40 flex justify-center cursor-pointer">
        <img
          src={product.img}
          alt={product.name}
          className="w-40 aspect-1 object-cover rounded-t-lg"
        />
      </div>
      <div>
          <p className="m-4 text-xl font-semibold">{product.name}</p>
          <div className="m-4 text-2xl font-semibold">
            {product?.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </div>
          <div className="flex gap-2 m-4 flex-wrap">
            {product?.colors?.map((color, index) => (
              <div
                key={index}
                className="rounded-full w-6 lg:w-10 aspect-1 border-2 border-black dark:border-white text-transparent hover:opacity-30 cursor-pointer" // Điều chỉnh kích thước và thêm margin
                style={{ backgroundColor: color.code }}
                title={color?.name}
              ></div>
            ))}
          </div>
          <div className="flex gap-2 m-4 flex-wrap">
            {product?.sizes?.map((size, index) => (
              <div
                key={index}
                className="rounded-full text-center text-sm lg:text-lg w-10 lg:w-16 py-2 border-2 border-black dark:border-white hover:opacity-30 cursor-pointer relative"
              >
                {size.name}
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}
