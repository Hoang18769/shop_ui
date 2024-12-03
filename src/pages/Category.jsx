import {
  faAngleDown,
  faBars,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useContext } from "react";
import Pagination from "../components/Pagination";
import Product from "../components/Product";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { AppContext } from "../components/AppContext";
import MultiRangeSlider from "../components/MultiRangeSlider";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import debounce from "lodash/debounce";

const debouncedFetchCategory = debounce((callback) => {
  callback();
}, 1000);

export default function Category() {
  const { type, subtype } = useParams();
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(parseInt(query.get("page")) || 1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [colors, setColors] = useState(
    query.get("colors") ? query.get("colors").split(",") : []
  );
  const { category } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [filterColors, setFilterColors] = useState([]);
  const [selectedSize, setSelectedSize] = useState(query.get("size") * 1 || 12);
  const [selectedCol, setSelectedCol] = useState(2);
  const [selectedOption, setSelectedOption] = useState("1");
  const [filterSizes, setFilterSizes] = useState([]);
  const [sizes, setSizes] = useState(
    query.get("sizes") ? query.get("sizes").split(",") : []
  );
  const [name, setName] = useState(query?.get("name"));

  const changeSearchQueryWithArray = (key, values) => {
    const updatedQuery = new URLSearchParams(query.toString());

    updatedQuery.delete(key);

    values.forEach((value) => {
      updatedQuery.append(key, value);
    });

    setQuery(updatedQuery);
  };

  const changeSearchQuery = (key, value) => {
    const updatedQuery = new URLSearchParams(query.toString());
    updatedQuery.set(key, value);
    setQuery(updatedQuery);
  };

  const fetchCategory = () => {
    setLoading(true);
    let tempQuery = new URLSearchParams(query.toString());
    if(page){
      tempQuery.set("page", page - 1);
    }
    let url = `${
      process.env.REACT_APP_BE_ORIGIN
    }/products/search?${tempQuery.toString()}`;

    if (subtype) {
      url = url.concat(`&subtype=${subtype.replace("-", " ")}`);
    } else if (type) {
      url = url.concat(`&type=${type}`);
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setProducts(data.body?.content);
          setTotalPage(data.body.totalPages);
        }
      })
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategory();
  }, [query]);

  useEffect(() => {
    debouncedFetchCategory(() => {
      changeSearchQueryWithArray("colors", colors);
    });
  }, [colors]);

  useEffect(() => {
    debouncedFetchCategory(() => {
      changeSearchQueryWithArray("sizes", sizes);
    });
  }, [sizes]);
  useEffect(() => {
    debouncedFetchCategory(() => {
      if (name != null) changeSearchQuery("name", name);
    });
  }, [name]);
  const fetchFilterColorsAndSizes = () => {
    let url = "";
    setLoading(true);
    if (subtype) {
      url = `${
        process.env.REACT_APP_BE_ORIGIN
      }/products/colors_sizes/subtype/${subtype.replace("-", " ")}`;
    } else if (type) {
      url = `${process.env.REACT_APP_BE_ORIGIN}/products/colors_sizes/type/${type}`;
    } else {
      url = `${process.env.REACT_APP_BE_ORIGIN}/products/colors_sizes`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setFilterColors(data.body.colors);
          setFilterSizes(data.body.sizes);
        }
      })
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFilterColorsAndSizes();
    fetchCategory();
    if (type) {
      if (subtype) {
        document.title = category[type]
          .find((item) => item.path === subtype)
          ?.name.toUpperCase();
      } else {
        document.title = type.toUpperCase();
      }
    } else {
      document.title = "Category".toUpperCase();
    }
  }, [type, subtype]);

  useEffect(() => {
    return () => {
      debouncedFetchCategory.cancel();
    };
  }, []);

  useEffect(() => {
    changeSearchQuery("sort", selectedOption);
  }, [selectedOption]);

  const handleColorsChange = (color) => {
    const updatedColors = colors.includes(color)
      ? colors.filter((c) => c !== color)
      : [...colors, color];

    setColors(updatedColors);
  };

  const handleSizesChange = (size) => {
    const updatedSizes = sizes.includes(size)
      ? sizes.filter((s) => s !== size)
      : [...sizes, size];

    setSizes(updatedSizes);
  };

  const handleSelectedSizeChange = (size) => {
    setSelectedSize(size);
    changeSearchQuery("size", size);
  };

  let categoryContent;
  if (!type) {
    // Hiển thị danh sách các type nếu không có `type`
    categoryContent = (
      <div className="flex flex-col gap-3 uppercase">
        <div className="text-xl font-bold">PRODUCT</div>
        <div className="flex flex-col lg:flex-row gap-5">
          {Object.keys(category).map((key) => (
            <Link
              key={key}
              to={`/product-category/${key}`}
              className="text-left text-lg relative after:content-[''] dark:after:bg-white after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-black after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
            >
              {key}
            </Link>
          ))}
        </div>
      </div>
    );
  } else if (type && category[type]) {
    categoryContent = (
      <div className="flex flex-col gap-3 uppercase">
        <div className="text-xl font-bold">{type}</div>
        <div className="flex flex-col lg:flex-row gap-5">
          {category[type].map((item) => (
            <Link
              key={item?.path}
              to={`/product-category/${type}/${item?.path}`}
              className="text-left text-lg relative after:content-[''] dark:after:bg-white after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-black after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
            >
              {item?.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return !isLoading ? (
    <div>
      <nav className="mb-4">
        {/* Mobile menu */}
        <div className="lg:hidden flex flex-col relative">
          <input
            className="hidden peer/category-menu"
            type="checkbox"
            id="category-menu"
          />
          <label
            htmlFor="category-menu"
            className="h-7 pl-5 hover:text-gray-500 flex items-center"
          >
            Product catalog
            <FontAwesomeIcon className="text-md ml-3" icon={faAngleDown} />
          </label>
          {/* Dropdown menu */}
          <div className="hidden flex-col gap-3 items-start pl-5 mt-3 peer-checked/category-menu:flex">
            {categoryContent}
          </div>
        </div>

        {/* Desktop menu */}
        <div className="hidden font-medium h-16 items-center uppercase lg:flex gap-10">
          {categoryContent}
        </div>
      </nav>

      <hr className="hr-full" />
      <section className="my-4">
        <div className="lg:hidden">
          <div className="flex justify-between mb-2">
            <input
              className="hidden peer/filter-menu"
              type="checkbox"
              id="filter-menu"
            />
            <label htmlFor="filter-menu" className="h-7 ml-5">
              <FontAwesomeIcon className="text-2xl" icon={faBars} />
              <span className="text-2xl ml-2">Show filter</span>
            </label>
            <div className="relative">
              <select
                value={selectedOption}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                }}
                className="bg-transparent placeholder:text-gray-400 text-sm border border-gray-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-gray-400 hover:border-gray-400 shadow-sm focus:shadow-md appearance-none cursor-pointer text-black bg-white dark:text-white dark:bg-gray-600"
              >
                <option
                  className="dark:text-white dark:bg-gray-600"
                  value="name,asc"
                >
                  Name: A - Z
                </option>
                <option
                  className="dark:text-white dark:bg-gray-600"
                  value="name,desc"
                >
                  Name: Z - A
                </option>
                <option
                  className="dark:text-white dark:bg-gray-600"
                  value="price,asc"
                >
                  Price: Low to High
                </option>
                <option
                  className="dark:text-white dark:bg-gray-600"
                  value="price,desc"
                >
                  Price: High to Low
                </option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.2"
                stroke="currentColor"
                className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-gray-700 dark:text-gray-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </div>
            <div className="px-10 pt-2 fixed top-0 left-0 h-full w-1/2 bg-white dark:bg-black dark:text-white z-50 transform -translate-x-full transition-transform duration-300 peer-checked/filter-menu:translate-x-0 flex flex-col font-medium uppercase overflow-y-auto">
              <label
                className="self-end mb-2 hover:scale-110"
                htmlFor="filter-menu"
              >
                <FontAwesomeIcon className="text-2xl" icon={faXmark} />
              </label>
              <div>
                <p className="text-xl uppercase">Search by name</p>
                <input
                  className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
                  type="text"
                  value={name ?? ""}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
                <p className="text-xl uppercase">Filter by price</p>
                <div className="mt-5 mb-14">
                  <MultiRangeSlider
                    curMin={query.get("minPrice")}
                    curMax={query.get("maxPrice")}
                    onMinChange={(min) => changeSearchQuery("minPrice", min)}
                    onMaxChange={(max) => changeSearchQuery("maxPrice", max)}
                  />
                </div>
                <hr className="bg-gray-100 h-[1px] my-4" />
                <p className="text-xl uppercase">Filter by colors</p>
                <div className="flex flex-col gap-4 my-4">
                  {filterColors?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-lg"
                    >
                      <div className="inline-flex items-center">
                        <label
                          className="flex items-center cursor-pointer relative"
                          htmlFor={`check-${item?.name}`}
                        >
                          <input
                            type="checkbox"
                            className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow dark:shadow-gray-100 hover:shadow-md border border-gray-300 checked:bg-gray-800 checked:border-gray-800 dark:bg-gray-900 dark:checked:bg-white dark:checked:border-white"
                            id={`check-${item?.name}`}
                            checked={colors.includes(item?.name)}
                            onChange={() => handleColorsChange(item?.name)}
                          />
                          <span className="absolute text-white dark:text-gray-900 opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <FontAwesomeIcon
                              className="h-3.5 w-3.5 text-current"
                              icon={faCheck}
                            />
                          </span>
                        </label>
                        <label
                          className="cursor-pointer ml-2 text-gray-600 dark:text-white text-md"
                          htmlFor={`check-${item?.name}`}
                        >
                          {item?.name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xl uppercase">Filter by sizes</p>
                <div className="flex flex-col gap-4 my-4">
                  {filterSizes?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-lg"
                    >
                      <div className="inline-flex items-center">
                        <label
                          className="flex items-center cursor-pointer relative"
                          htmlFor={`check-${item?.name}`}
                        >
                          <input
                            type="checkbox"
                            className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow dark:shadow-gray-100 hover:shadow-md border border-gray-300 checked:bg-gray-800 checked:border-gray-800 dark:bg-gray-900 dark:checked:bg-white dark:checked:border-white"
                            id={`check-${item?.name}`}
                            checked={sizes.includes(item?.name)}
                            onChange={() => handleSizesChange(item?.name)}
                          />
                          <span className="absolute text-white dark:text-gray-900 opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <FontAwesomeIcon
                              className="h-3.5 w-3.5 text-current"
                              icon={faCheck}
                            />
                          </span>
                        </label>
                        <label
                          className="cursor-pointer ml-2 text-gray-600 dark:text-white text-md"
                          htmlFor={`check-${item?.name}`}
                        >
                          {item?.name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={`ml-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3`}>
            {products.map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </div>
          <Pagination
            current={page}
            total={totalPage}
            onChange={(num) => {
              setPage(num);
              changeSearchQuery("page", num);
            }}
          />
        </div>
        <div className="hidden lg:flex my-4">
          <div className="w-1/4">
            <p className="text-xl uppercase">Filter by price</p>
            <div className="mt-5 mb-14">
              <MultiRangeSlider
                curMin={query.get("minPrice")}
                curMax={query.get("maxPrice")}
                onMinChange={(min) => changeSearchQuery("minPrice", min)}
                onMaxChange={(max) => changeSearchQuery("maxPrice", max)}
              />
            </div>
            <hr className="bg-gray-100 h-[1px] my-4" />
            <p className="text-xl uppercase">Filter by colors</p>
            <div className="flex flex-col gap-4 my-4">
              {filterColors?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-lg"
                >
                  <div className="inline-flex items-center">
                    <label
                      className="flex items-center cursor-pointer relative"
                      htmlFor={`check-${item?.name}`}
                    >
                      <input
                        type="checkbox"
                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow dark:shadow-gray-100 hover:shadow-md border border-gray-300 checked:bg-gray-800 checked:border-gray-800 dark:bg-gray-900 dark:checked:bg-white dark:checked:border-white"
                        id={`check-${item?.name}`}
                        checked={colors.includes(item?.name)}
                        onChange={() => handleColorsChange(item?.name)}
                      />
                      <span className="absolute text-white dark:text-gray-900 opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <FontAwesomeIcon
                          className="h-3.5 w-3.5 text-current"
                          icon={faCheck}
                        />
                      </span>
                    </label>
                    <label
                      className="cursor-pointer ml-2 text-gray-600 dark:text-white text-md"
                      htmlFor={`check-${item?.name}`}
                    >
                      {item?.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xl uppercase">Filter by sizes</p>
            <div className="flex flex-col gap-4 my-4">
              {filterSizes?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-lg"
                >
                  <div className="inline-flex items-center">
                    <label
                      className="flex items-center cursor-pointer relative"
                      htmlFor={`check-${item?.name}`}
                    >
                      <input
                        type="checkbox"
                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow dark:shadow-gray-100 hover:shadow-md border border-gray-300 checked:bg-gray-800 checked:border-gray-800 dark:bg-gray-900 dark:checked:bg-white dark:checked:border-white"
                        id={`check-${item?.name}`}
                        checked={sizes.includes(item?.name)}
                        onChange={() => handleSizesChange(item?.name)}
                      />
                      <span className="absolute text-white dark:text-gray-900 opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <FontAwesomeIcon
                          className="h-3.5 w-3.5 text-current"
                          icon={faCheck}
                        />
                      </span>
                    </label>
                    <label
                      className="cursor-pointer ml-2 text-gray-600 dark:text-white text-md"
                      htmlFor={`check-${item?.name}`}
                    >
                      {item?.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-3/4 flex flex-col gap-4">
            <div className="flex items-center self-end gap-5">
              <div>
                <input
                  className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
                  type="search"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Search by name"
                />
              </div>
              <div className="flex">
                Display:
                <div className="ml-3 size-selector flex gap-2">
                  <label className={selectedSize === 9 ? "font-bold" : ""}>
                    <input
                      type="radio"
                      name="sizes"
                      value="9"
                      id="radio-9"
                      className="hidden"
                      onChange={(e) =>
                        handleSelectedSizeChange(e.target.value * 1)
                      } // Gọi hàm khi có thay đổi
                      checked={selectedSize === 9} // Kiểm tra giá trị đang được chọn
                    />
                    9
                  </label>
                  <span>/</span>
                  <label className={selectedSize === 12 ? "font-bold" : ""}>
                    <input
                      type="radio"
                      name="sizes"
                      value="12"
                      id="radio-12"
                      className="hidden"
                      onChange={(e) =>
                        handleSelectedSizeChange(e.target.value * 1)
                      }
                      checked={selectedSize === 12}
                    />
                    12
                  </label>
                  <span>/</span>
                  <label className={selectedSize === 18 ? "font-bold" : ""}>
                    <input
                      type="radio"
                      name="sizes"
                      value="18"
                      id="radio-18"
                      className="hidden"
                      onChange={(e) =>
                        handleSelectedSizeChange(e.target.value * 1)
                      }
                      checked={selectedSize === 18}
                    />
                    18
                  </label>
                  <span>/</span>
                  <label className={selectedSize === 24 ? "font-bold" : ""}>
                    <input
                      type="radio"
                      name="sizes"
                      value="24"
                      id="radio-24"
                      className="hidden"
                      onChange={(e) =>
                        handleSelectedSizeChange(e.target.value * 1)
                      }
                      checked={selectedSize === 24}
                    />
                    24
                  </label>
                </div>
              </div>
              <div className="flex">
                Column:
                <div className="ml-3 size-selector flex gap-2">
                  <label className={selectedCol === 2 ? "font-bold" : ""}>
                    <input
                      type="radio"
                      name="sizes"
                      value="2"
                      id="radio-2"
                      className="hidden"
                      onChange={(e) => {
                        setSelectedCol(e.target.value * 1);
                      }}
                      checked={selectedCol === 2}
                    />
                    2
                  </label>
                  <span>/</span>
                  <label className={selectedCol === 3 ? "font-bold" : ""}>
                    <input
                      type="radio"
                      name="sizes"
                      value="3"
                      id="radio-3"
                      className="hidden"
                      onChange={(e) => {
                        setSelectedCol(e.target.value * 1);
                      }}
                      checked={selectedCol === 3}
                    />
                    3
                  </label>
                  <span>/</span>{" "}
                  <label className={selectedCol === 4 ? "font-bold" : ""}>
                    <input
                      type="radio"
                      name="sizes"
                      value="4"
                      id="radio-4"
                      className="hidden"
                      onChange={(e) => {
                        setSelectedCol(e.target.value * 1);
                      }}
                      checked={selectedCol === 4}
                    />
                    4
                  </label>
                </div>
              </div>
              <div className="relative">
                <select
                  value={selectedOption}
                  onChange={(e) => {
                    setSelectedOption(e.target.value);
                  }}
                  className="w-full bg-transparent placeholder:text-gray-400 text-sm border border-gray-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-gray-400 hover:border-gray-400 shadow-sm focus:shadow-md appearance-none cursor-pointer text-black bg-white dark:text-white dark:bg-gray-600"
                >
                  <option
                    className="dark:text-white dark:bg-gray-600"
                    value="name,asc"
                  >
                    Name: A - Z
                  </option>
                  <option
                    className="dark:text-white dark:bg-gray-600"
                    value="name,desc"
                  >
                    Name: Z - A
                  </option>
                  <option
                    className="dark:text-white dark:bg-gray-600"
                    value="price,asc"
                  >
                    Price: Low to High
                  </option>
                  <option
                    className="dark:text-white dark:bg-gray-600"
                    value="price,desc"
                  >
                    Price: High to Low
                  </option>
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.2"
                  stroke="currentColor"
                  className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-gray-700 dark:text-gray-100"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  />
                </svg>
              </div>
            </div>
            <div
              className={`ml-5 grid gap-5 ${
                selectedCol === 2
                  ? "grid-cols-2"
                  : selectedCol === 3
                  ? "grid-cols-3"
                  : selectedCol === 4
                  ? "grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {products.map((product, index) => (
                <Product key={index} product={product} />
              ))}
            </div>

            <Pagination
              current={page}
              total={totalPage}
              onChange={(num) => {
                setPage(num);
                changeSearchQuery("page", num);
              }}
            />
          </div>
        </div>
      </section>
    </div>
  ) : (
    <Loading />
  );
}
