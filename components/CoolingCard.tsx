"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch } from "@/store/hooks";
import ActionButton from "@/components/ActionButton";
import {
  coolingOn as coolingOnAction,
  coolingOff,
} from "@/store/coolingSlice";
import { useState } from "react";

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
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* -------- COLLAPSED CARD -------- */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        onClick={() => setOpen(true)}
        className="bg-black border border-[#00ffcc]/40 rounded-xl p-5 shadow-md hover:shadow-[#00ffcc]/30 transition cursor-pointer"
      >
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold tracking-widest text-[#00ffcc]">
            COOLING
          </div>

          <div
            className={`px-3 py-1 rounded-full text-sm font-bold ${
              coolingOn
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {coolingOn ? "ON" : "OFF"}
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
              className="fixed z-50 top-1/2 left-1/2 w-[450px] max-w-[95%] -translate-x-1/2 -translate-y-1/2 bg-black border border-[#00ffcc]/40 rounded-2xl p-8 shadow-2xl shadow-[#00ffcc]/20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#00ffcc] tracking-widest">
                  COOLING CONTROL
                </h2>

                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* ON / OFF Buttons */}
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

              {/* Safety Interlock Message */}
              {brakeActuated && (
                <div className="mt-4 text-sm text-red-400 border border-red-500/30 bg-red-500/10 p-3 rounded">
                  Cooling disabled — brake is actuated
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}