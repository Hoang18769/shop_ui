import React, { useEffect } from "react";

export default function Profile() {
  useEffect(() => {
    document.title = "Profile";
  }, []);
  return (
    <div>
      <form action="" className="flex flex-col gap-3">
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
              placeholder="Lastname"
              required
            />
          </div>
        </div>
        <button className="text-center py-2 bg-black text-white dark:text-black dark:bg-white hover:opacity-50">
          Apply change
        </button>
      </form>
    </div>
  );
}
