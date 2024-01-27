import { hotelsData } from "../../../data/hotels";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

const AmenitiesFilter = () => {
  const { hotelList, filterParam, loading } = useSelector((state) => ({ ...state.hotel }));
  const amenities = [
    { name: "Breakfast Included", count: 92 },
    { name: "Romantic", count: 45 },
    { name: "Airport Transfer", count: 21 },
    { name: "WiFi Included", count: 78 },
    { name: "5 Star", count: 679 },
  ];

  return (
    <>
      {filterParam?.amenities?.map((amenity, index) => (
        <div className="row y-gap-10 items-center justify-between" key={index}>
          <div className="col-auto">
            <div className="form-checkbox d-flex items-center">
              <input type="checkbox" />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">{amenity}</div>
            </div>
          </div>
          {/* <div className="col-auto">
            <div className="text-15 text-light-1">{amenity.count}</div>
          </div> */}
        </div>
      ))}
    </>
  );
};

export default AmenitiesFilter;
