"use client";

import ControlCard from "@/components/ControlCard";
import ActionButton from "@/components/ActionButton";
import { useAppDispatch } from "@/store/hooks";
import { brakeActuated, brakeRetracted } from "@/store/brakeSlice";

interface Props {
  connected: boolean;
  brake: boolean;
  send: (cmd: string) => void;
  onBrakeActuate: () => void;
}

export default function BrakeCard({
  connected,
  brake,
  send,
  onBrakeActuate,
}: Props) {
  const dispatch = useAppDispatch();

  return (
    <ControlCard
      title="BRAKE"
      statusLabel={brake ? "ACTUATED" : "RETRACTED"}
      statusOn={brake}
    >
      <div className="flex gap-3">
        <ActionButton
          label="ACTUATE"
          color="red"
          disabled={!connected || brake}
          onClick={() => {
            send("#ACT&");
            onBrakeActuate();        // 🔥 parent handles cooling
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
    </ControlCard>
  );
}
