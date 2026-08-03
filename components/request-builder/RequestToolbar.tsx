"use client";

type RequestToolbarProps = {
  method: string;
  url: string;
  onMethodChange: (value: string) => void;
  onUrlChange: (value: string) => void;
  onSend: () => void;
};

export default function RequestToolbar({
  method,
  url,
  onMethodChange,
  onUrlChange,
  onSend,
}: RequestToolbarProps) {
  return (
    <div className="flex gap-3">
      <select
        value={method}
        onChange={(e) => onMethodChange(e.target.value)}
        className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2"
      >
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
        <option>DELETE</option>
      </select>

      <input
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        placeholder="https://api.example.com"
        className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 outline-none"
      />

      <button
        onClick={onSend}
        className="rounded-lg bg-blue-600 px-6 py-2 font-medium hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
}