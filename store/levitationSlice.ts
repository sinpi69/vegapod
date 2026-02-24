import { createSlice } from "@reduxjs/toolkit";

interface LevitationState {
  on: boolean;
}

const initialState: LevitationState = {
  on: false,
};

const levitationSlice = createSlice({
  name: "levitation",
  initialState,
  reducers: {
    levitationOn(state) {
      state.on = true;
    },
    levitationOff(state) {
      state.on = false;
    },
  },
});

export const { levitationOn, levitationOff } = levitationSlice.actions;
export default levitationSlice.reducer;
