import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-9 items-center min-h-80 mb-5">
      <div
        className="text-4xl relative flex items-center justify-center uppercase min-h-60 font-bold
      before:content-['404'] before:absolute before:top-1/2 before:left-1/2 before:text-gray-200 before:dark:text-gray-600 before:text-[15rem] before:-translate-x-1/2 before:-translate-y-1/2 before:z-[0]"
      >
        <h3 className="font-black z-10">Not Found</h3>
      </div>
      <h1 className="text-2xl font-semibold">Something seems wrong here?</h1>
      <Link
        to="/"
        className="px-5 py-2 text-white bg-black dark:bg-white dark:text-black shadow font-medium hover:opacity-50"
      >
        Back to home
      </Link>
    </div>
  );
}
