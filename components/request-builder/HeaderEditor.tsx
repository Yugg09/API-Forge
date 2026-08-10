"use client";

import KeyValueEditor from "@/components/ui/key-value-editor";

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

export default function HeaderEditor(props: HeaderEditorProps) {
  return (
    <KeyValueEditor
      title="Headers"
      items={props.headers}
      onItemChange={props.onHeaderChange}
      onAddItem={props.onAddHeader}
      onRemoveItem={props.onRemoveHeader}
      addLabel="Add Header"
    />
  );
}
