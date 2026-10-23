# ADR 0001: Single repository with client and server

## Status
Accepted

## Context
ShopSphere is a 30-day build. We need one place for the frontend, the backend and the documentation so changes stay in step.

## Decision
Use a single repository with `/client` and `/server` folders and shared `docs/`.

## Consequences
- One history, one pull request per task.
- Shared tooling and conventions are easy to apply.
- The client and the server deploy separately but are versioned together.
