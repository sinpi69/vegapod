import { createSlice } from "@reduxjs/toolkit";

interface BrakeState {
  actuated: boolean;
}

const initialState: BrakeState = {
  actuated: false,
};

const brakeSlice = createSlice({
  name: "brake",
  initialState,
  reducers: {
    brakeActuated(state) {
      state.actuated = true;
    },
    brakeRetracted(state) {
      state.actuated = false;
    },
  },
});

export const { brakeActuated, brakeRetracted } = brakeSlice.actions;
export default brakeSlice.reducer;