"use client";

type PathVariable = {
  key: string;
  value: string;
};

type PathVariableEditorProps = {
  pathVariables: PathVariable[];
  onPathVariableChange: (
    index: number,
    field: "key" | "value",
    value: string
  ) => void;
  onAddPathVariable: () => void;
  onRemovePathVariable: (index: number) => void;
};

export default function PathVariableEditor({
  pathVariables,
  onPathVariableChange,
  onAddPathVariable,
  onRemovePathVariable,
}: PathVariableEditorProps) {
  return (
    <div className="mt-6">
      <h3 className="mb-3 font-medium">Path Variables</h3>

      {pathVariables.map((variable, index) => (
        <div key={index} className="mb-3 flex gap-3">
          <input
            type="text"
            placeholder="Key"
            value={variable.key}
            onChange={(e) =>
              onPathVariableChange(index, "key", e.target.value)
            }
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2"
          />

          <input
            type="text"
            placeholder="Value"
            value={variable.value}
            onChange={(e) =>
              onPathVariableChange(index, "value", e.target.value)
            }
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2"
          />

          <button
            onClick={() => onRemovePathVariable(index)}
            className="rounded-lg border border-red-700 px-3 py-2 text-red-500 hover:bg-red-900/20"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        onClick={onAddPathVariable}
        className="mt-2 rounded-lg border border-zinc-700 px-4 py-2 hover:bg-zinc-800"
      >
        + Add Path Variable
      </button>
    </div>
  );
}