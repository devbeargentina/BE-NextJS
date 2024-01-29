
'use client'

import { flightAvailResult, updateFlightAvailRQ } from "@/features/hero/flightSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputRange from "react-input-range";
import { useDispatch, useSelector } from "react-redux";

const PirceSlider = () => {
  const { flightList,flightAvailRQ, filterParam,loading } = useSelector((state) => ({ ...state.flight }));
  
  const [price, setPrice] = useState({
    value: { min: filterParam?.priceMinMax[0], max: filterParam?.priceMinMax[1] },
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleOnChange = (value) => {
    setPrice({ value });
    dispatch(
      updateFlightAvailRQ({
          ...flightAvailRQ,
          filterParam: {
            ...flightAvailRQ.filterParam,
            priceMinMax: [value.min, value.max],
            pageNumber: 0,
          },
      })
    );
    
    dispatch(flightAvailResult({ flightAvailRQ : {
      ...flightAvailRQ,
      filterParam: {
        ...flightAvailRQ.filterParam,
        priceMinMax: [value.min, value.max],
        pageNumber: 0,
      },
  }, router, undefined }));
  };

  return (
    <div className="js-price-rangeSlider">
      <div className="text-14 fw-500"></div>

      <div className="d-flex justify-between mb-20">
        <div className="text-15 text-dark-1">
          <span className="js-lower mx-1">${price.value.min}</span>-
          <span className="js-upper mx-1">${price.value.max}</span>
        </div>
      </div>

      <div className="px-5">
        <InputRange
          formatLabel={(value) => ``}
          minValue={0}
          maxValue={filterParam?.priceMinMax[1]}
          value={price.value}
          onChange={(value) => handleOnChange(value)}
        />
      </div>
    </div>
  );
};

export default PirceSlider;
