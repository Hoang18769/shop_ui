import { useCallback, useContext, useEffect, useState } from "react";
import Status from "../components/Status";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../components/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash/debounce";
import Pagination from "../components/Pagination";
import Swal from "sweetalert2";

const debouncedFetchOrders = debounce((callback) => {
  callback();
}, 1000);

export default function Order() {
  const { token } = useContext(AppContext);
  const [orders, setOrders] = useState();
  const [query, setQuery] = useSearchParams();
  const [id, setId] = useState(query.get("id"));
  const from = query.get("from");
  const to = query.get("to");
  const status = query.get("status");
  const [page, setPage] = useState(parseInt(query.get("page")) || 1);
  const [totalPage, setTotalPage] = useState(1);
  const changeSearchQuery = (key, value) => {
    query.set(key, value);
    setQuery(query);
  };

  const fetchOrders = () => {
    fetch(
      `${process.env.REACT_APP_BE_ORIGIN}/orders/history?${query.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setOrders(data.body.content);
          setTotalPage(data.body.totalPages);
        } else {
          toast.error(data.message);
        }
      })
      .catch((e) => toast.error(e.message));
  };

  const handleCancel = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure you want to cancel this order?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_BE_ORIGIN}/orders/cancel/${id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.code === 200) {
              setOrders((prevOrders) => {
                const updatedOrders = prevOrders.map((order) =>
                  order.id === id ? { ...order, status: "CANCELLED" } : order
                );
                return updatedOrders;
              });
              toast.success("Cancel succes");
            } else {
              toast.error(data.message);
            }
          })
          .catch((e) => toast.error(e.message));
      }
    });
  };

  const handlePayAgain = useCallback(
    (id) => {
      fetch(`${process.env.REACT_APP_BE_ORIGIN}/orders/pay-again/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            window.location.href = data.body;
          } else {
            toast.error(data.message);
          }
        })
        .catch((e) => toast.error(e.message));
    },
    [token]
  );

  const handleClear = () => {
    setId(null);
    changeSearchQuery("id", "");
    changeSearchQuery("from", "");
    changeSearchQuery("to", "");
    changeSearchQuery("status", "");
  };

  useEffect(() => {
    document.title = "Order";
    return () => {
      debouncedFetchOrders.cancel();
    };
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [query]);

  useEffect(() => {
    debouncedFetchOrders(() => {
      if (id !== null) changeSearchQuery("id", id);
    });
  }, [id]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-bold text-2xl">Order History</h2>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h3 className="uppercase text-lg font-semibold text-gray-500">
            from date
          </h3>
          <input
            className="shadow appearance-none border rounded w-full py-[0.43rem] px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
            type="datetime-local"
            value={from || ""}
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
            value={to || ""}
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
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h3 className="uppercase text-lg font-semibold text-gray-500">
            status
          </h3>
          <div className="relative">
            <select
              value={status || ""}
              onChange={(e) => changeSearchQuery("status", e.target.value)}
              className="bg-transparent placeholder:text-gray-400 text-sm border border-gray-200 rounded pl-3 pr-8 py-2 focus:outline-none focus:border-gray-400 hover:border-gray-400 shadow-sm focus:shadow-md appearance-none cursor-pointer text-black bg-white dark:text-white dark:bg-gray-600"
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
        <div className="flex flex-1 ml-5 flex-col">
          <h3 className="uppercase text-lg font-semibold text-gray-500">id</h3>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
            type="text"
            placeholder="Enter id"
            value={id || ""}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
      </div>

      <div className="lg:hidden">
        {orders?.map((order) => (
          <div key={order?.id} className="border-b-2 py-2">
            <div className="flex justify-between my-2">
              <Status status={order?.status} />
              <div className="relative group">
                <button className="w-8 h-8 aspect-1 hover:bg-gray-200 hover:rounded-full dark:hover:text-black">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
                <div className="hidden group-hover:block absolute right-0 dark:bg-gray-800 top-8 w-48 bg-white shadow-md p-4 border-l-2 border-black dark:border-white z-10">
                  {order?.status === "NEW" && (
                    <button
                      onClick={() => handleCancel(order?.id)}
                      className="flex w-full gap-2 px-4 py-2 text-gray-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white hover:bg-red-500 hover:text-white text-sm"
                    >
                      Cancel
                    </button>
                  )}
                  {order?.status === "NEW" &&
                    order?.payment?.type == "VNPAY" &&
                    order?.payment?.payTime === null && (
                      <button
                        onClick={() => handlePayAgain(order?.id)}
                        className="flex w-full gap-2 px-4 py-2 text-gray-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white hover:bg-yellow-500 hover:text-white text-sm"
                      >
                        Pay again
                      </button>
                    )}
                  {["SUCCESS", "FAIL", "CANCELLED"].includes(order?.status) && (
                    <button className="flex w-full gap-2 px-4 py-2 text-gray-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white hover:bg-green-500 hover:text-white text-sm">
                      Re-order
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="uppercase w-1/6 font-bold">id</div>
              <div>{order?.id}</div>
            </div>
            <div className="flex">
              <div className="uppercase w-1/6 font-bold">Order Time</div>
              <div>{order?.orderTime}</div>
            </div>
            <div className="flex">
              <div className="uppercase w-1/6 font-bold">Pay Type</div>
              <div>{order?.payment?.type}</div>
            </div>
            <div className="flex justify-end">
              <Link
                to={`/order/${order.id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700"
              >
                View Detail
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden lg:block">
        <table className="min-w-full bg-white dark:bg-gray-600 border rounded-lg">
          <thead className="bg-gray-300 dark:bg-gray-800">
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Order Time</th>
              <th className="py-2 px-4 border-b">Payment Type</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order?.id} className="text-center">
                <td className="py-2 px-4 border-b">{order?.id}</td>
                <td className="py-2 px-4 border-b">
                  <Status status={order?.status} />
                </td>
                <td className="py-2 px-4 border-b">{order?.orderTime}</td>
                <td className="py-2 px-4 border-b">{order?.payment?.type}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex gap-2 items-center">
                    <Link
                      to={`/order/${order.id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700"
                    >
                      View Detail
                    </Link>
                    <div className="relative group">
                      <button className="w-8 h-8 aspect-1 hover:bg-gray-200 hover:rounded-full dark:hover:text-black">
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                      </button>
                      <div className="hidden group-hover:block absolute right-0 dark:bg-gray-800 top-full w-48 bg-white shadow-md p-4 border-l-2 border-black dark:border-white z-10">
                        {order?.status === "NEW" && (
                          <button
                            onClick={() => handleCancel(order?.id)}
                            className="flex w-full gap-2 px-4 py-2 text-gray-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white hover:bg-red-500 hover:text-white text-sm"
                          >
                            Cancel
                          </button>
                        )}
                        {order?.status === "NEW" &&
                          order?.payment?.type == "VNPAY" &&
                          order?.payment?.payTime === null && (
                            <button
                              onClick={() => handlePayAgain(order?.id)}
                              className="flex w-full gap-2 px-4 py-2 text-gray-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white hover:bg-yellow-500 hover:text-white text-sm"
                            >
                              Pay again
                            </button>
                          )}
                        {["SUCCESS", "FAIL", "CANCELLED"].includes(
                          order?.status
                        ) && (
                          <button className="flex w-full gap-2 px-4 py-2 text-gray-500 hover:border-b-2 hover:border-b-black dark:hover:border-b-white hover:bg-green-500 hover:text-white text-sm">
                            Re-order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        current={page}
        total={totalPage}
        onChange={(p) => {
          setPage(p);
          changeSearchQuery("page", p);
        }}
      />
    </div>
  );
}
