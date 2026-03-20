# AGENTS.md

## Cursor Cloud specific instructions

### Overview
This is **KY Mattress Guy Pro**, a single-page Create React App (CRA) quiz/training platform for mattress retail sales. It uses a **remote hosted Supabase** instance for auth and data persistence (hardcoded URL + anon key in `src/App.js`). There is no local backend.

### Node version
Use **Node.js 20** (via `nvm use 20`). CRA 5's webpack toolchain breaks on Node 22+ due to `ajv` module resolution issues.

### Dependency install
`npm install --legacy-peer-deps` is required because `react-scripts@5` declares `typescript@^3 || ^4` as a peer dependency, but the project uses `typescript@5.7`. After the main install, run `npm install ajv@8 --no-save --legacy-peer-deps` to fix a missing `ajv/dist/compile/codegen` error caused by `ajv-keywords@5` needing `ajv@8` while CRA hoists `ajv@6`.

### Key commands
| Task | Command |
|------|---------|
| Dev server | `npm start` (port 3000) |
| Build | `npm run build` |
| Lint | `npx eslint src/` |
| Test | `CI=true npx react-scripts test --env=jsdom --watchAll=false --passWithNoTests` |

### Notes
- The entire app lives in `src/App.js` (~4400 lines). There are no test files in the repository.
- Auth and database depend on the remote Supabase project at `iefgjjgoswtymucyqlzn.supabase.co`. Sign-up/sign-in requires valid credentials on that Supabase instance.
- No lockfile exists; `npm install` resolves fresh each time.
