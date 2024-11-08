import React, { useContext, useCallback, useMemo } from "react";
import { AppContext } from "./AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import { MAX_ITEM_QUANTITY } from "../constant";

export default function SideCart() {
  const { cart, setCart } = useContext(AppContext);
  const quantity = useMemo(() => {});
  const updateCartQuantity = useCallback(
    debounce((itemId, newQuantity) => {}, 1000),
    [quantity]
  );

  const handleChangeQuantity = (productId, newQuantity) => {
    if (newQuantity < 0 || newQuantity > MAX_ITEM_QUANTITY) return;
    setCart((prevCart) => {
      const updatedProducts = prevCart.products.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
      return { ...prevCart, products: updatedProducts };
    });
    updateCartQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    setCart((prevCart) => {
      const updatedProducts = prevCart.products.filter(
        (item) => item.product.id !== productId
      );
      return { ...prevCart, products: updatedProducts };
    });
  };

  return (
    <div className="bg-white dark:bg-black dark:text-white flex flex-col gap-4 font-medium">
      <div className="flex justify-between items-center">
        <h2>CART</h2>
        <label className="mb-2 hover:scale-110" htmlFor="cart">
          <FontAwesomeIcon
            className="text-2xl dark:hover:text-black"
            icon={faXmark}
          />
        </label>
      </div>
      <hr />
      <div className="grid grid-cols-1 divide-y-2 h-2/5 overflow-y-auto">
        {cart?.products?.map((item) => (
          <div key={item.product.id} className="flex gap-4 relative py-2">
            <button
              onClick={() => handleRemoveItem(item.product.id)}
              className="absolute top-2 right-0 w-8 h-8 aspect-1 hover:bg-gray-200 hover:rounded-full dark:hover:text-black"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="flex gap-4">
              <img
                src={item?.product?.img}
                alt={item?.product?.name}
                className="w-24 object-contain"
              />
              <div className="max-w-[50%] lg:max-w-[80%]">
                <Link
                  to={`/product/${item?.product?.path}/?color=${item?.color?.name}&size=${item?.size}&quantity=${item?.quantity}`}
                  className="font-semibold"
                >
                  {item?.product?.name}
                  <span style={{ color: item?.color?.code }} className="px-1">
                    {item?.color?.name}
                  </span>
                  <span> - {item?.size}</span>
                </Link>
                <div>
                  <div className="quantity-editor">
                    <button
                      className="w-10 border-2"
                      disabled={parseInt(item?.quantity) <= 1}
                      onClick={() => {
                        if (item?.quantity - 1 <= 0) {
                          handleRemoveItem(item.product.id);
                        } else {
                          handleChangeQuantity(
                            item.product.id,
                            item.quantity - 1
                          );
                        }
                      }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="w-10 border-y-2 text-center bg-white text-black dark:bg-black dark:text-white"
                      value={item?.quantity}
                      onChange={(e) =>
                        handleChangeQuantity(
                          item.product.id,
                          parseInt(e.target.value) || 1
                        )
                      }
                    />
                    <button
                      className="w-10 border-2"
                      disabled={parseInt(item?.quantity) >= MAX_ITEM_QUANTITY}
                      onClick={() =>
                        handleChangeQuantity(
                          item?.product?.id,
                          item?.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <p>
                      {(parseFloat(item?.product?.price) || 0).toLocaleString(
                        "vi-VN",
                        {
                          style: "currency",
                          currency: "VND",
                        }
                      )}
                    </p>
                    <p>*</p>
                    <p>{item?.quantity}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="flex gap-2 text-2xl self-end">
        <p>
          Subtotal:
          {cart?.products
            ?.reduce((total, product) => {
              return (
                total +
                product.quantity * parseFloat(product.product.price || 0)
              );
            }, 0)
            .toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
        </p>
      </div>
      <em className="self-end text-sm">
        Quantity:
        {cart?.products?.reduce((count, product) => {
          return count + product.quantity;
        }, 0)}
      </em>
      <hr />
      <Link
        to="/account/?tab=cart"
        className="w-full text-center py-2 bg-gray-300 text-white hover:opacity-50 dark:text-gray-700"
      >
        VIEW CART
      </Link>
      <Link
        to="/checkout"
        className="w-full text-center py-2 bg-black text-white dark:text-black dark:bg-white hover:opacity-50"
      >
        PAYMENT
      </Link>
    </div>
  );
}
