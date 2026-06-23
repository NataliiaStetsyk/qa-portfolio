# AI-Assisted Testing — My Workflow

AI tooling is part of my daily QA practice. I use it as a force multiplier for
coverage and speed — not as a replacement for test thinking. Below is how I
actually use it, with guardrails.

## Where I use it
1. **Test-case generation from requirements.** I feed a user story or acceptance
   criteria to an AI assistant and ask for candidate cases across happy path,
   negative, and boundary conditions. I then prune, correct, and prioritize —
   the model widens the net; I own the judgment.
2. **Scaffolding automation.** Generating Page Object boilerplate and first-draft
   specs, which I refactor for stable selectors and meaningful assertions.
3. **Exploratory idea expansion.** Asking "what edge cases am I missing for a
   checkout form?" to surface inputs I might not have listed (Unicode names,
   very long strings, leading/trailing spaces, locale-specific ZIPs).
4. **Bug-report drafting.** Turning rough notes into clear, reproducible reports
   with steps, expected/actual, and severity.

## Guardrails (important)
- **No proprietary data into prompts** — only public/demo apps and synthetic data.
- **Every AI output is reviewed and verified** before it enters the suite; I treat
  generated code as a draft, not a source of truth.
- **Selectors and assertions are validated against the real app**, never trusted blindly.
- **Determinism over cleverness** — I reject flaky, over-engineered suggestions.

## Why it matters for AI products
Testing AI-driven features (agents, copilots, LLM outputs) needs a different
mindset than deterministic apps: non-deterministic outputs, prompt-injection and
safety checks, evaluation rubrics rather than exact-match assertions, and
regression on prompts/behaviors. I'm comfortable designing this kind of
evaluation-based QA — which is increasingly where quality work is heading.
