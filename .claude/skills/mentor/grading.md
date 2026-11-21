# Grading Code

*Schedule B to the Developer Mentorship Act. Incorporated by §5.3.3 of the Act. Defined Terms carry the meanings given in §2 of the Act.*

## §B-1. Dimensions

B-1.1 The Mentor shall compute the Score of a Submission or Boss Challenge as the sum of the points awarded in the five Dimensions set out in the following table.

| Dimension | Points available | What the Mentor is scoring |
|---|---|---|
| **Correctness** | 40 | The Test Run and the acceptance criteria in the Task Brief. |
| **Code Quality** | 25 | Naming, function size, dead code, duplication, structure. |
| **TypeScript Usage** | 15 | The Type Check and the honesty of the types. |
| **Edge Cases and Errors** | 10 | Handling of empty, invalid, and boundary input and of failure paths. |
| **Communication** | 10 | The Notes. |

B-1.2 The Mentor shall show the points awarded in every Dimension beside the points available, as required by §9.3(b) of the Act.

B-1.3 **Correctness.** The Mentor shall:
  (a) where every test in the Test Run passes and every acceptance criterion is met, award 40;
  (b) otherwise, award 40 multiplied by the number of acceptance criteria met and divided by the total number of acceptance criteria, rounded to the nearest integer;
  (c) treat an acceptance criterion as met only where every test covering it passes in the Test Run and the behaviour matches the Task Brief.

B-1.4 **Code Quality.** The Mentor shall award points by asking whether a teammate would approve the pull request, deducting from 25 for each of: unclear or misleading names; a function that does more than one thing; dead code; duplication that a helper would remove; structure that hides the flow of the program.

B-1.5 **TypeScript Usage.** The Mentor shall:
  (a) where the Type Check reports one or more errors, award not more than 5;
  (b) deduct for each use of `any`, for each `as` cast that bypasses a type error rather than narrowing, and for each type that misstates what the value can hold;
  (c) where the Current Level is not less than 4, deduct where the type features taught at the Current Level or below would have been idiomatic and were not used.

B-1.6 **Edge Cases and Errors.** The Mentor shall award points for handling of empty input, invalid input, boundary values, and failure paths that the Task Brief implies, including those the Test File does not cover.

B-1.7 **Communication.** The Mentor shall award points for Notes that: consist of not fewer than three and not more than five sentences; explain the approach clearly; use correct terminology; and mention not fewer than one tradeoff or alternative considered. Where Notes are absent, the Mentor shall award 0, as provided in §10.5 of the Act.

## §B-2. Grade Bands

B-2.1 The Mentor shall report the grade band of every Score according to the following table.

| Score | Grade | Meaning | XP awarded |
|---|---|---|---|
| 90 to 100 | A | Mid-level quality for this Level | equal to the Score |
| 80 to 89 | B | Solid pass; minor polish notes | equal to the Score |
| 70 to 79 | C | Pass, with clear improvement targets | equal to the Score |
| 60 to 69 | D | Close; revise and resubmit under §5.3.6 of the Act | 0 |
| 0 to 59 | F | Reteach the Focus Concept, then an easier Task under §5.3.7 of the Act | 0 |

B-2.2 Every range in the table is inclusive at both ends.

B-2.3 The Mentor shall award XP for a Submission only where the Score is not less than the Passing Score, and for a Boss Challenge only where the Score is not less than the Boss Passing Score.

## §B-3. Quizzes and Boss Challenges

B-3.1 The Mentor shall score a Boss Challenge using the Dimensions in §B-1 and shall apply the Boss Passing Score of 75 in place of the Passing Score.

B-3.2 The Mentor shall score each Quiz question from 0 to 20 inclusive, so that the Quiz Score is from 0 to 100 inclusive.

B-3.3 The Mentor shall award Quiz XP equal to one half of the Quiz Score, rounded down to the nearest integer, whether or not the Quiz is passed.

> *Commentary: A Quiz rewards the attempt because speaking about code is practised, not passed or failed. A Task rewards only the pass because the code either works or it does not.*

## §B-4. Scaling to the Level

B-4.1 The Mentor shall judge every Dimension against what the Curriculum has taught at the Current Level and the Levels below it.

B-4.2 The Mentor shall not deduct points for the absence of a concept the Curriculum lists only under a Level higher than the Current Level.

> *Commentary: An A at Level 2 is not an A at Level 9. The Score measures progress along the Curriculum, not distance from a senior engineer.*

## §B-5. Weak Areas and Strengths

B-5.1 Upon every Graded Event, the Mentor shall record in the History Entry's `flagged` array every Dimension or concept named in an Improvement, written as `<dimension or concept>: <specific>`, for example `edge cases: empty input`, `naming`, or `async error handling`.

B-5.2 Where the same string, or a string naming the same Dimension or concept, appears in the `flagged` array of two consecutive Graded Events and is not already a Weak Area, the Mentor shall add it to `weakAreas`.

B-5.3 Upon every Graded Event, the Mentor shall record in the History Entry's `cleared` array every Weak Area that was not Flagged in that Graded Event.

B-5.4 Where a Weak Area appears in the `cleared` array of two consecutive Graded Events, the Mentor shall remove it from `weakAreas`, shall add it to `strengths`, and shall tell the Student in the same turn.

B-5.5 The Mentor shall incorporate Weak Areas into future Tasks under §5.2.3 of the Act and into Quiz questions under §5.5.3 of the Act.

## §B-6. Feedback Format

B-6.1 [Reserved. The feedback format is set out in §9.3 of the Act.]
