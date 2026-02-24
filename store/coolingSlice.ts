import { createSlice } from "@reduxjs/toolkit";

interface CoolingState {
  on: boolean;
}

const initialState: CoolingState = {
  on: false,
};

const coolingSlice = createSlice({
  name: "cooling",
  initialState,
  reducers: {
    coolingOn(state) {
      state.on = true;
    },
    coolingOff(state) {
      state.on = false;
    },
  },
});

export const { coolingOn, coolingOff } = coolingSlice.actions;
export default coolingSlice.reducer;
