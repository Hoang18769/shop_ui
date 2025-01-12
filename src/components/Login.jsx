import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "./AppContext";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  useEffect(() => {
    document.title = "Login";
  }, []);
  const { setToken } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // Email validation function
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Password validation function
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate email and password
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password must have at least 8 characters, including 1 uppercase, 1 lowercase, 1 number, and 1 special character."
      );
      return;
    }

    // Fetch login API
    fetch(`${process.env.REACT_APP_BE_ORIGIN}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          toast.success("Login successful!");
          setToken(data.body.accessToken);
          const decodedToken = jwtDecode(data.body.accessToken);          
          if (decodedToken.scope === "ADMIN") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else if (data.code === 104) {
          toast.error(
            `Login failed! You have ${data.body.remainingTry} attempts remaining.`
          );
        } else if (data.code === 124) {
          toast.error(`Your account is locked until ${data.body.lockoutTime}.`);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 normal-case">
      <form className="flex flex-col gap-1 mb-3" onSubmit={handleLogin}>
        <label className="block text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <label className="block text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 mt-2 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300 uppercase"
        >
          Login
        </button>
        <Link
          to="/account/?tab=forgot-password"
          className="text-end text-sm my-1"
        >
          Forgot your password?
        </Link>
        <div className="relative flex items-center justify-center">
          <hr className="w-full border-gray-300" />
          <p className="absolute bg-white text-gray-500 px-5 dark:text-gray-200 dark:bg-gray-800 uppercase">
            or
          </p>
        </div>
      </form>
      <Link
        to={`${process.env.REACT_APP_BE_ORIGIN}/oauth2/authorization/google`}
        type="submit"
        className="block text-center bg-blue-400 text-white py-2 mt-5 hover:bg-blue-500"
      >
        <FontAwesomeIcon className="mr-5" icon={faGoogle} />
        Continue with Google
      </Link>
    </div>
  );
}
