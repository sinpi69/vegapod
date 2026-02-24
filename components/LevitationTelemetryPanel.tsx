"use client";

import { useAppSelector } from "@/store/hooks";
import ControlCard from "@/components/ControlCard";

export default function LevitationTelemetryPanel() {
  const { gapMm,targetCurrentMa,temp ,valid } = useAppSelector(
    (s) => s.levitationTelemetry
  );

  return (
    <ControlCard
      title="LEVITATION TELEMETRY"
      statusLabel={valid ? "LIVE" : "NO DATA"}
      statusOn={valid}
    >
      <div className="grid grid-cols-1 gap-4 text-sm">
        <div className="bg-[#111] p-3 rounded border border-[#222]">
          <div className="text-xs text-gray-400 mb-1">
            GAP (mm)
          </div>
          <div className="text-lg font-bold text-[#00ffcc]">
            {gapMm}
          </div>
        </div>
        <div className="bg-[#111] p-3 rounded border border-[#222]">
          <div className="text-xs text-gray-400 mb-1">
            Target Current (mA)
          </div>
          <div className="text-lg font-bold text-[#00ffcc]">
            {targetCurrentMa}
          </div>
        </div>
        <div className="bg-[#111] p-3 rounded border border-[#222]">
          <div className="text-xs text-gray-400 mb-1">
            Temperature (C)
          </div>
          <div className="text-lg font-bold text-[#00ffcc]">
            {temp}
          </div>
        </div>
      </div>
    </ControlCard>
  );
}
