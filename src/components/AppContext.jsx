import React, { createContext, useState } from "react";
export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [cart, setCart] = useState({
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
  return (
    <AppContext.Provider value={{ cart, setCart }}>
      {children}
    </AppContext.Provider>
  );
}
