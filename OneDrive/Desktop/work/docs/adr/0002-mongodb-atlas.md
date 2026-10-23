# ADR 0002: MongoDB Atlas as the datastore

## Status
Accepted

## Context
ShopSphere needs a hosted database that is free to start and low to operate. The data is document-shaped (products with variants, carts, orders).

## Decision
Use MongoDB Atlas on the free M0 tier with a database user scoped to the `shopsphere` database only.

## Consequences
- No server to run. The connection string lives in `MONGODB_URI`.
- The least-privilege user limits blast radius.
- The free tier has storage and throughput limits that suit development and demos.
