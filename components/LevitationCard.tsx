"use client";

import ControlCard from "@/components/ControlCard";
import ActionButton from "@/components/ActionButton";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { levitationOn, levitationOff } from "@/store/levitationSlice";
import { Slider } from "@/components/ui/slider";
import * as React from "react";

interface Props {
  connected: boolean;
  send: (cmd: string) => void;
}

export default function LevitationCard({ connected, send }: Props) {
  const dispatch = useAppDispatch();
  const levitating = useAppSelector((s) => s.levitation.on);

  const sliderNames = ["P", "I", "D"];

  const [sliders, setSliders] = React.useState([
    { value: [0], min: 0, max: 1, step: 0.00001 },
    { value: [0], min: 0, max: 1, step: 0.00001 },
    { value: [0], min: 0, max: 1, step: 0.00001 },
  ]);

  const updateSlider = (index: number, newProps: Partial<typeof sliders[0]>) => {
    setSliders((prev) =>
      prev.map((s, i) =>
        i === index ? { ...s, ...newProps } : s
      )
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
    <ControlCard
      title="LEVITATION"
      statusLabel={levitating ? "ON" : "OFF"}
      statusOn={levitating}
    >
      {/* Buttons */}
      <div className="flex gap-3">
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
      <div className="space-y-8 mt-6">
        {sliders.map((slider, index) => (
          <div key={index} className="space-y-4 border-b border-gray-800 pb-6">

            <div className="text-xl font-semibold text-[#00ffcc] tracking-widest">
              {sliderNames[index]}
            </div>

            {/* Min / Max / Step */}
            <div className="flex gap-6 flex-wrap items-center">

              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-400">Min</label>
                <input
                  type="number"
                  step="0.00001"
                  value={slider.min}
                  disabled={levitating}
                  onChange={(e) =>
                    updateSlider(index, { min: Number(e.target.value) })
                  }
                  className="bg-black border border-[#00ffcc] rounded px-2 py-1 w-24 text-[#00ffcc]"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-400">Max</label>
                <input
                  type="number"
                  step="0.00001"
                  value={slider.max}
                  disabled={levitating}
                  onChange={(e) =>
                    updateSlider(index, { max: Number(e.target.value) })
                  }
                  className="bg-black border border-[#00ffcc] rounded px-2 py-1 w-24 text-[#00ffcc]"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-400">Step</label>
                <input
                  type="number"
                  step="0.00001"
                  value={slider.step}
                  disabled={levitating}
                  onChange={(e) =>
                    updateSlider(index, { step: Number(e.target.value) })
                  }
                  className="bg-black border border-[#00ffcc] rounded px-2 py-1 w-28 text-[#00ffcc]"
                />
              </div>

              {/* Value Input */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Value:</span>
              <input
                type="number"
                step={slider.step}
                min={slider.min}
                max={slider.max}
                value={slider.value[0]}
                disabled={levitating}
                onChange={(e) =>
                  updateValue(index, Number(e.target.value))
                }
                className="bg-black border border-[#00ffcc] rounded px-3 py-1 w-32 text-[#00ffcc] font-mono focus:outline-none focus:ring-1 focus:ring-[#00ffcc]"
              />
            </div>

            </div>

            {/* Slider */}
            <Slider
              value={slider.value}
              onValueChange={(val) => updateValue(index, val[0])}
              min={slider.min}
              max={slider.max}
              step={slider.step}
              disabled={levitating}
              className={`
                relative flex w-full touch-none select-none items-center
                **:[[role=slider]]:h-5
                **:[[role=slider]]:w-5
                **:[[role=slider]]:bg-[#00ffcc]
                **:[[role=slider]]:border-2
                **:[[role=slider]]:border-[#00ffcc]
                **:[[role=slider]]:shadow-[0_0_12px_#00ffcc]
                [&_.relative]:bg-gray-900
                [&_[data-orientation=horizontal]>span:first-child]:bg-[#00ffcc]
                disabled:opacity-40
              `}
            />

            

          </div>
        ))}
      </div>
    </ControlCard>
  );
}