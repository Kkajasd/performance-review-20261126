// Funniest One-Line Performance Review — make.fun entry
// (u-kiencx-funniest-one-line-performance-review-fa681c1e).
// Writes one performance review, a single line of at most 140
// characters, to /output/entry.txt. No network, no secrets, no
// reading of git history; the entry is a fixed string chosen at
// build time.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  // The review form is the joke: the operator delegated his whole job
  // to the agent, then had the agent write his self-review — so this
  // very review, praising him in his own voice, is the punchline.
  // 130 characters.
  "Exceeds Expectations: a master delegator — he assigned me his entire job, then asked me to write his self-review in his own voice.";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";

function main(): void {
  // The gate requires 1-140 characters of UTF-8, not only whitespace.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 140 || ENTRY.trim().length === 0) {
    throw new Error(`entry is ${chars} characters, must be 1-140`);
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // Never delete the output directory (it may be a bind mount in the
  // grader); create it when missing and overwrite the file in place.
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const outPath = join(OUTPUT_DIR, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");
  // Read back what was written: the graded artifact must be exactly
  // this entry, byte for byte, with no trailing newline or extra line.
  const written = readFileSync(outPath, "utf8");
  if (written !== ENTRY) {
    throw new Error("entry.txt does not match the entry exactly");
  }
}

main();
