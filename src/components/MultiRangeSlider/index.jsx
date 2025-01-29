import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import "./MultiRangeSlider.css";
import { debounce } from "lodash";

const MultiRangeSlider = ({ curMin, curMax, onMinChange, onMaxChange }) => {
  console.count("render");
  const min = 0,
    max = 1000000;

  // Memoize initial values to prevent unnecessary re-computation
  const initialMinVal = useMemo(
    () => Math.max(min, Math.min(curMin || min, max)),
    [curMin, min, max]
  );

  const initialMaxVal = useMemo(
    () => Math.min(max, Math.max(curMax || max, min)),
    [curMax, min, max]
  );

  const [minVal, setMinVal] = useState(initialMinVal);
  const [maxVal, setMaxVal] = useState(initialMaxVal);
  const minValRef = useRef(minVal);
  const maxValRef = useRef(maxVal);
  const range = useRef(null);

  // Memoize percent calculation to prevent recreation on every render
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Memoize debounced functions to prevent recreation
  const debouncedMinChange = useMemo(
    () => debounce((value) => onMinChange(value), 1000),
    [onMinChange]
  );

  const debouncedMaxChange = useMemo(
    () => debounce((value) => onMaxChange(value), 1000),
    [onMaxChange]
  );

  // Optimize range update effect
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

  // Simplified change handlers
  const handleMinChange = useCallback(
    (e) => {
      const value = Number(e.target.value);
      const newValue = Math.max(min, Math.min(value, maxVal - 1));
      setMinVal(newValue);
      minValRef.current = newValue;
      debouncedMinChange(newValue);
    },
    [maxVal, debouncedMinChange]
  );

  const handleMaxChange = useCallback(
    (e) => {
      const value = Number(e.target.value);
      const newValue = Math.min(max, Math.max(value, minVal + 1));
      setMaxVal(newValue);
      maxValRef.current = newValue;
      debouncedMaxChange(newValue);
    },
    [minVal, debouncedMaxChange]
  );

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
        <div className="slider__left-value dark:text-white">{minVal}</div>
        <div className="slider__right-value dark:text-white">{maxVal}</div>
      </div>
    </div>
  );
};

export default React.memo(MultiRangeSlider);
