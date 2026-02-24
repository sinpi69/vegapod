import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TelemetryState {
  data: string[];
  error: boolean;
}

const initialState: TelemetryState = {
  data: [],
  error: false,
};

const telemetrySlice = createSlice({
  name: "telemetry",
  initialState,
  reducers: {
    updateTelemetry(state, action: PayloadAction<string[]>) {
      state.data = action.payload;
    },

    updateIndex(
      state,
      action: PayloadAction<{ index: number; value: string }>
    ) {
      state.data[action.payload.index] = action.payload.value;
    },
  },
});

export const { updateTelemetry, updateIndex } = telemetrySlice.actions;
export default telemetrySlice.reducer;
