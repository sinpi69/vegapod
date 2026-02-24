"use client";

import { useRef } from "react";
import { useAppDispatch } from "@/store/hooks";

import { updateTelemetry } from "@/store/telemetrySlice";
import { connected, disconnected } from "@/store/socketSlice";
import { brakeActuated, brakeRetracted } from "@/store/brakeSlice";
import { coolingOff } from "@/store/coolingSlice";

import {
  updateLevitationTelemetry,
  clearLevitationTelemetry,
} from "@/store/levitationTelemetrySlice";

const PI_WS = "ws://10.179.172.61:8765";

export function useWebSocket() {
  const wsRef = useRef<WebSocket | null>(null);
  const dispatch = useAppDispatch();

  const connect = () => {
    if (wsRef.current) return;

    const ws = new WebSocket(PI_WS);
    wsRef.current = ws;

    ws.onopen = () => dispatch(connected());
    ws.onclose = cleanup;
    ws.onerror = cleanup;

    ws.onmessage = (e) => {
      const frame = e.data as string;

      console.log("[RX FRAME]", frame);

      /* ================= COOLING TELEMETRY ================= */
      if (frame.startsWith("#T:") && frame.endsWith("@")) {
        const payload = frame.slice(3, -1); // remove #T: and @
        const values = payload.split(",");

        if (values.length === 21) {
          dispatch(updateTelemetry(values));

          // const flowErrorFlag = values[21];
          // if (flowErrorFlag === "1") {
          //   dispatch(brakeActuated());
          //   dispatch(coolingOff());
          // } else {
          //   dispatch(brakeRetracted());
          // }
        } else {
          console.warn("Cooling telemetry length mismatch:", values.length);
        }

        return;
      }

      /* ================= LEVITATION TELEMETRY ================= */
      if (frame.startsWith("#L:") && frame.endsWith("@")) {
        const payload = frame.slice(3, -1); // remove "#L:" and "@"
        dispatch(updateLevitationTelemetry(payload));
        return;
      }
    };
  };

  const cleanup = () => {
    wsRef.current?.close();
    wsRef.current = null;

    dispatch(disconnected());
    dispatch(clearLevitationTelemetry());
  };

  const send = (cmd: string) => {
    wsRef.current?.send(cmd);
  };

  return { connect, cleanup, send };
}
