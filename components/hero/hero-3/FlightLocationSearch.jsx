// Import necessary modules and hooks
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addCurrentCriteria } from "@/features/hero/searchCriteriaSlice";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { fetchHotelLocationList, hotelAvailResult } from "@/features/hero/hotelSlice";
import { FLIGHT_TAB_NAME, HOTEL_TAB_NAME } from "@/utils/constants";
import { fetchLocationList, fetchLocationToList, updateFlightAvailRQ } from "@/features/hero/flightSlice";
const LocationSearch = ({ locationCodea, locationNamea }) => {
  const dispatch = useDispatch(); // Hook to dispatch actions
  const { locationList, locationToList, flightAvailRQ, loading } = useSelector((state) => ({ ...state.flight }));
  const { destinationLocationCode,
  destinationLocationName,
  originLocationCode,
  originLocationName } = flightAvailRQ.searchParam;
  const { currentTab } = useSelector((state) => state.hero) || {};
  const router = useRouter();
  const handleSearch = async (query) => {
    if(query.length > 2){
      if(currentTab === HOTEL_TAB_NAME){
    await dispatch(fetchHotelLocationList({ query,router,undefined }));  
      }
      else if(currentTab === FLIGHT_TAB_NAME){
        await dispatch(fetchLocationList({ query,router,undefined }));  
          }
          else{
            await dispatch(fetchHotelLocationList({ query,router,undefined }));  
              }
    }
  };
  const handleSearch1 = async (query) => {
    if(query.length > 2){
      if(currentTab === HOTEL_TAB_NAME){
    await dispatch(fetchHotelLocationList({ query,router,undefined }));  
      }
      else if(currentTab === FLIGHT_TAB_NAME){
        await dispatch(fetchLocationToList({ query,router,undefined }));  
          }
          else{
            await dispatch(fetchHotelLocationList({ query,router,undefined }));  
              }
    }
  };
  const handleSearchLocatioTo = async (query) => {
    if(query.length > 2){
      if(currentTab === HOTEL_TAB_NAME){
    await dispatch(fetchHotelLocationList({ query,router,undefined }));  
      }
      else if(currentTab === FLIGHT_TAB_NAME){
        await dispatch(fetchLocationToList({ query,router,undefined }));  
          }
          else{
            await dispatch(fetchHotelLocationList({ query,router,undefined }));  
              }
    }
  };
  const filterBy = () => true;
  useEffect(() => {
    // Dispatch action to update destinationLocationCode and destinationLocationName in the Redux store with default values
    dispatch(
      addCurrentCriteria({
        locationCode: destinationLocationCode || "", // Modify the format as needed
        locationName: destinationLocationName || "",
      })
    );
  }, [dispatch]); // Run this effect only once when the component mounts

  // const handleOptionClick = (item) => {
  //   setSearchValue(item.name);
  //   setSelectedItem(item);

  //   // Dispatch action to update destinationLocationCode and destinationLocationName in the Redux store
  //   dispatch(
  //     addCurrentCriteria({
  //       locationCode: `loc-${item.id}`, // Modify the format as needed
  //       locationName: item.name,
  //     })
  //   );
  // };

  return (
    <>
      <div className="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          <h4 className="text-15 fw-500 ls-2 lh-16">Location From</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
    
    <AsyncTypeahead
      filterBy={filterBy}
      id="async-example"
      // isLoading={loading}
      labelKey="name"
      minLength={3}
      maxLength={4}
      defaultSelected={[
        {
          code: destinationLocationCode,
          name: destinationLocationName,
        },
      ]}
      onSearch={(query) => {
        // Handle search logic if needed
        handleSearch(query);
      }}
      onChange={(selectedOptions) => {
        if (selectedOptions && selectedOptions.length > 0) {
          const selectedOption = selectedOptions[0];
    dispatch(
      updateFlightAvailRQ({
          ...flightAvailRQ,
          searchParam: {
            ...flightAvailRQ.searchParam,
            destinationLocationCode: selectedOption.code || "",
            destinationLocationName: selectedOption.name || "",
          },
      })
    );
        }
      }}
      useCache={false}
      onInputChange={handleSearch}
      options={locationList}
      placeholder="Search Location"
      className="divAutocomplete"  // Set your custom class here
      renderMenuItemChildren={(option) => (
        <>
          {/* <img
            alt={option.login}
            src={option.avatar_url}
            style={{
              height: '24px',
              marginRight: '10px',
              width: '24px',
            }}
          /> */}
          <span>{option.name}</span>
          {/* <span><HtmlParser text={( option.login)
                .replace(new RegExp('(' + props.text + ')', 'gi'), ('<span class="font-weight-bold">$1</span>'))} /></span> */}
        </>
      )}
    />
  
  
          </div>
        </div>
      </div>
      
      {currentTab === FLIGHT_TAB_NAME ? (
      <div className="searchMenu-loc locationto px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          <h4 className="text-15 fw-500 ls-2 lh-16">Location To</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
    
    <AsyncTypeahead
      filterBy={filterBy}
      id="location-to"
      // isLoading={loading}
      labelKey="name"
      minLength={3}
      maxLength={4}
      defaultSelected={[
        {
          code: originLocationCode,
          name: originLocationName,
        },
      ]}
      onSearch={(query) => {
        // Handle search logic if needed
        handleSearch1(query);
      }}
      onChange={(selectedOptions) => {
        if (selectedOptions && selectedOptions.length > 0) {
          const selectedOption = selectedOptions[0];
          dispatch(
            updateFlightAvailRQ({
                ...flightAvailRQ,
                searchParam: {
                  ...flightAvailRQ.searchParam,
                  originLocationCode: selectedOption.code || "",
                  originLocationName: selectedOption.name || "",
                },
            })
          );
        }
      }}
      useCache={false}
      onInputChange={handleSearch1}
      options={locationToList}
      placeholder="Search Location To"
      className="divAutocomplete"  // Set your custom class here
      renderMenuItemChildren={(option) => (
        <>
          {/* <img
            alt={option.login}
            src={option.avatar_url}
            style={{
              height: '24px',
              marginRight: '10px',
              width: '24px',
            }}
          /> */}
          <span>{option.name}</span>
          {/* <span><HtmlParser text={( option.login)
                .replace(new RegExp('(' + props.text + ')', 'gi'), ('<span class="font-weight-bold">$1</span>'))} /></span> */}
        </>
      )}
    />
  
  
          </div>
        </div>
      </div>
  ):(<></>)}
    </>
  );
};

export default LocationSearch;
