import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../components/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import vnpay from "../assets/images/vnpay.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Checkout() {
  const { cart, fetchCart, setCart, token } = useContext(AppContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Check out";
  }, []);
  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);
  const handleOrder = () => {
    if (phoneNumber === "") {
      toast.warn("Please enter the phone number");
      return;
    }
    if (address === "") {
      toast.warn("Please enter the address");
      return;
    }

    fetch(`${process.env.REACT_APP_BE_ORIGIN}/orders/new`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, address, note, paymentMethod }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setCart(null);
          toast.success("Order success!");
          if (paymentMethod === "VNPAY") {
            window.location.href = data?.body?.payUrl;
          } else {
            navigate(`/order/${data.body.id}`);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((e) => toast.error(e.message));
  };

  return cart?.items?.length ? (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="px-5 py-5 w-full lg:w-1/2 lg:pb-0">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">RECEIVED INFORMATION</h2>
            <input
              className="w-full shadow border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
              type="text"
              placeholder="Enter the phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              className="w-full shadow border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
              type="text"
              placeholder="Enter the address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div>
              <label htmlFor="note">Note (optional)</label>
              <textarea
                className="w-full shadow border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
                rows="8"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Order note. 
For example, time or more detailed delivery location instructions."
              />
            </div>
          </div>
        </div>
        <div className="p-4 border-2 border-gray-400 w-full lg:w-1/2">
          <div className="flex flex-col gap-4 font-medium">
            <div className="flex justify-between uppercase">
              <p>Product</p>
              <p className="mr-5">Temporarily calculated</p>
            </div>
            <hr />
            <div className="grid grid-cols-1 divide-y-2 h-1/2 overflow-y-auto">
              {cart?.items?.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <div key={item?.variant?.id} className="flex gap-4 py-2">
                    <div className="flex gap-4">
                      <img
                        src={item?.variant?.img}
                        alt={item?.product?.name}
                        className="w-24 object-contain"
                      />
                      <div className="max-w-[70%]">
                        <h4 className="font-semibold">
                          {item?.product?.name}
                          <span
                            style={{ color: item?.variant?.color?.code }}
                            className="px-1"
                          >
                            {item?.variant?.color?.name}
                          </span>
                          <span> - {item?.variant?.size?.name}</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <p className="text-right text-sm font-thin italic mr-5">
                    {item?.quantity}
                    {" × "}
                    {item?.product?.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
              ))}
            </div>
            <hr />
            <div className="flex justify-between">
              <Link
                to="/account/?tab=cart"
                className="w-1/3 text-center py-2 bg-gray-200 text-black dark:text-black hover:opacity-50 self-center"
              >
                EDIT
              </Link>
              <div>
                <div className="flex gap-2 text-2xl">
                  <p>
                    Total:
                    <span className="ml-2">
                      {cart?.items
                        ?.reduce((total, product) => {
                          return (
                            total +
                            product.quantity * parseFloat(product.product.price)
                          );
                        }, 0)
                        .toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                    </span>
                  </p>
                </div>
                <em className="self-end text-sm">
                  Quantity:
                  <span className="ml-2">
                    {cart?.items?.reduce((total, item) => {
                      return total + (item?.quantity || 0);
                    }, 0) || 0}
                  </span>
                </em>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 text-lg bg-gray-100 px-10 py-5 dark:bg-gray-600">
        <h2 className="font-semibold uppercase">Choose how to pay</h2>
        <div className="flex gap-5 items-center">
          <input
            type="radio"
            name="payment-type"
            className="ml-2 w-6 h-6"
            value="CASH"
            checked={paymentMethod === "CASH"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <p>COD - Cash on delivery</p>
          <FontAwesomeIcon icon={faMoneyBill} />
        </div>
        <div className="flex gap-5 items-center">
          <input
            type="radio"
            name="payment-type"
            className="ml-2 w-6 h-6"
            value="VNPAY"
            checked={paymentMethod === "VNPAY"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <img src={vnpay} alt="vn-pay-logo" className="h-5" />
        </div>
        <hr />
        <button
          onClick={handleOrder}
          className="w-full text-center py-2 bg-black text-white dark:text-black dark:bg-white hover:opacity-50"
        >
          ORDER
        </button>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center flex-col gap-10">
      <h2 className="text-2xl font-semibold">Your cart is empty</h2>
      <Link
        to="/product-category"
        className="w-full text-center py-2 bg-black text-white dark:text-black dark:bg-white hover:opacity-50"
      >
        Explore our great products
      </Link>
    </div>
  );
}
