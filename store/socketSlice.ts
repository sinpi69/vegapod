import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SocketState {
  connected: boolean;
  lastSeen: number | null;
  latencyMs: number | null;
}

const initialState: SocketState = {
  connected: false,
  lastSeen: null,
  latencyMs: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    connected(state) {
      state.connected = true;
      state.lastSeen = Date.now();
    },
    disconnected(state) {
      state.connected = false;
      state.lastSeen = null;
      state.latencyMs = null;
    },
    heartbeat(state, action: PayloadAction<number>) {
      state.lastSeen = Date.now();
      state.connected = true;
      state.latencyMs = action.payload;
    },
  },
});

export const { connected, disconnected, heartbeat } = socketSlice.actions;
export default socketSlice.reducer;
