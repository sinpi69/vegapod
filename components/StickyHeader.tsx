"use client";

import { useAppDispatch } from "@/store/hooks";
import { brakeActuated, brakeRetracted } from "@/store/brakeSlice";
import ActionButton from "@/components/ActionButton";

interface Props {
  connected: boolean;
  brake: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  send: (cmd: string) => void;
  onBrakeActuate: () => void;
}

export default function StickyHeader({
  connected,
  brake,
  onConnect,
  onDisconnect,
  send,
  onBrakeActuate,
}: Props) {
  const dispatch = useAppDispatch();

  return (
    <header
      className="
        sticky top-0 z-50
        backdrop-blur-md
        bg-black/80
        border-b border-[#00ffcc]/40
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ===== TITLE ===== */}
        <div className="text-xl font-bold tracking-widest text-[#00ffcc]">
          VEGAPOD CONTROL
        </div>

        {/* ===== RIGHT SIDE ===== */}
        <div className="flex items-center gap-14">

          {/* ================= WS ================= */}
          <div className="flex items-center gap-6">

            <div className="text-xs text-gray-400 font-mono">
              WebSocket:
            </div>
            {/* STATUS ON RIGHT */}
            <span
              className={`px-3 py-1 rounded-full border text-xs font-mono ${
                connected
                  ? "border-green-500/40 text-green-400 bg-green-500/10 animate-pulse"
                  : "border-red-500/40 text-red-400 bg-red-500/10"
              }`}
            >
              {connected ? "CONNECTED" : "DISCONNECTED"}
            </span>
            <div className="flex gap-3">
              <ActionButton
                label="CONNECT"
                color="green"
                disabled={connected}
                onClick={onConnect}
              />
              <ActionButton
                label="DISCONNECT"
                color="red"
                disabled={!connected}
                onClick={onDisconnect}
              />
            </div>

            

          </div>

          {/* ================= BRAKE ================= */}
          <div className="flex items-center gap-6">

            <div className="text-xs text-gray-400 font-mono">
              BRAKE:
            </div>
            {/* STATUS ON RIGHT */}
            <span
              className={`px-3 py-1 rounded-full border text-xs font-mono ${
                brake
                  ? "border-red-500/40 text-red-400 bg-red-500/10 animate-pulse"
                  : "border-green-500/40 text-green-400 bg-green-500/10"
              }`}
            >
              {brake ? "ACTUATED" : "RETRACTED"}
            </span>
            <div className="flex gap-3">
              <ActionButton
                label="ACTUATE"
                color="red"
                disabled={!connected || brake}
                onClick={() => {
                  send("#ACT&");
                  onBrakeActuate();
                  dispatch(brakeActuated());
                }}
              />
              <ActionButton
                label="RETRACT"
                color="green"
                disabled={!connected || !brake}
                onClick={() => {
                  send("#RET&");
                  dispatch(brakeRetracted());
                }}
              />
            </div>

            

          </div>

        </div>
      </div>
    </header>
  );
}