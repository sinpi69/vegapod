interface ActionButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  color: "blue" | "yellow" | "red" | "green";
}

const colorMap = {
  blue: {
    border: "border-blue-500/40",
    text: "text-blue-400",
    glow: "hover:shadow-[0_0_12px_rgba(59,130,246,0.4)]",
    hoverBg: "hover:bg-blue-500/10",
  },
  yellow: {
    border: "border-yellow-500/40",
    text: "text-yellow-400",
    glow: "hover:shadow-[0_0_12px_rgba(234,179,8,0.4)]",
    hoverBg: "hover:bg-yellow-500/10",
  },
  red: {
    border: "border-red-500/40",
    text: "text-red-400",
    glow: "hover:shadow-[0_0_12px_rgba(239,68,68,0.4)]",
    hoverBg: "hover:bg-red-500/10",
  },
  green: {
    border: "border-green-500/40",
    text: "text-green-400",
    glow: "hover:shadow-[0_0_12px_rgba(34,197,94,0.4)]",
    hoverBg: "hover:bg-green-500/10",
  },
};

export default function ActionButton({
  label,
  onClick,
  disabled,
  color,
}: ActionButtonProps) {
  const style = colorMap[color];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-1.5
        text-xs tracking-wider font-mono
        rounded-md border
        bg-black
        transition-all duration-200
        active:scale-95
        disabled:opacity-30 disabled:cursor-not-allowed

        ${style.border}
        ${style.text}
        ${style.hoverBg}
        ${style.glow}
      `}
    >
      {label}
    </button>
  );
}