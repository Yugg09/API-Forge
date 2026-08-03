"use client";

type BodyEditorProps = {
  body: string;
  onBodyChange: (value: string) => void;
};

export default function BodyEditor({
  body,
  onBodyChange,
}: BodyEditorProps) {
  return (
    <textarea
      value={body}
      onChange={(e) => onBodyChange(e.target.value)}
      placeholder={`{
  "name": "Yug"
}`}
      className="mt-4 h-64 w-full rounded-lg border border-zinc-700 bg-zinc-900 p-4 font-mono outline-none"
    />
  );
}