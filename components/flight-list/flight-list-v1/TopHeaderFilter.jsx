import { useSelector } from "react-redux";

const TopHeaderFilter = () => {
  const { flightList,filterParam,loading, totalFlights } = useSelector((state) => ({ ...state.flight }));
  return !loading && flightList !== undefined ? (
    <>
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="text-18">
            <span className="fw-500">{filterParam?.totalFlights} properties</span> in {`${flightList[0]?.departureAirport.locationName} ${flightList[0]?.departureAirport.city.locationName} ${flightList[0]?.departureAirport.country.locationName} - (${flightList[0]?.departureAirport.locationCode})`}
          </div>
        </div>
        {/* End .col */}

        <div className="col-auto">
          <div className="row x-gap-20 y-gap-20">
            <div className="col-auto">
              <button className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1">
                <i className="icon-up-down text-14 mr-10" />
                Sort
              </button>
            </div>
            {/* End .col */}

            <div className="col-auto d-none xl:d-block">
              <button
                data-bs-toggle="offcanvas"
                data-bs-target="#listingSidebar"
                className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1"
              >
                <i className="icon-up-down text-14 mr-10" />
                Filter
              </button>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .col */}
      </div>
      {/* End .row */}
    </>
  ):(<></>);
};

export default TopHeaderFilter;
