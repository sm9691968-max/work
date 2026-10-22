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

Each package ships a `.env.example` template:

- `client/.env.example`
- `server/.env.example`

## Conventions

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch and commit conventions.

## License

MIT
