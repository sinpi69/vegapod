"use client";

import ControlCard from "@/components/ControlCard";
import ActionButton from "@/components/ActionButton";
import { useAppDispatch } from "@/store/hooks";
import { coolingOn as coolingOnAction, coolingOff } from "@/store/coolingSlice";

interface Props {
  connected: boolean;
  coolingOn: boolean;
  brakeActuated: boolean;
  send: (cmd: string) => void;
}

export default function CoolingCard({
  connected,
  coolingOn,
  brakeActuated,
  send,
}: Props) {
  const dispatch = useAppDispatch();

  return (
    <ControlCard
      title="COOLING"
      statusLabel={coolingOn ? "ON" : "OFF"}
      statusOn={coolingOn}
    >
      <div className="flex gap-3">
        <ActionButton
          label="ON"
          color="green"
          disabled={
            !connected ||
            coolingOn ||
            brakeActuated // 🔒 SAFETY INTERLOCK
          }
          onClick={() => {
            send("#CON&");
            dispatch(coolingOnAction());
          }}
        />

        <ActionButton
          label="OFF"
          color="red"
          disabled={!connected || !coolingOn}
          onClick={() => {
            send("#COF&");
            dispatch(coolingOff());
          }}
        />
      </div>

      {brakeActuated && (
        <div className="mt-2 text-xs text-red-400">
          Cooling disabled — brake is actuated
        </div>
      )}
    </ControlCard>
  );
}
