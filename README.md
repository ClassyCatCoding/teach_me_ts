# Dev Mentor — Beginner to Mid-Level TypeScript

A self-paced training program run by an AI mentor inside VS Code with Claude Code. You get real tasks framed like work tickets, real tests, real grades, and level-ups when you earn them.

## One-time setup

1. Install [Node.js](https://nodejs.org) (LTS) and [VS Code](https://code.visualstudio.com).
2. Open this folder in VS Code and open the Claude Code panel (or run `claude` in the terminal).
3. Run `npm install` in the terminal.
4. Put your name in `progress/progress.json`.

## How it works

| Command | What it does |
|---|---|
| `/mentor` or `/mentor status` | Where you are: level, XP, what's next |
| `/mentor task` | Get your next assignment (created in `tasks/`) |
| `/mentor submit` | Grade your work — tests run, score 0–100, feedback |
| `/mentor quiz` | "Talk the talk" drill: explain concepts, mock standups, interview questions |
| `/mentor boss` | The level-up exam (unlocks after 3 passed tasks + 1 passed quiz) |
| `/mentor review` | Retrospective: trends, weak areas, what to focus on |

### Using GitHub Copilot instead of Claude Code

The same mentor works in Copilot Chat (VS Code) — everything is mirrored under `.github/`:

- Pick the **mentor** chat mode in the Copilot Chat mode dropdown, then just talk to it ("give me a task", "grade my work"), or
- Use the prompt commands: `/mentor-status`, `/mentor-task`, `/mentor-submit`, `/mentor-quiz`, `/mentor-boss`, `/mentor-review`.

Progress is tracked in the same `progress/progress.json` either way, so you can switch assistants whenever and keep your XP, level, and history.

**The loop:** `task` → code it → write `NOTES.md` (explain your approach, 3–5 sentences) → `submit` → read the feedback → repeat. Quiz at least once per level. Beat the boss to level up.

## The levels

1. Hello, World — variables, functions, control flow
2. Data Wrangler — arrays, objects, map/filter/reduce
3. Function Fluent — closures, callbacks, higher-order functions
4. Type Safe — interfaces, unions, narrowing, generics
5. Async Aware — promises, async/await, real APIs
6. Shipping It — git, debugging, npm, the professional workflow
7. Trust but Verify — testing and TDD
8. Backend Builder — REST APIs with Express
9. State Keeper — databases and persistence
10. Mid-Level Developer — capstone project + mock interviews

## House rules

- The mentor gives **hints, never solutions**. If it writes your code, you can't claim it in an interview.
- `NOTES.md` is graded. Being able to *explain* your code is half the job.
- Commit your work after every passed task. Git history = proof of progress.
- Stuck is normal. Ask the mentor for a hint — there are three tiers before it steps in.

## Useful commands

```bash
npm test          # run the tests for your tasks
npm run check     # type-check everything
npm run test:watch  # tests re-run as you save
npm run dashboard   # open the progress dashboard in your browser
```

## The dashboard

`npm run dashboard` opens a read-only page for looking back at your work. It never changes anything; the mentor loop above is still how you make progress.

- **Overview** — level, XP, what is left before the boss, weak areas.
- **Trends** — scores over time, each grading dimension, and what keeps getting flagged.
- **History** — every graded event and the training journal.
- **Task review** — open any task to see its grade, the mentor's saved feedback (`FEEDBACK.md`), your code beside the reference (`REFERENCE.md`), the brief, your notes, and the tests.

It reads `progress/` and `tasks/` directly and refreshes when the mentor updates them. The code lives in `dashboard/` and is kept out of `npm test` and `npm run check`, so it cannot affect a grade.
