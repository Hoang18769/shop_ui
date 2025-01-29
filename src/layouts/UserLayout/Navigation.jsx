import logo from "../../assets/images/new-logo-nocturnal-ver3-blue.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faBars,
  faBasketShopping,
  faCartShopping,
  faMagnifyingGlass,
  faRightFromBracket,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Authentication from "../../components/Login";
import { Link, useNavigate } from "react-router-dom";
import SideCart from "../../components/SideCart";
import DarkModeButton from "../../components/DarkModeButton";
import { AppContext } from "../../components/AppContext";
import { useContext, useState } from "react";

export default function Navigation() {
  const { loggedIn, cart } = useContext(AppContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  return (
    <nav className="z-50 border-y-2 border-y-black bg-white dark:bg-black dark:text-white dark:border-y-white">
      <input className="hidden peer/cart" type="checkbox" id="cart" />
      <input className="hidden peer/search" type="checkbox" id="search" />
      <div
        id="mobile-nav"
        className="lg:hidden h-16 flex justify-between items-center"
      >
        <input className="hidden peer/menu" type="checkbox" id="menu" />
        <label htmlFor="menu" className="h-7 pl-5">
          <FontAwesomeIcon className="text-2xl" icon={faBars} />
        </label>
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="h-5 lg:h-10 hover:drop-shadow-xl"
          />
        </Link>
        <span className="pr-5 relative">
          <span className="mr-2">
            <DarkModeButton />
          </span>
          <label htmlFor="cart">
            <FontAwesomeIcon className="text-2xl" icon={faCartShopping} />
            {cart?.items?.length > 0 && (
              <span className="absolute -top-2 right-2 bg-rose-600 text-white size-4 rounded-full text-center text-xs">
                {cart?.items?.reduce((total, item) => {
                  return total + (item?.quantity || 0);
                }, 0)}
              </span>
            )}
          </label>
        </span>
        <div className="px-10 pt-10 fixed top-0 left-0 h-full w-1/2 bg-white dark:bg-black dark:text-white z-50 transform -translate-x-full transition-transform duration-300 peer-checked/menu:translate-x-0 flex flex-col font-medium uppercase overflow-y-auto">
          <label className="self-end mb-2 hover:scale-110" htmlFor="menu">
            <FontAwesomeIcon className="text-2xl" icon={faXmark} />
          </label>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/product-category/?name=${name}`);
            }}
          >
            <input
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="search"
              placeholder="Search for products"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </form>

          <Link
            to="/product-category"
            className="w-full text-left py-4 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Product
          </Link>
          <div className="relative">
            <input
              className="hidden peer/top-dropdown"
              type="checkbox"
              id="top-dropdown"
            />
            <div className=" w-full text-left py-4 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800">
              <Link to="/product-category/top" className="flex-1">
                Top
              </Link>
              <label
                htmlFor="top-dropdown"
                className="h-5 pr-5 border-l-2 border-gray-500 pl-5"
              >
                <FontAwesomeIcon
                  className="text-2xl transition-transform duration-300"
                  icon={faAngleDown}
                />
              </label>
            </div>
            <div className="hidden peer-checked/top-dropdown:flex flex-col">
              <Link
                to="/product-category/top/tees"
                className="w-full text-left py-2 pl-4 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-between"
              >
                Tees
              </Link>
              <Link
                to="/product-category/top/shirts"
                className="w-full text-left py-2 pl-4 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-between"
              >
                Shirts
              </Link>
              <Link
                to="/product-category/top/jackets"
                className="w-full text-left py-2 pl-4 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-between"
              >
                Jackets
              </Link>
              <Link
                to="/product-category/top/hoodies-sweaters"
                className="w-full text-left py-2 pl-4 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-between"
              >
                Hoodies & Sweaters
              </Link>
            </div>
          </div>

          <div className="relative">
            <input
              className="hidden peer/bottom-dropdown"
              type="checkbox"
              id="bottom-dropdown"
            />
            <div className=" w-full text-left py-4 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800">
              <Link to="/product-category/bottom" className="flex-1">
                Bottom
              </Link>
              <label
                htmlFor="bottom-dropdown"
                className="h-5 pr-5 border-l-2 border-gray-500 pl-5"
              >
                <FontAwesomeIcon
                  className="text-2xl transition-transform duration-300"
                  icon={faAngleDown}
                />
              </label>
            </div>
            <div className="hidden peer-checked/bottom-dropdown:flex flex-col">
              <Link
                to="/product-category/bottom/long-pants"
                className="w-full text-left py-2 pl-4 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-between"
              >
                Long pants
              </Link>
              <Link
                to="/product-category/bottom/short-pants"
                className="w-full text-left py-2 pl-4 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-between"
              >
                Short pants
              </Link>
              <Link
                to="/product-category/bottom/skirts"
                className="w-full text-left py-2 pl-4 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-between"
              >
                Skirts
              </Link>
            </div>
          </div>
          <div className="relative">
            <input
              className="hidden peer/accessory-dropdown"
              type="checkbox"
              id="accessory-dropdown"
            />
            <div className=" w-full text-left py-4 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800">
              <Link to="/product-category/accessory" className="flex-1">
                Accessory
              </Link>
              <label
                htmlFor="accessory-dropdown"
                className="h-5 pr-5 border-l-2 border-gray-500 pl-5"
              >
                <FontAwesomeIcon
                  className="text-2xl transition-transform duration-300"
                  icon={faAngleDown}
                />
              </label>
            </div>
            <div className="hidden peer-checked/accessory-dropdown:flex flex-col">
              <Link
                to="/product-category/accessory/socks"
                className="w-full text-left py-2 pl-4 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-between"
              >
                Socks
              </Link>
              <Link
                to="/product-category/accessory/bags"
                className="w-full text-left py-2 pl-4 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-between"
              >
                Bags
              </Link>
            </div>
          </div>
          <Link
            to="/account"
            className="w-full text-left py-4 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Account
          </Link>
        </div>
      </div>
      <div className="hidden font-medium h-16 mx-5 items-center justify-between uppercase lg:flex">
        <Link
          to="/product-category"
          className="relative after:content-[''] dark:after:bg-white after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-black after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
        >
          Product
        </Link>

        <div className="relative group">
          <Link
            to="/product-category/top/tees"
            className="peer top-dropdown relative flex items-center after:content-[''] dark:after:bg-white after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-black after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
          >
            <p className="pr-2">top</p>
            <FontAwesomeIcon
              className="h-5 transition-transform duration-500 transform group-hover:rotate-180"
              icon={faAngleDown}
            />
          </Link>
          <div className="hidden group-hover:block absolute left-0 dark:bg-gray-800 top-full w-48 bg-white shadow-md p-4 border-l-2 border-black dark:border-white">
            <Link
              to="/product-category/top/tees"
              className="block px-4 py-2 text-gray-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white text-sm"
            >
              Tees
            </Link>
            <Link
              to="/product-category/top/shirts"
              className="block px-4 py-2 text-gray-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white text-sm"
            >
              Shirts
            </Link>
            <Link
              to="/product-category/top/jackets"
              className="block px-4 py-2 text-gray-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white text-sm"
            >
              Jackets
            </Link>
            <Link
              to="/product-category/top/hoodies-sweaters"
              className="block px-4 py-2 text-gray-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white text-sm"
            >
              Hoodies & Sweaters
            </Link>
          </div>
        </div>

        <div className="relative group">
          <Link
            to="/product-category/bottom"
            className="peer bottom-dropdown relative flex items-center after:content-[''] dark:after:bg-white after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-black after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
          >
            <p className="pr-2">bottom</p>
            <FontAwesomeIcon
              className="h-5 transition-transform duration-500 transform group-hover:rotate-180"
              icon={faAngleDown}
            />
          </Link>
          <div className="hidden group-hover:block absolute left-0 dark:bg-gray-800 top-full w-48 bg-white shadow-md p-4 border-l-2 border-black dark:border-white">
            <Link
              to="/product-category/bottom/long-pants"
              className="block px-4 py-2 text-gray-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white text-sm"
            >
              Long pants
            </Link>
            <Link
              to="/product-category/bottom/short-pants"
              className="block px-4 py-2 text-gray-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white text-sm"
            >
              Short pants
            </Link>
            <Link
              to="/product-category/bottom/skirts"
              className="block px-4 py-2 text-gray-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white text-sm"
            >
              Skirts
            </Link>
          </div>
        </div>
        <div className="relative group">
          <Link
            to="/product-category/accessory"
            className="peer accessory-dropdown relative flex items-center after:content-[''] dark:after:bg-white after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-black after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
          >
            <p className="pr-2">Accessory</p>
            <FontAwesomeIcon
              className="h-5 transition-transform duration-500 transform group-hover:rotate-180"
              icon={faAngleDown}
            />
          </Link>
          <div className="hidden group-hover:block absolute left-0 dark:bg-gray-800 top-full w-48 bg-white shadow-md p-4 border-l-2 border-black dark:border-white">
            <Link
              to="/product-category/accessory/socks"
              className="block px-4 py-2 text-gray-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white text-sm"
            >
              Socks
            </Link>
            <Link
              to="/product-category/accessory/bags"
              className="block px-4 py-2 text-gray-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white text-sm"
            >
              Bags
            </Link>
          </div>
        </div>
        <Link to="/">
          <img src={logo} alt="logo" className="h-7 hover:drop-shadow-xl" />
        </Link>
        {loggedIn ? (
          <div className="relative group">
            <Link
              to="/account"
              className="peer relative flex items-center after:content-[''] dark:after:bg-white after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-black after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
            >
              <p className="pr-2">Account</p>
              <FontAwesomeIcon
                className="h-5 transition-transform duration-500 transform group-hover:rotate-180"
                icon={faAngleDown}
              />
            </Link>
            <div className="hidden group-hover:block absolute left-0 dark:bg-gray-800 top-full w-48 bg-white shadow-md p-4 border-l-2 border-black dark:border-white">
              <Link
                to="/account/?tab=profile"
                className="flex gap-2 px-4 py-2 text-gray-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white text-sm"
              >
                <FontAwesomeIcon icon={faUser} />
                Profile
              </Link>
              <Link
                to="/account/?tab=cart"
                className="flex gap-2 px-4 py-2 text-gray-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white text-sm"
              >
                <FontAwesomeIcon icon={faCartShopping} />
                Cart
              </Link>
              <Link
                to="/account/?tab=order"
                className="flex gap-2 px-4 py-2 text-gray-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white text-sm"
              >
                <FontAwesomeIcon icon={faBasketShopping} />
                Order
              </Link>
              <Link
                to="/account/?tab=logout"
                className="flex gap-2 px-4 py-2 text-gray-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white text-sm"
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                Logout
              </Link>
            </div>
          </div>
        ) : (
          <div className="relative group">
            <Link
              to="/account"
              className="peer relative flex items-center after:content-[''] dark:after:bg-white after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-black after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
            >
              <p className="pr-2">Login</p>
              <FontAwesomeIcon
                className="h-5 transition-transform duration-500 transform group-hover:rotate-180"
                icon={faAngleDown}
              />
            </Link>
            <div className="hidden group-hover:block absolute -left-[10vw] shadow bg-white text-black dark:bg-gray-800 dark:text-white normal-case">
              <div className="flex mb-2 px-5 py-2 top-full w-96 justify-between">
                <h6 className="hover:text-gray-600 dark:hover:text-gray-200">
                  Login
                </h6>
                <Link
                  to="/account/?tab=register"
                  className="hover:text-gray-600 dark:hover:text-gray-200 hover:font-normal cursor-pointer"
                >
                  Create an account
                </Link>
              </div>
              <hr />
              <Authentication />
            </div>
          </div>
        )}

        <div className="flex gap-5">
          <span>
            <DarkModeButton />
          </span>
          <label htmlFor="search">
            <FontAwesomeIcon className="text-2xl" icon={faMagnifyingGlass} />
          </label>
          <label htmlFor="cart" className="relative">
            <FontAwesomeIcon className="text-2xl" icon={faCartShopping} />
            {cart?.items?.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white size-4 rounded-full text-center text-xs">
                {cart?.items?.reduce((total, item) => {
                  return total + (item?.quantity || 0);
                }, 0)}
              </span>
            )}
          </label>
        </div>
      </div>
      <div className="px-10 pt-10 fixed top-0 right-0 h-full w-full lg:w-1/2 bg-white dark:bg-black dark:text-white z-50 transform translate-x-full transition-transform duration-300 peer-checked/cart:translate-x-0 flex flex-col gap-4 font-medium peer-checked/cart:shadow-xl peer-checked/cart:dark:shadow-gray-700">
        <SideCart />
      </div>
      <div className="px-10 pt-10 fixed top-0 right-0 h-full w-1/2 bg-white dark:bg-black dark:text-white z-50 transform translate-x-full transition-transform duration-300 peer-checked/search:translate-x-0 flex flex-col gap-4 font-medium peer-checked/search:shadow-xl peer-checked/search:dark:shadow-gray-700">
        <div className="flex justify-between items-center">
          <h2>SEARCH</h2>
          <label className="mb-2 hover:scale-110" htmlFor="search">
            <FontAwesomeIcon className="text-2xl" icon={faXmark} />
          </label>
        </div>
        <hr />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/product-category/?name=${name}`);
          }}
        >
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white h-20 placeholder:text-center text-center text-2xl"
            type="search"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search for products"
          />
        </form>
        <p className="text-center font-bold text-xl">
          Type the keyword to search for the product you want
        </p>
      </div>
    </nav>
  );
}
