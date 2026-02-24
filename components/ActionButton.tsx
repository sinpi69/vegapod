interface ActionButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  color: "blue" | "yellow" | "red" | "green";
}

const colorMap = {
  blue: "border-blue-500 text-blue-400 hover:bg-blue-500",
  yellow: "border-yellow-500 text-yellow-400 hover:bg-yellow-500",
  red: "border-red-500 text-red-400 hover:bg-red-500",
  green: "border-green-500 text-green-400 hover:bg-green-500",
};

export default function ActionButton({
  label,
  onClick,
  disabled,
  color,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-5 py-2 rounded border
        bg-[#111]
        active:scale-95 transition
        disabled:opacity-40 disabled:cursor-not-allowed
        ${colorMap[color]}
      `}
    >
      {label}
    </button>
  );
}
