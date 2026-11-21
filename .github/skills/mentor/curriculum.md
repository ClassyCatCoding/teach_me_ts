<!-- Mirror of .claude/skills/mentor/curriculum.md — if you edit one, update both. -->
# Curriculum

*Schedule A to the Developer Mentorship Act. Incorporated by §5.2, §5.5, and §5.6 of the Act. Defined Terms carry the meanings given in §2 of the Act.*

## §A-1. Structure

A-1.1 The Program consists of the ten Levels set out in §A-3, in ascending numerical order.

A-1.2 Each Level entry in §A-3 has three parts:
  (a) **Concepts**: the ordered list from which the Mentor selects Focus Concepts under §5.2.2 of the Act;
  (b) **Drill Themes**: the subjects from which the Mentor draws Quiz questions under §5.5.1 of the Act;
  (c) **Boss Challenge**: the examination the Mentor generates under §5.6.3 of the Act.

## §A-2. Rules of Selection

A-2.1 The Mentor may use in a Task at a given Level any concept listed under that Level or any lower Level.

> *Commentary: Concepts compound. A Level 5 Task may freely rely on Levels 1 to 4 material; it may not rely on Level 6.*

A-2.2 Each Task shall have exactly one Focus Concept, named in the Task Brief as required by §9.2(d) of the Act.

A-2.3 Where the Current Level is 2 or higher, the Mentor shall frame every Task Brief as a workplace ticket. Where the Current Level is 1, §7.1 of the Act applies.

A-2.4 The Mentor shall generate a fresh scenario for every Task and shall not reuse the scenario of any prior Task, as required by §5.2.12 of the Act.

A-2.5 The Mentor shall not initiate a Boss Challenge without the Student's `boss` Command, and shall not refuse one where the Level-Up Conditions are met, as provided in §5.6.1 and §5.6.2 of the Act.

A-2.6 A Boss Challenge description in §A-3 is a specification of scope, not a script. The Mentor shall generate a concrete Task Brief from it that satisfies §5.6.5 of the Act.

## §A-3. Levels

### Level 1 — Foundations (Level Title: "Hello, World")

A-3.1 (a) **Concepts:** variables (`let` and `const`); primitive types; functions and parameters; `if` and `else`; comparison and logical operators; template literals; basic string and number methods; returning versus logging.

A-3.1 (b) **Drill Themes:** the difference between `let` and `const`; what it means for a function to return a value; explaining a simple function line by line.

A-3.1 (c) **Boss Challenge:** a small CLI-style calculator module that parses an operation string such as `"12 + 5"`, validates it, computes the result, and handles bad input with clear messages.

### Level 2 — Collections (Level Title: "Data Wrangler")

A-3.2 (a) **Concepts:** arrays; objects; nested data; `for` and `for...of`; `map`; `filter`; `reduce`; `find`; `some` and `every`; sorting with comparators; immutability basics (spread, avoiding mutation).

A-3.2 (b) **Drill Themes:** explaining `map`, `filter`, and `reduce` to a non-programmer; when to mutate and when to copy; what "immutable" means.

A-3.2 (c) **Boss Challenge:** a gradebook module that, given an array of student records with nested scores, produces rankings, averages, letter grades, and a "most improved" report without mutating the input.

### Level 3 — Functions Deep Dive (Level Title: "Function Fluent")

A-3.3 (a) **Concepts:** arrow functions; callbacks; higher-order functions; closures; default and rest parameters; pure versus impure functions; early returns and guard clauses; recursion (light).

A-3.3 (b) **Drill Themes:** what a closure is, with a real example; what makes a function pure and why it matters; explaining a callback to a junior.

A-3.3 (c) **Boss Challenge:** a tiny event system with `on`, `off`, `emit`, and `once`, where closures and callbacks do real work, with tests proving listeners fire and detach correctly.

### Level 4 — TypeScript Proper (Level Title: "Type Safe")

A-3.4 (a) **Concepts:** interfaces versus type aliases; union and literal types; type narrowing (`typeof`, `in`, discriminated unions); optional and `readonly` properties; enums versus unions; generics (basic `<T>` functions); `unknown` versus `any`; utility types (`Partial`, `Pick`, `Record`).

A-3.4 (b) **Drill Themes:** the 30-second pitch for TypeScript over JavaScript; `any` versus `unknown`; what a discriminated union is and when the Student has used one.

A-3.4 (c) **Boss Challenge:** the type model of a payment system: a discriminated union of payment methods, a generic `Result<T, E>` type, and functions that narrow correctly, with zero `any` and a clean strict-mode Type Check.

### Level 5 — Async (Level Title: "Async Aware")

A-3.5 (a) **Concepts:** the event loop (conceptually); Promises; `async` and `await`; error handling with `try` and `catch`; `Promise.all`, `Promise.allSettled`, and `Promise.race`; `fetch` against a real public API; timeouts and retries (simple); sequential versus parallel awaits.

A-3.5 (b) **Drill Themes:** explaining `async` and `await` as in an interview; what happens when `await` is forgotten; when sequential versus parallel matters.

A-3.5 (c) **Boss Challenge:** a weather dashboard module that fetches from a public API for three cities in parallel, handles one failing without killing the rest, applies a timeout, and returns typed results.

### Level 6 — Tooling and the Professional Workflow (Level Title: "Shipping It")

A-3.6 (a) **Concepts:** npm scripts; dependencies versus devDependencies; ES module `import` and `export`; tsconfig essentials; reading stack traces and compiler errors; debugging with breakpoints in VS Code; git fundamentals (branches, commit messages, `.gitignore`); environment variables; README writing.

A-3.6 (b) **Drill Themes:** walking through a debugging process; what belongs in a good commit message; dependencies versus devDependencies; mock standup practice begins at this Level.

A-3.6 (c) **Boss Challenge:** a deliberately broken small project that the Mentor generates with exactly five planted bugs, one of each kind: a type error, a logic bug, an async bug, a dependency issue, and a config issue. The Student fixes all five and explains each fix in Notes as a pull-request description. §7.4 of the Act permits the Mentor to write the broken project files.

### Level 7 — Testing (Level Title: "Trust but Verify")

A-3.7 (a) **Concepts:** Vitest structure (`describe`, `it`, `expect`); arrange-act-assert; edge cases and boundary values; test-driven development (red-green-refactor); mocking and spies (basics); testing async code; what makes a test good versus brittle; coverage as a signal, not a goal.

A-3.7 (b) **Drill Themes:** convincing a sceptical manager to write tests; what TDD is; what a mock is and when mocking is a smell.

A-3.7 (c) **Boss Challenge:** a TDD round-trip for a shopping-cart pricing module with discounts, coupons, and edge cases. The Mentor provides only a specification and the names of the failing tests; the Student writes the tests first and then the implementation. §7.4 of the Act permits the Mentor to write the test-name skeleton.

### Level 8 — Building APIs (Level Title: "Backend Builder")

A-3.8 (a) **Concepts:** HTTP methods and status codes; REST conventions; Express (or Fastify) routing; request validation; middleware; error-handling middleware; JSON APIs; async route handlers; testing endpoints with supertest; basic auth concepts (tokens, headers).

A-3.8 (b) **Drill Themes:** designing an endpoint out loud ("let users update their profile"); choosing a status code and saying why; what middleware is; explaining REST as an interview answer.

A-3.8 (c) **Boss Challenge:** a complete tasks API with CRUD endpoints, validation with helpful `400` responses, correct status codes, centralised error handling, and an endpoint test suite. The Mentor shall grade API design taste within the Code Quality Dimension.

### Level 9 — Data and State (Level Title: "State Keeper")

A-3.9 (a) **Concepts:** persistence (SQLite via `better-sqlite3`, or a JSON file store); data modelling (ids, relations, timestamps); CRUD against real storage; migrations as an idea; the repository pattern (separating storage from logic); transactions conceptually; seeding and fixtures.

A-3.9 (b) **Drill Themes:** how to store a given thing, walking through the modelling; what the repository pattern buys; what happens when two writes race.

A-3.9 (c) **Boss Challenge:** real persistence added to the Level 8 API: data survives restart; storage sits behind a repository interface with an in-memory fake for tests; and one migration (a schema change with data preserved).

### Level 10 — Mid-Level Capstone (Level Title: "Mid-Level Developer")

A-3.10 (a) **Concepts:** refactoring safely with tests; code smells (duplication, long functions, god objects); SOLID in plain terms; reading unfamiliar code; writing a one-page design doc (problem, options, tradeoffs, decision); code review skills (giving and receiving); estimating work; system design lite (sketching the components of a URL shortener or rate limiter).

A-3.10 (b) **Drill Themes:** full mock interviews: one behavioural (STAR stories from the Tasks the Student actually completed in the Program), one technical walkthrough of the capstone, one system-design-lite; practising "I don't know, but here's how I'd find out."

A-3.10 (c) **Boss Challenge (Capstone):** a complete small product chosen with the Mentor (for example a habit tracker API with CLI, a link shortener, or a markdown notes app). The Student writes the design doc first, then builds over multiple Sessions with real commits, tests, and a README, and concludes with a 10-minute walkthrough in which the Student explains the architecture and defends two decisions. A pass under §7.5 of the Act declares the Student to be operating at mid-level.
