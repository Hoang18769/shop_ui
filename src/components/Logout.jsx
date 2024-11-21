import React, { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    if (token) {
      fetch(`${process.env.REACT_APP_BE_ORIGIN}/auth/logout`, {
        method: "POST",
        credentials: "include",
      })
        .then(() => {
          setToken(null);
          //Clear all cookies
          document.cookie.split(";").forEach(function (c) {
            document.cookie = c
              .replace(/^ +/, "")
              .replace(
                /=.*/,
                "=;expires=" + new Date().toUTCString() + ";path=/"
              );
          });
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    handleLogout();
  }, []);
  return null;
}
