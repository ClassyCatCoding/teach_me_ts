import { useSyncExternalStore, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DIMENSIONS, isDimensionScores, type HistoryEntry } from "./data";

function subscribeToHash(onChange: () => void): () => void {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

/** The part of the URL after "#", for example "/task/tasks%2Flevel-01%2F...". */
export function useHashRoute(): string {
  return useSyncExternalStore(subscribeToHash, () => window.location.hash.replace(/^#/, "") || "/");
}

export function Card({ title, children, aside }: { title?: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="card">
      {(title || aside) && (
        <header className="card-head">
          {title && <h2>{title}</h2>}
          {aside}
        </header>
      )}
      {children}
    </section>
  );
}

export function Markdown({ children }: { children: string }) {
  return (
    <div className="markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}

export function CodeBlock({ name, code }: { name: string; code: string }) {
  return (
    <figure className="code">
      <figcaption>{name}</figcaption>
      <pre>
        <code>{code.trimEnd()}</code>
      </pre>
    </figure>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="empty">{children}</p>;
}

/** Pass or fail is always shown as an icon plus a word, never colour alone. */
export function ResultBadge({ entry }: { entry: HistoryEntry }) {
  if (entry.score === null) return <span className="badge badge-neutral">↷ Swapped</span>;
  if (entry.type === "quiz" && !entry.passed) return <span className="badge badge-warn">○ Below pass</span>;
  return entry.passed ? (
    <span className="badge badge-good">✓ Passed</span>
  ) : (
    <span className="badge badge-warn">○ Not passed</span>
  );
}

export function Meter({ value, max, label }: { value: number; max: number; label: string }) {
  const percent = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  return (
    <div
      className="meter"
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
    >
      <div className="meter-fill" style={{ width: `${percent}%` }} />
    </div>
  );
}

export function DimensionTable({ entry }: { entry: HistoryEntry }) {
  const { dimensions } = entry;
  if (Array.isArray(dimensions)) {
    return (
      <table className="dims">
        <tbody>
          {dimensions.map((points, index) => (
            <tr key={index}>
              <th scope="row">Question {index + 1}</th>
              <td className="dims-meter">
                <Meter value={points} max={20} label={`Question ${index + 1}`} />
              </td>
              <td className="num">
                {points} <span className="muted">/ 20</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  if (!isDimensionScores(dimensions)) return <Empty>No breakdown was recorded for this event.</Empty>;
  return (
    <table className="dims">
      <tbody>
        {DIMENSIONS.map(({ key, label, max }) => (
          <tr key={key}>
            <th scope="row">{label}</th>
            <td className="dims-meter">
              <Meter value={dimensions[key]} max={max} label={label} />
            </td>
            <td className="num">
              {dimensions[key]} <span className="muted">/ {max}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
