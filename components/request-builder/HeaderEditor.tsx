"use client";

type Header = {
  key: string;
  value: string;
};

type HeaderEditorProps = {
  headers: Header[];
  onHeaderChange: (
    index: number,
    field: "key" | "value",
    value: string
  ) => void;
  onAddHeader: () => void;
  onRemoveHeader: (index: number) => void;
};

export default function HeaderEditor({
  headers,
  onHeaderChange,
  onAddHeader,
  onRemoveHeader,
}: HeaderEditorProps) {
  return (
    <div className="mt-6">
      <h3 className="mb-3 font-medium">Headers</h3>

      {headers.map((header, index) => (
        <div
          key={index}
          className="mb-3 flex gap-3"
        >
          <input
            type="text"
            placeholder="Key"
            value={header.key}
            onChange={(e) =>
              onHeaderChange(
                index,
                "key",
                e.target.value
              )
            }
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2"
          />

          <input
            type="text"
            placeholder="Value"
            value={header.value}
            onChange={(e) =>
              onHeaderChange(
                index,
                "value",
                e.target.value
              )
            }
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2"
          />

          <button
            onClick={() => onRemoveHeader(index)}
            className="rounded-lg border border-red-700 px-3 py-2 text-red-500 hover:bg-red-900/20"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        onClick={onAddHeader}
        className="mt-2 rounded-lg border border-zinc-700 px-4 py-2 hover:bg-zinc-800"
      >
        + Add Header
      </button>
    </div>
  );
}