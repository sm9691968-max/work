# ADR 0004: Domain modules own their collections

## Status
Accepted

## Context
Auth, catalog, cart, orders, payments and admin all touch data. Without clear boundaries, collections get read and written from everywhere.

## Decision
Each module owns its collections and its endpoints. Cross-module data goes through the owning module's service, never by reading its collections directly.

## Consequences
- Clear ownership makes change and review easier.
- Some reads need a service call instead of a direct query.
- The admin module acts through module services rather than its own collections.
