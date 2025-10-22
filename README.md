# Ricafrente — Positions testing

This project exposes a simple NestJS API at `/positions` (in-memory storage by default).

How to run

1. Install dependencies:

```powershell
npm install
```

2. Start the app in dev mode (this project uses Nest CLI):

```powershell
npm run start:dev
```

3. Send requests

- Using Postman: send POST/GET/PUT/DELETE requests to `http://localhost:3000/positions`.
- Using VS Code REST Client extension: open `requests/positions.http` and click "Send Request" for each entry.

What you'll see

Responses include these fields: `position_id`, `id`, `position_code`, `position_name`, `created_at`, `updated_at` (and `update_at` alias) so they will appear in Postman responses.
