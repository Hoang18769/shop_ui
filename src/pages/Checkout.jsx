import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { AppContext } from "../components/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import vnpay from "../assets/images/vnpay.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const { cart, fetchCart, setCart, token } = useContext(AppContext);
  const [form, setForm] = useState({
    phoneNumber: "",
    address: "",
    note: "",
    paymentMethod: "CASH",
  });
  const navigate = useNavigate();

  // Fetch cart data and set document title
  useEffect(() => {
    document.title = "Check out";
    if (token) fetchCart();
    ;
  }, [token]);

  // Update form fields dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Validate input fields
  const validateInput = useCallback(() => {
    if (!form.phoneNumber) {
      toast.warn("Please enter the phone number");
      return false;
    }
    if (!form.address) {
      toast.warn("Please enter the address");
      return false;
    }
    return true;
  }, [form]);

  // Handle order submission
  const handleOrder = () => {
    if (!validateInput()) return;

    fetch(`${process.env.REACT_APP_BE_ORIGIN}/orders/new`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setCart(null);
          toast.success("Order success!");
          form.paymentMethod === "VNPAY"
            ? (window.location.href = data?.body?.payUrl)
            : navigate(`/order/${data.body.id}`);
        } else {
          toast.error(data.message);
        }
      })
      .catch((e) => toast.error(e.message));
  };

  // Calculate total price and quantity
  const total = useMemo(() => {
    const totalPrice = cart?.items?.reduce(
      (acc, item) => acc + item.quantity * parseFloat(item.product.price),
      0
    );
    const totalQuantity =
      cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
    return { totalPrice, totalQuantity };
  }, [cart]);

  return cart?.items?.length ? (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row justify-between">
        {/* Form Section */}
        <div className="px-5 py-5 w-full lg:w-1/2 lg:pb-0">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">RECEIVED INFORMATION</h2>
            <input
              className="w-full shadow border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
              type="text"
              placeholder="Enter the phone number"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
            />
            <input
              className="w-full shadow border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
              type="text"
              placeholder="Enter the address"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
            <div>
              <label htmlFor="note">Note (optional)</label>
              <textarea
                className="w-full shadow border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
                rows="8"
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Order note. For example, time or more detailed delivery location instructions."
              />
            </div>
          </div>
        </div>
        {/* Cart Summary Section */}
        <div className="p-4 border-2 border-gray-400 w-full lg:w-1/2">
          <div className="flex flex-col gap-4 font-medium">
            <div className="flex justify-between uppercase">
              <p>Product</p>
              <p className="mr-5 hidden lg:block">Temporarily calculated</p>
            </div>
            <hr />
            <div className="grid gap-4 lg:grid-cols-1">
              {cart?.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col lg:flex-row items-start justify-between border-b py-4"
                >
                  {/* Hình ảnh sản phẩm */}
                  <img
                    src={item?.variant?.img}
                    alt={item?.product?.name}
                    className="w-20 h-20 object-contain mb-2 lg:mb-0"
                  />

                  {/* Thông tin sản phẩm */}
                  <div className="flex-1 lg:pl-4">
                    <h4 className="font-semibold text-sm md:text-base">
                      {item?.product?.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      <span
                        style={{ color: item?.variant?.color?.code }}
                        className="mr-1"
                      >
                        {item?.variant?.color?.name}
                      </span>
                      - {item?.variant?.size?.name}
                    </p>
                    <p className="text-sm font-light italic">
                      {item?.quantity} ×{" "}
                      {item?.product?.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>

                  {/* Giá */}
                  <div className="mt-2 lg:mt-0 text-right">
                    <p className="text-sm font-medium">
                      {(
                        item?.quantity * parseFloat(item?.product?.price)
                      ).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
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
                      {total.totalPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </p>
                </div>
                <em className="self-end text-sm">
                  Quantity: <span className="ml-2">{total.totalQuantity}</span>
                </em>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Payment Section */}
      <div className="flex flex-col gap-5 text-lg bg-gray-100 px-10 py-5 dark:bg-gray-600">
        <h2 className="font-semibold uppercase">Choose how to pay</h2>
        <div className="flex gap-5 items-center">
          <input
            type="radio"
            name="paymentMethod"
            className="ml-2 w-6 h-6"
            value="CASH"
            checked={form.paymentMethod === "CASH"}
            onChange={handleChange}
          />
          <p>COD - Cash on delivery</p>
          <FontAwesomeIcon icon={faMoneyBill} />
        </div>
        <div className="flex gap-5 items-center">
          <input
            type="radio"
            name="paymentMethod"
            className="ml-2 w-6 h-6"
            value="VNPAY"
            checked={form.paymentMethod === "VNPAY"}
            onChange={handleChange}
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
};

export default Checkout;
