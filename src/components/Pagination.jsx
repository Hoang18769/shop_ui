import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Pagination = ({ current, total, onChange }) => {
  const [inputPage, setInputPage] = useState(current);

  // Tính toán các trang hiển thị
  const maxVisiblePages = 5; // Số trang tối đa hiển thị
  const halfVisible = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(1, current - halfVisible);
  let endPage = Math.min(total, current + halfVisible);

  // Điều chỉnh để đảm bảo luôn hiển thị đủ 10 trang nếu có thể
  if (endPage - startPage < maxVisiblePages - 1) {
    if (startPage === 1) {
      endPage = Math.min(total, startPage + maxVisiblePages - 1);
    } else if (endPage === total) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  // Xử lý khi người dùng nhập số trang
  const handlePageInput = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value > 0 && value <= total) {
      setInputPage(Number(value));
    }
  };

  const handlePageSubmit = (e) => {
    if (e.key === "Enter" && inputPage >= 1 && inputPage <= total) {
      onChange(inputPage);
    }
  };

  return (
    <nav
      className="flex items-center justify-center gap-x-1 text-2xl"
      aria-label="Pagination"
    >
      {/* Nút chuyển đến trang đầu */}
      <button
        type="button"
        className={`min-h-[32px] min-w-8 py-1.5 px-2 inline-flex justify-center items-center gap-x-2 text-base rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none ${
          current === 1 ? "disabled" : ""
        }`}
        aria-label="First"
        onClick={() => onChange(1)}
        disabled={current === 1}
      >
        <FontAwesomeIcon
          className="shrink-0 size-3.5"
          icon={faAngleDoubleLeft}
        />
        <span className="sr-only">First</span>
      </button>

      {/* Nút Previous */}
      <button
        type="button"
        className={`min-h-[32px] min-w-8 py-1.5 px-2 inline-flex justify-center items-center gap-x-2 text-base rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none ${
          current === 1 ? "disabled" : ""
        }`}
        aria-label="Previous"
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
      >
        <FontAwesomeIcon className="shrink-0 size-3.5" icon={faAngleLeft} />
        <span className="sr-only">Previous</span>
      </button>

      {/* Các nút số trang */}
      <div className="flex items-center gap-x-1">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={`min-h-10 aspect-1 flex justify-center items-center py-1.5 px-2.5 text-base rounded-lg focus:outline-none ${
              current === page ? "font-bold bg-gray-200 text-gray-800" : ""
            }`}
            aria-current={current === page ? "page" : undefined}
            onClick={() => onChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Nút Next */}
      <button
        type="button"
        className={`min-h-[32px] min-w-8 py-1.5 px-2 inline-flex justify-center items-center gap-x-2 text-base rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none ${
          current === total ? "disabled" : ""
        }`}
        aria-label="Next"
        onClick={() => onChange(current + 1)}
        disabled={current === total}
      >
        <span className="sr-only">Next</span>
        <FontAwesomeIcon className="shrink-0 size-3.5" icon={faAngleRight} />
      </button>

      {/* Nút chuyển đến trang cuối */}
      <button
        type="button"
        className={`min-h-[32px] min-w-8 py-1.5 px-2 inline-flex justify-center items-center gap-x-2 text-base rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none ${
          current === total ? "disabled" : ""
        }`}
        aria-label="Last"
        onClick={() => onChange(total)}
        disabled={current === total}
      >
        <FontAwesomeIcon
          className="shrink-0 size-3.5"
          icon={faAngleDoubleRight}
        />
        <span className="sr-only">Last</span>
      </button>

      <div className="ml-2">
        <input
          type="number"
          value={inputPage}
          onChange={handlePageInput}
          onKeyDown={handlePageSubmit}
          className="w-16 px-2 py-1 mr-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-600 dark:text-white"
          min={1}
          max={total}
        />
        <span className="hidden lg:block text-base">in {total} page(s)</span>
      </div>
    </nav>
  );
};

export default Pagination;
