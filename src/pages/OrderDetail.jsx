import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { AppContext } from "../components/AppContext";
import founderAvatar from "../assets/images/founder-avatar.webp";
import Status from "../components/Status";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
export default function OrderDetails() {
  const { id } = useParams();
  const { user, token } = useContext(AppContext);
  const [order, setOrder] = useState();
  const [query, setQuery] = useSearchParams();
  const paymentReturn = query.get("payment-status");
  const fetchOrder = () => {
    fetch(`${process.env.REACT_APP_BE_ORIGIN}/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setOrder(data.body);
        } else {
          toast.error(data.message);
        }
      })
      .catch((e) => toast.error(e.message));
  };

  const handleCancel = () => {
    fetch(`${process.env.REACT_APP_BE_ORIGIN}/orders/cancel/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setOrder((prev) => ({ ...prev, status: "CANCELLED" }));
          toast.success("Cancel success");
        } else {
          toast.error(data.message);
        }
      })
      .catch((e) => toast.error(e.message));
  };

  useEffect(() => {
    if (token) {
      fetchOrder();
    }
    document.title = `Order ${id}`;
  }, [id, token]);

  const handlePayAgain = useCallback(() => {
    fetch(`${process.env.REACT_APP_BE_ORIGIN}/orders/pay-again/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          return data.body;
        } else {
          toast.error(data.message);
        }
      })
      .catch((e) => toast.error(e.message));
  }, [token]);

  useEffect(() => {
    if (paymentReturn && token) {
      if (paymentReturn === "success") {
        Swal.fire({
          icon: "success",
          title: "Payment success",
          showConfirmButton: true,
        });
        setQuery((prev) => prev.delete("payment-return"));
      } else if (paymentReturn === "fail") {
        Swal.fire({
          icon: "error",
          title: "Payment failed!<br/> Would you like to try again?",
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "Yes, try again!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            const url = handlePayAgain();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              title: ":<",
              showConfirmButton: true,
              timer: 1500,
            });
            setQuery((prev) => prev.delete("payment-return"));
          }
        });
      }
    }
  }, [paymentReturn, token]);

  let message;
  switch (order?.status) {
    case "NEW":
      message = `Thank you so much for shopping with us! We are excited to inform you that we have received your order and it is being processed. Our team is working to prepare your items. We will keep you updated as your order moves through the next stages. If you have any questions or need assistance, feel free to reach out. Thank you again for choosing our store!`;
      break;
    case "PAID":
      message = `Thank you for your payment! Your order has been successfully processed and we’re now preparing it for shipment. We're excited to get your items ready for delivery. If you need any help or have any questions, don’t hesitate to contact us. We appreciate your trust and look forward to delivering your purchase soon!`;
      break;
    case "PACKING":
      message = `Great news! Your order is now being packed with care and attention. We are making sure everything is perfect before it’s on its way to you. Thank you for your patience! We will notify you once it’s on its way. If you have any concerns, feel free to reach out to us.`;
      break;
    case "DELIVERY":
      message = `Your order is on its way! We’re thrilled to inform you that your items are out for delivery and should be with you soon. You will receive tracking information shortly, so you can monitor your parcel. If you have any questions or need further assistance, please let us know. Enjoy your new purchase!`;
      break;
    case "SUCCESS":
      message = `Your order has been successfully delivered! We hope you’re enjoying your new items. If there’s anything you need or any questions about your purchase, feel free to reach out. We look forward to serving you again soon and thank you for your continued support!`;
      break;
    case "FAIL":
      message = `We encountered an issue while delivering your order. Our delivery team was unable to complete the delivery as planned. We sincerely apologize for the inconvenience. Please contact us so we can resolve the issue and arrange for a new delivery. Thank you for your understanding and patience!`;
      break;
    case "SUCCESS":
      message = `We're sorry to inform you that your order has been canceled. If you have any questions regarding the cancellation or would like assistance with reordering, please don’t hesitate to contact us. We hope to serve you again in the future and thank you for considering our store.`;
      break;
  }
  return (
    token && (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="flex justify-between space-x-4">
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Order #{order?.id} {order?.orderTime}
            </div>
            <h1 className="text-2xl font-semibold">
              Thank you {user?.firstname}!
            </h1>
          </div>
          <Status status={order?.status} />
        </div>

        {/* Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Map and Address */}
            <div className=" shadow dark:shadow-gray-400 rounded-lg p-6">
              <div className="font-medium">Contact</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {order?.phone}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {user?.email}
              </div>
              <div className="mt-4">
                <div className="font-medium">Address</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.firstname} {user?.lastname}
                  <br />
                  {order?.address}
                </div>
              </div>
              <div className="mt-4">
                <div className="font-medium">Payment</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {order?.payment?.type}
                </div>
              </div>
              <div className="mt-4">
                <div className="font-medium">Note</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {order?.note}
                </div>
              </div>
            </div>

            {/* Message from Founder */}
            <div className="shadow dark:shadow-gray-400 rounded-lg p-6 text-center">
              <div className="flex flex-col items-center space-x-4">
                <div className="w-[100px] aspect-1 rounded-full overflow-hidden">
                  <img
                    src={founderAvatar}
                    alt="Founder avatar"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-semibold">A message from our Founder</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-justify">
                    {message}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="shadow dark:shadow-gray-400 rounded-lg px-6 py-2 space-y-4">
            <h2 className="font-semibold flex gap-4">
              <p>Your Order</p>
              <span className="bg-black text-white dark:bg-white dark:text-black w-5 h-5 flex justify-center items-center rounded-full">
                {order?.items?.reduce((total, i) => total + i.quantity, 0)}
              </span>
            </h2>
            <div className="space-y-4">
              {/* Order Items */}
              {order?.items?.map((item, index) => (
                <div key={index} className="flex items-center">
                  <img
                    src={item?.product?.img}
                    alt={item?.product?.name}
                    className="h-16 w-16 rounded"
                  />
                  <div className="ml-4 flex-1">
                    <div className="font-medium">{item?.product?.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <span style={{ color: item?.variant?.color?.code }}>
                        {item?.variant?.color?.name}
                      </span>
                      , Size {item?.variant?.size?.code}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      x{item?.quantity}
                    </div>
                  </div>
                  <div className="font-medium">
                    {item?.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>
                </div>
              ))}
              <hr />
              {/* Summary */}
              <div className="pt-4 space-y-2">
                <div className="flex justify-between font-medium pt-2">
                  <span>Total</span>
                  <span>
                    {order?.items
                      ?.reduce((total, item) => {
                        return total + item.quantity * item.price;
                      }, 0)
                      .toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-500">
            Need Help?{" "}
            <button className="text-blue-600 underline ml-1">Contact Us</button>
          </div>
          {order?.status === "NEW" ? (
            <button
              onClick={handleCancel}
              className="px-10 py-2 bg-red-600 text-red-100 rounded hover:opacity-50"
            >
              Cancel
            </button>
          ) : (
            <Link
              to="/product-category"
              className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded hover:opacity-50"
            >
              Continue Shopping
            </Link>
          )}
        </div>
      </div>
    )
  );
}
