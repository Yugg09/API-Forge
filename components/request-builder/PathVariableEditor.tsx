"use client";

import KeyValueEditor from "@/components/ui/key-value-editor";

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

export default function PathVariableEditor(props: PathVariableEditorProps) {
  return (
    <KeyValueEditor
      title="Path Variables"
      items={props.pathVariables}
      onItemChange={props.onPathVariableChange}
      onAddItem={props.onAddPathVariable}
      onRemoveItem={props.onRemovePathVariable}
      keyPlaceholder="Variable"
      addLabel="Add Variable"
    />
  );
}
