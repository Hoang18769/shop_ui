import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [user, setUser] = useState();
  const [cart, setCart] = useState();
  const [token, setToken] = useState();
  const [loggedIn, setLoggedIn] = useState();
  const [refreshResult, setRefreshResult] = useState(true);
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
  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_ORIGIN}/users/profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.code === 200) {
        setUser(data.body);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setRefreshResult(false);
    }
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

  const refreshToken = async () => {
    if (refreshResult) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BE_ORIGIN}/auth/refresh`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        if (data.code === 200) {
          setToken(data.body.accessToken);
        } else {
          if (token) {
            toast.error("You need login again!");
          }
        }
      } catch (error) {
        setRefreshResult(false);
      }
    }
  };

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
      fetchUser();
      fetchCart();
    } else {
      setLoggedIn(false);
      refreshToken();
    }
    const timer = setInterval(() => refreshToken(), 24000); //4 phút 1 lần
    return () => clearInterval(timer);
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        category,
        token,
        setToken,
        loggedIn,
        setLoggedIn,
        setToken,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
