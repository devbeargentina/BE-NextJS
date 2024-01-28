import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createAPI from "./api";

const API = createAPI("https://localhost:7500");
// Async Thunk for Fetching Hotel Location List
export const fetchHotelLocationList = createAsyncThunk(
  "hotel/fetchHotelLocationList",
  async ({ query, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.get(`api/hotel/fetchHotelLocationList?query=${query}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const hotelAvailResult = createAsyncThunk(
  "hotel/hotelsbycity",
  
  async ({ hotelAvailRQ, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post(`api/hotel/hotelsbycity`,  hotelAvailRQ );
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

const hotelSlice = createSlice({
  name: "hotel",
  initialState: {
    hotelAvailRQ: {
      searchParam: {
        startDate: "2024-05-01",
        endDate: "2024-05-05",
        cityJPDCode: "JPD053294",
        pax: [
          {
            age: 25
          }
        ]
      },
      isApplySearchParam: true,
      filterParam: {
        amenities: [],
        priceMinMax: [
          0,1000
        ],
       hotelName: "",
        starRating: [],
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
    filterParam: {
      amenities: [],
        priceMinMax: [
          0,1000
        ],
       hotelName: "string",
        starRating: [],
        pageNumber: 0,
        pageSize: 10
    },
    locationList: [],
    hotelList: [],
    hotelDetails: null,
    cart: [],
    reservationStatus: null,
    error: "",
    totalHotels:0,
    totalPages:0,
    loading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    updateHotelAvailRQ: (state, action) => {
      // Merge the payload with the existing FlightAvailRQ
      state.hotelAvailRQ = {
        ...state.hotelAvailRQ,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHotelLocationList.pending, (state) => {
      
      state.loading = true;
    });
    builder.addCase(fetchHotelLocationList.fulfilled, (state, action) => {
      
      state.loading = false;
      state.hotelLocations = action.payload.result;
    });
    builder.addCase(fetchHotelLocationList.rejected, (state, action) => {
      
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(hotelAvailResult.pending, (state) => {
      
      state.loading = true;
    });
    builder.addCase(hotelAvailResult.fulfilled, (state, action) => {
      
      state.loading = false;
      state.hotelList = action.payload.result.hotelList;
      state.filterParam = action.payload.result?.filterCriteria;
      state.totalPages = action.payload.result?.totalPages;
      state.totalHotels = action.payload.result?.totalHotel;
      state.totalNights = action.payload.result?.nights;
    });
    builder.addCase(hotelAvailResult.rejected, (state, action) => {
      
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

export const { clearError, updateHotelAvailRQ } = hotelSlice.actions;

export default hotelSlice.reducer;
