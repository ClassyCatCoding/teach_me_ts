---
name: statutory-skill-drafting
description: Use when writing or rewriting a skill (SKILL.md) so it reads like a statute: defined terms, numbered sections, shall/may/shall-not rules, precedence and failure provisions.
---

# Statutory Skill Drafting Act

## §1. Short Title and Purpose

1.1 This skill may be cited as the *Statutory Skill Drafting Act*.

1.2 The purpose of this Act is to govern how the Drafter writes a Skill, so that every Skill produced under it is unambiguous, internally consistent, and capable of only one compliant reading by an Operator.

## §2. Definitions

In this Act, unless the context clearly requires otherwise:

2.1 **"Drafter"** means the agent applying this Act to write or revise a Skill.

2.2 **"Skill"** means the SKILL.md file being drafted, including its frontmatter and body.

2.3 **"Operator"** means any agent that will later read and execute the Skill.

2.4 **"Principal"** means the human who requested the Skill.

2.5 **"Provision"** means any numbered section or subsection of a Skill.

2.6 **"Defined Term"** means a word or phrase given a fixed meaning in a Skill's Definitions section and written in Title Case with bold on first definition.

2.7 **"Operative Provision"** means a Provision that imposes a duty, grants a permission, or states a prohibition.

2.8 **"Commentary"** means a non-binding note, placed directly beneath a Provision, that states the reason for that Provision.

2.9 **"Trigger"** means a condition under which a Skill applies.

## §3. Scope of Application

3.1 This Act applies whenever the Principal asks the Drafter to create, rewrite, or convert a Skill, and whenever the Principal asks for a Skill "in legal style", "statutory form", "law language", or similar.

3.2 This Act does not apply to documents that are not Skills, unless the Principal expressly extends it to them.

## §4. Rules of Interpretation (binding on every Skill drafted)

4.1 **Modal verbs.** The Drafter shall use modal verbs with the following fixed meanings and no others:
  (a) "shall" — a mandatory duty;
  (b) "shall not" — a prohibition;
  (c) "may" — a permission that the Operator is free not to exercise;
  (d) "should" — a default the Operator follows unless a stated condition justifies departure.

4.2 The Drafter shall not use "must", "needs to", "try to", "ideally", "consider", or "be sure to" in an Operative Provision.

> *Commentary: Mixed modals force the Operator to guess relative weight. A fixed vocabulary makes priority legible at a glance.*

4.3 **Defined Terms.** Every noun that names a role, artifact, state, or threshold used more than once shall be a Defined Term. Once defined, the term shall be used identically throughout; synonyms are prohibited.

4.4 **Lists.** "Including" introduces a non-exhaustive list. "Means" introduces an exhaustive definition. "And" in a list is conjunctive; "or" is disjunctive unless stated as "and/or".

4.5 **Numbers.** Every quantitative limit shall state its unit and whether the bound is inclusive ("not more than 5") or exclusive ("fewer than 5").

## §5. Required Structure of a Skill

5.1 The Drafter shall compose every Skill with the following Provisions, in this order, numbered as shown:

| § | Heading | Content |
|---|---|---|
| 1 | Short Title and Purpose | One-sentence purpose; the outcome the Skill exists to produce. |
| 2 | Definitions | Every Defined Term, alphabetical or in order of first use. |
| 3 | Scope of Application | Triggers; express exclusions. |
| 4 | Inputs and Preconditions | What the Operator shall have or verify before acting. |
| 5 | Operative Provisions | Duties, permissions, prohibitions, each in its own subsection. |
| 6 | Procedure | Ordered steps, each referencing the Operative Provisions it executes. |
| 7 | Exceptions | Enumerated circumstances that modify §5 or §6. |
| 8 | Precedence | How conflicts between Provisions, and between the Skill and Principal instructions, are resolved. |
| 9 | Output Requirements | Format, location, naming, and content of every deliverable. |
| 10 | Default and Failure Provisions | What the Operator does when information is missing, a step fails, or no Provision applies. |
| 11 | Compliance Checklist | Verifiable conditions the Operator confirms before declaring completion. |

5.2 The Drafter may omit a Provision listed in §5.1 only if it would be empty, and shall then retain the heading with the text "[Reserved.]" so that numbering and cross-references remain stable.

5.3 The Drafter may add Schedules (appendices) after §11 for templates, examples, or reference tables. Schedules are binding only to the extent an Operative Provision incorporates them by reference.

## §6. Drafting Duties

6.1 **One rule per Provision.** Each Operative Provision shall impose exactly one duty, permission, or prohibition. Compound rules shall be split into lettered subsections.

6.2 **Actor and act.** Each Operative Provision shall name its actor (normally "the Operator") and state a concrete, observable act.

6.3 **Conditions first.** Where a rule is conditional, the condition shall precede the rule: "Where [condition], the Operator shall [act]."

6.4 **Cross-references.** Provisions shall refer to one another by section number ("subject to §7.2"), never by vague reference ("as above").

6.5 **Commentary.** The Drafter shall attach Commentary to any Provision whose reason is not self-evident. Commentary shall not exceed three sentences and shall not create new duties.

> *Commentary: Bare rules are followed literally and break in edge cases. A stated purpose lets the Operator apply the rule correctly to situations the Drafter did not foresee.*

6.6 **Precedence.** The Drafter shall state in §8 of every Skill, at minimum:
  (a) that the Principal's explicit, current instructions prevail over the Skill, except where the Skill records a safety or integrity constraint that it marks as non-overridable;
  (b) that a specific Provision prevails over a general one;
  (c) that a Prohibition prevails over a Permission on the same subject.

6.7 **Failure handling.** §10 of every Skill shall say, for each Precondition in §4, what the Operator does if it is not met: ask, assume a stated default, or stop.

6.8 **Verifiability.** Every item in the Compliance Checklist shall be answerable yes/no by inspecting the output.

6.9 **Frontmatter.** The `description` field shall be written in plain language, not statutory style, stating when the Skill applies in one sentence of not more than 200 characters.

> *Commentary: The description is read by a router deciding whether to load the Skill; it must be matched against user phrasing, which is plain language.*

## §7. Prohibitions

7.1 The Drafter shall not use a Defined Term before it is defined, except in §1.

7.2 The Drafter shall not write Provisions that can be satisfied in two incompatible ways.

7.3 The Drafter shall not include archaic legalese that carries no operative meaning ("hereinafter", "witnesseth", "said" as an adjective, "aforementioned").

7.4 The Drafter shall not place binding rules in Commentary or Schedules except as incorporated under §5.3.

## §8. Procedure for the Drafter

8.1 The Drafter shall:
  (a) elicit from the Principal, or extract from the conversation, the Skill's purpose, Triggers, Inputs, deliverables, and known edge cases;
  (b) list every recurring noun and convert each into a Defined Term;
  (c) draft §§1–11 in the order set out in §5.1;
  (d) apply the Ambiguity Test in §8.2 to every Operative Provision;
  (e) run the Compliance Checklist in §11 of this Act;
  (f) deliver the Skill to the Principal.

8.2 **Ambiguity Test.** For each Operative Provision, the Drafter shall ask: "Could a literal-minded Operator comply with this text and still produce the wrong result?" Where the answer is yes, the Drafter shall redraft or add Commentary.

8.3 Where the Principal's request leaves a material choice open (for example, whether the Operator should stop or proceed on missing input), the Drafter should ask the Principal; where the Principal is unavailable, the Drafter shall choose the safer default and record it in §10 of the Skill.

## §9. Precedence Within This Act

9.1 The Principal's explicit instructions prevail over this Act.

9.2 Where the Principal asks for a lighter form, the Drafter may reduce the structure in §5.1, but shall retain §2 (Definitions), §5 (Operative Provisions), §8 (Precedence), and §10 (Default and Failure Provisions).

## §10. Default Provisions

10.1 Where no Provision of this Act governs a drafting question, the Drafter shall choose the reading that minimises ambiguity for the Operator.

10.2 Where the Skill's subject matter is unknown to the Drafter, the Drafter shall mark the affected Provision "[To be confirmed by Principal]" rather than invent content.

## §11. Compliance Checklist for the Drafter

Before delivering, the Drafter shall confirm each of the following:

- [ ] Frontmatter `description` is plain language, one sentence, ≤200 characters.
- [ ] Sections §1–§11 are present, in order, or marked "[Reserved.]".
- [ ] Every Defined Term is defined in §2 before use and used identically thereafter.
- [ ] Only shall / shall not / may / should appear as modals in Operative Provisions.
- [ ] Each Operative Provision names an actor and one observable act.
- [ ] Every conditional rule states the condition first.
- [ ] All cross-references use section numbers.
- [ ] §8 of the Skill contains the three precedence rules in §6.6.
- [ ] §10 of the Skill handles every Precondition in §4.
- [ ] Every Compliance Checklist item in the Skill is yes/no verifiable.
- [ ] No binding rule sits in Commentary or an unincorporated Schedule.
- [ ] The Ambiguity Test (§8.2) has been applied to every Operative Provision.

---

## Schedule A — Skeleton

```markdown
---
name: <kebab-case-name>
description: <Plain-language sentence saying when to use this skill.>
---

# <Title> Act

## §1. Short Title and Purpose
1.1 This skill may be cited as the *<Title> Act*.
1.2 The purpose of this Act is to <outcome>.

## §2. Definitions
2.1 **"Operator"** means the agent executing this Act.
2.2 **"Principal"** means the human who invoked this Act.
2.3 **"<Term>"** means <exhaustive definition>.

## §3. Scope of Application
3.1 This Act applies where <Trigger>.
3.2 This Act does not apply to <exclusion>.

## §4. Inputs and Preconditions
4.1 Before acting, the Operator shall confirm <precondition>.

## §5. Operative Provisions
5.1 The Operator shall <act>.
> *Commentary: <why>.*
5.2 The Operator may <act>.
5.3 The Operator shall not <act>.

## §6. Procedure
6.1 The Operator shall, in order:
  (a) <step> (per §5.1);
  (b) <step>.

## §7. Exceptions
7.1 Where <condition>, §5.1 does not apply and the Operator shall instead <act>.

## §8. Precedence
8.1 The Principal's explicit, current instructions prevail over this Act, except §<n>, which is non-overridable.
8.2 A specific Provision prevails over a general Provision.
8.3 A prohibition prevails over a permission on the same subject.

## §9. Output Requirements
9.1 The Operator shall deliver <artifact> in <format> named <pattern>.

## §10. Default and Failure Provisions
10.1 Where §4.1 is not met, the Operator shall <ask | assume X | stop>.
10.2 Where no Provision applies, the Operator shall <default>.

## §11. Compliance Checklist
- [ ] <yes/no verifiable condition>
```

## Schedule B — Conversion Example (non-binding)

**Before (prose):** "Try to keep summaries short, and make sure you cite sources if possible."

**After (statutory):**

> 5.1 The Operator shall limit each Summary to not more than 150 words.
> 5.2 Where a Summary relies on a Source, the Operator shall cite that Source inline.
> 5.3 Where no Source is available, the Operator shall state "No source available" in place of a citation.
> *Commentary: "If possible" left the Operator free to skip citations silently; §5.3 makes the absence visible.*