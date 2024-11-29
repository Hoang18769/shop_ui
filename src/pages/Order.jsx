import { useContext, useEffect, useState } from "react";
import Status from "../components/Status";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../components/AppContext";

export default function Order() {
  const { token } = useContext(AppContext);
  const [orders, setOrders] = useState();

  const fetchOrders = () => {
    fetch(`${process.env.REACT_APP_BE_ORIGIN}/orders/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setOrders(data.body.content);
        } else {
          toast.error(data.message);
        }
      })
      .catch((e) => toast.error(e.message));
  };

  const handleCancel = (id) => {
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
  };

  useEffect(() => {
    document.title = "Order";
    fetchOrders();
  }, []);

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
            type="date"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="uppercase text-lg font-semibold text-gray-500">
            to date
          </h3>
          <input
            className="shadow appearance-none border rounded w-full py-[0.43rem] px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
            type="date"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="uppercase text-lg font-semibold text-gray-500">
            status
          </h3>
          <div className="relative">
            <select className="bg-transparent placeholder:text-gray-400 text-sm border border-gray-200 rounded pl-3 pr-8 py-2 focus:outline-none focus:border-gray-400 hover:border-gray-400 shadow-sm focus:shadow-md appearance-none cursor-pointer text-black bg-white dark:text-white dark:bg-gray-600">
              <option>ALL</option>
              <option>NEW</option>
              <option>PAID</option>
              <option>PACKING</option>
              <option>DELIVERY</option>
              <option>SUCCESS</option>
              <option>CANCELLED</option>
              <option>FAIL</option>
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
        <div className="flex flex-col">
          <h3 className="uppercase text-lg font-semibold text-gray-500">id</h3>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
            type="text"
            placeholder="Enter id"
          />
        </div>
        <div className="self-end">
          <input
            type="reset"
            value="CLEAR"
            className="px-5 py-2 font-semibold hover:bg-gray-300"
          />
        </div>
        <div className="self-end">
          <input
            type="submit"
            value="SEARCH"
            className="bg-black text-white dark:bg-white dark:text-black px-5 py-2 font-semibold hover:bg-gray-300"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
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
              <tr key={order.id} className="text-center">
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">
                  <Status status={order.status} />
                </td>
                <td className="py-2 px-4 border-b">{order.orderTime}</td>
                <td className="py-2 px-4 border-b">{order.payment.type}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex justify-start">
                    <Link
                      to={`/order/${order.id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700"
                    >
                      View Detail
                    </Link>
                    {order.status === "NEW" ? (
                      <button
                        onClick={() => handleCancel(order.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    ) : ["SUCCESS", "FAIL", "CANCEL"].includes(order.status) ? (
                      <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700">
                        Re-Order
                      </button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
