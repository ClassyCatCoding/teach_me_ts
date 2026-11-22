import {
  DIMENSIONS,
  gradeBand,
  history,
  isDimensionScores,
  journal,
  longDate,
  register,
  taskHref,
  tasks,
  taskTitle,
} from "../data";
import { Card, Empty, Markdown, ResultBadge } from "../ui";

const TYPE_LABEL = { task: "Task", quiz: "Quiz", boss: "Boss" } as const;

export function History() {
  const newestFirst = [...history].reverse();
  const ungraded = tasks.filter((task) => task.attempts.length === 0);

  return (
    <>
      <Card title="Graded events" aside={<span className="muted">Newest first · open a task to review it</span>}>
        {newestFirst.length > 0 ? (
          <div className="table-scroll">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Event</th>
                  <th>Focus</th>
                  <th className="num">Score</th>
                  <th>Result</th>
                  {DIMENSIONS.map(({ key, label, max }) => (
                    <th key={key} className="num" title={`${label}, out of ${max}`}>
                      {label.split(" ")[0]}
                      <span className="muted"> /{max}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {newestFirst.map((entry, index) => (
                  <tr key={`${entry.id}-${index}`}>
                    <td className="nowrap">{longDate(entry.date)}</td>
                    <td>
                      {TYPE_LABEL[entry.type] ?? entry.type} <span className="muted">L{entry.level}</span>
                    </td>
                    <td>
                      {entry.type === "quiz" ? entry.id : <a href={taskHref(entry.id)}>{taskTitle(entry.id)}</a>}
                    </td>
                    <td>{entry.focus}</td>
                    <td className="num">
                      <strong>{entry.score ?? "–"}</strong> <span className="muted">{gradeBand(entry.score)}</span>
                    </td>
                    <td>
                      <ResultBadge entry={entry} />
                    </td>
                    {isDimensionScores(entry.dimensions) ? (
                      DIMENSIONS.map(({ key }) => (
                        <td key={key} className="num">
                          {isDimensionScores(entry.dimensions) ? entry.dimensions[key] : ""}
                        </td>
                      ))
                    ) : (
                      <td colSpan={DIMENSIONS.length} className="muted">
                        {Array.isArray(entry.dimensions)
                          ? `Questions: ${entry.dimensions.join(", ")} (each out of 20)`
                          : "No breakdown"}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty>Nothing graded yet.</Empty>
        )}
      </Card>

      {ungraded.length > 0 && (
        <Card title="Not graded yet">
          <ul className="plain">
            {ungraded.map((task) => (
              <li key={task.id}>
                <a href={taskHref(task.id)}>{task.title}</a>{" "}
                <span className="muted">{task.id === register.activeTask ? "· active task" : `· ${task.id}`}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card title="Training journal" aside={<span className="muted">progress/journal.md</span>}>
        {journal ? <Markdown>{journal}</Markdown> : <Empty>The journal is empty.</Empty>}
      </Card>
    </>
  );
}
