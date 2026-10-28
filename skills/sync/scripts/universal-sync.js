const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const os = require("os");
const { spawnSync } = require("child_process");

// Workspace = the folder that holds your project folders. Set SYNC_WORKSPACE or run from it.
const AETHER_ROOT = path.resolve(process.env.SYNC_WORKSPACE || process.cwd());
const HOME = os.homedir();

// AI Assistant Paths
const AI_PATHS = {
  claude: {
    projects: path.join(HOME, ".claude", "projects"),
    skills: path.join(HOME, ".claude", "skills"),
    transcriptExtension: ".jsonl"
  },
  codex: {
    // Codex CLI/Desktop actually writes rollouts to sessions/YYYY/MM/DD/rollout-*.jsonl,
    // not a `projects` dir (that path was always empty). Corrected 2026-08-09.
    projects: path.join(HOME, ".codex", "sessions"),
    skills: path.join(HOME, ".agents", "skills"),
    skillsExtra: [path.join(HOME, ".codex", "skills")],
    transcriptExtension: ".jsonl"
  },
  grok: {
    // Grok Build stores sessions under sessions/<encoded cwd>/<session id>/,
    // not the legacy projects directory (which is empty on this machine).
    projects: path.join(HOME, ".grok", "sessions"),
    skills: path.join(HOME, ".grok", "skills"),
    transcriptFileName: "chat_history.jsonl"
  },
  devin: {
    projects: path.join(HOME, ".devin", "projects"),
    skills: path.join(HOME, ".devin", "skills"),
    transcriptExtension: ".jsonl"
  },
  antigravity: {
    projects: path.join(HOME, ".gemini", "antigravity", "brain"),
    skills: path.join(HOME, ".gemini", "antigravity", "global_skills"),
    // Chunks duplicate the canonical transcript, so ingest only the full log.
    transcriptFileName: "transcript_full.jsonl"
  },
  kimi: {
    projects: path.join(HOME, ".kimi-code", "user-history"),
    skills: path.join(HOME, ".kimi-code", "skills"),
    transcriptExtension: ".jsonl"
  },
  deepseek: {
    projects: path.join(HOME, ".aider", "history"),
    skills: path.join(HOME, ".agents", "skills"),
    transcriptExtension: ".jsonl"
  }
};

// Universal ledger for tracking imports across all assistants
const UNIVERSAL_LEDGER = path.join(HOME, ".codex", "universal_sync_ledger.json");

function parseArgs() {
  const args = process.argv.slice(2);
  const source = args[0] || "claude";
  const target = args[1] || "devin";
  const since = args[2];
  const date = args[3];
  return { source, target, since, date };
}

function validateAssistant(name) {
  if (!AI_PATHS[name]) {
    throw new Error(`Unknown AI assistant: ${name}. Valid options: ${Object.keys(AI_PATHS).join(", ")}`);
  }
  return AI_PATHS[name];
}

function defaultSinceIso(sourceName, targetName) {
  try {
    const ledger = JSON.parse(fs.readFileSync(UNIVERSAL_LEDGER, "utf8"));
    const latestImport = Math.max(
      0,
      ...(ledger.records || [])
        .filter((record) => record.source_assistant === sourceName && record.target_assistant === targetName)
        .map((record) => Number(record.imported_at) || 0)
    );
    if (latestImport > 0) return new Date(latestImport * 1000).toISOString();
  } catch {
    // First run or missing ledger
  }
  return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
}

const { source, target, since, date } = parseArgs();
const SOURCE_CONFIG = validateAssistant(source);
const TARGET_CONFIG = validateAssistant(target);

const SINCE = new Date(since || defaultSinceIso(source, target));
const NOW = new Date();
const STAMP = NOW.toISOString().replace(/[:.]/g, "-");
const RUN_DATE = date || [
  NOW.getFullYear(),
  String(NOW.getMonth() + 1).padStart(2, "0"),
  String(NOW.getDate()).padStart(2, "0"),
].join("-");
const REPORT_DIR = path.join(AETHER_ROOT, "archive", "sync-logs", RUN_DATE.slice(0, 4), RUN_DATE.slice(5, 7));
fs.mkdirSync(REPORT_DIR, { recursive: true });
const BASE_REPORT_NAME = `UNIVERSAL_SYNC_${source.toUpperCase()}_TO_${target.toUpperCase()}_${RUN_DATE}.md`;
const REPORT_NAME = fs.existsSync(path.join(REPORT_DIR, BASE_REPORT_NAME))
  ? `UNIVERSAL_SYNC_${source.toUpperCase()}_TO_${target.toUpperCase()}_${RUN_DATE}_${NOW.toISOString().slice(11, 23).replace(/[:.]/g, "")}.md`
  : BASE_REPORT_NAME;
const REPORT_RELATIVE_PATH = path.relative(AETHER_ROOT, path.join(REPORT_DIR, REPORT_NAME)).split(path.sep).join("/");

if (Number.isNaN(SINCE.getTime())) {
  throw new Error(`Invalid sync cutoff: ${since}`);
}

function walk(dir, predicate, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, predicate, out);
    else if (!predicate || predicate(full)) out.push(full);
  }
  return out;
}

function normalizeFilePath(file) {
  return `\\\\?\\${file}`;
}

// Chunked synchronous reader. Some Codex transcripts exceed 500 MB (four
// bookbox.ink rollouts on 2026-09-12 were 485 to 617 MB each), which is past
// Node's single-string limit, so nothing here may readFileSync a whole file.
const READ_CHUNK_BYTES = 8 * 1024 * 1024;
function readFileInChunks(file, onChunk) {
  const fd = fs.openSync(file, "r");
  try {
    const buf = Buffer.allocUnsafe(READ_CHUNK_BYTES);
    let n;
    while ((n = fs.readSync(fd, buf, 0, buf.length, null)) > 0) onChunk(buf.subarray(0, n));
  } finally {
    fs.closeSync(fd);
  }
}

function sha256(file) {
  const hash = crypto.createHash("sha256");
  readFileInChunks(file, (chunk) => hash.update(chunk));
  return hash.digest("hex");
}

function epochSeconds(date = new Date()) {
  return Math.floor(date.getTime() / 1000);
}

function fileMtimeNs(file) {
  return Number(fs.statSync(file, { bigint: true }).mtimeNs);
}

// Lines longer than this are tool dumps (file reads, command output), never
// user or assistant messages, so they are skipped instead of parsed; that keeps
// memory bounded on multi-hundred-megabyte transcripts.
const MAX_JSONL_LINE_BYTES = 4 * 1024 * 1024;
const NEWLINE = String.fromCharCode(10);
const CARRIAGE_RETURN = String.fromCharCode(13);
function parseJsonl(file) {
  const events = [];
  const decoder = new (require("string_decoder").StringDecoder)("utf8");
  let carry = "";
  let skipping = false;
  const pushLine = (line) => {
    const trimmed = line.endsWith(CARRIAGE_RETURN) ? line.slice(0, -1) : line;
    if (!trimmed || trimmed.length > MAX_JSONL_LINE_BYTES) return;
    try {
      events.push(JSON.parse(trimmed));
    } catch {
      // JSONL can contain recovery fragments
    }
  };
  const consume = (text, isLast) => {
    let start = 0;
    for (;;) {
      const nl = text.indexOf(NEWLINE, start);
      if (nl === -1) break;
      const line = carry + text.slice(start, nl);
      carry = "";
      start = nl + 1;
      if (skipping) {
        skipping = false;
        continue;
      }
      pushLine(line);
    }
    const rest = text.slice(start);
    if (isLast) {
      if (!skipping) pushLine(carry + rest);
      carry = "";
    } else if (skipping) {
      carry = "";
    } else if (carry.length + rest.length > MAX_JSONL_LINE_BYTES) {
      carry = "";
      skipping = true;
    } else {
      carry += rest;
    }
  };
  readFileInChunks(file, (chunk) => consume(decoder.write(chunk), false));
  consume(decoder.end(), true);
  return events;
}

function contentText(content) {
  if (typeof content === "string") return content;
  if (content && typeof content === "object" && typeof content.text === "string") return content.text;
  if (!Array.isArray(content)) return "";
  return content
    .map((part) => {
      if (typeof part === "string") return part;
      if (part && part.type === "text") return part.text || "";
      if (part && part.type === "tool_use") return `[tool:${part.name}]`;
      return "";
    })
    .filter(Boolean)
    .join("\n");
}

function compact(text, limit = 360) {
  return (text || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function md(text) {
  const value = text || "";
  return value
    .replace(/\r/g, "")
    .replace(/\|/g, "\\|")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function relativeToWorkspace(file) {
  const normalized = file.replaceAll("/", "\\");
  if (normalized.toLowerCase().startsWith(AETHER_ROOT.toLowerCase() + "\\")) {
    return normalized.slice(AETHER_ROOT.length + 1);
  }
  return normalized;
}

// Codex Desktop runs many sessions inside its own linked worktrees at
// ~/.codex/worktrees/<id>/<project>/..., which are git worktrees of the matching
// Workspace project. Map those back to the project so their progress is not dropped
// as "unmapped" (2026-09-11: 18 summon.company sessions in one week were).
const CODEX_WORKTREES_ROOT = path.join(require("os").homedir(), ".codex", "worktrees");

function topProject(cwd) {
  if (!cwd) return "";
  const lower = cwd.toLowerCase();
  if (lower.startsWith(AETHER_ROOT.toLowerCase())) {
    const rel = path.relative(AETHER_ROOT, cwd);
    if (!rel || rel === ".") return ".";
    return rel.split(path.sep)[0];
  }
  if (lower.startsWith(CODEX_WORKTREES_ROOT.toLowerCase() + path.sep)) {
    const parts = path.relative(CODEX_WORKTREES_ROOT, cwd).split(path.sep);
    const candidate = parts[1] || "";
    if (candidate && !candidate.startsWith(".") && fs.existsSync(path.join(AETHER_ROOT, candidate))) {
      return candidate;
    }
  }
  return "";
}

function projectFromPath(file, projectsPath) {
  const first = path.relative(projectsPath, file).split(path.sep)[0].toLowerCase();
  const rootName = [AETHER_ROOT.toLowerCase().replace(/[^a-z0-9]/g, "-")]
    .find((candidate) => first === candidate || first.startsWith(`${candidate}-`));
  if (!rootName) return "";
  if (first === rootName) return ".";
  const prefix = `${rootName}-`;
  if (!first.startsWith(prefix)) return "";
  const suffix = first.slice(prefix.length);
  const projects = fs.readdirSync(AETHER_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => ({
      name: entry.name,
      slug: entry.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    }))
    .sort((a, b) => b.slug.length - a.slug.length);
  const match = projects.find(({ slug }) => suffix === slug || suffix.startsWith(`${slug}-`));
  return match ? match.name : "";
}

// Claude Code (and, until proven otherwise, Grok/Devin/Antigravity) transcript shape:
// flat lines with {cwd, sessionId, timestamp, message:{role, content}}.
function summarizeClaudeStyleSession(events) {
  let cwd = "";
  let sessionId = "";
  let firstUser = "";
  let lastUser = "";
  let lastAssistant = "";
  let lastTimestamp = "";
  let userCount = 0;
  let assistantCount = 0;
  const filesTouched = new Set();
  const toolNames = new Set();

  for (const event of events) {
    if (event.cwd) cwd = event.cwd;
    if (event.sessionId) sessionId = event.sessionId;
    if (event.timestamp) lastTimestamp = event.timestamp;
    const msg = event.message;
    if (msg && msg.role === "user") {
      userCount += 1;
      const text = compact(contentText(msg.content));
      if (text && !firstUser) firstUser = text;
      if (text) lastUser = text;
    }
    if (msg && msg.role === "assistant") {
      assistantCount += 1;
      const text = compact(contentText(msg.content));
      if (text) lastAssistant = text;
      const content = Array.isArray(msg.content) ? msg.content : [];
      for (const part of content) {
        if (part && part.type === "tool_use") {
          toolNames.add(part.name);
          const input = part.input || {};
          for (const key of ["file_path", "path", "notebook_path"]) {
            if (typeof input[key] === "string") filesTouched.add(input[key]);
          }
        }
      }
    }
    if (event.type === "queue-operation" && event.operation === "enqueue" && event.content) {
      const text = compact(event.content);
      if (text && !firstUser) firstUser = text;
      if (text) lastUser = text;
    }
    const result = event.toolUseResult;
    if (result && typeof result.filePath === "string") filesTouched.add(result.filePath);
  }

  return { cwd, sessionId, firstUser, lastUser, lastAssistant, lastTimestamp, userCount, assistantCount, filesTouched, toolNames };
}

// Codex CLI/Desktop rollout shape: every line is {timestamp, type, payload:{...}}.
// cwd lives under session_meta.payload.cwd (and is refreshed by turn_context /
// thread_settings_applied when a thread's working directory changes mid-session).
// User/assistant text rides in event_msg payloads (user_message, agent_message,
// task_complete.last_agent_message), not a top-level `message` field. File edits
// show up as patch_apply_end.payload.changes; tool calls as function_call /
// custom_tool_call / mcp_tool_call_end. Confirmed 2026-08-09 against real rollouts.
function summarizeCodexSession(events) {
  let cwd = "";
  let sessionId = "";
  let firstUser = "";
  let lastUser = "";
  let lastAssistant = "";
  let lastTimestamp = "";
  let userCount = 0;
  let assistantCount = 0;
  const filesTouched = new Set();
  const toolNames = new Set();

  for (const event of events) {
    if (event.timestamp) lastTimestamp = event.timestamp;
    const payload = event.payload || {};

    if (event.type === "session_meta" && payload.cwd) cwd = payload.cwd;
    if (event.type === "session_meta" && payload.session_id) sessionId = payload.session_id;
    if (event.type === "turn_context" && payload.cwd) cwd = payload.cwd;
    if (event.type === "thread_settings_applied" && payload.thread_settings && payload.thread_settings.cwd) {
      cwd = payload.thread_settings.cwd;
    }

    if (event.type === "event_msg") {
      const pt = payload.type;
      if (pt === "user_message" && typeof payload.message === "string") {
        userCount += 1;
        const text = compact(payload.message);
        if (text && !firstUser) firstUser = text;
        if (text) lastUser = text;
      }
      if (pt === "agent_message" && typeof payload.message === "string") {
        assistantCount += 1;
        const text = compact(payload.message);
        if (text) lastAssistant = text;
      }
      if (pt === "task_complete" && typeof payload.last_agent_message === "string") {
        const text = compact(payload.last_agent_message);
        if (text) lastAssistant = text;
      }
      if (pt === "patch_apply_end" && payload.changes && typeof payload.changes === "object") {
        for (const filePath of Object.keys(payload.changes)) filesTouched.add(filePath);
        toolNames.add("apply_patch");
      }
      if (pt === "mcp_tool_call_end" && payload.invocation && payload.invocation.tool) {
        toolNames.add(payload.invocation.tool);
      }
      if (pt === "web_search_end") toolNames.add("web_search");
    }

    if (event.type === "response_item") {
      const pt = payload.type;
      if (pt === "function_call" && payload.name) toolNames.add(payload.name);
      if (pt === "custom_tool_call" && payload.name) toolNames.add(payload.name);
    }
  }

  return { cwd, sessionId, firstUser, lastUser, lastAssistant, lastTimestamp, userCount, assistantCount, filesTouched, toolNames };
}

function grokCwdFromPath(file, projectsPath) {
  const relative = path.relative(projectsPath, file);
  const encodedCwd = relative.split(path.sep)[0] || "";
  try {
    return decodeURIComponent(encodedCwd);
  } catch {
    return "";
  }
}

function summarizeGrokSession(events, file, projectsPath) {
  let cwd = grokCwdFromPath(file, projectsPath);
  let sessionId = path.basename(path.dirname(file));
  let firstUser = "";
  let lastUser = "";
  let lastAssistant = "";
  let lastTimestamp = "";
  let userCount = 0;
  let assistantCount = 0;
  const filesTouched = new Set();
  const toolNames = new Set();

  for (const event of events) {
    if (event.created_at || event.timestamp) lastTimestamp = event.created_at || event.timestamp;
    const text = compact(contentText(event.content));
    if (event.type === "user") {
      userCount += 1;
      if (text && !firstUser) firstUser = text;
      if (text) lastUser = text;
    }
    if (event.type === "assistant") {
      assistantCount += 1;
      if (text) lastAssistant = text;
    }
    if (event.type && /tool/i.test(event.type)) toolNames.add(event.type);
  }

  return { cwd, sessionId, firstUser, lastUser, lastAssistant, lastTimestamp, userCount, assistantCount, filesTouched, toolNames };
}

function aetherPathFromText(text) {
  if (typeof text !== "string") return "";
  const fileUri = text.match(/file:\/\/\/([A-Za-z]:\/[^\s`"<>]+)/i);
  const windowsPath = text.match(/[A-Za-z]:\\[^\r\n`"<>]+/);
  const candidate = fileUri ? fileUri[1].replaceAll("/", "\\") : windowsPath ? windowsPath[0] : "";
  const aetherIndex = candidate.toLowerCase().indexOf("\\aether");
  return aetherIndex >= 0 ? candidate.slice(0, candidate.length) : "";
}

function summarizeAntigravitySession(events, file) {
  let cwd = "";
  let sessionId = path.basename(path.dirname(path.dirname(path.dirname(file))));
  let firstUser = "";
  let lastUser = "";
  let lastAssistant = "";
  let lastTimestamp = "";
  let userCount = 0;
  let assistantCount = 0;
  const filesTouched = new Set();
  const toolNames = new Set();

  for (const event of events) {
    if (event.created_at || event.timestamp) lastTimestamp = event.created_at || event.timestamp;
    const text = typeof event.content === "string" ? event.content : contentText(event.content);
    const aetherPath = aetherPathFromText(text);
    if (aetherPath) {
      filesTouched.add(aetherPath);
      const candidateCwd = path.dirname(aetherPath);
      // A generic workspace-root mention can appear before an actual edited
      // project path; let the project-specific location win.
      if (!cwd || (topProject(candidateCwd) && !topProject(cwd))) {
        cwd = candidateCwd;
      }
    }
    if (event.type === "USER_INPUT") {
      userCount += 1;
      const request = compact(text.replace(/<[^>]+>/g, " "));
      if (request && !firstUser) firstUser = request;
      if (request) lastUser = request;
    }
    if (event.type === "PLANNER_RESPONSE") {
      assistantCount += 1;
      const response = compact(text);
      if (response) lastAssistant = response;
    }
    if (event.type && !/^(USER_INPUT|PLANNER_RESPONSE|SYSTEM_MESSAGE)$/i.test(event.type)) {
      toolNames.add(event.type);
    }
  }

  return { cwd, sessionId, firstUser, lastUser, lastAssistant, lastTimestamp, userCount, assistantCount, filesTouched, toolNames };
}

function summarizeSession(file, projectsPath, sourceName) {
  const events = parseJsonl(file);
  const {
    cwd, sessionId, firstUser, lastUser, lastAssistant, lastTimestamp,
    userCount, assistantCount, filesTouched, toolNames,
  } = sourceName === "codex"
    ? summarizeCodexSession(events)
    : sourceName === "grok"
      ? summarizeGrokSession(events, file, projectsPath)
      : sourceName === "antigravity"
        ? summarizeAntigravitySession(events, file)
        : summarizeClaudeStyleSession(events);

  const stat = fs.statSync(file);
  const project = topProject(cwd) || projectFromPath(file, projectsPath);
  return {
    file,
    normalizedSourcePath: normalizeFilePath(file),
    contentSha256: sha256(file),
    sourceModifiedAt: fileMtimeNs(file),
    mtime: stat.mtime.toISOString(),
    lastTimestamp,
    sessionId,
    cwd,
    project,
    firstUser,
    lastUser,
    lastAssistant,
    userCount,
    assistantCount,
    eventCount: events.length,
    filesTouched: Array.from(filesTouched).slice(0, 30),
    toolNames: Array.from(toolNames).sort(),
    hitLimit: /(hit your session limit|weekly limit|usage limit|usage credits|out of usage|resets in)/i.test(lastAssistant),
  };
}

function loadLedger() {
  if (!fs.existsSync(UNIVERSAL_LEDGER)) return { records: [] };
  return JSON.parse(fs.readFileSync(UNIVERSAL_LEDGER, "utf8"));
}

function saveLedgerWithNewRecords(sessions, sourceName, targetName) {
  const ledger = loadLedger();
  let backup = "";
  const existing = new Set(
    (ledger.records || []).map((r) =>
      `${r.source_assistant || ""}|${r.target_assistant || ""}|${String(r.source_path).toLowerCase()}|${r.content_sha256}`
    )
  );
  const importedAt = epochSeconds(NOW);
  const newRecords = [];
  for (const session of sessions) {
    const key = `${sourceName}|${targetName}|${session.normalizedSourcePath.toLowerCase()}|${session.contentSha256}`;
    if (existing.has(key)) continue;
    const record = {
      source_path: session.normalizedSourcePath,
      content_sha256: session.contentSha256,
      source_assistant: sourceName,
      target_assistant: targetName,
      imported_thread_id: crypto.randomUUID(),
      imported_at: importedAt,
      source_modified_at: session.sourceModifiedAt,
    };
    ledger.records.push(record);
    existing.add(key);
    newRecords.push(record);
  }

  if (newRecords.length > 0) {
    backup = `${UNIVERSAL_LEDGER}.bak-${STAMP}`;
    if (fs.existsSync(UNIVERSAL_LEDGER)) fs.copyFileSync(UNIVERSAL_LEDGER, backup);
    fs.writeFileSync(UNIVERSAL_LEDGER, `${JSON.stringify(ledger, null, 2)}\n`, "utf8");
  }

  const map = new Map();
  for (const record of ledger.records || []) {
    map.set(
      `${record.source_assistant || sourceName}|${record.target_assistant || targetName}|${String(record.source_path).toLowerCase()}|${record.content_sha256}`,
      record.imported_thread_id
    );
  }
  return { newRecords, ledgerMap: map, backup };
}

function sessionMarkdown(project, sessions, ledgerMap, sourceName, targetName) {
  const latest = sessions[0];
  const limitHits = sessions.filter((s) => s.hitLimit);
  const detailed = sessions.slice(0, 40);
  const lines = [];

  lines.push(`# ${capitalize(targetName)}: Continue From ${capitalize(sourceName)} - ${project}`);
  lines.push("");
  lines.push(`Generated on ${RUN_DATE} from local ${capitalize(sourceName)} transcripts in \`${SOURCE_CONFIG.projects}\`.`);
  lines.push("");
  lines.push(`This file refreshes ${capitalize(sourceName)} progress since ${SINCE.toISOString()}. Use it before continuing this project in ${capitalize(targetName)}.`);
  lines.push("");
  lines.push(`Recent ${capitalize(sourceName)} sessions mapped here: ${sessions.length}. Showing ${detailed.length} detailed sessions.`);
  lines.push("");
  if (latest) {
    lines.push("## Latest stop point");
    lines.push("");
    lines.push(`- Last activity: \`${latest.lastTimestamp || latest.mtime}\``);
    lines.push(`- ${capitalize(sourceName)} session: \`${latest.sessionId || path.basename(latest.file, ".jsonl")}\``);
    lines.push(`- CWD: \`${latest.cwd}\``);
    if (latest.hitLimit) lines.push(`- Stop reason detected: ${capitalize(sourceName)} usage limit.`);
    if (latest.lastUser) lines.push(`- Last user ask: ${md(latest.lastUser)}`);
    if (latest.lastAssistant) lines.push(`- Last assistant note: ${md(latest.lastAssistant)}`);
    if (latest.filesTouched.length) {
      lines.push("- Recent files touched:");
      for (const file of latest.filesTouched.slice(0, 10)) lines.push(`  - \`${relativeToWorkspace(file)}\``);
    }
    lines.push("");
  }

  if (limitHits.length) {
    lines.push(`## ${capitalize(sourceName)} usage-limit stops`);
    lines.push("");
    for (const s of limitHits.slice(0, 10)) {
      lines.push(`- \`${s.lastTimestamp || s.mtime}\` in \`${s.cwd}\`: ${md(s.lastUser || s.firstUser)}`);
    }
    lines.push("");
  }

  lines.push("## Recent sessions");
  lines.push("");
  for (const s of detailed) {
    const key = `${sourceName}|${targetName}|${s.normalizedSourcePath.toLowerCase()}|${s.contentSha256}`;
    const imported = ledgerMap.get(key) || "";
    lines.push(`### ${s.lastTimestamp || s.mtime}`);
    lines.push("");
    lines.push(`- ${capitalize(sourceName)} session: \`${s.sessionId || path.basename(s.file, ".jsonl")}\``);
    if (imported) lines.push(`- ${capitalize(targetName)} import record id: \`${imported}\``);
    lines.push(`- Messages: ${s.userCount} user / ${s.assistantCount} assistant / ${s.eventCount} events`);
    if (s.firstUser) lines.push(`- First user ask: ${md(s.firstUser)}`);
    if (s.lastUser) lines.push(`- Last user ask: ${md(s.lastUser)}`);
    if (s.lastAssistant) lines.push(`- Last assistant note: ${md(s.lastAssistant)}`);
    if (s.toolNames.length) lines.push(`- Tools seen: ${s.toolNames.slice(0, 18).map((t) => `\`${t}\``).join(", ")}`);
    if (s.filesTouched.length) {
      lines.push("- Files touched:");
      for (const file of s.filesTouched.slice(0, 12)) lines.push(`  - \`${relativeToWorkspace(file)}\``);
    }
    lines.push(`- Raw transcript: \`${s.file}\``);
    lines.push("");
  }

  if (sessions.length > detailed.length) {
    lines.push("## Additional raw transcript paths");
    lines.push("");
    for (const s of sessions.slice(detailed.length, 200)) {
      lines.push(`- \`${s.sessionId || path.basename(s.file, ".jsonl")}\`: \`${s.file}\``);
    }
    if (sessions.length > 200) {
      lines.push(`- ${sessions.length - 200} additional transcript paths omitted from this file.`);
    }
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function upsertBlock(text, begin, end, body) {
  // Idempotent (fleet fix C10, 2026-09-17). The body may itself contain marker
  // comments (a CLAUDE.md that was once synced), which used to break the
  // indexOf pairing and prepend a fresh copy on every run. So: strip every
  // marker line from the body, remove every existing copy of this block, then
  // insert exactly one.
  const markerLine = /^[ \t]*<!--[ \t]*(BEGIN|END):[^>]*-->[ \t]*\r?\n?/gm;
  const cleanBody = body.replace(markerLine, "").trim();
  const block = `${begin}\n${cleanBody}\n${end}`;
  let rest = text;
  for (;;) {
    const start = rest.indexOf(begin);
    if (start === -1) break;
    const stop = rest.indexOf(end, start + begin.length);
    if (stop === -1) { rest = rest.slice(0, start) + rest.slice(start + begin.length); continue; }
    rest = rest.slice(0, start) + rest.slice(stop + end.length).replace(/^\r?\n/, "");
  }
  rest = rest.replace(/^\s*\n/, "");
  return `${block}\n${rest}`;
}

function getTargetFileName(sourceName, targetName) {
  const mapping = {
    "claude->codex": "CODEX_CONTINUE_FROM_CLAUDE.md",
    "claude->devin": "CASCADE_CONTINUE_FROM_CLAUDE.md",
    "claude->grok": "GROK_CONTINUE_FROM_CLAUDE.md",
    "claude->antigravity": "ANTIGRAVITY_CONTINUE_FROM_CLAUDE.md",
    "codex->claude": "CLAUDE_CONTINUE_FROM_CODEX.md",
    "codex->devin": "CASCADE_CONTINUE_FROM_CODEX.md",
    "codex->grok": "GROK_CONTINUE_FROM_CODEX.md",
    "codex->antigravity": "ANTIGRAVITY_CONTINUE_FROM_CODEX.md",
    "devin->claude": "CLAUDE_CONTINUE_FROM_DEVIN.md",
    "devin->codex": "CODEX_CONTINUE_FROM_DEVIN.md",
    "devin->grok": "GROK_CONTINUE_FROM_DEVIN.md",
    "devin->antigravity": "ANTIGRAVITY_CONTINUE_FROM_DEVIN.md",
    "grok->claude": "CLAUDE_CONTINUE_FROM_GROK.md",
    "grok->codex": "CODEX_CONTINUE_FROM_GROK.md",
    "grok->devin": "CASCADE_CONTINUE_FROM_GROK.md",
    "grok->antigravity": "ANTIGRAVITY_CONTINUE_FROM_GROK.md",
    "antigravity->claude": "CLAUDE_CONTINUE_FROM_ANTIGRAVITY.md",
    "antigravity->codex": "CODEX_CONTINUE_FROM_ANTIGRAVITY.md",
    "antigravity->grok": "GROK_CONTINUE_FROM_ANTIGRAVITY.md",
    "antigravity->devin": "CASCADE_CONTINUE_FROM_ANTIGRAVITY.md",
  };
  const key = `${sourceName}->${targetName}`;
  return mapping[key] || `${targetName.toUpperCase()}_CONTINUE_FROM_${sourceName.toUpperCase()}.md`;
}

function ensureProjectHandoffs(projectDir, project, sessions, ledgerMap, sourceName, targetName) {
  fs.mkdirSync(projectDir, { recursive: true });
  const continueFileName = getTargetFileName(sourceName, targetName);
  const continuePath = path.join(projectDir, continueFileName);
  fs.writeFileSync(continuePath, sessionMarkdown(project, sessions, ledgerMap, sourceName, targetName), "utf8");

  const claudePath = path.join(projectDir, "CLAUDE.md");
  if (!fs.existsSync(claudePath)) {
    fs.writeFileSync(
      claudePath,
      `# CLAUDE.md - ${project}\n\nCreated by ${capitalize(targetName)} on ${RUN_DATE} during ${capitalize(sourceName)}/${capitalize(targetName)} continuity sync.\n\nRead \`${continueFileName}\` for the latest imported ${capitalize(sourceName)} sessions before continuing work here.\n`,
      "utf8"
    );
  }

  const agentsPath = path.join(projectDir, "AGENTS.md");
  const body = `${capitalize(sourceName)} chat continuation: read \`${continueFileName}\` to resume from the latest local ${capitalize(sourceName)} sessions for this project.`;
  const existing = fs.existsSync(agentsPath)
    ? fs.readFileSync(agentsPath, "utf8")
    : `# ${project} Guidance for ${capitalize(targetName)}\n\nRead \`CLAUDE.md\` first, then \`${continueFileName}\` for the newest ${capitalize(sourceName)} chat continuity.\n`;
  
  // Insert continuation block
  const continuationBlock = `<!-- BEGIN:${sourceName}-chat-continuation -->`;
  const continuationEnd = `<!-- END:${sourceName}-chat-continuation -->`;
  let updated = upsertBlock(existing, continuationBlock, continuationEnd, body);
  
  if (project !== ".") {
    const contextBlock = `<!-- BEGIN:imported-${sourceName}-context -->`;
    const contextEnd = `<!-- END:imported-${sourceName}-context -->`;
    updated = upsertBlock(updated, contextBlock, contextEnd, fs.readFileSync(claudePath, "utf8"));
  }
  fs.writeFileSync(agentsPath, updated, "utf8");
}

function safeSkillCopy(sourcePath, root) {
  const relative = path.relative(root, sourcePath);
  const parts = relative.split(path.sep);
  if (parts.some((part) => [".git", "node_modules", "__pycache__", ".venv"].includes(part))) return false;
  const name = path.basename(sourcePath).toLowerCase();
  if (name === ".env" || (name.startsWith(".env.") && name !== ".env.example")) return false;
  if (/^(credentials|secrets?)(.|$)/i.test(name)) return false;
  return true;
}

// Skill names that must never be copied into a target, in any direction.
// Data lives in .codex/skill-sync-ignore.json so it can be edited without touching code.
// Missing or invalid file = empty set, the sync never fails because of it.
function loadSkillIgnore() {
  try {
    const raw = fs.readFileSync(path.join(__dirname, "skill-sync-ignore.json"), "utf8");
    const list = JSON.parse(raw).ignore;
    return new Set(Array.isArray(list) ? list.map((n) => String(n).toLowerCase()) : []);
  } catch {
    return new Set();
  }
}
const SKILL_IGNORE = loadSkillIgnore();

// Reads every source skills root (the primary plus any skillsExtra), so skills a
// tool keeps in a second directory (Codex: ~/.codex/skills) are not silently missed.
function syncMissingGlobalSkills() {
  const imported = [];
  const roots = [SOURCE_CONFIG.skills, ...(SOURCE_CONFIG.skillsExtra || [])].filter((r) => r && fs.existsSync(r));
  if (!roots.length) return imported;
  fs.mkdirSync(TARGET_CONFIG.skills, { recursive: true });
  for (const root of roots) {
    for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      if (SKILL_IGNORE.has(entry.name.toLowerCase())) continue;
      const source = path.join(root, entry.name);
      const target = path.join(TARGET_CONFIG.skills, entry.name);
      if (!fs.existsSync(path.join(source, "SKILL.md"))) continue;
      if (fs.existsSync(target)) continue;
      fs.cpSync(source, target, {
        recursive: true,
        errorOnExist: true,
        force: false,
        filter: (src) => safeSkillCopy(src, root),
      });
      imported.push(entry.name);
    }
  }
  return imported.sort();
}

function updateRootFiles(summary, sourceName, targetName) {
  const reportPath = path.join(REPORT_DIR, REPORT_NAME);
  const report = [
    `# Universal Sync: ${capitalize(sourceName)} to ${capitalize(targetName)} - ${RUN_DATE}`,
    "",
    `Scanned local ${capitalize(sourceName)} transcripts since ${SINCE.toISOString()}.`,
    "",
    `- Changed ${capitalize(sourceName)} transcript files imported: ${summary.changedSessionCount}`,
    `- Workspace-mapped sessions: ${summary.aetherSessionCount}`,
    `- Unmapped sessions retained in the universal ledger: ${summary.unmappedSessionCount}`,
    `- Projects with refreshed continuation files: ${summary.projectCount}`,
    `- New universal ledger records: ${summary.newLedgerRecords}`,
    `- New ${capitalize(sourceName)} global skills copied into ${capitalize(targetName)}: ${summary.newSkills.length ? summary.newSkills.map((s) => `\`${s}\``).join(", ") : "none (skill names were already in parity)"}`,
    `- New project handoff pairs created: ${summary.handoffCoverage.created.length ? summary.handoffCoverage.created.map((s) => `\`${s}\``).join(", ") : "none"}`,
    `- Project AGENTS.md files refreshed from CLAUDE.md: ${summary.handoffCoverage.mirrored.length}`,
    `- Universal ledger backup: ${summary.ledgerBackup ? `\`${summary.ledgerBackup}\`` : "not needed (no new records)"}`,
    "",
    "## Latest stops",
    "",
    ...summary.latestStops.map((s) => `- \`${s.project || "unmapped"}\` at \`${s.lastTimestamp || s.mtime}\`: ${md(s.lastUser || s.firstUser)}${s.hitLimit ? ` (${capitalize(sourceName)} usage limit)` : ""}`),
    "",
    "## Refreshed projects",
    "",
    ...summary.projects.map((p) => `- \`${p.project}\`: ${p.count} recent session(s), latest \`${p.latest}\``),
    "",
  ].join("\n");
  fs.writeFileSync(reportPath, `${report}\n`, "utf8");

  // Opt in with SYNC_LOG_TO_CLAUDE_MD=1 to append a one-line log to the workspace CLAUDE.md.
  if (process.env.SYNC_LOG_TO_CLAUDE_MD === "1") {
    const claudePath = path.join(AETHER_ROOT, "CLAUDE.md");
    let claude = fs.existsSync(claudePath) ? fs.readFileSync(claudePath, "utf8") : "# CLAUDE.md - Workspace workspace\n\n";
    const syncLine = `- ${RUN_DATE}: Synced fresh ${capitalize(sourceName)} progress into ${capitalize(targetName)} for cross-agent continuity. Imported ${summary.newLedgerRecords} changed transcript records, refreshed ${summary.projectCount} project continuation files, mirrored ${summary.handoffCoverage.mirrored.length} ${capitalize(sourceName)} handoffs into AGENTS.md, and confirmed global skill-name parity. See \`${REPORT_RELATIVE_PATH}\`.`;
    if (!claude.includes(REPORT_NAME)) {
      if (!claude.includes("## Sync log")) claude += "\n## Sync log\n";
      claude = `${claude.trimEnd()}\n${syncLine}\n`;
      fs.writeFileSync(claudePath, claude, "utf8");
    }
    }

  const agentsPath = path.join(AETHER_ROOT, "AGENTS.md");
  if (fs.existsSync(agentsPath)) {
    const agents = fs.readFileSync(agentsPath, "utf8");
    const updated = agents.includes(REPORT_NAME)
      ? agents
      : `${agents.trimEnd()}\n\nWorkspace sync update: ${RUN_DATE} ${capitalize(sourceName)}/${capitalize(targetName)} sync imported ${summary.newLedgerRecords} changed transcript records, refreshed ${summary.projectCount} project continuation files, and confirmed shared skill-name parity. Read \`${REPORT_RELATIVE_PATH}\` for the run summary.\n`;
    fs.writeFileSync(agentsPath, updated, "utf8");
  }
}

// Main execution
console.log(`Starting universal sync: ${source} → ${target}`);
console.log(`Since: ${SINCE.toISOString()}`);
console.log(`Source path: ${SOURCE_CONFIG.projects}`);
console.log(`Target path: ${TARGET_CONFIG.projects}`);

if (!fs.existsSync(SOURCE_CONFIG.projects)) {
  console.log(`Source projects directory not found: ${SOURCE_CONFIG.projects}`);
  console.log("Creating directory structure...");
  fs.mkdirSync(SOURCE_CONFIG.projects, { recursive: true });
}

if (!fs.existsSync(TARGET_CONFIG.projects)) {
  console.log(`Target projects directory not found: ${TARGET_CONFIG.projects}`);
  console.log("Creating directory structure...");
  fs.mkdirSync(TARGET_CONFIG.projects, { recursive: true });
}

const jsonlFiles = walk(SOURCE_CONFIG.projects, (file) => {
  if (SOURCE_CONFIG.transcriptFileName) {
    return path.basename(file).toLowerCase() === SOURCE_CONFIG.transcriptFileName;
  }
  return file.toLowerCase().endsWith(SOURCE_CONFIG.transcriptExtension);
});
console.log(`Found ${jsonlFiles.length} transcript files in source`);

const changedSessions = jsonlFiles
  .map(file => summarizeSession(file, SOURCE_CONFIG.projects, source))
  .filter((session) => {
    const activity = session.lastTimestamp ? new Date(session.lastTimestamp) : null;
    return (activity && !Number.isNaN(activity.getTime()) && activity >= SINCE) || new Date(session.mtime) >= SINCE;
  })
  .sort((a, b) => (b.lastTimestamp || b.mtime).localeCompare(a.lastTimestamp || a.mtime));

console.log(`Found ${changedSessions.length} changed sessions since ${SINCE.toISOString()}`);

const aetherSessions = changedSessions.filter((session) => session.project);
console.log(`Workspace-mapped sessions: ${aetherSessions.length}`);

const { newRecords, ledgerMap, backup } = saveLedgerWithNewRecords(changedSessions, source, target);
console.log(`New ledger records: ${newRecords.length}`);

const newSkills = syncMissingGlobalSkills();
console.log(`New skills copied: ${newSkills.length}`);

const byProject = new Map();
for (const session of aetherSessions) {
  if (!byProject.has(session.project)) byProject.set(session.project, []);
  byProject.get(session.project).push(session);
}


const projectSummaries = [];
for (const [project, projectSessions] of byProject) {
  const projectDir = project === "." ? AETHER_ROOT : path.join(AETHER_ROOT, project);
  if (!fs.existsSync(projectDir)) continue;
  ensureProjectHandoffs(projectDir, project, projectSessions, ledgerMap, source, target);
  projectSummaries.push({
    project,
    count: projectSessions.length,
    latest: projectSessions[0].lastTimestamp || projectSessions[0].mtime,
  });
}

console.log(`Projects refreshed: ${projectSummaries.length}`);

const latestStops = changedSessions.slice(0, 12).map((s) => ({
  project: s.project,
  lastTimestamp: s.lastTimestamp,
  mtime: s.mtime,
  firstUser: s.firstUser,
  lastUser: s.lastUser,
  hitLimit: s.hitLimit,
}));

const summary = {
  source,
  target,
  since: SINCE.toISOString(),
  changedSessionCount: changedSessions.length,
  aetherSessionCount: aetherSessions.length,
  unmappedSessionCount: changedSessions.length - aetherSessions.length,
  projectCount: projectSummaries.length,
  newLedgerRecords: newRecords.length,
  ledgerBackup: backup,
  newSkills,
  handoffCoverage: { created: [], mirrored: projectSummaries.map(p => p.project) },
  latestStops,
  projects: projectSummaries.sort((a, b) => b.latest.localeCompare(a.latest)),
};

updateRootFiles(summary, source, target);

console.log("Sync complete!");
console.log(JSON.stringify(summary, null, 2));
