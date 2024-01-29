import { createSlice } from "@reduxjs/toolkit";
import { DateObject } from "react-multi-date-picker";

const initialState = {
  business:"Flight",
  locationCode: "",
  locationName: "",
  locationToCode: "",
  locationToName: "",
  cutOfDays: 2,
  stayInDays: 2,
  startDate: new DateObject(),
  endDate: new DateObject(),
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
