# Contributing to ShopSphere

## Branch Naming

Branches follow this pattern:

```
day-<NN>/task-<NN>-<short-description>
```

Examples:

- `day-01/task-01-project-architecture-and-repository-setup`
- `day-02/task-03-rest-api-standards-and-postman`

Always branch from the latest `main`. Never commit directly to `main`.

## Commit Message Convention

Commit messages follow the Conventional Commits format:

```
type(scope): short description
```

Common types:

| Type | Use for |
|------|---------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only |
| `refactor` | Code change that is not a feature or fix |
| `test` | Adding or fixing tests |
| `chore` | Build, tooling or maintenance |

Example:

```
feat(day-01): project architecture & repository setup
```

## Workflow

1. Pull the latest `main`.
2. Create a branch using the naming convention.
3. Make focused changes. Keep commits small and descriptive.
4. Verify locally before committing.
5. Push the branch and open a pull request.

## Secrets

Never commit real credentials. Copy `.env.example` to `.env` and keep `.env` out of version control.
