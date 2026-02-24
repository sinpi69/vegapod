import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReferrerEnum } from "next/dist/lib/metadata/types/metadata-types";

interface LevitationTelemetryState {
  gapMm: string;
  targetCurrentMa: string;
  temp: string;
  valid: boolean;
}

const initialState: LevitationTelemetryState = {
  gapMm: "--",
  targetCurrentMa: "--",
  temp: "--",
  valid: false,
};

const levitationTelemetrySlice = createSlice({
  name: "levitationTelemetry",
  initialState,
  reducers: {
    updateLevitationTelemetry(state, action: PayloadAction<string>) {
      // payload format: "<gapMm>,<targetCurrentMa>"
      const parts = action.payload.split(",");

      if (parts.length >= 1) {
        state.gapMm = parts[0];
        state.targetCurrentMa = parts[1] ?? "--";
        state.temp = parts[2];
        state.valid = true;
      }
    },

    clearLevitationTelemetry(state) {
      state.gapMm = "--";
      state.targetCurrentMa = "--";
      state.temp = "--";
      state.valid = false;
    },
  },
});

export const {
  updateLevitationTelemetry,
  clearLevitationTelemetry,
} = levitationTelemetrySlice.actions;

export default levitationTelemetrySlice.reducer;
