type Level = "debug" | "info" | "warn" | "error";

const LEVELS: Record<Level, number> = { debug: 0, info: 1, warn: 2, error: 3 };

function getMinLevel(): Level {
  const env = process.env["LOG_LEVEL"] ?? "info";
  return (["debug", "info", "warn", "error"].includes(env) ? env : "info") as Level;
}

function format(level: Level, ns: string, msg: string, meta?: unknown): string {
  const ts = new Date().toISOString();
  const m = meta ? " " + JSON.stringify(meta) : "";
  return `${ts} [${level.toUpperCase().padEnd(5)}] [${ns}] ${msg}${m}`;
}

export function createLogger(ns: string) {
  const min = LEVELS[getMinLevel()];
  return {
    debug: (msg: string, meta?: unknown) => { if (LEVELS.debug >= min) console.debug(format("debug", ns, msg, meta)); },
    info:  (msg: string, meta?: unknown) => { if (LEVELS.info  >= min) console.info(format("info",  ns, msg, meta)); },
    warn:  (msg: string, meta?: unknown) => { if (LEVELS.warn  >= min) console.warn(format("warn",  ns, msg, meta)); },
    error: (msg: string, meta?: unknown) => { if (LEVELS.error >= min) console.error(format("error", ns, msg, meta)); },
  };
}
