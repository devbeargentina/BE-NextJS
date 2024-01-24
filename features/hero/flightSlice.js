import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createAPI from "./api";

const API = createAPI("https://localhost:5700");
// Async Thunk for Fetching Hotel Location List
export const fetchLocationList = createAsyncThunk(
  "flight/fetchLocationList",
  async ({ query, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.get(`api/flight/fetchLocationList?searchQuery=${query}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const flightAvailResult = createAsyncThunk(
  "flight/flightAvailResult",
  async ({ flightAvailRQ, navigate, toast }, { rejectWithValue }) => {
    try {
      console.log(JSON.stringify(flightAvailRQ));
      debugger;
      const response = await API.post(`api/flight/flightAvailResult`,  flightAvailRQ );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async Thunk for Fetching Hotel List with Filter and Sorting
export const fetchHotelList = createAsyncThunk(
  "hotel/fetchHotelList",
  async ({ filters, sortOptions }, { rejectWithValue }) => {
    try {
      const response = await API.post("api/hotel/list", { filters, sortOptions });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async Thunk for Fetching Hotel Details
export const fetchHotelDetails = createAsyncThunk(
  "hotel/fetchHotelDetails",
  async (hotelId, { rejectWithValue }) => {
    try {
      const response = await API.get(`api/hotel/${hotelId}/details`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async Thunk for Adding Hotel to Cart
export const addToCart = createAsyncThunk(
  "hotel/addToCart",
  async ({ hotelId, quantity }, { rejectWithValue }) => {
    try {
      const response = await API.post("api/cart/add", { hotelId, quantity });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async Thunk for Completing Hotel Reservation
export const completeReservation = createAsyncThunk(
  "hotel/completeReservation",
  async ({ cartItems, paymentInfo }, { rejectWithValue }) => {
    try {
      const response = await API.post("api/reservation/complete", { cartItems, paymentInfo });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const flightSlice = createSlice({
  name: "flight",
  initialState: {
    flightAvailRQ: {
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
        cabin: [],
        priceMinMax: [0, 1000000],
        stops: [],
        pageNumber: 0,
        pageSize: 10
      },
      isApplyFilterParam: true,
      sortParam: {
        sortBy: "rewr",
        sortType: "string"
      },
      isApplySortParam: true
    },
    locationList: [],
    flightList: [],
    hotelDetails: null,
    cart: [],
    reservationStatus: null,
    error: "",
    totalFlights:0,
    totalPages:0,
    loading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    updateFlightAvailRQ: (state, action) => {
      // Merge the payload with the existing FlightAvailRQ
      state.flightAvailRQ = {
        ...state.flightAvailRQ,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLocationList.pending, (state) => {
      
      state.locationList = [],
      state.loading = true;
    });
    builder.addCase(fetchLocationList.fulfilled, (state, action) => {
      
      state.loading = false;
      state.locationList = action.payload.result;
    });
    builder.addCase(fetchLocationList.rejected, (state, action) => {
      
      state.locationList = [],
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(flightAvailResult.pending, (state) => {
      
      state.loading = true;
    });
    builder.addCase(flightAvailResult.fulfilled, (state, action) => {
      
      state.loading = false;
      state.flightList = action.payload.result?.flightList;
      state.filterParam = action.payload.result?.filterCriteria;
      state.totalPages = action.payload.result?.totalPages;
      state.totalFlights = action.payload.result?.totalFlights;
    });
    builder.addCase(flightAvailResult.rejected, (state, action) => {
      
      state.loading = false;
      state.error = action.payload.message;
    });

    // Similar handling for other async actions
    // ...

    builder.addCase(clearError, (state) => {
      state.error = "";
    });
  },
});

export const { clearError, updateFlightAvailRQ } = flightSlice.actions;

export default flightSlice.reducer;
