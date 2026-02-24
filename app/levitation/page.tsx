"use client";

import { useEffect, useRef, useState } from "react";

import sequenceData from "@/lib/sequences/levitation.json";

import { useWebSocket } from "@/hooks/useWebSocket";
import { useAppSelector, useAppDispatch } from "@/store/hooks";

import { coolingOn, coolingOff } from "@/store/coolingSlice";
import { levitationOn, levitationOff } from "@/store/levitationSlice";

import ConnectionPanel from "@/components/ConnectionPanel";
import CoolingCard from "@/components/CoolingCard";
import LevitationCard from "@/components/LevitationCard";
import ActionButton from "@/components/ActionButton";
import LevitationTelemetryPanel from "@/components/LevitationTelemetryPanel";
import TelemetryPanel from "@/components/TelemetryPanel";

interface Step {
  label: string;
  cmd: string;
  wait: number;
}

export default function LevitationTestPage() {
  const { connect, cleanup, send } = useWebSocket();
  const dispatch = useAppDispatch();

  const connected = useAppSelector((s) => s.socket.connected);
  const cooling = useAppSelector((s) => s.cooling.on);
  const levitating = useAppSelector((s) => s.levitation.on);
  const telemetry = useAppSelector((s) => s.telemetry.data);

  const runningRef = useRef(false);
  const [runningUI, setRunningUI] = useState(false);

  const startSteps: Step[] = sequenceData.start;

  /* ================= START ================= */
  const runSequence = async () => {
    if (!connected || runningRef.current) return;

    runningRef.current = true;
    setRunningUI(true);

    for (const step of startSteps) {
      if (!runningRef.current) return;

      send(step.cmd);

      if (step.cmd === "#CON&") dispatch(coolingOn());
      if (step.cmd === "L#1&") dispatch(levitationOn());

      if (step.wait > 0) {
        await new Promise((res) => setTimeout(res, step.wait));
      }
    }
  };

  /* ================= STOP ================= */
  const stopSequence = () => {
    if (!runningRef.current) return;

    runningRef.current = false;
    setRunningUI(false);

    send("L#0&");
    send("#COF&");

    dispatch(levitationOff());
    dispatch(coolingOff());
  };

  /* ===== AUTO STOP ON DISCONNECT ===== */
  useEffect(() => {
    if (!connected && runningRef.current) {
      stopSequence();
    }
  }, [connected]);

  return (
    <main className="min-h-screen bg-[#0e0e0e] text-[#00ffcc] p-6 font-mono">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* TITLE */}
        <h1 className="text-2xl text-white">LEVITATION TEST</h1>

        {/* CONNECTION */}
        <ConnectionPanel
          connected={connected}
          onConnect={connect}
          onDisconnect={cleanup}
        />

        {/* ===== CONTROLS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CoolingCard
            connected={connected}
            coolingOn={cooling}
            brakeActuated={false}
            send={send}
          />

          <div className="flex gap-4 pt-2">
            <ActionButton
              label="RUN SEQUENCE"
              color="green"
              disabled={!connected || runningUI}
              onClick={runSequence}
            />

            <ActionButton
              label="STOP SEQUENCE"
              color="red"
              disabled={!runningUI}
              onClick={stopSequence}
            />
          </div>
        </div>
        <div className="flex gap-4 pt-2">
          <LevitationCard connected={connected} send={send} />
          <LevitationTelemetryPanel />
        </div>

        {/* ===== SEQUENCE CONTROLS ===== */}

        {/* ===== LEVITATION TELEMETRY ===== */}

        <TelemetryPanel telemetry={telemetry} title="COOLING TELEMETRY" />
      </div>
    </main>
  );
}
