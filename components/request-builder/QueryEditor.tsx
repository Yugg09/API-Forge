"use client";

import KeyValueEditor from "@/components/ui/key-value-editor";

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

export default function QueryEditor(props: QueryEditorProps) {
  return (
    <KeyValueEditor
      title="Query Parameters"
      items={props.queryParams}
      onItemChange={props.onQueryParamChange}
      onAddItem={props.onAddQueryParam}
      onRemoveItem={props.onRemoveQueryParam}
      addLabel="Add Parameter"
    />
  );
}
