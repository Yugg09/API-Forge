import AppLayout from "@/components/layout/AppLayout";

export default function Home() {
  return (
    <AppLayout>
      <div className="flex h-full items-center justify-center">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-12 text-center">
          <h1 className="mb-3 text-4xl font-bold">
            Welcome to API Forge 🚀
          </h1>

          <p className="text-zinc-400">
            Start building and testing APIs.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}