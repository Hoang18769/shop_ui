import React, { useContext } from "react";
import Navigation from "./Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import DarkModeButton from "../../components/DarkModeButton";
import { AppContext } from "../../components/AppContext";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Navigate } from "react-router-dom";

export default function AdminLayout({ children }) {
  const { user } = useContext(AppContext);
  if (!user || user?.role != "ADMIN") {
    setTimeout(() => {
      if (!user || user?.role != "ADMIN") {
        return <Navigate to={"/"} />;
      }
    }, 1000);
  }
  return (
    <div className="bg-gray-200 dark:bg-gray-900 dark:text-white w-full absolute">
      <div className="lg:flex lg:my-5 lg:mx-5 lg:rounded-2xl shadow-lg">
        <input
          type="checkbox"
          name="admin-menu-checkbox"
          id="admin-menu-checkbox"
          className="peer/admin-menu-checkbox hidden"
        />
        <div className="hidden lg:block peer-checked/admin-menu-checkbox:block lg:sticky fixed top-0 lg:top-[-10px] left-0 z-50 w-1/2 h-full lg:h-full lg:w-1/6 bg-black text-white lg:rounded-s-2xl pl-5 pt-2">
          <Navigation />
        </div>
        <div className="w-full lg:w-5/6">
          <div className="h-10 bg-white dark:bg-gray-500 dark:text-white flex items-center justify-between py-7 px-2 lg:rounded-tr-2xl">
            <label htmlFor="admin-menu-checkbox" className="lg:hidden">
              <FontAwesomeIcon icon={faBars} />
            </label>
            <span></span>
            <div className="flex gap-4 items-center">
              <FontAwesomeIcon icon={faBell} className="text-lg" />
              <div>
                Welcome back{" "}
                {user?.firstname?.substring(user?.firstname?.lastIndexOf(" "))}!
              </div>
              <DarkModeButton />
            </div>
          </div>
          <main className="bg-gray-200 dark:bg-gray-800 p-5 rounded-br-2xl">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
