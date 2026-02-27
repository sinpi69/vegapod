"use client";

import { useWebSocket } from "@/hooks/useWebSocket";
import { useAppSelector, useAppDispatch } from "@/store/hooks";

import { coolingOff } from "@/store/coolingSlice";

import CoolingCard from "@/components/CoolingCard";
import InverterCard from "@/components/InverterCard";
import TelemetryPanel from "@/components/TelemetryPanel";
import LevitationCard from "@/components/LevitationCard";
import LevitationTelemetryPanel from "@/components/LevitationTelemetryPanel";
import StickyHeader from "@/components/StickyHeader";

export default function Page() {
  const { connect, cleanup, send } = useWebSocket();
  const dispatch = useAppDispatch();

  const connected = useAppSelector((s) => s.socket.connected);
  const telemetry = useAppSelector((s) => s.telemetry.data);
  const brake = useAppSelector((s) => s.brake.actuated);
  const coolingOn = useAppSelector((s) => s.cooling.on);

  return (
    <main className="min-h-screen bg-[#0e0e0e] text-[#00ffcc] font-mono">
      {/* ================= STICKY HEADER ================= */}
      <StickyHeader
        connected={connected}
        brake={brake}
        onConnect={connect}
        onDisconnect={cleanup}
        send={send}
        onBrakeActuate={() => {
          dispatch(coolingOff());
          send("#COF&");
        }}
      />

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* ================= LEFT SIDE (CONTROLS) ================= */}
          <div className="xl:col-span-2 space-y-6">
            {/* Top Control Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InverterCard connected={connected} send={send} />

              <CoolingCard
                connected={connected}
                coolingOn={coolingOn}
                brakeActuated={brake}
                send={send}
              />

              {/* Levitation Full Width */}
              <LevitationCard 
                connected={connected} 
                send={send} />
            </div>
          </div>

          {/* ================= RIGHT SIDE (TELEMETRY) ================= */}
          <div className="space-y-6">
            <TelemetryPanel telemetry={telemetry} title="COOLING TELEMETRY" />

            <LevitationTelemetryPanel />
          </div>
        </div>
      </div>
    </main>
  );
}
