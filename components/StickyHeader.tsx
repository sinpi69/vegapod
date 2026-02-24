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
    <div className="
      sticky top-0 z-50
      backdrop-blur-md
      bg-[#0e0e0e]/90
      border-b border-[#00ffcc]
      shadow-[0_0_20px_#00ffcc22]
    ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-6">

        {/* LEFT: CONNECTION STATUS */}
        <div className="flex items-center gap-6">

          <div className="font-bold text-white tracking-wider">
            WS:
            <span
              className={`ml-2 ${
                connected
                  ? "text-lime-400 animate-pulse"
                  : "text-red-500"
              }`}
            >
              {connected ? "CONNECTED" : "DISCONNECTED"}
            </span>
          </div>

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

        {/* RIGHT: BRAKE CONTROL */}
        <div className="flex items-center gap-6">

          <div className="font-bold text-white tracking-wider">
            BRAKE:
            <span
              className={`ml-2 ${
                brake
                  ? "text-red-500 animate-pulse"
                  : "text-lime-400"
              }`}
            >
              {brake ? "ACTUATED" : "RETRACTED"}
            </span>
          </div>

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
  );
}