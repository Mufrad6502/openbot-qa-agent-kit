# Playwright automation brief

QA Lead assigns the approved folder and test scope to Playwright Automation.

1. Inspect existing files and preserve unrelated work.
2. Map test cases to requirements and stable IDs.
3. Use TypeScript, Page Objects, reusable components, fixtures, environment
   configuration and independent test data. Prefer accessible roles, labels or
   documented test IDs. Configure the application's actual test-ID attribute.
4. Keep assertions in tests where practical. Avoid hard sleeps, brittle positional
   selectors, secret values in source, and shared mutable state between tests.
5. Capture traces/screenshots on failure; produce HTML and JUnit results.
6. Install dependencies and browsers only within the authorized task scope.
7. Run type checks and scoped tests. Diagnose failures without weakening expected
   behavior merely to make tests pass.
8. Return changed files, commands, actual results, report locations and gaps.

Suggested layout:

```text
automation/
  playwright.config.ts
  tsconfig.json
  package.json
  .env.example
  src/pages/
  src/components/
  src/fixtures/
  src/data/
  tests/
```

This is a framework brief, not a generated or tested automation implementation.
