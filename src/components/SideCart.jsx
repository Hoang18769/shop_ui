import React, { useContext, useCallback, useMemo } from "react";
import { AppContext } from "./AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import { MAX_ITEM_QUANTITY } from "../constant";
import { toast } from "react-toastify";

export default function SideCart() {
  const { cart, setCart, fetchCart, token } = useContext(AppContext);
  const quantity = useMemo(() => {});
  const updateCartQuantity = useCallback(
    debounce((itemId, newQuantity) => {}, 1000),
    [quantity]
  );

  const handleChangeQuantity = (variantId, newQuantity) => {
    // Kiểm tra nếu số lượng không hợp lệ
    if (newQuantity < 0 || newQuantity > MAX_ITEM_QUANTITY) return;

    setCart((prevCart) => {
      // Cập nhật các item trong giỏ hàng
      const updatedItems = prevCart?.items?.map((item) =>
        item?.variant?.id === variantId
          ? { ...item, quantity: newQuantity }
          : item
      );

      return { ...prevCart, items: updatedItems };
    });
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
    <div className="bg-white dark:bg-black dark:text-white flex flex-col gap-4 font-medium">
      <div className="flex justify-between items-center">
        <h2>CART</h2>
        <div className="flex gap-4 text-2xl">
          <button
            onClick={() => fetchCart()}
            className="w-8 h-8 aspect-1 hover:bg-gray-200 hover:rounded-full dark:hover:text-black"
          >
            <FontAwesomeIcon icon={faRotateRight} />
          </button>
          <label
            className="w-8 h-8 aspect-1 hover:bg-gray-200 hover:rounded-full dark:hover:text-black flex items-center justify-center"
            htmlFor="cart"
          >
            <FontAwesomeIcon icon={faXmark} />
          </label>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-1 divide-y-2 h-2/5 overflow-y-auto">
        {cart?.items?.map((item) => (
          <div key={item?.variant?.id} className="flex gap-4 relative py-2">
            <button
              onClick={() => handleRemoveItem(item?.variant?.id)}
              className="absolute top-2 right-0 w-8 h-8 aspect-1 hover:bg-gray-200 hover:rounded-full dark:hover:text-black"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="flex gap-4">
              <img
                src={item?.variant?.img}
                alt={item?.product?.name}
                className="w-24 object-contain"
              />
              <div className="max-w-[50%] lg:max-w-[80%]">
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
                <div>
                  <div className="quantity-editor">
                    <button
                      className="w-10 border-2"
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
                      type="number"
                      className="w-10 border-y-2 text-center bg-white text-black dark:bg-black dark:text-white"
                      value={item?.quantity}
                      onChange={(e) =>
                        handleChangeQuantity(
                          item?.variant?.id,
                          parseInt(e.target.value) || 1
                        )
                      }
                    />
                    <button
                      className="w-10 border-2"
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
          {cart?.items
            ?.reduce((total, item) => {
              return (
                total + item.quantity * parseFloat(item.product.price || 0)
              );
            }, 0)
            .toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
        </p>
      </div>
      <em className="self-end text-sm">
        Quantity:
        {cart?.items?.length || 0}
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
