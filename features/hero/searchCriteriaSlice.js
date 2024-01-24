import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  business:"Flight",
  locationCode: "loc-1",
  locationName: "London",
  locationToCode: "loc-1",
  locationToName: "London",
  cutOfDays: 2,
  stayInDays: 2,
  startDate: "01-01-2024",
  endDate: "01-15-2024",
  adult: 2,
  child: 0,
  infant: 0,
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
