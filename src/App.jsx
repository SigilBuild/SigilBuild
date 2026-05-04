// SIGIL — landing surface (single-file React component, Tailwind utility classes only)
import React from "react";
import { Github, ArrowUpRight, Check, X, Terminal, ChevronRight, Circle } from "lucide-react";

export default function SigilLanding() {
  const navAnchors = [
    { label: "CONSOLE", href: "#console" },
    { label: "DOCTRINE", href: "#doctrine" },
    { label: "LOOP", href: "#loop" },
    { label: "DECISION", href: "#decision" },
    { label: "LAUNCH", href: "#launch" },
  ];

  const heroBars = [
    { w: "w-40", o: "opacity-30", ml: "ml-0", d: "0ms" },
    { w: "w-56", o: "opacity-60", ml: "ml-0", d: "120ms" },
    { w: "w-32", o: "opacity-20", ml: "ml-4", d: "220ms" },
    { w: "w-64", o: "opacity-70", ml: "ml-4", d: "340ms" },
    { w: "w-48", o: "opacity-40", ml: "ml-8", d: "460ms" },
    { w: "w-20", o: "opacity-25", ml: "ml-8", d: "580ms" },
    { w: "w-56", o: "opacity-80", ml: "ml-12", d: "700ms" },
    { w: "w-40", o: "opacity-50", ml: "ml-12", d: "820ms" },
    { w: "w-32", o: "opacity-30", ml: "ml-8", d: "940ms" },
    { w: "w-64", o: "opacity-70", ml: "ml-4", d: "1060ms" },
    { w: "w-48", o: "opacity-50", ml: "ml-4", d: "1180ms" },
    { w: "w-12", o: "opacity-20", ml: "ml-0", d: "1300ms" },
    { w: "w-56", o: "opacity-60", ml: "ml-0", d: "1420ms" },
    { w: "w-40", o: "opacity-40", ml: "ml-4", d: "1540ms" },
    { w: "w-32", o: "opacity-30", ml: "ml-8", d: "1660ms" },
    { w: "w-64", o: "opacity-70", ml: "ml-12", d: "1780ms" },
    { w: "w-48", o: "opacity-50", ml: "ml-12", d: "1900ms" },
    { w: "w-20", o: "opacity-25", ml: "ml-8", d: "2020ms" },
  ];

  const heroFiles = [
    { name: "lib.rs", d: "200ms" },
    { name: "Cargo.toml", d: "600ms" },
    { name: "Anchor.toml", d: "1000ms" },
    { name: "idl/program.json", d: "1400ms" },
  ];

  const designStages = [
    { tag: "TEMPLATE", body: "staking", done: true },
    { tag: "ACCOUNTS", body: "4 structs designed", done: true, sub: "StakeAccount, RewardPool, ConfigPDA, UserPosition" },
    { tag: "INSTRUCTIONS", body: "6 handlers defined", done: true, sub: "initialize, stake, unstake, claim_rewards, update_config, close" },
    { tag: "VALIDATION", body: "running...", done: false },
  ];

  const emitFiles = [
    { name: "lib.rs", size: "14.2 KB" },
    { name: "instructions/", size: "6 files" },
    { name: "state.rs", size: "3.1 KB" },
    { name: "errors.rs", size: "1.4 KB" },
    { name: "Cargo.toml", size: "412 B" },
    { name: "Anchor.toml", size: "287 B" },
    { name: "idl/staking.json", size: "8.7 KB" },
  ];

  const validationLog = [
    "Account schema: 4 structs validated, total space 1184 bytes, within rent limits.",
    "Signer constraints: 6 instructions, all required signers explicit.",
    "PDA derivation: 3 PDAs, seeds resolve consistently across instructions.",
    "Cargo deps: anchor-lang ^0.31, anchor-spl ^0.31, no version conflicts.",
    "Cross-check: instruction account requirements match struct definitions.",
    "EMIT: ready. No blocking warnings.",
  ];

  const doctrine = [
    { n: "01", title: "Design before emit.", body: "Sigil computes the program's full design first. No file is written until the design validates." },
    { n: "02", title: "Templates are starting points, not endings.", body: "A template is a known-good shape. Sigil specializes it; nothing ships unmodified." },
    { n: "03", title: "The validator says no.", body: "If the design has account-safety holes or compile-time conflicts, Sigil refuses to write the project." },
    { n: "04", title: "The output compiles.", body: "Every generated project opens in any Anchor toolchain and builds. No edits required to reach a build artifact." },
  ];

  const loop = [
    { n: "01", title: "Request", body: "Plain English: what the program does, who can call it, what state it stores." },
    { n: "02", title: "Template", body: "Closest base shape selected from staking, vault, token, NFT, governance, custom." },
    { n: "03", title: "Accounts", body: "Typed account structs with exact space, PDA seeds, ownership." },
    { n: "04", title: "Instructions", body: "Handlers with args, account requirements, error codes." },
    { n: "05", title: "Validate", body: "Schema, signer, PDA, dependency checks before any file is written." },
    { n: "06", title: "Emit", body: "Anchor project: lib.rs, Cargo.toml, Anchor.toml, IDL, local config." },
  ];

  const ready = [
    "Schema validates clean",
    "Signers consistent across instructions",
    "PDA seeds resolve",
    "Cargo deps align with Anchor version",
    "Account space within rent limits",
    "Instructions internally consistent",
  ];

  const refused = [
    "Account size overflows rent floor",
    "Signer/PDA conflict",
    "Anchor version mismatch in deps",
    "Required field missing from request",
    "Instruction references undefined account",
    "Template inputs ambiguous on inspection",
  ];

  const principles = [
    { n: "01", title: "The design is the product.", body: "Code is just the design serialized. If the design is wrong, the code is wrong." },
    { n: "02", title: "A refused build is a feature.", body: "The validator stops what would ship broken. Refusal is the product working." },
    { n: "03", title: "The output earns the operator.", body: "Sigil ships projects that compile. The reader's first action is `anchor build`, not editing files." },
    { n: "04", title: "Templates change. Discipline does not.", body: "New templates ship over time. The validation gate stays." },
  ];

  return (
    <div className="min-h-screen w-full bg-black text-neutral-200 antialiased scroll-smooth selection:bg-amber-500/30">
      {/* ===== STICKY TOP NAV ===== */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-900 bg-black/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
          <a href="#top" className="font-mono text-sm font-semibold tracking-[0.25em] text-white">
            SIGIL
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {navAnchors.map((a) => (
              <a
                key={a.label}
                href={a.href}
                className="font-mono text-[11px] tracking-[0.2em] text-neutral-400 transition-colors hover:text-white"
              >
                {a.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 md:gap-3">
            <span className="hidden items-center gap-1.5 rounded-sm border border-neutral-800 bg-neutral-950 px-2 py-1 font-mono text-[10px] tracking-[0.18em] text-neutral-400 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              CA:PENDING
            </span>
            <a
              href="https://github.com/SigilBuild/SigilBuild"
              target="_blank"
              rel="noreferrer"
              className="rounded-sm border border-neutral-800 p-1.5 text-neutral-400 transition-colors hover:border-neutral-700 hover:text-white"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="#launch"
              className="rounded-sm bg-amber-500 px-3 py-1.5 font-mono text-[11px] font-semibold tracking-[0.18em] text-black transition-colors hover:bg-amber-400"
            >
              Launch Sigil
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden border-b border-neutral-900">
          <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(ellipse_at_top_left,rgba(245,158,11,0.08),transparent_55%)]" />
          <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 py-24 md:px-6 md:py-32 lg:grid-cols-12 lg:gap-12">
            {/* Left column */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-sm border border-amber-500/40 bg-amber-500/5 px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] text-amber-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  PRODUCTION ANCHOR GENERATOR
                </span>
                <span className="inline-flex items-center gap-2 rounded-sm border border-neutral-800 bg-neutral-950 px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] text-neutral-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />
                  6 TEMPLATES &middot; 4-STAGE DESIGN LOOP
                </span>
              </div>

              <h1 className="mt-8 font-sans text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
                <span className="block">Describe a Solana program.</span>
                <span className="block text-white/[0.35]">Sigil writes the code.</span>
              </h1>

              <p className="mt-8 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
                Plain English in. A validated Anchor project out. Rust source, IDL, Cargo.toml, Anchor.toml — every file ready for{" "}
                <span className="font-mono text-neutral-200">anchor build</span>. No manual scaffolding.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#console"
                  className="inline-flex items-center gap-2 rounded-sm bg-amber-500 px-5 py-3 font-mono text-xs font-semibold tracking-[0.18em] text-black transition-colors hover:bg-amber-400"
                >
                  Try a generation
                  <ChevronRight className="h-4 w-4" />
                </a>
                <a
                  href="#doctrine"
                  className="inline-flex items-center gap-2 rounded-sm border border-neutral-700 px-5 py-3 font-mono text-xs font-semibold tracking-[0.18em] text-neutral-200 transition-colors hover:border-neutral-500 hover:text-white"
                >
                  Read the architecture <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right column — animated codegen panel */}
            <div className="lg:col-span-5">
              <div className="rounded-md border border-neutral-800 bg-neutral-950/80 p-5">
                <div className="mb-4 flex items-center justify-between border-b border-neutral-900 pb-3">
                  <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-neutral-500">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                    GENERATING &middot; lib.rs
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.18em] text-neutral-600">stage 04 / emit</div>
                </div>

                <div className="space-y-1.5">
                  {heroBars.map((b, i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-sm bg-amber-500 ${b.o} ${b.w} ${b.ml} animate-pulse`}
                      style={{ animationDelay: b.d, animationDuration: "2.4s" }}
                    />
                  ))}
                </div>

                <div className="mt-5 space-y-1.5 border-t border-neutral-900 pt-4">
                  {heroFiles.map((f) => (
                    <div
                      key={f.name}
                      className="flex items-center gap-2 font-mono text-[11px] text-neutral-400 animate-pulse"
                      style={{ animationDelay: f.d, animationDuration: "2.4s" }}
                    >
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{f.name}</span>
                      <span className="text-emerald-400">✓</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 px-1 font-mono text-[10px] tracking-[0.18em] text-neutral-500">
                live generation &middot; 4 files emitted &middot; 0 manual edits
              </div>
            </div>
          </div>
        </section>

        {/* ===== LIVE GENERATION CONSOLE ===== */}
        <section id="console" className="border-b border-neutral-900">
          <div className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-28">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <div className="font-mono text-[11px] tracking-[0.25em] text-amber-400">CONSOLE</div>
                <h2 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  Live generation, gated end to end.
                </h2>
              </div>
            </div>

            <div className="overflow-hidden rounded-md border border-neutral-800 bg-neutral-950/60">
              {/* Top status bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-900 bg-black/60 px-5 py-3">
                <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.18em]">
                  <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="text-white">SIGIL</span>
                  <span className="text-neutral-600">·</span>
                  <span className="text-cyan-300">LIVE GENERATION</span>
                  <span className="ml-2 inline-flex items-center gap-1.5 rounded-sm border border-cyan-500/30 bg-cyan-500/5 px-2 py-0.5 text-[10px] text-cyan-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" /> ONLINE
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[10px] tracking-[0.16em] text-neutral-500">
                  <span>MODE <span className="text-amber-400">PRODUCTION</span></span>
                  <span>ANCHOR <span className="text-neutral-300">v0.31</span></span>
                  <span>UPTIME <span className="text-neutral-300">31d 04h</span></span>
                  <span>LAST BUILD <span className="text-neutral-300">12s ago</span></span>
                  <span>SUCCESS <span className="text-emerald-400">99.4%</span></span>
                </div>
              </div>

              {/* REQUEST panel */}
              <div className="border-b border-neutral-900 px-5 py-5">
                <div className="mb-2 font-mono text-[10px] tracking-[0.25em] text-cyan-400">REQUEST</div>
                <div className="overflow-x-auto">
                  <pre className="font-mono text-[12px] leading-relaxed text-neutral-200 md:text-sm">
<span className="text-neutral-500">$</span> <span className="text-amber-400">sigil</span> generate <span className="text-emerald-300">"Token staking program with 7-day lockup and 15% APY"</span>
                  </pre>
                </div>
              </div>

              {/* DESIGN + EMIT */}
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* DESIGN */}
                <div className="border-b border-neutral-900 px-5 py-5 lg:border-b-0 lg:border-r">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="font-mono text-[10px] tracking-[0.25em] text-cyan-400">DESIGN</div>
                    <div className="font-mono text-[10px] tracking-[0.18em] text-neutral-500">4-stage loop</div>
                  </div>
                  <ul className="space-y-3">
                    {designStages.map((s) => (
                      <li key={s.tag} className="rounded-sm border border-neutral-900 bg-black/40 p-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] tracking-[0.2em] text-amber-400">{s.tag}</span>
                            <span className="text-neutral-600">—</span>
                            <span className="font-mono text-xs text-neutral-200">{s.body}</span>
                          </div>
                          {s.done ? (
                            <Check className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] text-cyan-300">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                              RUNNING
                            </span>
                          )}
                        </div>
                        {s.sub && (
                          <div className="mt-2 font-mono text-[10.5px] leading-relaxed text-neutral-500">{s.sub}</div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* EMIT */}
                <div className="px-5 py-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="font-mono text-[10px] tracking-[0.25em] text-cyan-400">EMIT</div>
                    <div className="font-mono text-[10px] tracking-[0.18em] text-neutral-500">anchor project</div>
                  </div>
                  <div className="overflow-x-auto rounded-sm border border-neutral-900 bg-black/40">
                    <table className="w-full font-mono text-[12px]">
                      <tbody>
                        {emitFiles.map((f, i) => (
                          <tr key={f.name} className={i % 2 === 0 ? "bg-neutral-950/40" : ""}>
                            <td className="w-6 px-3 py-2 text-neutral-600">{String(i + 1).padStart(2, "0")}</td>
                            <td className="px-2 py-2 text-neutral-200">{f.name}</td>
                            <td className="px-2 py-2 text-right text-neutral-500">{f.size}</td>
                            <td className="w-10 px-3 py-2 text-right">
                              <Check className="ml-auto h-3.5 w-3.5 text-emerald-400" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* VALIDATION LOG */}
              <div className="border-t border-neutral-900 px-5 py-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="font-mono text-[10px] tracking-[0.25em] text-cyan-400">VALIDATION LOG</div>
                  <div className="font-mono text-[10px] tracking-[0.18em] text-neutral-500">6 gates &middot; 0 blockers</div>
                </div>
                <div className="overflow-x-auto rounded-sm border border-neutral-900 bg-black/60">
                  <ul className="divide-y divide-neutral-900 font-mono text-[11.5px] md:text-xs">
                    {validationLog.map((line, i) => (
                      <li key={i} className="flex gap-3 px-4 py-2">
                        <span className="w-6 shrink-0 text-neutral-600">{String(i + 1).padStart(2, "0")}</span>
                        <span className="shrink-0 text-emerald-400">✓</span>
                        <span className="text-neutral-300">{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <p className="mt-6 font-mono text-[11px] tracking-[0.18em] text-neutral-500">
              Live console. Every generation runs the same gates. Files appear when the validator says yes.
            </p>

            {/* 3-stat strip */}
            <div className="mt-10 border-y border-neutral-900">
              <div className="grid grid-cols-1 divide-y divide-neutral-900 md:grid-cols-3 md:divide-x md:divide-y-0">
                {[
                  { n: "6", l: "Base templates" },
                  { n: "4", l: "Design loop stages" },
                  { n: "0", l: "Manual edits required to compile" },
                ].map((s) => (
                  <div key={s.l} className="px-6 py-8">
                    <div className="font-sans text-5xl font-semibold tracking-tight text-white md:text-6xl">{s.n}</div>
                    <div className="mt-2 font-mono text-[11px] tracking-[0.2em] text-neutral-500">{s.l.toUpperCase()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== DOCTRINE ===== */}
        <section id="doctrine" className="border-b border-neutral-900">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-24 md:px-6 md:py-28 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <div className="font-mono text-[11px] tracking-[0.25em] text-amber-400">DOCTRINE</div>
                <h2 className="mt-3 font-sans text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                  Validate before emit, refuse before damage.
                </h2>
                <p className="mt-5 max-w-md text-neutral-400">
                  The doctrine is not a vibe. It is a contract between the agent and the project it is about to write.
                  Each rule is enforced by a gate the operator can read.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-px overflow-hidden rounded-md border border-neutral-900">
                {doctrine.map((d) => (
                  <li key={d.n} className="grid grid-cols-12 gap-6 bg-neutral-950/50 px-6 py-7">
                    <div className="col-span-2 font-mono text-sm tracking-[0.2em] text-amber-400 md:col-span-1">{d.n}</div>
                    <div className="col-span-10 md:col-span-11">
                      <div className="font-sans text-lg font-semibold text-white md:text-xl">{d.title}</div>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base">{d.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ===== LOOP ===== */}
        <section id="loop" className="border-b border-neutral-900">
          <div className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-28">
            <div className="max-w-3xl">
              <div className="font-mono text-[11px] tracking-[0.25em] text-amber-400">LOOP</div>
              <h2 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-white md:text-5xl">
                From request to project, every cycle.
              </h2>
              <p className="mt-5 text-neutral-400">
                Six steps. The same path on every run, whether the request takes one paragraph or twenty.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-neutral-900 md:grid-cols-2 lg:grid-cols-3">
              {loop.map((l) => (
                <div key={l.n} className="group relative bg-neutral-950/60 p-7 transition-colors hover:bg-neutral-950">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs tracking-[0.2em] text-amber-400">{l.n}</span>
                    <div className="h-px flex-1 bg-neutral-900" />
                  </div>
                  <div className="mt-5 font-sans text-xl font-semibold text-white">{l.title}</div>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-400">{l.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== DECISION ===== */}
        <section id="decision" className="border-b border-neutral-900">
          <div className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-28">
            <div className="max-w-3xl">
              <div className="font-mono text-[11px] tracking-[0.25em] text-amber-400">DECISION</div>
              <h2 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-white md:text-5xl">
                What gets emitted — and what the validator stops.
              </h2>
              <p className="mt-5 text-neutral-400">
                A generation either reaches a clean emit or it does not. There is no in-between, no warning-only ship.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* READY */}
              <div className="overflow-hidden rounded-md border border-neutral-800 bg-neutral-950/60">
                <div className="flex items-center justify-between border-b border-neutral-900 px-6 py-4">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    <div className="font-mono text-[11px] tracking-[0.25em] text-amber-400">READY TO EMIT</div>
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.18em] text-neutral-500">6 / 6 PASS</div>
                </div>
                <ul className="divide-y divide-neutral-900">
                  {ready.map((r) => (
                    <li key={r} className="flex items-start gap-3 px-6 py-4">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span className="text-sm text-neutral-200 md:text-base">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* REFUSED */}
              <div className="overflow-hidden rounded-md border border-neutral-800 bg-neutral-950/60">
                <div className="flex items-center justify-between border-b border-neutral-900 px-6 py-4">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    <div className="font-mono text-[11px] tracking-[0.25em] text-cyan-300">REFUSED BEFORE EMIT</div>
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.18em] text-neutral-500">GATE STOPS WRITE</div>
                </div>
                <ul className="divide-y divide-neutral-900">
                  {refused.map((r) => (
                    <li key={r} className="flex items-start gap-3 px-6 py-4">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                      <span className="text-sm text-neutral-300 md:text-base">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PRINCIPLES ===== */}
        <section id="principles" className="border-b border-neutral-900">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-24 md:px-6 md:py-28 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <div className="font-mono text-[11px] tracking-[0.25em] text-amber-400">PRINCIPLES</div>
                <h2 className="mt-3 font-sans text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                  Rules of the build.
                </h2>
                <p className="mt-5 max-w-md text-neutral-400">
                  These do not change between runs, templates, or releases. They are the floor every emitted project stands on.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-px overflow-hidden rounded-md border border-neutral-900">
                {principles.map((p) => (
                  <li key={p.n} className="grid grid-cols-12 gap-6 bg-neutral-950/50 px-6 py-7">
                    <div className="col-span-2 font-mono text-sm tracking-[0.2em] text-amber-400 md:col-span-1">{p.n}</div>
                    <div className="col-span-10 md:col-span-11">
                      <div className="font-sans text-lg font-semibold text-white md:text-xl">{p.title}</div>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ===== LAUNCH ===== */}
        <section id="launch" className="border-b border-neutral-900">
          <div className="mx-auto max-w-4xl px-4 py-28 text-center md:px-6 md:py-36">
            <div className="font-mono text-[11px] tracking-[0.3em] text-amber-400">LAUNCH</div>
            <h2 className="mt-5 font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
              A token for an agent that ships programs that compile.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-neutral-400 md:text-lg">
              Sigil launches on Pump.fun as a fair launch. The contract address is pinned at the top of this page and fills the moment it drops.
            </p>
            <div className="mt-10 flex justify-center">
              <a
                href="https://x.com/SigilBuild"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-amber-500 px-6 py-3.5 font-mono text-xs font-semibold tracking-[0.18em] text-black transition-colors hover:bg-amber-400"
              >
                Follow for the drop: X <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ===== CLOSING CTA ===== */}
        <section className="border-b border-neutral-900">
          <div className="mx-auto max-w-4xl px-4 py-24 text-center md:px-6 md:py-28">
            <h2 className="font-sans text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Solana programs you can verify.
            </h2>
            <p className="mt-5 text-neutral-400 md:text-lg">
              An AI agent that ships Anchor projects on the first try.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href="#launch"
                className="inline-flex items-center gap-2 rounded-sm bg-amber-500 px-5 py-3 font-mono text-xs font-semibold tracking-[0.18em] text-black transition-colors hover:bg-amber-400"
              >
                Launch Sigil <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/SigilBuild/SigilBuild"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-neutral-700 px-5 py-3 font-mono text-xs font-semibold tracking-[0.18em] text-neutral-200 transition-colors hover:border-neutral-500 hover:text-white"
              >
                View on GitHub <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-black">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <div className="font-mono text-[11px] tracking-[0.25em] text-neutral-500">SITE</div>
              <ul className="mt-4 space-y-2 font-mono text-sm">
                <li><a href="#console" className="text-neutral-300 hover:text-white">Console</a></li>
                <li><a href="#doctrine" className="text-neutral-300 hover:text-white">Doctrine</a></li>
                <li><a href="#loop" className="text-neutral-300 hover:text-white">Loop</a></li>
                <li><a href="#decision" className="text-neutral-300 hover:text-white">Decision</a></li>
                <li><a href="#launch" className="text-neutral-300 hover:text-white">Launch</a></li>
              </ul>
            </div>
            <div>
              <div className="font-mono text-[11px] tracking-[0.25em] text-neutral-500">PROJECT</div>
              <ul className="mt-4 space-y-2 font-mono text-sm">
                <li><a href="#" className="text-neutral-300 hover:text-white">Docs</a></li>
                <li><a href="#" className="text-neutral-300 hover:text-white">Status</a></li>
                <li>
                  <a href="https://github.com/SigilBuild/SigilBuild" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-neutral-300 hover:text-white">
                    GitHub <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </li>
                <li>
                  <a href="https://x.com/SigilBuild" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-neutral-300 hover:text-white">
                    X <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-900 pt-6">
            <div className="font-mono text-[11px] tracking-[0.18em] text-neutral-500">
              Sigil <span className="text-neutral-700">|</span> SigilBuild <span className="text-neutral-700">|</span> © 2026
            </div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-neutral-600">v1.0 &middot; production</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
