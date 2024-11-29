import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [user, setUser] = useState();
  const [cart, setCart] = useState();
  const [token, setToken] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
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
  const fetchUser = () => {
    fetch(`${process.env.REACT_APP_BE_ORIGIN}/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setUser(data.body);
        } else {
          toast.error(data.message);
        }
      })
      .catch((e) => toast.error(e.message));
  };

  const fetchCart = () => {
    fetch(`${process.env.REACT_APP_BE_ORIGIN}/carts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setCart(data.body);
        } else {
          toast.error(data.message);
        }
      })
      .catch((e) => toast.error(e.message));
  };

  const refreshToken = async () => {
    if (!refreshResult) return;

    fetch(`${process.env.REACT_APP_BE_ORIGIN}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setToken(data.body.accessToken);
          setRefreshResult(true);
        } else {
          if (token) {
            setToken(null);
            setLoggedIn(false);
            toast.error("You need login again!");
            setRefreshResult(false);
          }
        }
      })
      .catch(() => {
        setRefreshResult(false);
      });
  };

  useEffect(() => {
    if (token && refreshResult) {
      setLoggedIn(true);
      fetchUser();
      fetchCart();

      const refreshInterval = setInterval(() => {
        refreshToken();
      }, 4 * 60 * 1000);
      return () => clearInterval(refreshInterval);
    } else {
      setLoggedIn(false);
      setCart(null);
      refreshToken();
    }
  }, [token, refreshResult]);
  
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
        fetchCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
