import ActionButton from "@/components/ActionButton";

interface Props {
  connected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export default function ConnectionPanel({
  connected,
  onConnect,
  onDisconnect,
}: Props) {
  return (
    <div className="p-4 border border-[#00ffcc] rounded">
      <div className="mb-3 font-bold text-white">
        WebSocket:{" "}
        <span className={connected ? "text-lime-400" : "text-red-500"}>
          {connected ? "CONNECTED" : "DISCONNECTED"}
        </span>
      </div>

      <div className="flex gap-3">
        <ActionButton
          label="CONNECT"
          color="green"
          disabled={connected}
          onClick={onConnect}
        />

        <ActionButton
          label="DISCONNECT"
          color="red"
          disabled={!connected}
          onClick={onDisconnect}
        />
      </div>
    </div>
  );
}
