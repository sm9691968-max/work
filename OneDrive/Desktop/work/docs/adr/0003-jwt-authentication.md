# ADR 0003: JWT-based authentication

## Status
Accepted

## Context
The client is a separate single-page app. It needs stateless authentication that scales and keeps the API free of session state.

## Decision
Use short-lived JWT access tokens with refresh tokens. The auth provider issues tokens; the API verifies them in middleware.

## Consequences
- The API stays stateless and horizontal scaling is simple.
- The client must store tokens safely and refresh them.
- Token revocation needs a refresh-token store or a deny list.
