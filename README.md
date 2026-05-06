# feexample

Web stock workspace built with React, TypeScript, and Vite.

The app currently includes:

- Stock page with TradingView chart, rankings, search, and entity feeds
- Market page with indices, commodities, and FX billboard
- Sector page with keyword-based sector board, mind map, and related-stock queue

## Requirements

- Node.js 20 or later recommended
- npm

## How to run

1. Install dependencies.

```bash
npm install
```

2. Start the development server.

```bash
npm run dev
```

3. Open the local URL printed by Vite in the terminal.

Usually this is:

```text
http://localhost:5173
```

## Production build

Create a production build:

```bash
npm run build
```

Preview the built app locally:

```bash
npm run preview
```

## Lint

Run ESLint:

```bash
npm run lint
```

## Environment variables

This project can run without additional environment variables in its current state.

An example file is included:

```bash
.env.example
```

If you later wire in the Alpha Vantage service, create a `.env` file and set:

```bash
VITE_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
```

## Tech stack

- React 19
- TypeScript
- Vite
- TradingView embed
- @xyflow/react
