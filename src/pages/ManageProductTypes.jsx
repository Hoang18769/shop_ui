import { useContext, useEffect, useState } from "react";
import { AppContext } from "../components/AppContext";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";

export default function ManageProductTypes() {
  const { token } = useContext(AppContext);
  const [productTypes, setProductTypes] = useState([]);
  const [type, setType] = useState("");
  const [subtype, setSubtype] = useState("");
  const fetchProductTypes = () => {
    fetch(`${process.env.REACT_APP_BE_ORIGIN}/admin/product-types`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) setProductTypes(data.body);
      })
      .catch((error) => console.error(error));
  };

  const handleAdd = () => {
    fetch(`${process.env.REACT_APP_BE_ORIGIN}/admin/product-types`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, subtype }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          toast.success("Add new product type success!");
          setProductTypes((prev) => [...prev, data.body]);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure you want to delete this product type?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `${process.env.REACT_APP_BE_ORIGIN}/admin/product-types?id=${id}`,
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
              toast.success("Delete new product type success!");
              setProductTypes((prev) =>
                prev.filter((productType) => productType.id !== id)
              );
            } else {
              toast.error(data.message);
            }
          })
          .catch((error) => console.error(error));
      }
    });
  };

  useEffect(() => {
    document.title = "Manage product types";
  }, []);

  useEffect(() => {
    if (token) {
      fetchProductTypes();
    }
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">
        Manage Product Types
      </h1>
      <div className="flex flex-col lg:flex-row gap-3 mb-5">
        <div className="flex flex-1 flex-col">
          <h3 className="uppercase text-lg font-semibold text-gray-500">
            type
          </h3>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
            type="text"
            placeholder="Enter type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <h3 className="uppercase text-lg font-semibold text-gray-500">
            subtype
          </h3>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
            type="text"
            placeholder="Enter subtype"
            value={subtype}
            onChange={(e) => setSubtype(e.target.value)}
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
            <tr className="bg-gray-600">
              <th className="text-left px-6 py-3 border-b border-gray-200">
                ID
              </th>
              <th className="text-left px-6 py-3 border-b border-gray-200">
                Type
              </th>
              <th className="text-left px-6 py-3 border-b border-gray-200">
                Subtype
              </th>
              <th className="text-center px-6 py-3 border-b border-gray-200">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {productTypes.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 hover:dark:bg-gray-600"
              >
                <td className="px-6 py-3 border-b border-gray-200 ">
                  {item.id}
                </td>
                <td className="px-6 py-3 border-b border-gray-200">
                  {item.type}
                </td>
                <td className="px-6 py-3 border-b border-gray-200">
                  {item.subtype}
                </td>
                <td className="border-b border-gray-200 text-center ">
                  <button onClick={() => handleDelete(item.id)}>
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
