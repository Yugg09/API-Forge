"use client";

import { Textarea } from "@/components/ui/textarea";

type BodyEditorProps = {
  body: string;
  onBodyChange: (value: string) => void;
};

export default function BodyEditor({ body, onBodyChange }: BodyEditorProps) {
  return (
    <Textarea
      value={body}
      onChange={(e) => onBodyChange(e.target.value)}
      placeholder={`{
  "name": "example"
}`}
      className="min-h-56 font-mono text-sm leading-relaxed"
    />
  );
}
