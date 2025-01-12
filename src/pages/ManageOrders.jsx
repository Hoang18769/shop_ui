import { useContext, useEffect, useState } from "react";
import { AppContext } from "../components/AppContext";
import Status from "../components/Status";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const { token } = useContext(AppContext);
  const [query, setQuery] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);

  const changeSearchQuery = (key, value) => {
    query.set(key, value);
    setQuery(query);
  };

  const handleClear = () => {
    setQuery(new URLSearchParams());
  };

  const fetchOrders = () => {
    let tempQuery = new URLSearchParams(query.toString());
    if (query.get("page")) {
      tempQuery.set("page", query?.get("page") - 1);
    }
    fetch(
      `${
        process.env.REACT_APP_BE_ORIGIN
      }/admin/orders/search?sort=orderTime,desc&size=5&${tempQuery?.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          console.log(data?.body);

          setOrders(data.body.content);
          setTotalPages(data.body.page.totalPages);
        } else {
          console.error("Failed to fetch orders");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleUpdateStatus = (id, status) => {
    fetch(
      `${process.env.REACT_APP_BE_ORIGIN}/admin/orders/update-status?id=${id}&status=${status}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.code === 200) {
          toast.success("Update status success");
          setOrders((prev) =>
            prev.map((order) =>
              order.id === id ? { ...order, status: status } : order
            )
          );
        } else toast.error(`${data?.message}`);
      });
  };

  useEffect(() => {
    document.title = "Manage Order";
  }, []);

  useEffect(() => {
    if (token) fetchOrders();
  }, [token, query]);

  return (
    <div className="p-4">
      <h1 className="text-2xl dark:text-white font-bold mb-4">Manage Orders</h1>
      <div className="flex justify-between flex-col lg:flex-row">
        <div className="flex flex-col">
          <h3 className="uppercase text-lg font-semibold text-gray-500">
            from date
          </h3>
          <input
            className="shadow appearance-none border rounded w-full py-[0.43rem] px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
            type="datetime-local"
            value={query.get("from") || ""}
            onChange={(e) => changeSearchQuery("from", e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <h3 className="uppercase text-lg font-semibold text-gray-500">
            to date
          </h3>
          <input
            className="shadow appearance-none border rounded w-full py-[0.43rem] px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
            type="datetime-local"
            value={query.get("to") || ""}
            onChange={(e) => changeSearchQuery("to", e.target.value)}
          />
        </div>
        <input
          type="reset"
          value="CLEAR"
          onClick={handleClear}
          className="px-5 py-2 font-semibold hover:bg-gray-300 self-end"
        />
      </div>
      <div className="flex justify-between flex-col lg:flex-row">
        <div className="flex flex-col">
          <h3 className="uppercase text-lg font-semibold text-gray-500">
            status
          </h3>
          <div className="relative w-full">
            <select
              value={query.get("status") || ""}
              onChange={(e) => changeSearchQuery("status", e.target.value)}
              className="bg-transparent placeholder:text-gray-400 text-sm border border-gray-200 rounded pl-3 pr-8 py-2 focus:outline-none focus:border-gray-400 hover:border-gray-400 shadow-sm focus:shadow-md appearance-none cursor-pointer text-black bg-white dark:text-white dark:bg-gray-600 w-full"
            >
              <option>ALL</option>
              <option>NEW</option>
              <option>PACKING</option>
              <option>DELIVERY</option>
              <option>SUCCESS</option>
              <option>CANCELLED</option>
              <option>FAILED</option>
              <option>REJECTED</option>
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
        <div className="flex flex-1 lg:ml-5 flex-col">
          <h3 className="uppercase text-lg font-semibold text-gray-500">id</h3>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
            type="text"
            placeholder="Enter id"
            value={query.get("id") || ""}
            onChange={(e) => changeSearchQuery("id", e.target.value)}
          />
        </div>
      </div>

      {/* Order List */}
      <div className="space-y-4 my-5">
        {orders.length > 0 ? (
          <>
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-300 rounded-lg p-4 bg-white text-black dark:bg-gray-700 dark:text-white shadow-sm"
              >
                {/* Order Header */}
                <div className="flex lg:items-center flex-col lg:flex-row lg:justify-between mb-4 space-y-2">
                  <div>
                    <h2 className="text-lg font-bold">Order ID: {order.id}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Placed on: {new Date(order.orderTime).toLocaleString()}
                    </p>
                  </div>
                  <Status status={order?.status} />
                </div>

                {/* User Info */}
                <div className="mb-4">
                  <p className="text-sm">
                    <span className="font-semibold">Name:</span>
                    {order.user.firstname} {order.user.lastname}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Email:</span>
                    {order.user.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Phone:</span>
                    {order.phoneNumber}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Address:</span>
                    {order.address}
                  </p>
                </div>

                {/* Items */}
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Items:</h3>
                  <ul className="space-y-2">
                    {order.items.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-4 border-b pb-2 last:border-b-0"
                      >
                        <img
                          src={item.product.img}
                          alt={item.product.name}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            {item.variant.size.name}, {item.variant.color.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm text-gray-400">
                            Price: {item.price.toLocaleString()} VND
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Payment */}
                <div className="mb-4">
                  <p className="text-sm">
                    <span className="font-semibold">Payment type:</span>
                    {order.payment.type}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Pay Time:</span>
                    {order.payment.payTime
                      ? new Date(order.payment.payTime).toLocaleString()
                      : "Not Paid"}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                  {order?.status === "NEW" && (
                    <>
                      <button
                        onClick={() =>
                          handleUpdateStatus(order?.id, "REJECTED")
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:opacity-50"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(order?.id, "PACKING")}
                        className="bg-violet-500 text-white px-4 py-2 rounded-md shadow-sm hover:opacity-50"
                      >
                        Packing
                      </button>
                    </>
                  )}
                  {order?.status === "PACKING" && (
                    <button
                      onClick={() => handleUpdateStatus(order?.id, "DELIVERY")}
                      className="bg-cyan-300 text-white px-4 py-2 rounded-md shadow-sm hover:opacity-50"
                    >
                      Send
                    </button>
                  )}
                  {order?.status === "DELIVERY" && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(order?.id, "FAILED")}
                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:opacity-50"
                      >
                        Fail
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(order?.id, "SUCCESS")}
                        className="bg-green-400 text-white px-4 py-2 rounded-md shadow-sm hover:opacity-50"
                      >
                        Complete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
            <Pagination
              current={parseInt(query?.get("page")) || 1}
              total={totalPages}
              onChange={(n) => changeSearchQuery("page", n)}
            />
          </>
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
}
