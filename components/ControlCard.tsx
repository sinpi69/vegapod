interface ControlCardProps {
  title: string;
  statusLabel: string;
  statusOn: boolean;
  children: React.ReactNode;
}

export default function ControlCard({
  title,
  statusLabel,
  statusOn,
  children,
}: ControlCardProps) {
  return (
    <div className="flex-1 p-4 border border-[#00ffcc] rounded">
      <div className="mb-2 font-bold text-white">
        {title}:{" "}
        <span className={statusOn ? "text-lime-400" : "text-red-500"}>
          {statusLabel}
        </span>
      </div>
      {children}
    </div>
  );
}
