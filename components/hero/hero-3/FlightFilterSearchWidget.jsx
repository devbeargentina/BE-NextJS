'use client'

import { useSelector, useDispatch } from "react-redux";
import DateSearch from "../DateSearch";
import LocationSearch from "./LocationSearch";
import { useRouter } from "next/navigation";
import FlightGuestSearch from "./FlightGuestSearch";

const FlightFilterSearchWidget = () => {
  const { tabs, currentTab } = useSelector((state) => state.hero) || {};
  const { locationCode,
  locationName,
  locationToCode,
  locationToName,
  cutOfDays,
  stayInDays,
  startDate,
  endDate,
  adult,
  child,
  infant } = useSelector((state) => state.searchCriteria) || {};
  
  const dispatch = useDispatch();
  const Router = useRouter()
  const handleSearch = () => {
     Router.push(`/flight-list-v1/${locationCode}/${locationName}/${locationToCode}/${locationToName}/${'2024-04-04'}/${'2024-04-05'}/${adult}/${child}/${infant}`)
  }
  return (
      <div className="tabs__content js-tabs-content">
        <div className="mainSearch bg-white pr-20 py-20 lg:px-20 lg:pt-5 lg:pb-20 rounded-4">
          <div className="button-grid-flex items-center">
            <LocationSearch locationCode={locationCode} locationName={locationName} />
            {/* <LocationSearch locationCode={locationCode} locationName={locationName} /> */}
            {/* End Location */}

            <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
              <div>
                <h4 className="text-15 fw-500 ls-2 lh-16">
                  Check in - Check out
                </h4>
                <DateSearch cutOfDays={cutOfDays} stayInDays={stayInDays} />
              </div>
            </div>
            {/* End check-in-out */}

            <FlightGuestSearch adult={adult} child={child} infant={infant} />
            {/* End guest */}

            <div className="button-item">
              <button
                className="mainSearch__submit button -dark-1 py-15 px-35 h-60 col-12 rounded-4 bg-blue-1 text-white"
                onClick={() => handleSearch()}
              >
                <i className="icon-search text-20 mr-10" />
                Search
              </button>
            </div>
            {/* End search button_item */}
          </div>
        </div>
        {/* End .mainSearch */}
      </div>
  );
};

export default FlightFilterSearchWidget;
