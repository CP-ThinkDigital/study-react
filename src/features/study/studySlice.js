import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  states: [
    {
      value: "AL",
      label: "Alabama",
    },
    {
      value: "AK",
      label: "Alaska",
    },
    {
      value: "AZ",
      label: "Arizona",
    },
  ],
};

export const studySlice = createSlice({
  name: "study",
  initialState,

  reducers: {
    addState: (state, action) => {
      state.states.push(action.payload);
    },

    clearState: (state, { payload }) => {
      state.states = payload;
    },
  },
});

export const { addState, clearState } = studySlice.actions;
export default studySlice.reducer;
