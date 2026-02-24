"use client";

import sequenceData from "@/lib/sequences/propulsion.json";
import ActionButton from "@/components/ActionButton";
import BrakeCard from "@/components/BrakeCard";
import ConnectionPanel from "@/components/ConnectionPanel";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useAppSelector } from "@/store/hooks";

interface Step {
  label: string;
  cmd: string;
  wait: number;
}

export default function RunSequencesPage() {
  const { connect, cleanup, send } = useWebSocket();

  const connected = useAppSelector((s) => s.socket.connected);
  const brake = useAppSelector((s) => s.brake.actuated);

  const steps: Step[] = sequenceData.steps;

  const runSequence = async () => {
    for (const step of steps) {
      send(step.cmd);
      console.log("[SEQ]", step.label);
      await new Promise((res) => setTimeout(res, step.wait));
    }
  };

  return (
    <main className="min-h-screen bg-[#0e0e0e] text-[#00ffcc] p-6 font-mono">
      <h1 className="text-2xl text-white mb-4">Propulsion</h1>

      {/* ================= TOP LEFT HALF ================= */}
      <div className="mb-6 flex">
        {/* LEFT HALF */}
        <div className="w-1/2">
          <div className="grid grid-cols-2 gap-4">
            {/* CONNECTION */}
            <ConnectionPanel
              connected={connected}
              onConnect={connect}
              onDisconnect={cleanup}
            />

            {/* EMERGENCY BRAKE */}
            <BrakeCard
              connected={connected}
              brake={brake}
              send={send}
            />
          </div>
        </div>

        {/* RIGHT HALF — EMPTY */}
        <div className="w-1/2" />
      </div>

      {/* ================= SEQUENCE STEPS ================= */}
      <div className="mb-6 flex">
        <div className="w-1/2 border border-[#00ffcc] p-4 rounded">
          <h2 className="font-bold text-white mb-2">Steps</h2>
          <ol className="list-decimal list-inside text-sm space-y-1">
            {steps.map((s, i) => (
              <li key={i}>
                <code>{s.label}</code> → wait {s.wait} ms
              </li>
            ))}
          </ol>
        </div>
        <div className="w-1/2" />
      </div>

      {/* ================= RUN ================= */}
      <ActionButton
        label="RUN SEQUENCE"
        color="green"
        onClick={runSequence}
      />
    </main>
  );
}
