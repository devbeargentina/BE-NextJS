import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createAPI from "./api";

const API = createAPI("https://localhost:7002");
export const registerUser = createAsyncThunk(
  "auth/Register",
  async ({ registerData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post("api/Auth/register", registerData);
      toast.success("Added Successfully");
      navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createCoTraveller = createAsyncThunk(
  "auth/createCoTraveller",
  async ({ coTravellerData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post("api/Auth/cotravelers", coTravellerData);
      const userResponse = await getCoTravellers();
      toast.success("Added Successfully");
      navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCoTraveller = createAsyncThunk(
  "auth/updateCoTraveller",
  async ({ coTravellerData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post(
        "api/Auth/update-cotravelers",
        coTravellerData
      );
      toast.success("Added Successfully");
      navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCoTravellers = createAsyncThunk(
  "auth/getCoTravellers",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.get(`api/Auth/cotravelers`);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (userId, { rejectWithValue }) => {
    try {
      if(localStorage.getItem("userToken")){
      const response = await API.get(`/api/Auth/user`);
      return response;
    }
    return rejectWithValue();
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ updatedData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.put(`api/Auth/update-profile`, updatedData);
      toast.success("Module Updated Successfully");
      //navigate("/dashboard");
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const deleteCoTraveller = createAsyncThunk(
  "auth/deleteCoTraveller",
  async ({ id, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/api/Auth/coTravellers/${id}`);
      toast.success("Module Updated Successfully");
      navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ loginRQ, toast, router }, { rejectWithValue }) => {
    try {
      debugger;
      const response = await API.post(`/api/auth/login`, loginRQ);
      toast.success("Module Updated Successfully");
      router.push("/home_3");
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async ({ loginRQ, toast, router }, { rejectWithValue }) => {
    try {
      debugger;
      const response = await API.post(`/api/auth/loginWithGoogle`, loginRQ);
       toast.success("Module Updated Successfully");
       debugger;
       router.push("/home_3");
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    coTravellers: [],
    isUserLoggedIn: null,
    error: "",
    loading: false,
    token: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      debugger;
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      try {
        debugger;
        if (action.payload.data && action.payload.data.result.token)
          localStorage.setItem("userToken", action.payload.data.result.token);

        state.loading = false;
        state.isUserLoggedIn = true;
        state.user = action.payload.data.result.user;
        // Call the getUser async thunk to fetch user data
        const userResponse = getUser(); // Make sure to dispatch the async thunk
        // if (userResponse.payload) {
        //   // If the user response is successful, update the state accordingly
        //   const user = userResponse.payload;
        //   localStorage.setItem("userToken", user.token);
        //   state.loading = false;
        //   state.isUserLoggedIn = true;
        //   // Update state with the user data, assuming `user` is the user data returned from the getUser async thunk
        //   state.user = user;
        // }
      } catch (error) {
        // Handle any errors that occur during the getUser async thunk
        console.error(error);
      }
      // // state.user = action.payload;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.isUserLoggedIn = false;
      state.error = action.payload.message;
      localStorage.removeItem("userToken");
    });
    builder.addCase(loginWithGoogle.pending, (state, action) => {
      debugger;
      state.loading = true;
    });
    builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
      debugger;
      try {
        if (action.payload.data && action.payload.data.token)
          localStorage.setItem("userToken", action.payload.data.token);

        state.loading = false;
        state.isUserLoggedIn = true;
        state.user = action.payload.data.user;
        //state.user = action.payload;
        // Call the getUser async thunk to fetch user data
        const userResponse = getUser(); // Make sure to dispatch the async thunk
        // if (userResponse.payload) {
        //   // If the user response is successful, update the state accordingly
        //   const user = userResponse.payload;
        //   localStorage.setItem("userToken", user.token);
        //   state.loading = false;
        //   state.isUserLoggedIn = true;
        //   // Update state with the user data, assuming `user` is the user data returned from the getUser async thunk
        //   state.user = user;
        // }
      } catch (error) {
        // Handle any errors that occur during the getUser async thunk
        console.error(error);
      }
      // // state.user = action.payload;
    });
    builder.addCase(loginWithGoogle.rejected, (state, action) => {
      debugger;
      state.loading = false;
      state.isUserLoggedIn = false;
      state.error = action.payload.message;
      localStorage.removeItem("userToken");
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(createCoTraveller.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCoTraveller.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createCoTraveller.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // builder.addCase(getUser.pending, (state, action) => {
    //   state.loading = true;
    // });
    // builder.addCase(getUser.fulfilled, (state, action) => {
    //   state.loading = false;

    //   state.isUserLoggedIn = true;
    //   state.user = action.payload.data.appUser;
    //   state.coTravellers = action.payload.data.appUser.coTravellers;
    // });
    // builder.addCase(getUser.rejected, (state, action) => {
    //   localStorage.removeItem("userToken");
    //   state.isUserLoggedIn = false;
    //   state.loading = false;
    //   state.error = action.payload;
    // });
    builder.addCase(getCoTravellers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCoTravellers.fulfilled, (state, action) => {
      state.loading = false;
      state.coTravellers = action.payload.data;
    });
    builder.addCase(getCoTravellers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data.result.user;
      state.isUserLoggedIn = true;
      //state.coTravellers = action.payload.data.appUser.coTravellers;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      localStorage.removeItem("userToken");
      state.isUserLoggedIn = false;
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
state.user = action.payload.data.result.user;
      // Call the getUser async thunk to fetch user data
      //const userResponse = getUser();
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(updateCoTraveller.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCoTraveller.fulfilled, (state, action) => {
      state.loading = false;

      // Call the getUser async thunk to fetch user data
      const userResponse = getCoTravellers();
    });
    builder.addCase(updateCoTraveller.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    builder.addCase(deleteCoTraveller.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCoTraveller.fulfilled, (state, action) => {
      state.loading = false;

      // Call the getUser async thunk to fetch user data
      const userResponse = getCoTravellers();
    });
    builder.addCase(deleteCoTraveller.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
