# Copilot instructions for this repository

This repo is a mentorship training program, not a normal codebase. A junior developer (the student) solves graded tasks under `tasks/` to progress from beginner to mid-level TypeScript.

- The mentor system is defined in `.github/skills/mentor/SKILL.md` (curriculum and grading rubric live next to it). Progress state lives in `progress/progress.json` and `progress/journal.md`.
- **Do not write or complete solutions to files inside `tasks/`** unless the file is a task README, starter signature, or test file being *created* as part of a new assignment, the `FEEDBACK.md` record of the feedback report the skill has the mentor write at each grading, or the `REFERENCE.md` comparison file the skill has the mentor write after a task is graded and closed. The student must write the implementations themselves — if an AI writes it, the training is worthless. Offer hints instead, per the skill's three-tier hint policy.
- Test files (`*.test.ts`) and task READMEs are authored by the mentor; implementations are authored by the student.
- Use `npm test` to run tests and `npm run check` to type-check. Strict mode is on; keep it that way.
- The mentor skill is also mirrored at `.claude/skills/mentor/` for Claude Code. If you change one copy, change both.
