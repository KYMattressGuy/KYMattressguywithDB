# AGENTS.md

## Cursor Cloud specific instructions

### Overview
**KY Mattress Guy Pro** is a Next.js 16 Progressive Web App — a quiz/training platform for mattress retail sales. It uses a remote hosted Supabase instance for auth and data persistence (config in `lib/supabase.js`). There is no local backend.

### Node version
Use **Node.js 20** via `nvm use 20`. Next.js 16 + Supabase SDK require Node >= 20.

### Dependency install
Run `npm install` from the workspace root. No special flags needed (the `package-lock.json` handles resolution).

### Key commands
| Task | Command |
|------|---------|
| Dev server | `npm run dev` (port 3000) |
| Build | `npm run build` |
| Lint | `npx eslint app/ lib/` |
| Test | No test files exist yet |

### Project structure
```
app/              → Next.js App Router pages and components
  components/     → Auth, Home, Quiz, Board, Manager, Spinner
  layout.js       → Root layout (metadata, viewport, PWA)
  page.js         → Main client page (session management, routing)
  globals.css     → Tailwind CSS imports and custom theme
lib/              → Shared modules
  questions.js    → 332-question bank data
  constants.js    → Categories (CATS), ranks (RANKS)
  utils.js        → getRank(), shuffle()
  supabase.js     → Supabase client init
public/           → Static assets, PWA manifest, icons
```

### Notes
- Auth and database depend on the remote Supabase project. Sign-up/sign-in requires valid credentials on that instance.
- PWA support via `next-pwa` — service worker is disabled in development mode and only generated during production builds.
- Tailwind uses custom theme colors: `navy` (#1B2B4B), `gold` (#C9A84C), `light` (#F7F8FA) defined in `app/globals.css`.
- ESLint uses `eslint-config-next` flat config in `eslint.config.mjs`.
