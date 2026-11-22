// Read-only view of the mentor's records. Nothing in the dashboard writes to disk.
import journalRaw from "../../progress/journal.md?raw";
import registerJson from "../../progress/progress.json";

export type EventType = "task" | "quiz" | "boss";

export interface DimensionScores {
  correctness: number;
  codeQuality: number;
  typescript: number;
  edgeCases: number;
  communication: number;
}

export type DimensionKey = keyof DimensionScores;

export interface HistoryEntry {
  date: string;
  type: EventType;
  level: number;
  id: string;
  focus: string;
  score: number | null;
  passed: boolean;
  /** Five Dimension scores for a task or boss; five question scores for a quiz. */
  dimensions: DimensionScores | number[] | null;
  flagged: string[];
  cleared: string[];
  notes: string;
}

export interface Register {
  student: string;
  track: string;
  startedAt: string;
  currentLevel: number;
  levelTitle: string;
  xp: number;
  tasksCompletedThisLevel: number;
  quizPassedThisLevel: boolean;
  bossDefeated: number[];
  activeTask: string | null;
  weakAreas: string[];
  strengths: string[];
  history: HistoryEntry[];
}

export interface SourceFile {
  name: string;
  code: string;
}

export interface TaskRecord {
  /** Task Directory path relative to the repo root, as stored in the Register. */
  id: string;
  level: number | null;
  title: string;
  isBoss: boolean;
  brief: string | null;
  notes: string | null;
  feedback: string | null;
  reference: string | null;
  sources: SourceFile[];
  tests: SourceFile[];
  /** Graded attempts, oldest first. */
  attempts: HistoryEntry[];
}

export const DIMENSIONS: { key: DimensionKey; label: string; max: number }[] = [
  { key: "correctness", label: "Correctness", max: 40 },
  { key: "codeQuality", label: "Code quality", max: 25 },
  { key: "typescript", label: "TypeScript usage", max: 15 },
  { key: "edgeCases", label: "Edge cases and errors", max: 10 },
  { key: "communication", label: "Communication", max: 10 },
];

export const PASSING_SCORE = 70;
export const BOSS_PASSING_SCORE = 75;
export const TASKS_NEEDED_PER_LEVEL = 3;
export const TOTAL_LEVELS = 10;

export const register = registerJson as unknown as Register;
export const history: HistoryEntry[] = register.history ?? [];

/** The Journal with its header and the commented-out example entry removed. */
export const journal: string = journalRaw
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace(/^# .*$/m, "")
  .replace(/^One entry per session\..*$/m, "")
  .trim();

const rawFiles = import.meta.glob<string>("../../tasks/**/*.{md,ts}", {
  query: "?raw",
  import: "default",
  eager: true,
});

export function isDimensionScores(value: HistoryEntry["dimensions"]): value is DimensionScores {
  return value !== null && !Array.isArray(value);
}

export function gradeBand(score: number | null): string {
  if (score === null) return "–";
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-11-21" -> "21 Nov". Parsed by hand so the time zone cannot shift the day. */
export function shortDate(isoDate: string): string {
  const [, month, day] = isoDate.split("-");
  const monthName = MONTHS[Number(month) - 1];
  if (!monthName || !day) return isoDate;
  return `${Number(day)} ${monthName}`;
}

export function longDate(isoDate: string): string {
  const [year] = isoDate.split("-");
  return `${shortDate(isoDate)} ${year ?? ""}`.trim();
}

function titleFromBrief(brief: string | null, fallback: string): string {
  const heading = brief?.match(/^#\s+(.+)$/m)?.[1];
  return heading ? heading.trim() : fallback;
}

function buildTasks(): TaskRecord[] {
  const byId = new Map<string, TaskRecord>();

  const ensure = (id: string): TaskRecord => {
    let task = byId.get(id);
    if (!task) {
      const levelMatch = id.match(/level-(\d+)/);
      const folder = id.split("/").pop() ?? id;
      task = {
        id,
        level: levelMatch ? Number(levelMatch[1]) : null,
        title: folder,
        isBoss: folder.startsWith("boss-"),
        brief: null,
        notes: null,
        feedback: null,
        reference: null,
        sources: [],
        tests: [],
        attempts: [],
      };
      byId.set(id, task);
    }
    return task;
  };

  for (const [path, content] of Object.entries(rawFiles)) {
    const relative = path.replace(/^(\.\.\/)+/, "");
    const parts = relative.split("/");
    // Only files directly inside tasks/level-XX/<folder>/ belong to a Task Directory.
    if (parts.length !== 4) continue;
    const name = parts[3] ?? "";
    const task = ensure(parts.slice(0, 3).join("/"));
    // File names are matched without regard to case: NOTES.md and Notes.md both occur.
    const lower = name.toLowerCase();
    if (lower === "readme.md") task.brief = content;
    else if (lower === "notes.md") task.notes = content;
    else if (lower === "feedback.md") task.feedback = content;
    else if (lower === "reference.md") task.reference = content;
    else if (lower.endsWith(".test.ts")) task.tests.push({ name, code: content });
    else if (lower.endsWith(".ts")) task.sources.push({ name, code: content });
  }

  for (const entry of history) {
    if (entry.type === "quiz") continue;
    ensure(entry.id).attempts.push(entry);
  }

  const tasks = [...byId.values()].filter(
    // A folder with no brief and no graded attempt (the smoke test) is not a Task.
    (task) => task.brief !== null || task.attempts.length > 0,
  );
  for (const task of tasks) {
    task.title = titleFromBrief(task.brief, task.title);
    task.sources.sort((a, b) => a.name.localeCompare(b.name));
    task.tests.sort((a, b) => a.name.localeCompare(b.name));
  }
  return tasks.sort((a, b) => a.id.localeCompare(b.id));
}

export const tasks: TaskRecord[] = buildTasks();

export function findTask(id: string): TaskRecord | undefined {
  return tasks.find((task) => task.id === id);
}

export function taskTitle(id: string): string {
  return findTask(id)?.title ?? id;
}

export function taskHref(id: string): string {
  return `#/task/${encodeURIComponent(id)}`;
}

/** History entries that carry a Score, oldest first. */
export const scoredEvents: (HistoryEntry & { score: number })[] = history.filter(
  (entry): entry is HistoryEntry & { score: number } => entry.score !== null,
);

/** "code quality: let where const fits" -> "code quality". */
export function flagCategory(flag: string): string {
  const [category] = flag.split(":");
  return (category ?? flag).trim().toLowerCase();
}
