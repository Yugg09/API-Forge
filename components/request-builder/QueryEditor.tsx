"use client";

type QueryParam = {
  key: string;
  value: string;
};

type QueryEditorProps = {
  queryParams: QueryParam[];
  onQueryParamChange: (
    index: number,
    field: "key" | "value",
    value: string
  ) => void;
  onAddQueryParam: () => void;
  onRemoveQueryParam: (index: number) => void;
};

export default function QueryEditor({
  queryParams,
  onQueryParamChange,
  onAddQueryParam,
  onRemoveQueryParam,
}: QueryEditorProps) {
  return (
    <div className="mt-6">
      <h3 className="mb-3 font-medium">Query Parameters</h3>

      {queryParams.map((param, index) => (
        <div key={index} className="mb-3 flex gap-3">
          <input
            type="text"
            placeholder="Key"
            value={param.key}
            onChange={(e) =>
              onQueryParamChange(
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
            value={param.value}
            onChange={(e) =>
              onQueryParamChange(
                index,
                "value",
                e.target.value
              )
            }
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2"
          />

          <button
            onClick={() => onRemoveQueryParam(index)}
            className="rounded-lg border border-red-700 px-3 py-2 text-red-500 hover:bg-red-900/20"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        onClick={onAddQueryParam}
        className="mt-2 rounded-lg border border-zinc-700 px-4 py-2 hover:bg-zinc-800"
      >
        + Add Query Param
      </button>
    </div>
  );
}