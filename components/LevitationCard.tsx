"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import ActionButton from "@/components/ActionButton";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { levitationOn, levitationOff } from "@/store/levitationSlice";

interface Props {
  connected: boolean;
  send: (cmd: string) => void;
}

export default function LevitationCard({ connected, send }: Props) {
  const dispatch = useAppDispatch();
  const levitating = useAppSelector((s) => s.levitation.on);

  const [open, setOpen] = React.useState(false);

  const sliderNames = ["P", "I", "D"];

  const [sliders, setSliders] = React.useState([
    { value: [0], min: 0, max: 1, step: 0.00001 },
    { value: [0], min: 0, max: 1, step: 0.00001 },
    { value: [0], min: 0, max: 1, step: 0.00001 },
  ]);

  const updateSlider = (index: number, newProps: Partial<typeof sliders[0]>) => {
    setSliders((prev) =>
      prev.map((s, i) => (i === index ? { ...s, ...newProps } : s))
    );
  };

  const updateValue = (index: number, newValue: number) => {
    const rounded = Number(newValue.toFixed(5));
    updateSlider(index, { value: [rounded] });
  };

  const handleSendPID = () => {
    const p = sliders[0].value[0].toFixed(5);
    const i = sliders[1].value[0].toFixed(5);
    const d = sliders[2].value[0].toFixed(5);

    const packet = `#L:${p}:${i}:${d}&`;
    send(packet);
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
              LEVITATION
            </div>

            <div className="mt-2 text-sm font-mono text-gray-300 space-y-1">
              <div>P: {sliders[0].value[0].toFixed(5)}</div>
              <div>I: {sliders[1].value[0].toFixed(5)}</div>
              <div>D: {sliders[2].value[0].toFixed(5)}</div>
            </div>
          </div>

          <div
            className={`px-3 py-1 rounded-full text-sm font-bold ${
              levitating
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {levitating ? "ON" : "OFF"}
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
              className="fixed z-50 top-1/2 left-1/2 w-[650px] max-w-[95%] -translate-x-1/2 -translate-y-1/2 bg-black border border-[#00ffcc]/40 rounded-2xl p-8 shadow-2xl shadow-[#00ffcc]/20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#00ffcc] tracking-widest">
                  LEVITATION CONTROL
                </h2>

                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mb-8">
                <ActionButton
                  label="ON"
                  color="green"
                  disabled={!connected || levitating}
                  onClick={() => {
                    send("#LON&");
                    dispatch(levitationOn());
                  }}
                />

                <ActionButton
                  label="OFF"
                  color="red"
                  disabled={!connected || !levitating}
                  onClick={() => {
                    send("#LOF&");
                    dispatch(levitationOff());
                  }}
                />

                <ActionButton
                  label="SEND PID"
                  color="blue"
                  disabled={!connected || levitating}
                  onClick={handleSendPID}
                />
              </div>

              {/* Sliders */}
              <div className="space-y-10">
                {sliders.map((slider, index) => (
                  <div key={index} className="space-y-5">
                    <div className="text-lg font-semibold text-[#00ffcc]">
                      {sliderNames[index]}
                    </div>

                    <Slider
                      value={slider.value}
                      onValueChange={(val) => updateValue(index, val[0])}
                      min={slider.min}
                      max={slider.max}
                      step={slider.step}
                      disabled={levitating}
                    />

                    <div className="flex gap-4 flex-wrap text-sm">
                      <input
                        type="number"
                        value={slider.min}
                        step="0.00001"
                        disabled={levitating}
                        onChange={(e) =>
                          updateSlider(index, { min: Number(e.target.value) })
                        }
                        className="bg-black border border-[#00ffcc] rounded px-2 py-1 w-24 text-[#00ffcc]"
                      />

                      <input
                        type="number"
                        value={slider.max}
                        step="0.00001"
                        disabled={levitating}
                        onChange={(e) =>
                          updateSlider(index, { max: Number(e.target.value) })
                        }
                        className="bg-black border border-[#00ffcc] rounded px-2 py-1 w-24 text-[#00ffcc]"
                      />

                      <input
                        type="number"
                        value={slider.step}
                        step="0.00001"
                        disabled={levitating}
                        onChange={(e) =>
                          updateSlider(index, { step: Number(e.target.value) })
                        }
                        className="bg-black border border-[#00ffcc] rounded px-2 py-1 w-24 text-[#00ffcc]"
                      />

                      <div className="text-gray-400 font-mono flex items-center">
                        Value: {slider.value[0].toFixed(5)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}