import React, { createContext, useEffect, useState } from "react";
export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [user, setUser] = useState();
  const [cart, setCart] = useState();
  const [category, setCategory] = useState({
    top: [
      {
        name: "Tees",
        path: "tees",
      },
      {
        name: "Shirts",
        path: "shirts",
      },
      {
        name: "Jackets",
        path: "jackets",
      },
      {
        name: "Hoodies & Sweaters",
        path: "hoodies-sweaters",
      },
    ],
    bottom: [
      {
        name: "Long pants",
        path: "long-pants",
      },
      {
        name: "Short pants",
        path: "short-pants",
      },
      {
        name: "Skirts",
        path: "skirts",
      },
    ],
    accessory: [
      { name: "Socks", path: "socks" },
      { name: "Bags", path: "bags" },
    ],
  });
  const token = localStorage.getItem("token");
  const fetchUser = () => {
    console.log("fetch user info");
    setUser({
      id: "01930b52-1ed3-7615-a3a0-744f1f41f97c",
      firstname: "Thắng",
      lastname: "Trần Đoàn Xuân",
      email: "user@test.com",
      platform: "APP",
      role: "USER",
    });
  };

  const fetchCart = () => {
    console.log("fetch cart");
    setCart({
      id: 1,
      quantity: 2,
      products: [
        {
          id: 1,
          quantity: 1,
          product: {
            id: 2,
            name: "SIGNATURE BASIC CARDIGAN",
            price: "290000",
            path: "sgcardigan",
            img: "https://nocturnal.vn/wp-content/uploads/2022/10/16.jpg",
          },
          color: {
            code: "#89CFF0",
            name: "Baby Blue",
          },
          size: "M",
        },
        {
          id: 2,
          quantity: 1,
          product: {
            id: 3,
            name: "Short-sleeve Oxford Shirt",
            price: "250000",
            path: "shortoxf",
            img: "https://nocturnal.vn/wp-content/uploads/2023/06/4-3.jpg",
          },
          color: {
            code: "#FF0000",
            name: "Red",
          },
          size: "XL",
        },
        {
          id: 3,
          quantity: 4,
          product: {
            id: 4,
            name: "Noc X Capybara Tee",
            price: "190000",
            path: "capybaratee",
            img: "https://nocturnal.vn/wp-content/uploads/2024/07/11.jpg",
          },
          color: {
            code: "#ad7545",
            name: "Brow",
          },
          size: "XL",
        },
        {
          id: 4,
          quantity: 5,
          product: {
            id: 5,
            name: "Socks SS2",
            price: "20000",
            path: "sock-ss2",
            img: "https://nocturnal.vn/wp-content/uploads/2023/07/29-scaled.jpg",
          },
          color: {
            code: "#ffdddd",
            name: "Baby Pink",
          },
          size: "L",
        },
      ],
    });
  };

  useEffect(() => {
    if (token) {
      fetchUser();
      fetchCart();
    } else {
      console.log("token is null");
    }
  }, []);

  return (
    <AppContext.Provider
      value={{ cart, setCart, category, token, user, setUser }}
    >
      {children}
    </AppContext.Provider>
  );
}
