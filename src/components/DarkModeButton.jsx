import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function DarkModeButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);
  const toggleDarkMode = () => {
    const htmlClasses = document.documentElement.classList;
    if (htmlClasses.contains("dark")) {
      htmlClasses.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      htmlClasses.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };
  return (
      <button
        id="theme-toggle"
        onClick={toggleDarkMode}
        className="focus:outline-none transition duration-500 ease-in-out mr-5"
      >
        <FontAwesomeIcon
          className="lg:text-2xl"
          icon={isDarkMode ? faSun : faMoon}
        />
      </button>
  );
}
