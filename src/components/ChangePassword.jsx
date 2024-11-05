import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NotFound from "../pages/NotFound";

export default function ChangePassword() {
  const [query, setQuery] = useSearchParams();
  const step = query.get("step") || "1";
  const emailParam = query.get("email");
  const loggedIn = true;

  const changeStep = (newStep) => {
    query.set("step", newStep);
    setQuery(query);
  };

  const [email, setEmail] = useState(emailParam || "");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [retype, setRetype] = useState("");

  // State to track individual password validation criteria
  const [criteria, setCriteria] = useState({
    minLength: false,
    specialChar: false,
    upperCase: false,
    numeric: false,
    lowerCase: false,
  });

  useEffect(() => {
    if (step !== "1" && emailParam === null) {
      changeStep("1");
    }
    if (step === "1") {
      document.title = loggedIn ? "Change password" : "Reset password";
    } else if (step === "2") {
      document.title = "Verify OTP";
    } else {
      document.title = "Change password";
    }
  }, [step]);

  const handlePrepare = (e) => {
    e.preventDefault();
    setQuery(query.append("email", email));
    changeStep("2");
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    changeStep("3");
  };

  const validatePassword = (pwd) => {
    setCriteria({
      minLength: pwd.length >= 8,
      specialChar: /[@$!%*?&]/.test(pwd),
      upperCase: /[A-Z]/.test(pwd),
      numeric: /[0-9]/.test(pwd),
      lowerCase: /[a-z]/.test(pwd),
    });
  };

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  switch (step) {
    case "1":
      return (
        <form
          action=""
          className="flex flex-col gap-1 mb-3"
          onSubmit={handlePrepare}
        >
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 mt-2 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300 uppercase"
          >
            {loggedIn ? "Change password" : "Reset password"}
          </button>
        </form>
      );
    case "2":
      return (
        <form
          action=""
          className="flex flex-col gap-1 mb-3"
          onSubmit={handleVerifyOtp}
        >
          <label className="block text-sm font-bold mb-2" htmlFor="otp">
            OTP
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
            id="otp"
            type="text"
            maxLength="6"
            minLength="6"
            pattern="^\d*$"
            required
            placeholder={`Enter the 6-digit OTP received in the email ${email}`}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <div className="self-end flex gap-2">
            <p>Not received otp?</p>
            <button className="font-semibold">Resend?</button>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 mt-2 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300 uppercase"
          >
            submit
          </button>
        </form>
      );
    case "3":
      return (
        <form action="" className="flex flex-col gap-4 mb-3">
          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              New Password
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
              id="password"
              type="password"
              required
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="retype">
              Retype new password
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
              id="retype"
              type="password"
              required
              placeholder="Retype new password"
              value={retype}
              onChange={(e) => setRetype(e.target.value)}
            />
          </div>

          <div className="border-2 px-5 py-2 rounded-md">
            <p>Note</p>
            <p>Password must include:</p>
            <ul className="list-disc ml-5">
              <li
                className={
                  criteria.minLength ? "text-green-500" : "text-red-500"
                }
              >
                At least 8 characters
              </li>
              <li
                className={
                  criteria.specialChar ? "text-green-500" : "text-red-500"
                }
              >
                1 special character @ $ ! % * ? &
              </li>
              <li
                className={
                  criteria.upperCase ? "text-green-500" : "text-red-500"
                }
              >
                At least 1 uppercase letter
              </li>
              <li
                className={criteria.numeric ? "text-green-500" : "text-red-500"}
              >
                At least 1 numeric character
              </li>
              <li
                className={
                  criteria.lowerCase ? "text-green-500" : "text-red-500"
                }
              >
                At least 1 lowercase letter
              </li>
            </ul>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 mt-2 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300 uppercase"
          >
            submit
          </button>
        </form>
      );
    default:
      return <NotFound />;
  }
}
