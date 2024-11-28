import {
  faAngleLeft,
  faAngleRight,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { MAX_ITEM_QUANTITY } from "../constant";
import { toast } from "react-toastify";
import { AppContext } from "../components/AppContext";

export default function Product() {
  const { token, loggedIn } = useContext(AppContext);
  const { path } = useParams();
  const [query, setQuery] = useSearchParams();
  const selectedColor = query.get("color") || "";
  const selectedSize = query.get("size") || "";
  const selectedQuantity = parseInt(query.get("quantity")) || 1;
  const [product, setProduct] = useState(null);
  const [imgs, setImgs] = useState(null);
  const [variants, setVariants] = useState(null);
  const [xPercent, setXPercent] = useState(0);
  const [yPercent, setYPercent] = useState(0);
  const [mirrorPosition, setMirrorPosition] = useState({ x: 0, y: 0 });
  const [showMirror, setShowMirror] = useState(false);
  const [index, setIndex] = useState(0);
  const imgRef = useRef();  
  const variant =
    selectedColor && selectedSize
      ? variants?.find(
          (variant) =>
            variant.color.name === selectedColor &&
            variant.size.name === selectedSize
        )
      : null;
  const changeQuery = (key, value) => {
    query.set(key, value);
    setQuery(query);
  };

  const updateQuantity = (newQuantity) => {
    if (newQuantity < 0 || newQuantity > MAX_ITEM_QUANTITY) return;
    changeQuery("quantity", newQuantity);
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth >= 1024) {
      const img = imgRef.current.getBoundingClientRect();
      const x = e.clientX - img.left;
      const y = e.clientY - img.top;
      setXPercent((x / img.width) * 100);
      setYPercent((y / img.height) * 100);
      setMirrorPosition({ x: x - 50, y: y - 50 });
      setShowMirror(true);
    }
  };

  const handleMouseLeave = () => {
    setShowMirror(false);
  };

  const handleBtnChangeSlide = (v) => {
    const len = imgs?.length;
    if (index + v < 0 || index + v >= len) return;
    setIndex(index + v);
  };
  const fetchProduct = (path) => {
    fetch(`${process.env.REACT_APP_BE_ORIGIN}/products/${path}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setProduct(data.body.product);
          setVariants(data.body.variants);
          setImgs(data.body.imgs);
          document.title = data.body.product?.name;
        } else {
          toast.error(data.message);
        }
      })
      .catch((e) => toast.error(e.message));
  };
  useEffect(() => {
    fetchProduct(path);
  }, [path]);

  const handleAddToCart = () => {
    if (!loggedIn) {
      toast.warn("You need to login to perform this action");
      return;
    }

    if (!selectedColor) {
      toast.error("Please choose a color!");
      return;
    }
    if (!selectedSize) {
      toast.error("Please choose a size!");
      return;
    }

    fetch(`${process.env.REACT_APP_BE_ORIGIN}/carts/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        variantId: variant?.id,
        quantity: selectedQuantity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          let newItem = {
            quantity: selectedQuantity,
            product: product,
            variant: variant,
          };
          toast.success("Add to cart success");
        } else {
          toast.error(data.message);
        }
      })
      .catch((e) => toast.error(e.message));
  };
  return (
    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row md:p-10 text-lg">
      <div
        className={`hidden lg:flex flex-col lg:w-[10%] h-[500px] bg-white overflow-y-auto`}
      >
        {imgs?.map((i, idx) => (
          <img
            key={i}
            src={i}
            className="w-full hover:opacity-50"
            alt="product"
            onClick={() => setIndex(idx)}
          />
        ))}
      </div>

      <div className="w-full md:w-[50%] lg:w-[40%] h-[500px] relative flex justify-center group lg:bg-gray-100 lg:dark:bg-gray-800">
        <button
          disabled={index === 0}
          className="block lg:hidden lg:group-hover:block w-10 h-10 bg-gray-200 rounded-full dark:bg-gray-400 absolute disabled:opacity-50 top-1/2 left-0"
          onClick={() => handleBtnChangeSlide(-1)}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <img
          src={imgs?.[index]}
          ref={imgRef}
          className="w-full h-[500px] object-contain lg:group-hover:w-11/12 lg:object-cover lg:group-hover:object-contain"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          alt={product?.name}
        />
        <button
          disabled={index === imgs?.length - 1}
          className="block lg:hidden lg:group-hover:block w-10 h-10 bg-gray-200 rounded-full dark:bg-gray-400 absolute disabled:opacity-50 top-1/2 right-0"
          onClick={() => handleBtnChangeSlide(1)}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        {showMirror && (
          <div
            id="zoom-mirror"
            className="w-[150px] h-[150px] bg-cover bg-center bg-no-repeat absolute border-2 rounded-full shadow"
            style={{
              backgroundImage: `url(${imgs?.[index]})`,
              backgroundSize: "1500px",
              backgroundPosition: `${xPercent}% ${yPercent}%`,
              left: `${mirrorPosition.x}px`,
              top: `${mirrorPosition.y}px`,
              pointerEvents: "none",
            }}
          ></div>
        )}
      </div>

      <div className="w-full md:w-[50%] px-4 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">{product?.name}</h2>
        <p>
          Price:
          {product?.price?.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </p>
        <div className="color-container flex">
          <p>Color: </p>
          <div className="flex gap-2 ml-4 flex-wrap">
            {product?.colors?.map((color, index) => (
              <div
                key={index}
                onClick={() => changeQuery("color", color?.name)}
                className="rounded-full w-10 aspect-1 border-2 border-black dark:border-white hover:opacity-30 cursor-pointer"
                style={{
                  backgroundColor: color?.code,
                }}
                title={color?.name}
              >
                <div
                  className={`bg-slate-300 w-full aspect-1 rounded-full opacity-50 flex justify-center items-center ${
                    selectedColor === color?.name ? "block" : "hidden"
                  }`}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="size-container flex">
          <p>Size: </p>
          <div className="flex gap-2 ml-4 flex-wrap">
            {product?.sizes?.map((size, index) => (
              <div
                onClick={() => changeQuery("size", size?.name)}
                key={index}
                className="rounded-full text-center w-16 py-2 border-2 border-black dark:border-white hover:opacity-30 cursor-pointer relative"
              >
                {size?.name}
                <div
                  className={`absolute w-full h-full py-2 rounded-full text-center top-0 bg-black text-white dark:text-black dark:bg-white
                    ${selectedSize === size.name ? "block" : "hidden"}`}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedColor && selectedSize && (
          <div className="size-container flex">
            <p>Quantity: </p>
            <p>
              {variant?.quantity || <span className="text-red-500">0</span>}
            </p>
          </div>
        )}
        <div className="flex justify-between gap-4 items-center h-14">
          <div
            className={`h-10 max-w-24 border-2 ${
              selectedQuantity > variant?.quantity
                ? "border-red-500"
                : "border-black dark:border-white"
            }`}
          >
            <div className="quantity-editor flex">
              <button
                className="w-10"
                disabled={parseInt(selectedQuantity) <= 1}
                onClick={() => updateQuantity(parseInt(selectedQuantity) - 1)}
              >
                -
              </button>
              <input
                type="text"
                className="w-10 text-center bg-white text-black dark:bg-gray-900 dark:text-white"
                value={selectedQuantity}
                onChange={(e) => updateQuantity(parseInt(e.target.value) || 1)}
              />
              <button
                className="w-10"
                onClick={() => updateQuantity(parseInt(selectedQuantity) + 1)}
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={
              parseInt(selectedQuantity) > MAX_ITEM_QUANTITY || !loggedIn
            }
            className={`w-full bg-black h-14 text-white py-2 dark:bg-white dark:text-black uppercase ${
              loggedIn
                ? " hover:bg-gray-800 dark:hover:bg-gray-300"
                : "opacity-50"
            }`}
          >
            Add to cart
          </button>
        </div>
        <hr />

        <pre className="whitespace-pre-wrap text-justify">
          {product?.description}
        </pre>
      </div>
    </div>
  );
}
