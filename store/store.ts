import { configureStore } from "@reduxjs/toolkit";

import telemetryReducer from "./telemetrySlice";
import brakeReducer from "./brakeSlice";
import socketReducer from "./socketSlice";
import coolingReducer from "./coolingSlice";
import levitationReducer from "./levitationSlice";
import levitationTelemetryReducer from "./levitationTelemetrySlice";

export const store = configureStore({
  reducer: {
    telemetry: telemetryReducer,
    brake: brakeReducer,
    socket: socketReducer,
    cooling: coolingReducer,
    levitation: levitationReducer,
    levitationTelemetry: levitationTelemetryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
