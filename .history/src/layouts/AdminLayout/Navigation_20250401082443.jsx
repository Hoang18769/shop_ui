import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReceipt,
  faPieChart,
  faXmark,
  faShirt,
  faRainbow,
  faHashtag,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/new-logo-nocturnal-ver3-blue.svg";

export default function Navigation() {
  return (
    <nav className="flex flex-col mx-2 mb-5">
      {/* Logo */}
      <div className="flex justify-between mb-5 mt-5 mr-2">
        <img src={logo} alt="logo" className="w-3/4" />
        <label htmlFor="admin-menu-checkbox" className="lg:hidden">
          <FontAwesomeIcon icon={faXmark} />
        </label>
      </div>
      {/* Menu Items */}
      <div className="flex flex-col gap-5">
        <div>
          <Link
            to="/admin"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700"
          >
            <FontAwesomeIcon className="w-5" icon={faPieChart} />
            <span>Summary</span>
          </Link>
        </div>

        <Link
          to="/admin/products"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700"
        >
          <FontAwesomeIcon className="w-5" icon={faShirt} />
          <span>Products</span>
        </Link>

        <Link
          to="/admin/colors"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700"
        >
          <FontAwesomeIcon className="w-5" icon={faRainbow} />
          <span>Colors</span>
        </Link>

        <Link
          to="/admin/product-types"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700"
        >
          <FontAwesomeIcon className="w-5" icon={faList} />
          <span>Product Types</span>
        </Link>

        <Link
          to="/admin/sizes"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700"
        >
          <FontAwesomeIcon className="w-5" icon={faHashtag} />
          <span>Sizes</span>
        </Link>

        <Link
          to="/admin/orders"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700"
        >
          <FontAwesomeIcon className="w-5" icon={faReceipt} />
          <span>Orders</span>
        </Link>
        <Link
          to="/account/?tab=logout"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700"
        >
          <FontAwesomeIcon className="w-5" icon={faDoor} />
          <span>Log out</span>
        </Link>
      </div>
    </nav>
  );
}
