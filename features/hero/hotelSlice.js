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
  "hotel/hotelAvailResult",
  async ({ HotelAvailRQ, navigate, toast }, { rejectWithValue }) => {
    try {
      
      const response = await API.post(`api/hotel/hotelAvailResult`,  HotelAvailRQ );
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
    hotelLocations: [],
    hotelList: [],
    hotelDetails: null,
    cart: [],
    reservationStatus: null,
    error: "",
    loading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = "";
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
      state.hotelList = action.payload.result;
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

export const { clearError } = hotelSlice.actions;

export default hotelSlice.reducer;
