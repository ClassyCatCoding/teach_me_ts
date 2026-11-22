import {
  BOSS_PASSING_SCORE,
  PASSING_SCORE,
  TASKS_NEEDED_PER_LEVEL,
  TOTAL_LEVELS,
  findTask,
  gradeBand,
  history,
  longDate,
  register,
  scoredEvents,
  taskHref,
  taskTitle,
} from "../data";
import { Card, Empty, ResultBadge } from "../ui";

function Tile({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="tile">
      <div className="tile-label">{label}</div>
      <div className="tile-value">{value}</div>
      <div className="tile-note muted">{note}</div>
    </div>
  );
}

function Condition({ met, label, detail }: { met: boolean; label: string; detail: string }) {
  return (
    <li className="condition">
      <span className={met ? "badge badge-good" : "badge badge-neutral"}>{met ? "✓ Met" : "○ Not yet"}</span>
      <span>
        <strong>{label}</strong>
        <br />
        <span className="muted">{detail}</span>
      </span>
    </li>
  );
}

export function Overview() {
  const tasksDone = register.tasksCompletedThisLevel;
  const tasksMet = tasksDone >= TASKS_NEEDED_PER_LEVEL;
  const quizMet = register.quizPassedThisLevel;
  const bossUnlocked = tasksMet && quizMet;
  const bossBeaten = register.bossDefeated.includes(register.currentLevel);

  const average =
    scoredEvents.length > 0
      ? Math.round(scoredEvents.reduce((sum, entry) => sum + entry.score, 0) / scoredEvents.length)
      : null;
  const latest = scoredEvents[scoredEvents.length - 1];
  const recent = [...history].reverse().slice(0, 5);
  const activeTask = register.activeTask ? findTask(register.activeTask) : undefined;

  return (
    <>
      <div className="tiles">
        <Tile
          label="Level"
          value={`${register.currentLevel} of ${TOTAL_LEVELS}`}
          note={register.levelTitle}
        />
        <Tile label="XP" value={register.xp.toLocaleString()} note={`Since ${longDate(register.startedAt)}`} />
        <Tile
          label="Tasks passed this level"
          value={`${tasksDone} of ${TASKS_NEEDED_PER_LEVEL}`}
          note={tasksMet ? "Enough for the boss" : `${TASKS_NEEDED_PER_LEVEL - tasksDone} more to go`}
        />
        <Tile
          label="Average score"
          value={average === null ? "–" : `${average}`}
          note={
            latest
              ? `Latest ${latest.score} (${gradeBand(latest.score)}) · ${scoredEvents.length} graded`
              : "Nothing graded yet"
          }
        />
      </div>

      <div className="grid-2">
        <Card title="Road to the next level">
          <ul className="conditions">
            <Condition
              met={tasksMet}
              label={`Pass ${TASKS_NEEDED_PER_LEVEL} tasks at this level`}
              detail={`${tasksDone} of ${TASKS_NEEDED_PER_LEVEL} passed (score ${PASSING_SCORE} or more)`}
            />
            <Condition
              met={quizMet}
              label="Pass a quiz at this level"
              detail={quizMet ? "Quiz passed" : `No quiz passed yet (score ${PASSING_SCORE} or more)`}
            />
            <Condition
              met={bossBeaten}
              label="Beat the boss challenge"
              detail={
                bossBeaten
                  ? "Boss defeated"
                  : bossUnlocked
                    ? `Unlocked: run /mentor boss (score ${BOSS_PASSING_SCORE} or more)`
                    : "Locked until the two conditions above are met"
              }
            />
          </ul>
        </Card>

        <Card title="Active task">
          {register.activeTask ? (
            <p>
              <a href={taskHref(register.activeTask)}>{activeTask?.title ?? register.activeTask}</a>
              <br />
              <span className="muted">{register.activeTask}</span>
            </p>
          ) : (
            <Empty>No active task. Run /mentor task for the next one.</Empty>
          )}
        </Card>
      </div>

      <div className="grid-2">
        <Card title="Working on" aside={<span className="muted">Weak areas</span>}>
          {register.weakAreas.length > 0 ? (
            <ul className="plain">
              {register.weakAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          ) : (
            <Empty>No weak areas on record.</Empty>
          )}
        </Card>
        <Card title="Strengths">
          {register.strengths.length > 0 ? (
            <ul className="plain">
              {register.strengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          ) : (
            <Empty>None recorded yet. The mentor adds these as patterns repeat.</Empty>
          )}
        </Card>
      </div>

      <Card title="Recent graded events" aside={<a href="#/history">All history</a>}>
        {recent.length > 0 ? (
          <ul className="events">
            {recent.map((entry, index) => (
              <li key={`${entry.id}-${index}`}>
                <span className="events-score">
                  {entry.score ?? "–"}
                  <span className="muted"> {gradeBand(entry.score)}</span>
                </span>
                <span className="events-main">
                  {entry.type === "quiz" ? (
                    <strong>Quiz: {entry.focus}</strong>
                  ) : (
                    <a href={taskHref(entry.id)}>{taskTitle(entry.id)}</a>
                  )}
                  <br />
                  <span className="muted">
                    {longDate(entry.date)} · Level {entry.level} · {entry.focus}
                  </span>
                </span>
                <ResultBadge entry={entry} />
              </li>
            ))}
          </ul>
        ) : (
          <Empty>Nothing graded yet.</Empty>
        )}
      </Card>
    </>
  );
}
