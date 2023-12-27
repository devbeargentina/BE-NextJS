// Import necessary modules and hooks
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCurrentCriteria } from "@/features/hero/searchCriteriaSlice";

const LocationSearch = ({ locationCode, locationName }) => {
  const dispatch = useDispatch(); // Hook to dispatch actions
  const [searchValue, setSearchValue] = useState(locationName || ""); // Set default searchValue based on locationName
  const [selectedItem, setSelectedItem] = useState(null); // Set default selectedItem based on initialState

  useEffect(() => {
    // Dispatch action to update locationCode and locationName in the Redux store with default values
    dispatch(
      addCurrentCriteria({
        locationCode: locationCode || "", // Modify the format as needed
        locationName: locationName || "",
      })
    );
  }, []); // Run this effect only once when the component mounts

  const locationSearchContent = [
    {
      id: 1,
      name: "London",
      address: "Greater London, United Kingdom",
    },
    {
      id: 2,
      name: "New York",
      address: "New York State, United States",
    },
    {
      id: 3,
      name: "Paris",
      address: "France",
    },
    {
      id: 4,
      name: "Madrid",
      address: "Spain",
    },
    {
      id: 5,
      name: "Santorini",
      address: "Greece",
    },
  ];

  const handleOptionClick = (item) => {
    setSearchValue(item.name);
    setSelectedItem(item);

    // Dispatch action to update locationCode and locationName in the Redux store
    dispatch(
      addCurrentCriteria({
        locationCode: `loc-${item.id}`, // Modify the format as needed
        locationName: item.name,
      })
    );
  };

  return (
    <>
      <div className="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          <h4 className="text-15 fw-500 ls-2 lh-16">Location</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
            <input
              autoComplete="off"
              type="search"
              placeholder="Where are you going?"
              className="js-search js-dd-focus"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        <div className="shadow-2 dropdown-menu min-width-400">
          <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
            <ul className="y-gap-5 js-results">
              {locationSearchContent.map((item) => (
                <li
                  className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
                    selectedItem && selectedItem.id === item.id ? "active" : ""
                  }`}
                  key={item.id}
                  role="button"
                  onClick={() => handleOptionClick(item)}
                >
                  <div className="d-flex">
                    <div className="icon-location-2 text-light-1 text-20 pt-4" />
                    <div className="ml-10">
                      <div className="text-15 lh-12 fw-500 js-search-option-target">
                        {item.name}
                      </div>
                      <div className="text-14 lh-12 text-light-1 mt-5">
                        {item.address}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationSearch;
