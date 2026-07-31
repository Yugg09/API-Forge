type ResponsePanelProps = {
    response: string;
  };
  
  export default function ResponsePanel({
    response,
  }: ResponsePanelProps) {
    return (
      <div className="h-full overflow-auto p-5">
        <h2 className="mb-4 text-xl font-semibold">
          Response
        </h2>
  
        <pre className="whitespace-pre-wrap rounded-lg bg-zinc-900 p-4">
          {response || "No Response Yet"}
        </pre>
      </div>
    );
  }