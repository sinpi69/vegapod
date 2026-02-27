"use client";

import { useAppSelector } from "@/store/hooks";

export default function LevitationTelemetryPanel() {
  const { gapMm, targetCurrentMa, temp, valid } = useAppSelector(
    (s) => s.levitationTelemetry
  );

  return (
    <div className="bg-black border border-[#00ffcc]/40 rounded-xl p-5 shadow-md">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold tracking-widest text-[#00ffcc]">
          LEVITATION TELEMETRY
        </div>

        <div
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            valid
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {valid ? "LIVE" : "NO DATA"}
        </div>
      </div>

      {/* Telemetry Grid */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        <TelemetryBlock
          label="Gap (mm)"
          value={gapMm}
          valid={valid}
        />

        <TelemetryBlock
          label="Target Current (mA)"
          value={targetCurrentMa}
          valid={valid}
        />

        <TelemetryBlock
          label="Temperature (°C)"
          value={temp}
          valid={valid}
        />
      </div>
    </div>
  );
}

/* ---------- Telemetry Block ---------- */

function TelemetryBlock({
  label,
  value,
  valid,
}: {
  label: string;
  value: number | string;
  valid: boolean;
}) {
  return (
    <div className="bg-[#111] p-4 rounded border border-[#222]">
      <div className="text-xs text-gray-400 mb-2">{label}</div>
      <div
        className={`text-2xl font-bold font-mono ${
          valid ? "text-[#00ffcc]" : "text-gray-600"
        }`}
      >
        {valid ? value : "--"}
      </div>
    </div>
  );
}