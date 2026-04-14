# Deploy Check Agent Guide

## Goal
- Keep UI/design unchanged.
- Keep existing feature logic intact.
- Fix only build/deploy/runtime blockers with minimal diff.

## Pre-check
- Confirm `npm install` completes without error.
- Confirm `npm run build` succeeds.
- Confirm `package.json` has `dev`, `build`, `start`.

## Git hygiene
- Ensure `.gitignore` includes `node_modules`, `.next`, `.env`, build outputs, and `.vercel`.
- Do not commit secrets (`.env`, service keys).
- If junk files were already tracked, use untrack commands only (do not delete local files).

## Env checklist
- Verify only required env vars are used in code.
- Prepare Vercel env vars with exact names and values.
- Block deployment if required env vars are missing.

## Vercel checklist
- Detect framework (this project is Vite + React).
- Ensure output directory matches build config.
- Ensure SPA rewrite to `/index.html` is configured.

## Supabase checklist
- Allow only `anon` key on client side.
- Reject any client exposure of `service_role` key.
- Verify URL/key names match `import.meta.env` usage.

## Final verification
- Re-run `npm run build`.
- Smoke-check key routes (`/`, `/pricing`, `/contact`, `/request`, `/admin/login`).
- Document changed files and deployment steps.
