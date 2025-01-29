import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContext";
import { debounce } from "lodash";
import { faRotateRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MAX_ITEM_QUANTITY } from "../constant";
import { toast } from "react-toastify";

export default function Cart() {
  const { cart, setCart, fetchCart, token } = useContext(AppContext);
  const quantity = useMemo(() => {});
  useEffect(() => {
    document.title = "Cart";
  }, []);

  const updateCartQuantity = useCallback(
    debounce((variantId, newQuantity) => {
      fetch(`${process.env.REACT_APP_BE_ORIGIN}/carts/update-quantity`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          variantId: variantId,
          quantity: newQuantity,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
          } else {
            toast.error(data.message);
          }
        })
        .catch((e) => toast.error(e.message));
    }, 1000),
    [quantity, token]
  );
  const handleChangeQuantity = (variantId, newQuantity) => {
    // Kiểm tra nếu số lượng không hợp lệ
    if (newQuantity < 0 || newQuantity > MAX_ITEM_QUANTITY) return;

    setCart((prevCart) => {
      // Cập nhật các item trong giỏ hàng
      const updatedItems = prevCart?.items?.map((item) =>
        item?.variant?.id === variantId
          ? {
              ...item,
              quantity: Math.min(newQuantity, item?.variant?.quantity),
            }
          : item
      );

      return { ...prevCart, items: updatedItems };
    });

    // Gọi API hoặc hàm cập nhật trên server
    updateCartQuantity(variantId, newQuantity);
  };

  const handleRemoveItem = (variantId) => {
    fetch(`${process.env.REACT_APP_BE_ORIGIN}/carts/remove/${variantId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setCart((prevCart) => {
            const updatedItems = prevCart?.items?.filter(
              (item) => item?.variant?.id !== variantId
            );
            return { ...prevCart, items: updatedItems };
          });
          toast.success("Remove item success");
        } else {
          toast.error(data.message);
        }
      })
      .catch((e) => toast.error(e.message));
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-3/4 px-2">
        <div className="md:hidden">
          <div className="grid grid-cols-1 divide-y-2">
            {cart?.items?.map((item, index) => (
              <div key={index} className="mb-2 pt-2 flex gap-2">
                <img
                  src={item?.variant?.img}
                  alt={item?.product?.name}
                  className="w-24 min-w-24 object-contain"
                />
                <div className="flex flex-col w-full">
                  <div className="flex justify-between">
                    <Link
                      to={`/product/${item?.product?.path}/?color=${item?.variant?.color?.name}&size=${item?.variant?.size?.name}&quantity=${item?.quantity}`}
                      className="font-semibold"
                    >
                      {item?.product?.name}
                      <span
                        style={{ color: item?.variant?.color?.code }}
                        className="px-1"
                      >
                        {item?.variant?.color?.name}
                      </span>
                      <span> - {item?.variant?.size?.name}</span>
                    </Link>
                    <div className="flex">
                      <div className="rounded-full bg-gray-100 px-2 dark:bg-gray-800">
                        {item?.variant?.quantity} product(s) left
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item?.variant?.id)}
                        className="w-8 h-8 aspect-1 hover:bg-gray-200 hover:rounded-full dark:hover:text-black"
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p className="uppercase">Giá:</p>
                    <p>
                      {(parseFloat(item?.product?.price) || 0).toLocaleString(
                        "vi-VN",
                        {
                          style: "currency",
                          currency: "VND",
                        }
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="uppercase">Số lượng:</p>
                    <div
                      className={`max-h-12 border-2 ${
                        item?.quantity > item?.variant?.quantity
                          ? "border-red-500"
                          : "border-black dark:border-white"
                      }`}
                    >
                      <div className="quantity-editor h-6 flex">
                        <button
                          className="w-8"
                          disabled={parseInt(item?.quantity) <= 1}
                          onClick={() => {
                            if (item?.quantity - 1 <= 0) {
                              handleRemoveItem(item?.variant?.id);
                            } else {
                              handleChangeQuantity(
                                item?.variant?.id,
                                item?.quantity - 1
                              );
                            }
                          }}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="w-8 text-center bg-white text-black dark:bg-black dark:text-white"
                          value={item?.quantity}
                          onChange={(e) =>
                            handleChangeQuantity(
                              item?.variant?.id,
                              parseInt(e.target.value) || 1
                            )
                          }
                        />
                        <button
                          className="w-8"
                          disabled={
                            parseInt(item?.quantity) >= MAX_ITEM_QUANTITY
                          }
                          onClick={() =>
                            handleChangeQuantity(
                              item?.variant?.id,
                              item?.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p className="uppercase">Temporarily calculated:</p>
                    <div>
                      {(
                        parseFloat(item?.product?.price) * item?.quantity || 0
                      ).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:block">
          <div className="grid grid-cols-5 uppercase border-b-2 border-b-gray-100 text-center">
            <div>
              <button
                onClick={() => fetchCart()}
                className="w-8 h-8 aspect-1 text-2xl hover:bg-gray-200 hover:rounded-full dark:hover:text-black"
              >
                <FontAwesomeIcon icon={faRotateRight} />
              </button>
            </div>
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Temporarily calculated</div>
          </div>
          <div className="flex flex-col">
            {cart?.items?.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-5 py-2 border-b-2 border-b-gray-100"
              >
                <div className="flex items-center justify-center gap-2 mr-2">
                  <button
                    onClick={() => handleRemoveItem(item?.variant?.id)}
                    className="w-8 h-8 aspect-1 hover:bg-gray-200 hover:rounded-full dark:hover:text-black"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                  <img
                    src={item?.variant?.img}
                    alt={item?.product?.name}
                    className="w-24 object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <Link
                    to={`/product/${item?.product?.path}/?color=${item?.variant?.color?.name}&size=${item?.variant?.size?.name}&quantity=${item?.quantity}`}
                    className="font-semibold"
                  >
                    {item?.product?.name}
                    <span
                      style={{ color: item?.variant?.color?.code }}
                      className="px-1"
                    >
                      {item?.variant?.color?.name}
                    </span>
                    <span> - {item?.variant?.size?.name}</span>
                  </Link>
                  <div className="rounded-full bg-gray-100 px-2 dark:bg-gray-800">
                    {item?.variant?.quantity} product(s) left
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  {(parseFloat(item?.product?.price) || 0).toLocaleString(
                    "vi-VN",
                    {
                      style: "currency",
                      currency: "VND",
                    }
                  )}
                </div>
                <div className="flex items-center justify-center">
                  <div
                    className={`max-h-12 border-2 ${
                      item?.quantity > item?.variant?.quantity
                        ? "border-red-500"
                        : "border-black dark:border-white"
                    }`}
                  >
                    <div className="quantity-editor h-10 flex">
                      <button
                        className="w-10"
                        disabled={parseInt(item?.quantity) <= 1}
                        onClick={() => {
                          if (item?.quantity - 1 <= 0) {
                            handleRemoveItem(item?.variant?.id);
                          } else {
                            handleChangeQuantity(
                              item?.variant?.id,
                              item?.quantity - 1
                            );
                          }
                        }}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="w-10 text-center bg-white text-black dark:bg-black dark:text-white"
                        value={item?.quantity}
                        onChange={(e) =>
                          handleChangeQuantity(
                            item?.variant?.id,
                            parseInt(e.target.value) || 1
                          )
                        }
                      />
                      <button
                        className="w-10"
                        disabled={parseInt(item?.quantity) >= MAX_ITEM_QUANTITY}
                        onClick={() =>
                          handleChangeQuantity(
                            item?.variant?.id,
                            item?.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  {(
                    parseFloat(item?.product?.price) * item?.quantity || 0
                  ).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/4 lg:h-1/4 lg:border-2 lg:border-gray-100 p-5">
        <h2 className="text-xl font-bold">CART</h2>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>
              {cart?.items
                ?.reduce((total, item) => {
                  return total + item?.quantity * item?.product?.price;
                }, 0)
                .toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
            </p>
          </div>
          <hr />
          <Link
            to="/checkout"
            className="w-full text-center py-2 bg-black text-white dark:text-black dark:bg-white hover:opacity-50"
          >
            PAYMENT
          </Link>
        </div>
      </div>
    </div>
  );
}
