import { useContext, useEffect } from "react";
import Navigation from "./Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import DarkModeButton from "../../components/DarkModeButton";
import { AppContext } from "../../components/AppContext";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

export default function AdminLayout({ children }) {
  const { user } = useContext(AppContext);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return !user || user.role !== "ADMIN" ? (
    <div className="">
      <h1>You do not have access to this resource.</h1>
      <Link to={"/"}>Back to home</Link>
    </div>
  ) : (
    <div className="bg-gray-200 dark:bg-black dark:text-white w-full absolute">
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
          <div className="h-10 bg-gray-50 dark:bg-gray-500 dark:text-white flex items-center justify-between py-7 px-2 lg:rounded-tr-2xl border-b-2 border-gray-200 dark:border-gray-700">
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
          <main className="bg-white dark:bg-gray-800 p-5 rounded-br-2xl">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
