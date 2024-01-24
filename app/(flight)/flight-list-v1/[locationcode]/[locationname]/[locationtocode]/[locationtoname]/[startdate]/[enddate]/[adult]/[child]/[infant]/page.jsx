
'use client'
import { flightAvailResult } from "@/features/hero/flightSlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import CallToActions from "@/components/common/CallToActions";
import Header11 from "@/components/header/header-11";
import DefaultFooter from "@/components/footer/default";
import MainFilterSearchBox from "@/components/flight-list/flight-list-v1/MainFilterSearchBox";
import TopHeaderFilter from "@/components/flight-list/flight-list-v1/TopHeaderFilter";
import FlightProperties from "@/components/flight-list/flight-list-v1/FlightProperties";
import Pagination from "@/components/flight-list/common/Pagination";
import Sidebar from "@/components/flight-list/flight-list-v1/Sidebar";

// export const metadata = {
//   title: "Flight List v1 || BE - Argentina - Travel & Tour React NextJS Template",
//   description: "BE - Argentina - Travel & Tour React NextJS Template",
// };

const index = () => {
  
  const dispatch = useDispatch();

  const { flightList,flightAvailRQ,loading, filterParam } = useSelector((state) => ({ ...state.flight }));
  const router = useRouter();
  //const id = params.id;
  //const hotel = hotelsData.find((item) => item.id == id) || hotelsData[0];
  useEffect(() => {
    const FlightAvailRQ = {
      searchParam: {
        destinationLocationCode: "EZE",
        originLocationCode: "MIA",
        journyDateTime: "2024-01-27T08:47:40.579Z",
        journyReturnDateTime: "2024-01-29T08:47:40.579Z",
        adult: 2,
        child: 0,
        infant: 0,
        tripType: "ONE_WAY"
      },
  isApplySearchParam: true,
  filterParam: {
    cabin: [
      "werewr"
    ],
    priceMinMax: [
      0,100000
    ],
    stops: [
      "0"
    ],
    pageNumber: 0,
    pageSize: 25
  },
  isApplyFilterParam: true,
  sortParam: {
    sortBy: "rewr",
    sortType: "string"
  },
  isApplySortParam: true
    };
debugger;
    // Dispatch the action
    dispatch(flightAvailResult({ flightAvailRQ, router, undefined }));
  }, []);
  console.log(flightList);
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header11 />
      {/* End Header 1 */}

      <section className="pt-40 pb-40">
        <div className="container">
          <MainFilterSearchBox />
        </div>
      </section>
      {/* Top SearchBanner */}

      <section className="layout-pt-md layout-pb-md bg-light-2">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-3">
              <aside className="sidebar py-20 px-20 xl:d-none bg-white">
                <div className="row y-gap-40">
                  <Sidebar />
                </div>
              </aside>
              {/* End sidebar for desktop */}

              <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="listingSidebar"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasLabel">
                    Filter Tours
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                {/* End offcanvas header */}

                <div className="offcanvas-body">
                  <aside className="sidebar y-gap-40  xl:d-block">
                    <Sidebar />
                  </aside>
                </div>
                {/* End offcanvas body */}
              </div>
              {/* End mobile menu sidebar */}
            </div>
            {/* End col */}

            <div className="col-xl-9 ">
              <TopHeaderFilter />

              <div className="row">
                <FlightProperties />
              </div>
              {/* End .row */}
              <Pagination />
            </div>
            {/* End .col for right content */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End layout for listing sidebar and content */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default index;
