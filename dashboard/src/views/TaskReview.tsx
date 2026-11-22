import { useState } from "react";
import { findTask, gradeBand, longDate, register, type HistoryEntry, type TaskRecord } from "../data";
import { Card, CodeBlock, DimensionTable, Empty, Markdown, ResultBadge } from "../ui";

type Tab = "grade" | "compare" | "brief" | "tests";

const TABS: { key: Tab; label: string }[] = [
  { key: "grade", label: "Grade and feedback" },
  { key: "compare", label: "Compare with reference" },
  { key: "brief", label: "Brief and notes" },
  { key: "tests", label: "Tests" },
];

/** Splits REFERENCE.md into the implementation section and everything after it. */
function splitReference(reference: string): { implementation: string; discussion: string } | null {
  const start = reference.search(/^##\s+Reference implementation\s*$/im);
  if (start === -1) return null;
  const afterHeading = reference.indexOf("\n", start) + 1;
  const nextHeading = reference.slice(afterHeading).search(/^##\s+/m);
  if (nextHeading === -1) return { implementation: reference.slice(afterHeading), discussion: "" };
  return {
    implementation: reference.slice(afterHeading, afterHeading + nextHeading),
    discussion: reference.slice(afterHeading + nextHeading),
  };
}

function Attempt({ entry, number, total }: { entry: HistoryEntry; number: number; total: number }) {
  return (
    <Card
      title={total > 1 ? `Attempt ${number} · ${longDate(entry.date)}` : `Graded ${longDate(entry.date)}`}
      aside={<ResultBadge entry={entry} />}
    >
      <div className="attempt">
        <div className="attempt-score">
          <div className="tile-value">{entry.score ?? "–"}</div>
          <div className="muted">out of 100 · grade {gradeBand(entry.score)}</div>
        </div>
        <DimensionTable entry={entry} />
      </div>
      {entry.notes && <p className="summary">{entry.notes}</p>}
      <div className="grid-2 flat">
        <div>
          <h3>Flagged for improvement</h3>
          {entry.flagged.length > 0 ? (
            <ul className="plain">
              {entry.flagged.map((flag) => (
                <li key={flag}>{flag}</li>
              ))}
            </ul>
          ) : (
            <Empty>Nothing flagged.</Empty>
          )}
        </div>
        <div>
          <h3>Weak areas cleared</h3>
          {entry.cleared.length > 0 ? (
            <ul className="plain">
              {entry.cleared.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <Empty>None cleared in this attempt.</Empty>
          )}
        </div>
      </div>
    </Card>
  );
}

function GradeTab({ task }: { task: TaskRecord }) {
  const newestFirst = [...task.attempts].reverse();
  return (
    <>
      {newestFirst.length > 0 ? (
        newestFirst.map((entry, index) => (
          <Attempt
            key={index}
            entry={entry}
            number={newestFirst.length - index}
            total={newestFirst.length}
          />
        ))
      ) : (
        <Card>
          <Empty>Not graded yet. Run /mentor submit when the tests pass and NOTES.md is written.</Empty>
        </Card>
      )}
      <Card title="Feedback report" aside={<span className="muted">FEEDBACK.md</span>}>
        {task.feedback ? (
          <Markdown>{task.feedback}</Markdown>
        ) : newestFirst.length > 0 ? (
          <Empty>
            No feedback report was saved for this task. It was graded before the mentor started saving reports, so the
            summary above is all that is on record. Reports are saved at every /mentor submit from now on.
          </Empty>
        ) : (
          <Empty>The mentor saves the full report here when the task is graded.</Empty>
        )}
      </Card>
    </>
  );
}

function CompareTab({ task, isActive }: { task: TaskRecord; isActive: boolean }) {
  const parts = task.reference ? splitReference(task.reference) : null;
  return (
    <>
      <div className="compare">
        <Card title="Your submission">
          {task.sources.length > 0 ? (
            task.sources.map((file) => <CodeBlock key={file.name} {...file} />)
          ) : (
            <Empty>No source files in this task folder.</Empty>
          )}
        </Card>
        <Card title="Reference implementation" aside={<span className="muted">REFERENCE.md</span>}>
          {task.reference ? (
            <Markdown>{parts ? parts.implementation : task.reference}</Markdown>
          ) : isActive ? (
            <Empty>The mentor writes the reference once this task is graded and closed.</Empty>
          ) : (
            <Empty>No reference has been written for this task. Ask the mentor for one to compare against.</Empty>
          )}
        </Card>
      </div>
      {parts?.discussion && (
        <Card>
          <Markdown>{parts.discussion}</Markdown>
        </Card>
      )}
    </>
  );
}

function BriefTab({ task }: { task: TaskRecord }) {
  return (
    <div className="compare">
      <Card title="Task brief" aside={<span className="muted">README.md</span>}>
        {task.brief ? <Markdown>{task.brief}</Markdown> : <Empty>This task folder has no brief.</Empty>}
      </Card>
      <Card title="Your notes" aside={<span className="muted">NOTES.md</span>}>
        {task.notes ? <Markdown>{task.notes}</Markdown> : <Empty>No notes written yet.</Empty>}
      </Card>
    </div>
  );
}

export function TaskReview({ id }: { id: string }) {
  const [tab, setTab] = useState<Tab>("grade");
  const task = findTask(id);

  if (!task) {
    return (
      <Card title="Task not found">
        <Empty>
          Nothing in tasks/ or the history matches “{id}”. <a href="#/history">Back to history</a>
        </Empty>
      </Card>
    );
  }

  const isActive = register.activeTask === task.id;
  const latest = task.attempts[task.attempts.length - 1];

  return (
    <>
      <div className="task-head">
        <a href="#/history" className="muted">
          ← History
        </a>
        <h1>{task.title}</h1>
        <p className="muted">
          {task.isBoss ? "Boss challenge" : "Task"}
          {task.level !== null && ` · Level ${task.level}`}
          {latest && ` · Focus: ${latest.focus}`}
          {isActive && " · Active task"}
          <br />
          {task.id}
        </p>
      </div>

      <div className="tabs" role="tablist">
        {TABS.map(({ key, label }) => (
          <button key={key} role="tab" aria-selected={tab === key} onClick={() => setTab(key)}>
            {label}
          </button>
        ))}
      </div>

      {tab === "grade" && <GradeTab task={task} />}
      {tab === "compare" && <CompareTab task={task} isActive={isActive} />}
      {tab === "brief" && <BriefTab task={task} />}
      {tab === "tests" && (
        <Card title="Tests" aside={<span className="muted">Written by the mentor</span>}>
          {task.tests.length > 0 ? (
            task.tests.map((file) => <CodeBlock key={file.name} {...file} />)
          ) : (
            <Empty>This task has no test file.</Empty>
          )}
        </Card>
      )}
    </>
  );
}
