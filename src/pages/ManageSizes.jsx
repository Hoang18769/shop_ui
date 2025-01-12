import { useContext, useEffect, useState } from "react";
import { AppContext } from "../components/AppContext";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";

export default function ManageSize() {
  const { token } = useContext(AppContext);
  const [sizes, setSizes] = useState([]);
  const [name, setName] = useState("");

  const fetchSizes = () => {
    fetch(`${process.env.REACT_APP_BE_ORIGIN}/admin/sizes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) setSizes(data.body);
      })
      .catch((error) => console.error(error));
  };

  const handleAdd = () => {
    fetch(`${process.env.REACT_APP_BE_ORIGIN}/admin/sizes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          toast.success("Add new size success!");
          setSizes((prev) => [...prev, data.body]);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (name) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure you want to delete this size?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `${
            process.env.REACT_APP_BE_ORIGIN
          }/admin/sizes?name=${encodeURIComponent(name)}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.code === 200) {
              toast.success("Delete size success!");
              setSizes((prev) => prev.filter((size) => size.name !== name));
            } else {
              toast.error(data.message);
            }
          })
          .catch((error) => console.error(error));
      }
    });
  };

  useEffect(() => {
    document.title = "Manage Sizes";
  }, []);

  useEffect(() => {
    if (token) {
      fetchSizes();
    }
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Manage Sizes</h1>
      <div className="flex flex-col lg:flex-row gap-3 mb-5">
        <div className="flex flex-1 flex-col">
          <h3 className="uppercase text-lg font-semibold text-gray-500">
            Size
          </h3>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
            type="text"
            placeholder="Enter size name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button
          onClick={handleAdd}
          className="px-5 py-2 font-semibold bg-black text-white dark:bg-white dark:text-black hover:opacity-50"
        >
          ADD NEW
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-500 dark:text-white border border-gray-200">
          <thead>
            <tr className="bg-gray-600 border-b border-gray-200">
              <th className="text-left px-6 py-3">Size Name</th>
              <th className="text-center px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 hover:dark:bg-gray-600 border-b border-gray-200"
              >
                <td className="px-6 py-3">{item.name}</td>
                <td className="text-center">
                  <button onClick={() => handleDelete(item.name)}>
                    <FontAwesomeIcon
                      className="hover:bg-black hover:text-white px-2 py-2 rounded-full"
                      icon={faTrashCan}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
