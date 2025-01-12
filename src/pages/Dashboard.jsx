import React, { useContext, useEffect, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  faArrowTrendDown,
  faArrowTrendUp,
  faBagShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppContext } from "../components/AppContext";
import { useSearchParams } from "react-router-dom";

// Đăng ký các thành phần cho Chart.js
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

// Hàm lấy màu ngẫu nhiên
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function Dashboard() {
  const { token } = useContext(AppContext);
  const [summaryData, setSummaryData] = useState();
  const [categorySummaryData, setCategorySummaryData] = useState();
  const [query, setQuery] = useSearchParams();
  const changeSearchQuery = (key, value) => {
    query.set(key, value);
    setQuery(query);
  };
  // Cấu hình các tuỳ chọn hiển thị
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#e4e4e4",
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  const donutOptions = {
    responsive: true,
    cutout: "82%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const fetchSummary = () => {
    fetch(
      `${
        process.env.REACT_APP_BE_ORIGIN
      }/admin/orders/summary?${query.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.code === 200) {
          // Transform the API response to match the lineData structure
          const summaryLineData = {
            labels: data.body.labels,
            datasets: data.body.data.map((dayData) => {
              const [date, values] = Object.entries(dayData)[0]; // Lấy ngày và dữ liệu tương ứng
              return {
                label: date, // Dùng ngày làm nhãn
                data: values, // Dữ liệu của ngày
                borderColor: getRandomColor(),
                backgroundColor: "transparent",
                pointBackgroundColor: getRandomColor(),
                pointBorderColor: getRandomColor(),
                tension: 0.4,
              };
            }),
          };
          setSummaryData(summaryLineData);
        } else {
          console.error("API returned an error:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching summary:", error);
      });
  };

  const fetchCategorySummary = () => {
    fetch(
      `${process.env.REACT_APP_BE_ORIGIN}/admin/orders/summary-by-category`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          // Tạo màu ngẫu nhiên cho từng phần của biểu đồ
          const backgroundColors = data.body.current.map(() =>
            getRandomColor()
          );

          const summaryDonutData = {
            labels: data.body.labels,
            datasets: [
              {
                data: data.body.current,
                backgroundColor: backgroundColors, // Thêm màu ngẫu nhiên
                borderWidth: 1,
              },
            ],
          };

          setCategorySummaryData(summaryDonutData);
        } else {
          console.error("API returned an error:", data.message);
        }
      });
  };

  useEffect(() => {
    if (token) {
      fetchSummary();
      fetchCategorySummary();
    }
  }, [query, token]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col w-full lg:flex-row gap-5 justify-between">
        <div className="bg-white dark:bg-black dark:text-white rounded-2xl shadow-sm w-full py-2 px-5">
          <div className="flex gap-5">
            <div className="text-2xl px-3 pt-2 rounded-lg bg-gray-300 dark:bg-gray-600">
              <FontAwesomeIcon icon={faBagShopping} />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold">Total Sales</h2>
              <p className="text-sm">757 Orders</p>
            </div>
          </div>
          <h2 className="font-semibold text-lg">12123vnđ</h2>
          <div className="flex justify-between">
            <div className="flex gap-1 items-center">
              <FontAwesomeIcon icon={faArrowTrendDown} />
              <p>-15.5%</p>
            </div>
            <div className="flex gap-1 items-center">
              <p>+154 this week</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-black dark:text-white rounded-2xl shadow-sm w-full py-2 px-5">
          <div className="flex gap-5">
            <div className="text-2xl px-3 pt-2 rounded-lg bg-gray-300 dark:bg-gray-600">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold">Users</h2>
            </div>
          </div>
          <h2 className="font-semibold text-lg">1234 users</h2>
          <div className="flex justify-between">
            <div className="flex gap-1 items-center">
              <FontAwesomeIcon icon={faArrowTrendUp} />
              <p>+11.5%</p>
            </div>
            <div className="flex gap-1 items-center">
              <p>+154 this week</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full lg:flex-row gap-5 justify-between">
        {/* Biểu đồ Sale Performance */}
        <div className="bg-white dark:bg-black dark:text-white rounded-2xl shadow-sm w-full py-2 px-5 lg:w-3/4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-lg">Sale performance</h2>
            <div className="flex gap-2">
              <input
                className="shadow appearance-none border rounded px-3 leading-tight focus:outline-none focus:shadow-outline text-black bg-white dark:bg-gray-600 dark:text-white"
                type="number"
                min={2}
                max={5}
                value={query.get("num") || 3}
                onChange={(e) => changeSearchQuery("num", e.target.value)}
              />
              <select
                className="rounded-full border-2 pl-2 dark:bg-gray-800 dark:text-white uppercase"
                onChange={(e) => changeSearchQuery("type", e.target.value)}
                value={query?.get("type") || ""}
              >
                <option value={"DAY"}>day</option>
                <option value={"WEEK"}>week</option>
                <option value={"MONTH"}>month</option>
                <option value={"YEAR"}>year</option>
              </select>
            </div>
          </div>
          {/* Biểu đồ */}
          {summaryData && <Line data={summaryData} options={lineOptions} />}
        </div>

        {/* Biểu đồ Top Categories */}
        <div className="bg-white dark:bg-black dark:text-white rounded-2xl shadow-sm w-full py-2 px-5 lg:w-1/4">
          <h2 className="text-lg font-semibold mb-2">Top categories</h2>
          {categorySummaryData && (
            <Doughnut data={categorySummaryData} options={donutOptions} />
          )}
        </div>
      </div>
    </div>
  );
}
