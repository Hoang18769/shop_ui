import React, { useCallback, useEffect, useState, useRef } from "react";
import "./MultiRangeSlider.css";
import { debounce } from "lodash";

const MultiRangeSlider = ({ curMin, curMax, onMinChange, onMaxChange }) => {
  const min = 0,
    max = 1000000;

  // Đảm bảo giá trị khởi tạo nằm trong khoảng cho phép
  const [minVal, setMinVal] = useState(
    Math.max(min, Math.min(curMin || min, max))
  );
  const [maxVal, setMaxVal] = useState(
    Math.min(max, Math.max(curMax || max, min))
  );
  const minValRef = useRef(minVal);
  const maxValRef = useRef(maxVal);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  const debouncedMinChange = debounce((value) => {
    onMinChange(value);
  }, 1000);

  const debouncedMaxChange = debounce((value) => {
    onMaxChange(value);
  }, 1000);

  // Update the range's visual position
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    debouncedMinChange(minVal);
    return () => debouncedMinChange.cancel();
  }, [minVal]);

  useEffect(() => {
    debouncedMaxChange(maxVal);
    return () => debouncedMaxChange.cancel();
  }, [maxVal]);

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    // Đảm bảo minVal không vượt quá maxVal - 1 và không nhỏ hơn min
    const newValue = Math.max(min, Math.min(value, maxVal - 1));
    setMinVal(newValue);
    minValRef.current = newValue;
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    // Đảm bảo maxVal không nhỏ hơn minVal + 1 và không vượt quá max
    const newValue = Math.min(max, Math.max(value, minVal + 1));
    setMaxVal(newValue);
    maxValRef.current = newValue;
  };

  return (
    <div className="container">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={handleMinChange}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 ? "5" : undefined }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={handleMaxChange}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">{minVal}</div>
        <div className="slider__right-value">{maxVal}</div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
