import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationCode: "loc-1",
  locationName: "London",
  cutOfDays: 2,
  stayInDays: 2,
  startDate: "01-01-2024",
  endDate: "01-15-2024",
  adult: 2,
  child: 0,
  room: 1
};

export const searchCriteriaSlice = createSlice({
  name: "searchCriteria",
  initialState,
  reducers: {
    addCurrentCriteria: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { addCurrentCriteria } = searchCriteriaSlice.actions;
export default searchCriteriaSlice.reducer;
