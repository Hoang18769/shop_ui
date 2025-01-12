import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { toast } from "react-toastify";

export default function Profile() {
  const { user, setUser, token } = useContext(AppContext);
  const [firstname, setFirstname] = useState(user?.firstname || "");
  const [lastname, setLastname] = useState(user?.lastname || "");

  useEffect(() => {
    document.title = "Profile";
  }, []);

  useEffect(() => {
    setFirstname(user?.firstname ?? ""); 
    setLastname(user?.lastname ?? "");
  }, [user]);

  const handleChange = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BE_ORIGIN}/users/update-profile`, {
      method: "PUT",
      body: JSON.stringify({ firstname, lastname }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          toast.success("Update profile success!");
          setUser({ ...user, firstname, lastname });
        } else {
          toast.error(data.message);
        }
      })
      .catch((e) => toast.error(e.message));
  };

  return (
    <div>
      <form onSubmit={handleChange} className="flex flex-col gap-3">
        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="block text-lg font-bold mb-2" htmlFor="firstname">
              Firstname
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
              id="firstname"
              type="text"
              placeholder="Firstname"
              value={firstname || ""}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-lg font-bold mb-2" htmlFor="lastname">
              Lastname
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
              id="lastname"
              type="text"
              value={lastname || ""}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Lastname"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-center py-2 bg-black text-white dark:text-black dark:bg-white hover:opacity-50"
        >
          Apply change
        </button>
      </form>
    </div>
  );
}
