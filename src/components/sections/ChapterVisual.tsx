"use client";

/** Pure-CSS visual panels for the scroll cinematic — no image assets needed. */
export function ChapterVisual({
  index,
  label,
}: {
  index: number;
  label: string;
}) {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border"
      style={{
        background: "var(--bg-surface)",
        borderColor: "var(--border-subtle)",
        boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
      }}
    >
      {/* window chrome */}
      <div
        className="flex items-center gap-2 border-b px-4 py-3"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
        <span className="caption ml-3">{label}</span>
      </div>

      <div className="p-6">{renderBody(index)}</div>
    </div>
  );
}

function renderBody(i: number) {
  switch (i) {
    case 0: // terminal
      return (
        <pre
          className="font-mono text-xs leading-6"
          style={{ color: "var(--text-mid)" }}
        >
          <span style={{ color: "var(--accent-primary)" }}>$</span> git commit -m
          &quot;ship it&quot;{"\n"}
          <span style={{ color: "var(--text-dim)" }}>
            [main 9f3a2c1] ship it
          </span>
          {"\n"}
          <span style={{ color: "var(--text-dim)" }}>
            {" "}
            14 files changed, 892 insertions(+)
          </span>
          {"\n\n"}
          <span style={{ color: "var(--accent-primary)" }}>$</span> npm run build
          {"\n"}
          <span style={{ color: "var(--text-dim)" }}>
            ✓ Compiled successfully in 1.2s
          </span>
          <span className="anim-caret" style={{ color: "var(--accent-primary)" }}>
            _
          </span>
        </pre>
      );
    case 1: // UI mock
      return (
        <div className="space-y-3">
          <div
            className="h-3 w-1/3 rounded"
            style={{ background: "var(--accent-primary)" }}
          />
          <div className="h-2 w-2/3 rounded" style={{ background: "var(--bg-elevated)" }} />
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[0, 1, 2].map((k) => (
              <div
                key={k}
                className="aspect-square rounded-lg border"
                style={{
                  background: "var(--bg-elevated)",
                  borderColor: "var(--border-subtle)",
                }}
              />
            ))}
          </div>
        </div>
      );
    case 2: // lighthouse
      return (
        <div className="grid grid-cols-4 gap-3">
          {["Perf", "A11y", "Best", "SEO"].map((m) => (
            <div key={m} className="flex flex-col items-center gap-2">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full border-2 font-sans font-bold"
                style={{
                  borderColor: "var(--accent-primary)",
                  color: "var(--accent-primary)",
                }}
              >
                100
              </div>
              <span className="caption">{m}</span>
            </div>
          ))}
        </div>
      );
    case 3: // architecture
      return (
        <div className="flex flex-col items-center gap-3 text-center">
          <Box label="React · Next.js" accent />
          <Line />
          <div className="flex gap-3">
            <Box label="Node API" />
            <Box label="Redis" />
          </div>
          <Line />
          <Box label="Postgres · AWS" />
        </div>
      );
    default: // projects
      return (
        <div
          className="rounded-lg border p-4"
          style={{
            background: "var(--bg-elevated)",
            borderColor: "var(--border-active)",
          }}
        >
          <p className="caption" style={{ color: "var(--accent-primary)" }}>
            Featured · 01
          </p>
          <p className="mt-2 font-sans text-lg font-bold text-[var(--text-bright)]">
            Auction Engine
          </p>
          <p className="mt-1 text-xs" style={{ color: "var(--text-mid)" }}>
            2k concurrent bids · &lt;50ms latency
          </p>
        </div>
      );
  }
}

function Box({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <div
      className="rounded-md border px-4 py-2 font-mono text-xs"
      style={{
        background: "var(--bg-elevated)",
        borderColor: accent ? "var(--border-active)" : "var(--border-subtle)",
        color: accent ? "var(--accent-primary)" : "var(--text-mid)",
      }}
    >
      {label}
    </div>
  );
}

function Line() {
  return <div className="h-4 w-px" style={{ background: "var(--border-subtle)" }} />;
}
