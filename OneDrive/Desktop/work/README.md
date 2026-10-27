# ShopSphere

ShopSphere is a full-stack e-commerce platform delivered as a single monorepo with a React + TypeScript + Tailwind client and a Node + Express server.

## Scope

- Product catalog, cart and checkout flows
- User authentication and accounts
- REST API backed by MongoDB
- Shared conventions for branches, commits and API responses

## Repository Layout

```
shopsphere/
├── client/          # React + TypeScript + Tailwind frontend
│   ├── public/
│   └── src/
├── server/          # Node + Express backend
│   └── src/
│       ├── config/
│       ├── middleware/
│       └── routes/
├── docs/            # Architecture and API standards
├── postman/         # API collection and environments
├── .gitignore
├── CONTRIBUTING.md
└── README.md
```

## Setup

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB (local or Atlas)

### Client

```bash
cd client
npm install
npm run dev
```

### Server

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

The server reads configuration from `server/.env`. Copy the template and fill in your own values. Never commit real secrets.

## Environment Variables

The server loads `server/.env` through `server/src/config/env.js` and validates
the values before it starts. Copy `server/.env.example` to `server/.env` for
development. The client reads `VITE_API_URL` from `client/.env`; copy its
example template to configure the API base URL. The root `.gitignore` excludes
`.env` files while keeping `.env.example` templates trackable. Never commit
local values or production secrets.

| Variable | Required | Default | Description and validation |
| --- | --- | --- | --- |
| `NODE_ENV` | No | `development` | Selects `development` or `production`; other values are rejected. |
| `PORT` | No | `5000` | Integer from 1 to 65535. |
| `MONGODB_URI` | Production only | `mongodb://localhost:27017/shopsphere` in development | Must use `mongodb://` or `mongodb+srv://`. |
| `JWT_SECRET` | Yes | None | Required in both modes. Production requires a non-placeholder value of at least 32 characters. |
| `JWT_EXPIRES_IN` | No | `7d` | Duration such as `15m`, `7d`, or `1y`. |
| `CLIENT_URL` | Production only | `http://localhost:5173` in development | Must be a valid URL; production requires `https://`. |
| `VITE_API_URL` | No | `http://localhost:5000/api` | Client build-time base URL for the server API. |

Production has no local database or client URL fallback. Set `NODE_ENV=production`
and provide `MONGODB_URI`, `JWT_SECRET`, and `CLIENT_URL` before starting the
server. `PORT` and `JWT_EXPIRES_IN` keep their documented defaults when omitted.

## Conventions

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch and commit conventions.

## License

MIT
