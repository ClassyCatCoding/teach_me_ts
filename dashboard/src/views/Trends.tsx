import { BarList, LineChart, type ChartPoint } from "../charts";
import {
  DIMENSIONS,
  PASSING_SCORE,
  flagCategory,
  history,
  isDimensionScores,
  longDate,
  register,
  scoredEvents,
  shortDate,
  taskHref,
  taskTitle,
  type HistoryEntry,
} from "../data";
import { Card, Empty } from "../ui";

function eventName(entry: HistoryEntry): string {
  return entry.type === "quiz" ? `Quiz: ${entry.focus}` : taskTitle(entry.id);
}

export function Trends() {
  const scorePoints: ChartPoint[] = scoredEvents.map((entry) => ({
    label: shortDate(entry.date),
    value: entry.score,
    title: eventName(entry),
    valueText: `${entry.score} / 100`,
  }));

  // Dimension scores exist only for tasks and boss challenges, not quizzes.
  const dimensionEvents = history.filter((entry) => entry.score !== null && isDimensionScores(entry.dimensions));

  const flagCounts = new Map<string, number>();
  for (const entry of history) {
    for (const flag of entry.flagged) {
      const category = flagCategory(flag);
      flagCounts.set(category, (flagCounts.get(category) ?? 0) + 1);
    }
  }
  const flagRows = [...flagCounts.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
  const flaggedEvents = [...history].reverse().filter((entry) => entry.flagged.length > 0);
  const openCategories = new Set(register.weakAreas.map(flagCategory));

  return (
    <>
      <Card title="Score per graded event" aside={<span className="muted">Out of 100, oldest to newest</span>}>
        {scorePoints.length > 0 ? (
          <LineChart
            points={scorePoints}
            yMax={100}
            ticks={[0, 25, 50, 75, 100]}
            reference={{ value: PASSING_SCORE, label: `Pass ${PASSING_SCORE}` }}
            endLabel={`${scorePoints[scorePoints.length - 1]?.value ?? ""}`}
            ariaLabel="Score per graded event, oldest to newest"
          />
        ) : (
          <Empty>Nothing graded yet.</Empty>
        )}
      </Card>

      <Card
        title="Each dimension, as a share of its points"
        aside={<span className="muted">Tasks and boss challenges</span>}
      >
        {dimensionEvents.length > 0 ? (
          <div className="multiples">
            {DIMENSIONS.map(({ key, label, max }) => {
              const points: ChartPoint[] = dimensionEvents.map((entry) => {
                const awarded = isDimensionScores(entry.dimensions) ? entry.dimensions[key] : 0;
                return {
                  label: shortDate(entry.date),
                  value: Math.round((awarded / max) * 100),
                  title: taskTitle(entry.id),
                  valueText: `${awarded} / ${max}`,
                };
              });
              const latest = points[points.length - 1];
              return (
                <div key={key} className="multiple">
                  <h3>
                    {label} <span className="muted">· {max} pts</span>
                  </h3>
                  <LineChart
                    points={points}
                    yMax={100}
                    ticks={[0, 50, 100]}
                    height={140}
                    endLabel={latest ? `${latest.value}%` : undefined}
                    ariaLabel={`${label}: percent of points earned per task`}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <Empty>No task has been graded yet.</Empty>
        )}
      </Card>

      <Card title="What gets flagged" aside={<span className="muted">Times named in an improvement</span>}>
        {flagRows.length > 0 ? (
          <>
            <BarList
              rows={flagRows.map((row) => ({
                ...row,
                detail: openCategories.has(row.label) ? "currently a weak area" : undefined,
              }))}
              unit="times"
            />
            <table className="table flags">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Event</th>
                  <th>Flagged</th>
                </tr>
              </thead>
              <tbody>
                {flaggedEvents.map((entry, index) => (
                  <tr key={`${entry.id}-${index}`}>
                    <td className="nowrap">{longDate(entry.date)}</td>
                    <td>
                      {entry.type === "quiz" ? eventName(entry) : <a href={taskHref(entry.id)}>{eventName(entry)}</a>}
                    </td>
                    <td>
                      <ul className="plain tight">
                        {entry.flagged.map((flag) => (
                          <li key={flag}>{flag}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <Empty>Nothing has been flagged yet.</Empty>
        )}
      </Card>
    </>
  );
}
