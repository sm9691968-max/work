# API Standards

Every ShopSphere endpoint follows one response contract. This keeps the client, the tests and the Postman collection consistent.

## Success Envelope

```json
{
  "success": true,
  "message": "Items retrieved",
  "data": {},
  "meta": {}
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `success` | boolean | Yes | Always `true` |
| `message` | string | Yes | Short human-readable summary |
| `data` | object \| array | Yes | The payload (`null` when there is nothing to return) |
| `meta` | object | No | Pagination or request metadata |

## Error Envelope

```json
{
  "success": false,
  "message": "Product not found",
  "error": {
    "code": "NOT_FOUND",
    "details": {}
  }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `success` | boolean | Yes | Always `false` |
| `message` | string | Yes | Human-readable error message |
| `error.code` | string | Yes | Stable machine-readable code |
| `error.details` | object | No | Field-level validation or context |

`error.stack` is only included outside production.

## Status Codes

| Code | Meaning | When to use |
|------|---------|-------------|
| 200 | OK | Successful read or update |
| 201 | Created | A resource was created |
| 204 | No Content | Success with no body (deletes) |
| 400 | Bad Request | Malformed input or failed validation |
| 401 | Unauthorized | Missing or invalid credentials |
| 403 | Forbidden | Authenticated but not allowed |
| 404 | Not Found | Resource does not exist |
| 409 | Conflict | Duplicate or state conflict |
| 422 | Unprocessable Entity | Valid syntax, semantically invalid |
| 500 | Internal Server Error | Unexpected server failure |

Recommended error codes: `VALIDATION_ERROR`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `CONFLICT`, `INTERNAL_ERROR`.

## Pagination

Paginated list endpoints accept three query parameters.

| Parameter | Type | Default | Constraints | Description |
|-----------|------|---------|-------------|-------------|
| `page` | integer | `1` | `>= 1` | Page number, 1-based |
| `limit` | integer | `10` | `1..100` | Items per page |
| `sort` | string | `-createdAt` | field name, optional leading `-` | Sort field; `-` means descending |

Example:

```
GET /api/products?page=2&limit=20&sort=-price
```

Paginated responses put the paging summary in `meta.pagination`:

```json
{
  "success": true,
  "message": "Products retrieved",
  "data": [],
  "meta": {
    "pagination": {
      "page": 2,
      "limit": 20,
      "total": 240,
      "pages": 12
    }
  }
}
```

Clients should treat `meta.pagination` as the source of truth for total counts and page bounds.
