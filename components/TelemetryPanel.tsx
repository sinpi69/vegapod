interface Props {
  telemetry: string[];
  title?: string;
}

export default function TelemetryPanel({
  telemetry,
  title = "TELEMETRY",
}: Props) {
  return (
    <div className="bg-black border border-[#00ffcc]/40 rounded-xl p-5 shadow-md">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold tracking-widest text-[#00ffcc]">
          {title}
        </div>
        <div className="text-xs text-gray-400 font-mono">
          {telemetry.length >= 21 ? "LIVE DATA" : "NO DATA"}
        </div>
      </div>

      {/* 20 Temperature Grid */}
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 20 }, (_, i) => (
          <TelemetryCell
            key={i}
            label={`T${i + 1}`}
            value={telemetry[i]}
          />
        ))}
      </div>

      {/* Flow Rate */}
      <div className="mt-4">
        <div className="bg-[#111] p-3 rounded border border-[#222] text-center">
          <div className="text-xs text-gray-400 mb-1">
            FLOW RATE (L/min)
          </div>
          <div className="text-lg font-bold text-[#00ffcc] font-mono">
            {telemetry[20] ?? "--"}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Telemetry Cell ---------- */

function TelemetryCell({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  const hasValue = value !== undefined;

  return (
    <div className="bg-[#111] p-2 rounded border border-[#222] text-center">
      <div className="text-[10px] text-gray-500">{label}</div>
      <div
        className={`text-sm font-mono ${
          hasValue ? "text-[#00ffcc]" : "text-gray-600"
        }`}
      >
        {hasValue ? value : "--"}
      </div>
    </div>
  );
}