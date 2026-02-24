interface Props {
  telemetry: string[];
  title?: string; // 🔥 reusable for Cooling / Levitation
}

export default function TelemetryPanel({
  telemetry,
  title = "TELEMETRY",
}: Props) {
  return (
    <div className="border border-[#00ffcc] rounded p-4">
      <div className="mb-3 text-sm font-bold text-white">
        {title}
      </div>

      <div className="grid grid-cols-5 gap-0.5">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="bg-[#1a1a1a] p-0.75 border border-[#222]"
          >
            <div className="text-[10px] text-gray-400">
              Temp {i + 1} (°C)
            </div>
            <div className="text-sm">
              {telemetry[i] ?? "--"}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-0.5">
        <div className="bg-[#1a1a1a] p-0.75 border border-[#222] w-40">
          <div className="text-[10px] text-gray-400 text-center">
            Flow Rate (L/min)
          </div>
          <div className="text-sm text-center">
            {telemetry[20] ?? "--"}
          </div>
        </div>
      </div>
    </div>
  );
}
