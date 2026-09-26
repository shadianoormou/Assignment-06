# FitLog

FitLog is a focused workout library and daily training planner built for people who want a clear, distraction-free way to structure their training. Browse exercises from the FitLog API, study the details, save movements for later, or build a five-lift plan for today.

## Live links

- **Live application:** [fit-log-assignment-06-mu.vercel.app](https://fit-log-assignment-06-mu.vercel.app)
- **Source repository:** [github.com/shadianoormou/Assignment-06](https://github.com/shadianoormou/Assignment-06)

## Product highlights

- Browse a responsive library of exercises covering major muscle groups.
- Open dynamic detail pages with equipment, difficulty, sets, reps, stats and instructions.
- Add exercises to a five-lift daily plan or save them for a future session.
- Track total exercises, minutes and estimated calories for today’s plan.
- Mark completed lifts, remove items, search the library and sort by duration, calories or rating.
- Keep plan and saved items between sessions with browser localStorage.
- Get clear loading states, retry feedback, toast notifications and a custom 404 page.

## Technology

- Next.js 14 with the App Router
- React 18
- JavaScript
- Tailwind CSS with a custom dark visual system
- Lucide React icons
- FitLog Workout API
- Vercel deployment

## Application routes

| Route | Purpose |
| --- | --- |
| `/` | Hero section and searchable workout library |
| `/workout/[id]` | Dynamic workout details and plan actions |
| `/my-plan` | Today’s Plan and Saved workout lists |
| Any unknown route | Custom 404 page |

## Getting started

### Prerequisites

- Node.js 18.17 or newer
- pnpm 9 or newer

### Installation

```bash
git clone https://github.com/shadianoormou/Assignment-06.git
cd Assignment-06
pnpm install
```

### Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Create a production build

```bash
pnpm build
pnpm start
```

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Starts the local development server |
| `pnpm build` | Creates an optimized production build |
| `pnpm start` | Serves the production build |
| `pnpm lint` | Runs the Next.js lint command |
| `pnpm verify:routes` | Checks the home, plan and detail routes |

To run the route smoke check against a deployed URL:

```bash
pnpm verify:routes https://fit-log-assignment-06-mu.vercel.app
```

## API

FitLog consumes the following public API endpoints:

```text
All workouts:    https://api.api-store.workers.dev/api/fitlog
Workout detail:  https://api.api-store.workers.dev/api/fitlog/:id
```

The client shows a loading skeleton while data is requested, validates the response shape, times out slow requests and provides a retry action when the library cannot be loaded.

## Project structure

```text
app/                 App Router pages, routes and global styles
components/          Reusable UI and page components
context/             Workout and toast state providers
lib/                 API helpers
assets/              Brand and hero artwork
scripts/             Deployment smoke-check utility
```

## Deployment

The project is configured for Next.js-compatible hosts. The included `vercel.json` uses pnpm with a frozen lockfile and runs the production build automatically.

Before submitting a deployment, verify:

1. The home page loads workout data.
2. A dynamic detail URL works after a direct reload.
3. `/my-plan` loads and preserves localStorage state.
4. The layout works on mobile, tablet and desktop widths.
5. The browser console is free of runtime errors.

## Design direction

FitLog uses a dark, editorial gym aesthetic with high-contrast typography, acid-lime actions and restrained red highlights. The interface is intentionally compact and information-led so that the next training decision stays obvious.
