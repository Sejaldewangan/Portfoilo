import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center">
      <p className="caption mb-4" style={{ color: "var(--accent-primary)" }}>
        404
      </p>
      <h1 className="display-l mb-6">This page wandered off.</h1>
      <p className="mb-10 max-w-[40ch]" style={{ color: "var(--text-mid)" }}>
        The thing you&apos;re looking for doesn&apos;t exist — or never did.
      </p>
      <Link
        href="/"
        className="rounded-full px-7 py-3 font-semibold"
        style={{ background: "var(--accent-primary)", color: "var(--bg-void)" }}
      >
        Back home
      </Link>
    </main>
  );
}
