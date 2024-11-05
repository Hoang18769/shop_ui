import React from "react";
import Login from "../components/Login";
import { useSearchParams } from "react-router-dom";
import Register from "../components/Register";
import ChangePassword from "../components/ChangePassword";
import NotFound from "./NotFound";
import Profile from "../components/Profile";
import Logout from "../components/Logout";
import Cart from "../components/Cart";
import Order from "../components/Order";
export default function Account() {
  const [query, setQuery] = useSearchParams();
  const loggedIn = false;
  const tab = query.get("tab") || (loggedIn ? "profile" : "login");
  const changeTab = (newTab) => {
    setQuery({ tab: newTab });
  };
  if (!loggedIn) {
    switch (tab) {
      case "login":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x">
            <div className="p-10 pl-20">
              <h2 className="text-2xl font-bold px-5 dark:bg-gray-800 pt-2">
                Login
              </h2>
              <Login />
            </div>
            <div className="flex items-center justify-center flex-col p-10 pr-20 gap-4">
              <h2 className="text-2xl font-bold">Register</h2>
              <p>
                Sign up to place an order, track your order Please fill in the
                attached form. We will only ask for the information necessary to
                process your order quickly and easily.
              </p>
              <button
                onClick={() => changeTab("signup")}
                className="bg-gray-200 px-5 py-2 hover:opacity-50 dark:bg-gray-600 mt-4"
              >
                REGISTER
              </button>
            </div>
          </div>
        );
      case "signup":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x">
            <div className="p-10 lg:pl-20">
              <h2 className="text-2xl font-bold px-5 dark:bg-gray-800 pt-2">
                Register
              </h2>
              <Register />
            </div>
            <div className="flex items-center justify-center flex-col p-10 lg:pr-20 gap-4 ">
              <h2 className="text-2xl font-bold">Register</h2>
              <p>
                Sign up to place an order, track your order Please fill in the
                attached form. We will only ask for the information necessary to
                process your order quickly and easily.
              </p>
              <button
                onClick={() => changeTab("login")}
                className="bg-gray-200 px-5 py-2 hover:opacity-50 dark:bg-gray-600 mt-4"
              >
                LOG IN
              </button>
            </div>
          </div>
        );
      case "forgot-password":
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold px-5 pt-2">Forgot password</h2>
            <p className="w-[50%] text-center">
              Forgot Password? Please enter your username or email address. You
              will receive an otp via email.
            </p>
            <hr />
            <div className="w-[50%]">
              <ChangePassword />
            </div>
          </div>
        );
      case "order":
      case "profile":
      case "change-password":
      case "history":
      case "cart":
        return (
          <div className="flex flex-col justify-center items-center text-center gap-5">
            <h2 className="text-2xl font-bold">
              You need to login to perform this action.
            </h2>
            <button
              onClick={() => changeTab("login")}
              className="w-1/2 bg-black text-white py-2 mt-2 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300 uppercase"
            >
              Login
            </button>
          </div>
        );
      case "logout":
        return (
          <div className="flex flex-col justify-center items-center text-center gap-5">
            <h2 className="text-2xl font-bold">
              You are logged out.
            </h2>
            <button
              onClick={() => changeTab("login")}
              className="w-1/2 bg-black text-white py-2 mt-2 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300 uppercase"
            >
              Login
            </button>
          </div>
        );      default:
        return <NotFound />;
    }
  } else {
    let content = <div></div>;
    switch (tab) {
      case "profile":
      case "login":
      case "register":
        content = <Profile />;
        break;
      case "order":
        content = <Order />;
        break;
      case "change-password":
      case "forgot-password":
        content = <ChangePassword />;
        break;
      case "cart":
        content = <Cart />;
        break;
      case "logout":
        content = <Logout />;
        break;
      default:
        content = <NotFound />;
    }
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">ACCOUNT</h2>
        <hr className="hr-full" />
        <div className="flex flex-col lg:flex-row">
          <nav className="lg:w-1/6 flex flex-col lg:border-r-2">
            <button
              onClick={() => changeTab("profile")}
              className={`text-left py-2 pl-4 mr-2 ${
                tab === "profile" ? "font-bold text-lg" : "font-semibold"
              } bg-white dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800`}
            >
              Profile
            </button>
            <button
              onClick={() => changeTab("change-password")}
              className={`text-left py-2 pl-4 mr-2 ${
                tab === "change-password"
                  ? "font-bold text-lg"
                  : "font-semibold"
              } bg-white dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800`}
            >
              Change password
            </button>
            <button
              onClick={() => changeTab("cart")}
              className={`text-left ${
                tab === "cart" ? "font-bold text-lg" : "font-semibold"
              } py-2 pl-4 mr-2 bg-white dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800`}
            >
              Cart
            </button>
            <button
              onClick={() => changeTab("order")}
              className={`text-left ${
                tab === "order" ? "font-bold text-lg" : "font-semibold"
              } py-2 pl-4 mr-2 bg-white dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800`}
            >
              Order
            </button>
            <button
              onClick={() => changeTab("history")}
              className={`text-left ${
                tab === "history" ? "font-bold text-lg" : "font-semibold"
              } py-2 pl-4 mr-2 bg-white dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800`}
            >
              History
            </button>
            <button
              onClick={() => changeTab("logout")}
              className={`text-left ${
                tab === "logout" ? "font-bold text-lg" : "font-semibold"
              } py-2 pl-4 mr-2 bg-white dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800`}
            >
              Logout
            </button>
          </nav>
          <hr className="hr-full lg:hidden" />
          <div className="lg:w-5/6 m-4">{content}</div>
        </div>
      </div>
    );
  }
}
