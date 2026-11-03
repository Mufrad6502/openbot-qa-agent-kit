# OpenBot QA Agent Kit

A reusable, sanitized snapshot of a seven-agent OpenBot setup for everyday QA and requested desktop tasks. OpenBot remains the main interface. OpenCode is the model provider used by this setup; this repository is configuration and guidance, not the OpenBot or OpenCode application source code.

This is a manual setup kit, **not a native OpenBot import or a full backup**. It intentionally excludes conversation history, completed project work, browser profiles, logged-in sessions, credentials, and the live OpenBot database.

## Files

- [Agent definitions](snapshot/agents.json): the seven actual names, descriptions, models and access settings captured from the installation.
- [Playwright connection example](config/playwright-mcp.example.json): portable connection fields with a profile-path placeholder.
- [Task brief](templates/task-brief.md), [test cases](templates/test-cases.csv), [project knowledge](templates/project-knowledge.md), [QA report](templates/qa-report.md), and [automation brief](templates/automation-brief.md): reusable starting points.
- [Read-only exporter](scripts/export-openbot.mjs): selects only the seven named agents and approved configuration fields from the source database. It refuses to overwrite an existing export directory.

To refresh a snapshot locally, provide the actual database path and a new output directory:

```sh
node scripts/export-openbot.mjs /path/to/openbot.db snapshot-new
```

The exporter requires Node.js and the `sqlite3` command. It is tailored to the observed database schema; review exported text before sharing. It does not export conversations, memories, tasks, credentials or browser data, and does not modify the live database.

## Included agent roles

| Agent | Responsibility |
| --- | --- |
| QA Lead | Receives the task, agrees scope, assigns relevant workers, checks their results, and returns a consolidated response. |
| Product Discovery | Maps pages, navigation, roles, controls, rules, and open questions. Starts in discovery-only mode and does not declare bugs. |
| Manual QA | Executes functional, exploratory, negative, boundary, regression, responsive, and accessibility checks within the assigned scope. |
| API QA | Checks authorized API contracts, responses, errors, and consistency with the interface. |
| Test Case & Reporting | Produces traceable test cases and compiles evidence and reports from observed results. |
| Playwright Automation | Builds or extends TypeScript tests using Page Object Model, fixtures, stable locators, and failure evidence. |
| Do What I Say | Carries out explicitly requested desktop tasks using the access granted in OpenBot and macOS. |

Agents are instructed to stay idle until the user or QA Lead assigns work. There is no background schedule supplied by this kit.

## Set up in OpenBot

1. Inspect your installed OpenBot version, available models, tools, and permissions. UI labels and supported features may differ from the source installation.
2. Create the seven agents in OpenBot and copy the corresponding names and role instructions from the exported definitions. On an existing installation, compare definitions first and apply only intended edits; do not create duplicates unnecessarily.
3. Select an available free execution model. The source setup used OpenCode's **DeepSeek V4.1 Flash Free**. Availability and free pricing are not guaranteed. Require approval before switching to a paid model; GPT review is optional and requires an available, authorized connection.
4. Add the Playwright MCP configuration using a new, dedicated **QA Test** Chrome user-data directory appropriate to your machine. Replace any documented placeholders before use. Keep this profile separate from personal and work profiles.
5. Grant only the permissions you intend to use. The source agents were configured for Full Access and Computer Use at the user's request. Those settings can permit commands and file changes without per-tool approval; they are not required for every QA task. macOS Accessibility and Screen Recording are needed for desktop control, while individual apps may require additional permissions.
6. Give QA Lead a small test task and verify the requested worker runs, evidence is saved, and the result returns to the lead. Check each capability you intend to rely on before unattended use.

**Preserve an existing installation:** never replace its database, agent directories, memory files, or Chrome user-data directories with this repository. Do not reset sessions or terminate other active agent tasks to install this kit. Role instructions and example configuration can be copied without importing private runtime state.

## Daily workflow

Send QA work to **QA Lead** in OpenBot. Include the target URL or app, environment, feature, relevant requirements, intended browser profile, and allowed changes. For code work, include the exact project folder and definition of done.

The lead follows this flow as needed:

1. **Task and scope:** identify the requested result, environment, test data, and permitted actions.
2. **Discovery:** explore the assigned app and return an understanding report separating verified behavior from assumptions and unanswered questions.
3. **Testing and test design:** assign manual or API checks, create test cases with IDs and expected outcomes, and record actual outcomes with evidence.
4. **Reporting:** consolidate pass/fail results, reproducible observations, coverage gaps, and evidence references. Request a PDF explicitly when needed and verify the delivered file.
5. **Automation:** on request, assign Playwright Automation to the approved folder, inspect existing code, install approved dependencies, implement TypeScript/POM tests, run them, and report results and remaining blockers.

Keep project knowledge in the project workspace: requirements, confirmed behavior, unresolved questions, test cases, run reports, and an evidence index. Record the source and date of observations. Do not put credentials or browser session files in project knowledge or Git.

### Example requests

> QA Lead: Explore the demo application using the QA Test profile. Start with discovery only. List pages, user journeys, business rules you observed, assumptions, and questions. Do not begin checkout or file bugs.

> QA Lead: Test the login feature against these requirements in the test environment. Generate test cases, record expected and actual results, capture evidence, and deliver a PDF report with coverage gaps.

> QA Lead: In the project folder I specify, create or extend a Playwright TypeScript POM framework for the approved login cases. Install the required dependencies and run the suite. Continue until the agreed cases pass or explain a concrete blocker. Return changed files, test results, and report locations.

For an existing Chrome profile, name the exact profile and task. Desktop control may operate its active sessions, but this kit does not connect Playwright MCP to existing personal sessions automatically. Preserve other open windows and ongoing work.

## Verified behavior and known gaps

- The source setup successfully delegated an automation assignment from QA Lead to Playwright Automation. Its scoped demo suite reported **22 passing tests**, with TypeScript/POM structure and HTML/JUnit results. The demo project and its private working state are not included here.
- **Bug Investigation and independent QA Review were mentioned in workflow instructions but were not configured as separate agents in the seven-agent snapshot.** Treat those delegation targets as missing until you explicitly create and validate them. QA Lead checking a worker's output is not the same as an independent review agent.
- **PDF reporting is specified in the role instructions but was not verified end to end.** Do not treat the instruction alone as proof that a PDF generator is installed or that a PDF was delivered.
- A shared persistent browser profile must be used by one worker at a time. Coordinate through QA Lead; do not delete profile locks or stop another worker's browser to resolve contention.
- Prompts express intended behavior, not a security boundary. OpenBot permissions, model-provider approval rules, browser permissions, and macOS protections still apply. “Full Access” does not guarantee that every task can run without a prompt.

## Repository hygiene

Review every staged file before pushing. Keep API keys, tokens, environment secrets, cookies, storage state, profile databases, private screenshots, chat exports, and runtime databases out of Git. Use example values in shared configuration, and store actual credentials through the mechanisms supported by your local installation.

This repository supplies reusable definitions and a documented workflow. Reusing it does not change or remove the sessions or completed work on the source machine.
