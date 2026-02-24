import { useState } from "react";
import ActionButton from "@/components/ActionButton";

interface Props {
  connected: boolean;
  send: (cmd: string) => void;
}

export default function InverterCard({ connected, send }: Props) {
  const [on, setOn] = useState(false);
  const [amp, setAmp] = useState(0);
  const [freq, setFreq] = useState(0);

  // 🔒 Controls enabled ONLY when inverter is OFF
  const canControl = connected && !on;

  const sendInverterCmd = (
    nextOn: boolean,
    nextAmp: number,
    nextFreq: number
  ) => {
    const state = nextOn ? 1 : 0;
    const msg = `#I${state}${nextAmp}${nextFreq}&`;
    send(msg);
    console.log(msg);
  };

  return (
    <div className="flex-1 p-4 border border-[#00ffcc] rounded">
      <div className="mb-2 font-bold text-white">
        INVERTER:{" "}
        <span className={on ? "text-lime-400" : "text-red-500"}>
          {on ? "ON" : "OFF"}
        </span>
      </div>

      {/* ON / OFF */}
      <div className="flex gap-3 mb-3">
        <ActionButton
          label="ON"
          color="green"
          disabled={!connected || on}
          onClick={() => {
            setOn(true);
            sendInverterCmd(true, amp, freq);
          }}
        />

        <ActionButton
          label="OFF"
          color="red"
          disabled={!connected || !on}
          onClick={() => {
            setOn(false);
            sendInverterCmd(false, amp, freq);
          }}
        />
      </div>

      {/* AMPLITUDE (editable only when OFF) */}
      <Control
        label="AMPLITUDE"
        value={amp}
        disabled={!canControl}
        onChange={(v) => {
          setAmp(v);
          sendInverterCmd(on, v, freq);
        }}
      />

      {/* FREQUENCY (editable only when OFF) */}
      <Control
        label="FREQUENCY"
        value={freq}
        disabled={!canControl}
        onChange={(v) => {
          setFreq(v);
          sendInverterCmd(on, amp, v);
        }}
      />
    </div>
  );
}

/* ===== Arrow control ===== */
function Control({
  label,
  value,
  disabled,
  onChange,
}: {
  label: string;
  value: number;
  disabled: boolean;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex justify-between mb-2">
      <span className="text-xs text-gray-400">{label}</span>
      <div className="flex gap-2">
        <button
          disabled={disabled}
          onClick={() => onChange(Math.max(0, value - 1))}
          className="
            px-2 rounded border border-[#444]
            bg-[#111]
            hover:bg-[#222]
            active:scale-95
            disabled:opacity-30 disabled:cursor-not-allowed
          "
        >
          ▼
        </button>
        <span className="w-4 text-center">{value}</span>
        <button
          disabled={disabled}
          onClick={() => onChange(Math.min(9, value + 1))}
          className="
            px-2 rounded border border-[#444]
            bg-[#111]
            hover:bg-[#222]
            active:scale-95
            disabled:opacity-30 disabled:cursor-not-allowed
          "
        >
          ▲
        </button>
      </div>
    </div>
  );
}
