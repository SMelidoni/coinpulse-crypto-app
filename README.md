# CoinPulse Crypto App

CoinPulse is a small demo project for browsing cryptocurrency market data. It shows the top 50 coins from CoinGecko, basic coin detail pages, beginner learning content, and the Fear & Greed Index.

This project is for educational purposes only. Cryptocurrency data may be delayed, cached, incomplete, or unavailable because it comes from third-party APIs. It should not be used for financial decisions.

## Live Site

https://coinpulse-crypto-app.vercel.app/

## Built With

- React
- TypeScript
- SCSS
- Vite
- [CoinGecko API](https://www.coingecko.com/en/api/documentation)
- [Alternative.me Fear & Greed Index API](https://alternative.me/crypto/fear-and-greed-index/)

## Features

- Top 50 cryptocurrency market table
- Coin detail pages with price, rank, symbol, and description
- Client-side API caching to reduce free API rate-limit issues
- Market data freshness messaging and educational-use disclaimer
- Beginner Learn section with accessible accordion tiles
- Fear & Greed Index with mobile and desktop sentiment summaries
- Initial loading gate and app-level error recovery screen

## Data Notes

CoinPulse uses public third-party API data and caches responses in the browser. Cached data helps avoid rate-limit issues, but it also means values may not reflect the latest market state.

API data can be delayed, missing, or temporarily unavailable. The app displays unavailable values as `N/A` where possible.

## Getting Started

### Prerequisites

- Node.js v18.16.0 or later
- npm

### Installation

Clone the repository:

```sh
git clone https://github.com/SMelidoni/coinpulse-crypto-app.git
cd coinpulse-crypto-app
```

Install dependencies:

```sh
npm install
```

Run the local dev server:

```sh
npm run dev
```

Open `http://localhost:5173` in your browser.

## Available Scripts

```sh
npm run dev
```

Starts the Vite dev server.

```sh
npm run build
```

Runs TypeScript checks and builds the production app.

```sh
npm run preview
```

Serves the production build locally.

## Deployment

The app is configured for Vercel with `vercel.json`. Vite builds to `dist`, and React Router routes are rewritten to `index.html`.

## Maintenance

This is an older demo project that has been cleaned up for stability and easier deployment. Ongoing feature work is not planned, but dependency/security updates may still be applied.
