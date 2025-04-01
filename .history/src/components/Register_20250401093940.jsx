import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import NotFound from "../pages/NotFound";
import { toast } from "react-toastify";
import { AppContext } from "./AppContext";

export default function Register() {
  const [query, setQuery] = useSearchParams();
  const step = query.get("step") || "1";
  const emailParam = query.get("email");
  const code = query.get("code");
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const changeStep = (newStep) => {
    query.set("step", newStep);
    setQuery(query);
  };

  const [email, setEmail] = useState(emailParam || "");
  const [password, setPassword] = useState("");
  const [retype, setRetype] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [criteria, setCriteria] = useState({
    minLength: false,
    specialChar: false,
    upperCase: false,
    numeric: false,
    lowerCase: false,
  });

  useEffect(() => {
    document.title = "Register";
  }, []);

  // Email validation function
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validate firstname and lastname
  const validateName = (name) => name.trim().length > 0;

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

  const handleRegister = (e) => {
    e.preventDefault();

    // Validation
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!validateName(firstname)) {
      toast.error("Firstname cannot be empty.");
      return;
    }

    if (!validateName(lastname)) {
      toast.error("Lastname cannot be empty.");
      return;
    }

    if (Object.values(criteria).includes(false)) {
      toast.error(
        "Password must meet all the criteria: at least 8 characters, 1 uppercase, 1 lowercase, 1 numeric, and 1 special character."
      );
      return;
    }

    if (password !== retype) {
      toast.error("Passwords do not match.");
      return;
    }

    // Submit registration
    fetch(`${process.env.REACT_APP_BE_ORIGIN}/register`, {
      method: "POST",
      body: JSON.stringify({ email, password, firstname, lastname }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          toast.success(
            "Registration successful! A verification email has been sent to your email."
          );
          setQuery(query.append("email", email));
          changeStep("2");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleVerify = () => {
    fetch(`${process.env.REACT_APP_BE_ORIGIN}/register/verify?code=${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setToken(data.body.accessToken);
          navigate("/account/?tab=profile");
        } else {
          // toast.error(data.message);
        }
      })
      .catch((e) => toast.error(e.message));
  };

  const handleResend = () => {
    fetch(`${process.env.REACT_APP_BE_ORIGIN}/register/resend?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          toast.info(`A verification email has been sent to your email. Please click on
              the "Verify" button to continue.`);
          query.delete("code");
          setQuery(query);
        } else {
          toast.error(data.message);
        }
      })
      .catch((e) => toast.error(e.message));
  };

  switch (step) {
    case "1":
      return (
        <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 normal-case">
          <form className="flex flex-col gap-1 mb-3">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
              id="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="firstname"
                >
                  Firstname
                </label>
                <input
                  className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
                  id="firstname"
                  type="text"
                  placeholder="Firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="lastname"
                >
                  Lastname
                </label>
                <input
                  className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
                  id="lastname"
                  type="text"
                  placeholder="Lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="retypePassword"
                >
                  Retype password
                </label>
                <input
                  className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
                  id="retypePassword"
                  type="password"
                  placeholder="Retype password"
                  value={retype}
                  onChange={(e) => setRetype(e.target.value)}
                />
              </div>
            </div>
            <div className="border-2 px-5 py-2 my-2 rounded-md">
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
                  className={
                    criteria.numeric ? "text-green-500" : "text-red-500"
                  }
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
              onClick={handleRegister}
            >
              Register
            </button>
          </form>
        </div>
      );
    case "2":
      if (!code) {
        return (
          <div className="bg-white flex flex-col gap-5 dark:bg-gray-800 text-black dark:text-white p-4 normal-case">
            <h2 className="text-xl text-center">
              A verification email has been sent to your email. Please click on
              the "Verify" button to continue.
            </h2>
            <div className="self-end flex gap-2">
              <p>Not received email?</p>
              <button className="font-semibold" onClick={handleResend}>
                Resend?
              </button>
            </div>
          </div>
        );
      } else {
        handleVerify();
        return (
          <div className="flex gap-2">
            <p>Not received email or verify code has expired?</p>
            <button className="font-semibold" onClick={handleResend}>
              Resend?
            </button>
          </div>
        );
      }

    default:
      return <NotFound />;
  }
}
