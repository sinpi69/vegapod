"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ActionButton from "@/components/ActionButton";

interface Props {
  connected: boolean;
  send: (cmd: string) => void;
}

export default function InverterCard({ connected, send }: Props) {
  const [open, setOpen] = useState(false);
  const [on, setOn] = useState(false);
  const [amp, setAmp] = useState(0);
  const [freq, setFreq] = useState(0);

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
    <>
      {/* -------- COLLAPSED CARD -------- */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        onClick={() => setOpen(true)}
        className="bg-black border border-[#00ffcc]/40 rounded-xl p-5 shadow-md hover:shadow-[#00ffcc]/30 transition cursor-pointer"
      >
        <div className="flex justify-between items-center">
          <div>
            <div className="text-lg font-bold tracking-widest text-[#00ffcc]">
              INVERTER
            </div>

            <div className="mt-2 text-sm font-mono text-gray-300 space-y-1">
              <div>AMP: {amp}</div>
              <div>FREQ: {freq}</div>
            </div>
          </div>

          <div
            className={`px-3 py-1 rounded-full text-sm font-bold ${
              on
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {on ? "ON" : "OFF"}
          </div>
        </div>
      </motion.div>

      {/* -------- FLOATING OVERLAY -------- */}
      <AnimatePresence>
        {open && (
          <>
            {/* Background Blur */}
            <motion.div
              className="fixed inset-0 backdrop-blur-md bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Floating Panel */}
            <motion.div
              className="fixed z-50 top-1/2 left-1/2 w-[500px] max-w-[95%] -translate-x-1/2 -translate-y-1/2 bg-black border border-[#00ffcc]/40 rounded-2xl p-8 shadow-2xl shadow-[#00ffcc]/20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#00ffcc] tracking-widest">
                  INVERTER CONTROL
                </h2>

                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* ON / OFF */}
              <div className="flex gap-3 mb-6">
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

              {/* AMPLITUDE */}
              <Control
                label="AMPLITUDE"
                value={amp}
                disabled={!canControl}
                onChange={(v) => {
                  setAmp(v);
                  sendInverterCmd(on, v, freq);
                }}
              />

              {/* FREQUENCY */}
              <Control
                label="FREQUENCY"
                value={freq}
                disabled={!canControl}
                onChange={(v) => {
                  setFreq(v);
                  sendInverterCmd(on, amp, v);
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ===== Arrow Control ===== */
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
    <div className="flex justify-between mb-4">
      <span className="text-sm text-gray-400">{label}</span>

      <div className="flex gap-3 items-center">
        <button
          disabled={disabled}
          onClick={() => onChange(Math.max(0, value - 1))}
          className="
            px-3 py-1 rounded border border-[#444]
            bg-[#111]
            hover:bg-[#222]
            active:scale-95
            disabled:opacity-30 disabled:cursor-not-allowed
          "
        >
          ▼
        </button>

        <span className="w-6 text-center font-mono text-[#00ffcc]">
          {value}
        </span>

        <button
          disabled={disabled}
          onClick={() => onChange(Math.min(9, value + 1))}
          className="
            px-3 py-1 rounded border border-[#444]
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