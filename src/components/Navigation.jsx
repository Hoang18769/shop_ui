import { useEffect, useState } from "react";
import logo from "../assets/images/new-logo-nocturnal-ver3-blue.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faBars,
  faBasketShopping,
  faCartShopping,
  faMagnifyingGlass,
  faMoon,
  faSun,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
export default function Navigation() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    // Kiểm tra chế độ được lưu trong localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);
  const toggleDarkMode = () => {
    const htmlClasses = document.documentElement.classList;
    if (htmlClasses.contains("dark")) {
      htmlClasses.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      htmlClasses.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };
  return (
    <nav class="sticky z-[49] top-0 border-y-2 border-y-black bg-white dark:bg-slate-900 dark:text-white dark:border-y-white">
      <div
        id="mobile-nav"
        class="lg:hidden h-16 flex justify-between items-center"
      >
        <input class="hidden peer/menu" type="checkbox" id="menu" />
        <label for="menu" class="h-7 pl-5">
          <FontAwesomeIcon className="text-2xl" icon={faBars} />
        </label>
        <img src={logo} alt="logo" class="h-10" />
        <span class="pr-5 relative">
          <button
            id="theme-toggle"
            onClick={toggleDarkMode}
            className="focus:outline-none transition duration-500 ease-in-out mr-5"
          >
            <FontAwesomeIcon
              className="text-2xl"
              icon={isDarkMode ? faSun : faMoon}
            />
          </button>
          <FontAwesomeIcon className="text-2xl" icon={faCartShopping} />
          <span class="absolute -top-2 right-2 bg-rose-600 text-white size-4 rounded-full text-center text-xs">
            1
          </span>
        </span>
        <div class="px-10 pt-2 fixed top-0 left-0 h-full w-1/2 bg-white dark:bg-black dark:text-white z-50 transform -translate-x-full transition-transform duration-300 peer-checked/menu:translate-x-0 flex flex-col font-medium uppercase">
          <label class="self-end mb-2 hover:scale-110" for="menu">
            <FontAwesomeIcon className="text-2xl" icon={faXmark} />
          </label>
          <input
            class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="search"
            placeholder="Search"
          />
          <a
            href="#"
            class="w-full text-left py-4 hover:bg-slate-100 dark:hover:bg-gray-800"
          >
            shop
          </a>
          <a
            href="#"
            class="group w-full text-left py-4 hover:bg-slate-100 dark:hover:bg-gray-800 flex items-center justify-between"
          >
            top
            <label
              for="top-dropdown"
              class="h-5 pr-5 border-l-2 border-slate-500 pl-5"
            >
              <FontAwesomeIcon
                className="text-2xl transition-transform duration-300 transform group-hover:rotate-180"
                icon={faAngleDown}
              />
            </label>
            <input
              class="hidden peer/top-dropdown"
              type="checkbox"
              id="top-dropdown"
              checked
            />
          </a>
          <a
            href="#"
            class="group w-full text-left py-4 hover:bg-slate-100 dark:hover:bg-gray-800 flex items-center justify-between"
          >
            bottom
            <label
              for="bottom-dropdown"
              class="h-5 pr-5 border-l-2 border-slate-500 pl-5"
            >
              <FontAwesomeIcon
                className="text-2xl transition-transform duration-300 transform group-hover:rotate-180"
                icon={faAngleDown}
              />{" "}
            </label>
            <input
              class="hidden peer/bottom-dropdown"
              type="checkbox"
              id="bottom-dropdown"
              checked
            />
          </a>
          <a
            href="#"
            class="w-full text-left py-4 hover:bg-slate-100 dark:hover:bg-gray-800"
          >
            accessories
          </a>
          <a
            href="#"
            class="w-full text-left py-4 hover:bg-slate-100 dark:hover:bg-gray-800"
          >
            promotions
          </a>

          <a
            href="#"
            class="w-full text-left py-4 hover:bg-slate-100 dark:hover:bg-gray-800"
          >
            account
          </a>
        </div>
      </div>
      <div class="hidden font-medium h-16 mx-5 items-center justify-between uppercase lg:flex">
        <a
          href="#"
          class="relative after:content-[''] dark:after:bg-white after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-black after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
        >
          shop
        </a>

        <div class="relative group">
          <a
            href="#"
            class="peer top-dropdown relative flex items-center after:content-[''] dark:after:bg-white after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-black after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
          >
            <p class="pr-2">top</p>
            <FontAwesomeIcon
              className="h-5 transition-transform duration-500 transform group-hover:rotate-180"
              icon={faAngleDown}
            />
          </a>
          <div class="hidden group-hover:block absolute left-0 dark:bg-gray-800 top-full w-48 bg-white shadow-md p-4 border-l-2 border-black dark:border-white">
            <a
              href="#"
              class="block px-4 py-2 text-slate-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white text-sm"
            >
              Tees
            </a>
            <a
              href="#"
              class="block px-4 py-2 text-slate-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white text-sm"
            >
              Shirts
            </a>
            <a
              href="#"
              class="block px-4 py-2 text-slate-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white text-sm"
            >
              Jackets
            </a>
            <a
              href="#"
              class="block px-4 py-2 text-slate-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white text-sm"
            >
              Hoodies & Sweaters
            </a>
          </div>
        </div>

        <div class="relative group">
          <a
            href="#"
            class="peer bottom-dropdown relative flex items-center after:content-[''] dark:after:bg-white after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-black after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
          >
            <p class="pr-2">bottom</p>
            <FontAwesomeIcon
              className="h-5 transition-transform duration-500 transform group-hover:rotate-180"
              icon={faAngleDown}
            />
          </a>
          <div class="hidden group-hover:block absolute left-0 dark:bg-gray-800 top-full w-48 bg-white shadow-md p-4 border-l-2 border-black dark:border-white">
            <a
              href="#"
              class="block px-4 py-2 text-slate-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white text-sm"
            >
              Long pants
            </a>
            <a
              href="#"
              class="block px-4 py-2 text-slate-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white text-sm"
            >
              Short pants
            </a>
          </div>
        </div>
        <a
          href=""
          class="relative after:content-[''] dark:after:bg-white after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-black after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
        >
          accessories
        </a>
        <img src={logo} s alt="logo" class="h-7 hover:drop-shadow-xl" />
        <a
          href=""
          class="relative after:content-[''] dark:after:bg-white after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-black after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
        >
          promotions
        </a>
        <div class="relative group">
          <a
            href="#"
            class="peer relative flex items-center after:content-[''] dark:after:bg-white after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-black after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
          >
            <p class="pr-2">account</p>
            <FontAwesomeIcon
              className="h-5 transition-transform duration-500 transform group-hover:rotate-180"
              icon={faAngleDown}
            />
          </a>
          <div class="hidden group-hover:block absolute left-0 dark:bg-gray-800 top-full w-48 bg-white shadow-md p-4 border-l-2 border-black dark:border-white">
            <a
              href="#"
              class="block px-4 py-2 text-slate-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white text-sm"
            >
              Account
            </a>
            <a
              href="#"
              class="block px-4 py-2 text-slate-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white text-sm"
            >
              Orders
            </a>
            <a
              href="#"
              class="block px-4 py-2 text-slate-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white text-sm"
            >
              Logout
            </a>
          </div>
        </div>
        <div class="relative group">
          <a
            href="#"
            class="peer relative flex items-center after:content-[''] dark:after:bg-white after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-black after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
          >
            <p class="pr-2">login/register</p>
            <FontAwesomeIcon
              className="h-5 transition-transform duration-500 transform group-hover:rotate-180"
              icon={faAngleDown}
            />
          </a>
          <div class="hidden group-hover:block absolute -left-[10vw] dark:bg-gray-800 top-full w-96 bg-white shadow-md p-4 normal-case p-5">
            <div class="flex justify-between mb-2">
              <h6 class="hover:text-slate-600 dark:hover:text-slate-200">
                Sign in
              </h6>
              <a class="hover:text-slate-600 dark:hover:text-slate-200 hover:font-normal">
                Create an account
              </a>
            </div>
            <hr class="mb-3" />
            <form action="" class="flex flex-col gap-1 mb-3">
              <label class="block text-sm font-bold mb-2" for="email">
                Email
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email"
              />
              <label class="block text-sm font-bold mb-2" for="password">
                Password
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
              />
              <button
                type="submit"
                class="w-full bg-black text-white py-2 mt-2 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300"
              >
                LOGIN
              </button>
              <a href="#" class="text-end text-sm my-1">
                Lost your password?
              </a>
              <div class="relative flex items-center justify-center">
                <hr class="w-full border-gray-300" />
                <p class="absolute bg-white text-gray-500 px-5 dark:text-gray-200 dark:bg-gray-800">
                  OR
                </p>
              </div>
            </form>
            <button
              type="submit"
              class="w-full bg-blue-400 text-white py-2 mt-2 hover:bg-blue-500"
            >
              <i class="fa-brands fa-google mr-5"></i>
              Login with Google
            </button>
          </div>
        </div>
        <div class="flex gap-5">
          <button
            id="theme-toggle"
            onClick={toggleDarkMode}
            className="focus:outline-none transition duration-500 ease-in-out"
          >
            <FontAwesomeIcon
              className="text-2xl"
              icon={isDarkMode ? faSun : faMoon}
            />
          </button>
          <a href="">
            <FontAwesomeIcon className="text-2xl" icon={faMagnifyingGlass} />
          </a>
          <a href="">
            <FontAwesomeIcon className="text-2xl" icon={faBasketShopping} />
          </a>
        </div>
      </div>
    </nav>
  );
}
