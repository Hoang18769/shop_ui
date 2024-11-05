export default function Register() {
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 normal-case">
      <form action="" className="flex flex-col gap-1 mb-3">
        <label className="block text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
          id="email"
          type="text"
          placeholder="Email"
        />
        <label className="block text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
          id="password"
          type="password"
          placeholder="Password"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 mt-2 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300"
        >
          ĐĂNG KÝ
        </button>
      </form>
    </div>
  );
}
