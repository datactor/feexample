export type HeaderTab = 'Ranking' | 'Stock' | 'Company Info' | 'Related'
export type FooterTab = 'Chart' | 'News' | 'Earnings'
export type StockSymbol = 'NVDA' | 'AAPL' | 'MSFT' | 'AMZN' | 'TSLA'

export type ChartPoint = {
  time: string
  value: number
}

type StockMetric = {
  label: string
  value: string
}

type NewsItem = {
  source: string
  title: string
  summary: string
  timestamp: string
}

type EarningsItem = {
  date: string
  expectation: string
  focus: string
  title: string
}

type RelatedItem = {
  correlation: string
  name: string
  symbol: string
  theme: string
}

type StockSnapshot = {
  change: string
  company: string
  description: string
  marketCap: string
  metrics: StockMetric[]
  narrative: string
  price: string
  range: string
  sector: string
  signal: string
  ticker: string
}

type RankingItem = {
  company: string
  move: string
  rank: number
  signal: string
  symbol: StockSymbol
}

export const headerTabs: HeaderTab[] = ['Ranking', 'Stock', 'Company Info', 'Related']
export const footerTabs: FooterTab[] = ['Chart', 'News', 'Earnings']
export const stockUniverse: StockSymbol[] = ['NVDA', 'AAPL', 'MSFT', 'AMZN', 'TSLA']
export const defaultStockSymbol: StockSymbol = 'NVDA'

function buildSeries(startingPrice: number, dailyMoves: number[]): ChartPoint[] {
  let currentPrice = startingPrice

  return dailyMoves.map((move, index) => {
    currentPrice = Number((currentPrice + move).toFixed(2))

    return {
      time: `2026-04-${String(index + 7).padStart(2, '0')}`,
      value: currentPrice,
    }
  })
}

const stockSnapshots: Record<StockSymbol, StockSnapshot> = {
  NVDA: {
    ticker: 'NVDA',
    company: 'NVIDIA',
    price: '$942.31',
    change: '+2.84%',
    signal: 'Momentum breakout',
    description:
      'Semiconductor momentum remains strong while AI capex headlines keep the tape reactive.',
    marketCap: '$2.31T',
    sector: 'Semiconductors',
    range: '$531 - $974',
    narrative:
      'Use this panel as the default stock workspace: search symbol, inspect the chart, then pivot into news or earnings from the footer tabs.',
    metrics: [
      { label: 'RSI', value: '64.2' },
      { label: 'Volume', value: '42.1M' },
      { label: 'ATR', value: '24.8' },
      { label: 'Bias', value: 'Bullish' },
    ],
  },
  AAPL: {
    ticker: 'AAPL',
    company: 'Apple',
    price: '$213.40',
    change: '+1.16%',
    signal: 'Trend continuation',
    description:
      'Large-cap quality bid is holding while services revenue keeps analysts constructive.',
    marketCap: '$3.18T',
    sector: 'Consumer Electronics',
    range: '$164 - $220',
    narrative:
      'Apple works well as a steady trend template if you want a calmer chart profile and earnings-driven reactions.',
    metrics: [
      { label: 'RSI', value: '58.9' },
      { label: 'Volume', value: '51.4M' },
      { label: 'ATR', value: '4.2' },
      { label: 'Bias', value: 'Constructive' },
    ],
  },
  MSFT: {
    ticker: 'MSFT',
    company: 'Microsoft',
    price: '$468.11',
    change: '+1.94%',
    signal: 'Cloud leadership',
    description:
      'AI infrastructure commentary is supporting the bid while enterprise demand remains resilient.',
    marketCap: '$3.48T',
    sector: 'Software Infrastructure',
    range: '$309 - $474',
    narrative:
      'Microsoft is a useful benchmark for mega-cap AI leadership and relative strength versus the broader index.',
    metrics: [
      { label: 'RSI', value: '61.3' },
      { label: 'Volume', value: '28.4M' },
      { label: 'ATR', value: '7.8' },
      { label: 'Bias', value: 'Strong' },
    ],
  },
  AMZN: {
    ticker: 'AMZN',
    company: 'Amazon',
    price: '$197.66',
    change: '+0.88%',
    signal: 'Range expansion',
    description:
      'Retail margins and AWS narrative are both relevant, giving the ticker mixed but tradable catalysts.',
    marketCap: '$2.05T',
    sector: 'Internet Retail',
    range: '$118 - $201',
    narrative:
      'Amazon often sits between cyclical consumer demand and cloud growth, which makes it useful for blended macro and tech signals.',
    metrics: [
      { label: 'RSI', value: '56.7' },
      { label: 'Volume', value: '37.5M' },
      { label: 'ATR', value: '3.9' },
      { label: 'Bias', value: 'Balanced' },
    ],
  },
  TSLA: {
    ticker: 'TSLA',
    company: 'Tesla',
    price: '$196.72',
    change: '-1.43%',
    signal: 'Volatility watch',
    description:
      'High-beta price action keeps this name useful for testing alert logic and event-driven workflows.',
    marketCap: '$627B',
    sector: 'Auto Manufacturers',
    range: '$138 - $299',
    narrative:
      'Tesla is a useful stress test for your signal UX because news shifts quickly and chart structure changes fast.',
    metrics: [
      { label: 'RSI', value: '48.6' },
      { label: 'Volume', value: '94.8M' },
      { label: 'ATR', value: '8.4' },
      { label: 'Bias', value: 'Reactive' },
    ],
  },
}

const chartSeriesBySymbol: Record<StockSymbol, ChartPoint[]> = {
  NVDA: buildSeries(878, [8, 11, -4, 10, 9, -3, 12, 7, 6, -2, 8, 4]),
  AAPL: buildSeries(199, [1.2, 0.4, 1.1, -0.3, 1.6, 0.5, 0.8, 0.7, -0.2, 1.5, 0.9, 0.2]),
  MSFT: buildSeries(438, [3.4, 5.1, 2.4, -1.6, 4.3, 3.2, 2.6, 5.4, 1.7, 2.4, 0.9, 0.7]),
  AMZN: buildSeries(182, [1.9, 1.1, 0.8, -0.6, 1.4, 0.9, 1.6, 2.2, 0.4, 1.1, 0.7, 0.5]),
  TSLA: buildSeries(212, [-4.6, 2.8, -3.9, 5.1, -2.2, -1.6, 4.2, -3.1, 2.5, -4.4, -2.3, -2.1]),
}

const newsBySymbol: Record<StockSymbol, NewsItem[]> = {
  NVDA: [
    {
      source: 'Bloomberg',
      timestamp: '5m ago',
      title: 'AI server demand keeps GPU backlog elevated into next quarter',
      summary: 'Supply remains tight, giving the chart another momentum catalyst near highs.',
    },
    {
      source: 'Reuters',
      timestamp: '34m ago',
      title: 'Cloud vendors expand infrastructure guidance for accelerated AI workloads',
      summary: 'Higher capex guidance supports the semis basket and keeps NVIDIA in focus.',
    },
    {
      source: 'WSJ',
      timestamp: '1h ago',
      title: 'Chip ecosystem names climb as hyperscaler spending remains resilient',
      summary: 'Broad strength helps validate relative strength in the current tape.',
    },
    {
      source: 'MarketWatch',
      timestamp: '2h ago',
      title: 'Options flow shows traders leaning toward breakout continuation',
      summary: 'Useful if you want to fuse news and derivatives flow into the same dashboard.',
    },
  ],
  AAPL: [
    {
      source: 'CNBC',
      timestamp: '12m ago',
      title: 'Services growth offsets softer hardware mix in fresh analyst note',
      summary: 'Steady fundamentals keep the trend intact and reduce downside shock risk.',
    },
    {
      source: 'Reuters',
      timestamp: '47m ago',
      title: 'Apple suppliers guide for a modest second-half demand pickup',
      summary: 'Supply chain commentary offers a cleaner lens for near-term earnings expectations.',
    },
    {
      source: 'Barron\'s',
      timestamp: '1h ago',
      title: 'Buyback capacity remains a support pillar for large-cap tech rotation',
      summary: 'The name continues to act as a lower-volatility anchor in the basket.',
    },
    {
      source: 'The Information',
      timestamp: '3h ago',
      title: 'AI features stay central to the next device refresh cycle',
      summary: 'Narrative lift matters even when the chart is less explosive than pure AI plays.',
    },
  ],
  MSFT: [
    {
      source: 'Bloomberg',
      timestamp: '8m ago',
      title: 'Azure deal momentum remains firm as enterprise AI pilots expand',
      summary: 'Recurring enterprise demand keeps the trend durable and event risk manageable.',
    },
    {
      source: 'Reuters',
      timestamp: '51m ago',
      title: 'Microsoft highlights developer demand for AI tooling across cloud stack',
      summary: 'The theme reinforces leadership positioning inside the mega-cap cohort.',
    },
    {
      source: 'Financial Times',
      timestamp: '2h ago',
      title: 'Regulators review cloud competition while commercial demand stays robust',
      summary: 'Helpful if you want to display both opportunity and policy headline risk together.',
    },
    {
      source: 'Seeking Alpha',
      timestamp: '4h ago',
      title: 'Buy-side notes point to sustained margin resilience in productivity suite',
      summary: 'Keeps the fundamental backdrop aligned with the technical trend.',
    },
  ],
  AMZN: [
    {
      source: 'Reuters',
      timestamp: '16m ago',
      title: 'AWS order checks improve as enterprise optimization cycle matures',
      summary: 'Cloud sentiment helps offset mixed retail margin concerns.',
    },
    {
      source: 'Bloomberg',
      timestamp: '1h ago',
      title: 'Prime engagement trends remain healthy into the next promotional window',
      summary: 'Consumer-facing signals stay useful for seasonal dashboard widgets.',
    },
    {
      source: 'CNBC',
      timestamp: '2h ago',
      title: 'Street focuses on advertising mix as the next leg of margin upside',
      summary: 'Helpful if you want to expose segment-level drivers inside Company Info.',
    },
    {
      source: 'WSJ',
      timestamp: '4h ago',
      title: 'E-commerce logistics efficiency remains a key bull thesis',
      summary: 'A cleaner operating story can support range expansion on the chart.',
    },
  ],
  TSLA: [
    {
      source: 'Bloomberg',
      timestamp: '9m ago',
      title: 'Price-cut speculation returns as EV demand headlines remain noisy',
      summary: 'The name stays headline-sensitive, making it useful for alerting workflows.',
    },
    {
      source: 'Reuters',
      timestamp: '39m ago',
      title: 'Autonomy commentary lifts enthusiasm but margins remain under watch',
      summary: 'Event volatility remains central to the trade setup.',
    },
    {
      source: 'The Verge',
      timestamp: '2h ago',
      title: 'Software subscription narrative competes with delivery softness',
      summary: 'This tension is a good example of why news and chart need to live together.',
    },
    {
      source: 'MarketWatch',
      timestamp: '5h ago',
      title: 'Options traders brace for another wide post-headline range',
      summary: 'Useful if you plan to expand the footer with volatility analytics later.',
    },
  ],
}

const earningsBySymbol: Record<StockSymbol, EarningsItem[]> = {
  NVDA: [
    {
      date: '2026-05-22',
      title: 'Q1 earnings',
      expectation: 'EPS $6.18',
      focus: 'Datacenter growth, gross margin durability, next-quarter supply commentary.',
    },
    {
      date: '2026-08-21',
      title: 'Q2 earnings',
      expectation: 'Revenue $32.4B',
      focus: 'Hyperscaler mix and China exposure assumptions.',
    },
  ],
  AAPL: [
    {
      date: '2026-05-09',
      title: 'Q2 earnings',
      expectation: 'EPS $1.63',
      focus: 'Services growth, China demand, buyback scale.',
    },
    {
      date: '2026-08-01',
      title: 'Q3 earnings',
      expectation: 'Revenue $86.9B',
      focus: 'Upgrade cycle and margin mix.',
    },
  ],
  MSFT: [
    {
      date: '2026-04-28',
      title: 'Q3 earnings',
      expectation: 'EPS $3.22',
      focus: 'Azure growth, AI monetization, enterprise retention.',
    },
    {
      date: '2026-07-29',
      title: 'Q4 earnings',
      expectation: 'Revenue $68.2B',
      focus: 'Commercial bookings and capex trajectory.',
    },
  ],
  AMZN: [
    {
      date: '2026-05-01',
      title: 'Q1 earnings',
      expectation: 'EPS $1.07',
      focus: 'AWS acceleration, ad revenue, fulfillment efficiency.',
    },
    {
      date: '2026-08-02',
      title: 'Q2 earnings',
      expectation: 'Revenue $155.8B',
      focus: 'Retail margin and logistics leverage.',
    },
  ],
  TSLA: [
    {
      date: '2026-04-23',
      title: 'Q1 earnings',
      expectation: 'EPS $0.58',
      focus: 'Auto margin, delivery pace, autonomy roadmap.',
    },
    {
      date: '2026-07-24',
      title: 'Q2 earnings',
      expectation: 'Revenue $24.1B',
      focus: 'Volume recovery and software contribution.',
    },
  ],
}

const relatedBySymbol: Record<StockSymbol, RelatedItem[]> = {
  NVDA: [
    { symbol: 'MSFT', name: 'Microsoft', theme: 'Hyperscaler AI spend', correlation: 'High' },
    { symbol: 'AMZN', name: 'Amazon', theme: 'Cloud capacity build-out', correlation: 'Medium' },
    { symbol: 'AAPL', name: 'Apple', theme: 'Large-cap tech rotation', correlation: 'Medium' },
  ],
  AAPL: [
    { symbol: 'MSFT', name: 'Microsoft', theme: 'Mega-cap quality bid', correlation: 'High' },
    { symbol: 'AMZN', name: 'Amazon', theme: 'Consumer wallet share', correlation: 'Medium' },
    { symbol: 'NVDA', name: 'NVIDIA', theme: 'AI hardware narrative', correlation: 'Medium' },
  ],
  MSFT: [
    { symbol: 'NVDA', name: 'NVIDIA', theme: 'AI infrastructure', correlation: 'High' },
    { symbol: 'AMZN', name: 'Amazon', theme: 'Cloud enterprise demand', correlation: 'High' },
    { symbol: 'AAPL', name: 'Apple', theme: 'Mega-cap flows', correlation: 'Medium' },
  ],
  AMZN: [
    { symbol: 'MSFT', name: 'Microsoft', theme: 'Cloud competition', correlation: 'High' },
    { symbol: 'AAPL', name: 'Apple', theme: 'Consumer demand read-through', correlation: 'Medium' },
    { symbol: 'TSLA', name: 'Tesla', theme: 'Retail sentiment beta', correlation: 'Low' },
  ],
  TSLA: [
    { symbol: 'AAPL', name: 'Apple', theme: 'Consumer tech sentiment', correlation: 'Low' },
    { symbol: 'NVDA', name: 'NVIDIA', theme: 'Risk-on tech basket', correlation: 'Medium' },
    { symbol: 'AMZN', name: 'Amazon', theme: 'Growth stock flows', correlation: 'Low' },
  ],
}

export const rankingStocks: RankingItem[] = [
  { rank: 1, symbol: 'NVDA', company: 'NVIDIA', move: '+2.84%', signal: 'Breakout setup' },
  { rank: 2, symbol: 'MSFT', company: 'Microsoft', move: '+1.94%', signal: 'AI strength' },
  { rank: 3, symbol: 'AAPL', company: 'Apple', move: '+1.16%', signal: 'Trend continuation' },
  { rank: 4, symbol: 'AMZN', company: 'Amazon', move: '+0.88%', signal: 'Range expansion' },
  { rank: 5, symbol: 'TSLA', company: 'Tesla', move: '-1.43%', signal: 'Volatility watch' },
]

function normalizeSymbol(symbol: string): string {
  return symbol.trim().toUpperCase() || defaultStockSymbol
}

export function resolveStockSnapshot(symbol: string): StockSnapshot {
  const normalizedSymbol = normalizeSymbol(symbol)

  if (normalizedSymbol in stockSnapshots) {
    return stockSnapshots[normalizedSymbol as StockSymbol]
  }

  return {
    ...stockSnapshots[defaultStockSymbol],
    ticker: normalizedSymbol,
    company: 'Custom company slot',
    price: 'Connect feed',
    change: 'Custom',
    signal: 'Map your own signal logic',
    description: 'Unknown symbol fallback. Replace this resolver with your own market data source.',
    narrative:
      'The UI accepts custom symbols already. Wire this branch to your own backend or market API and return real profile data here.',
    marketCap: 'Custom market cap',
    sector: 'Custom sector',
    range: 'Custom range',
    metrics: [
      { label: 'Signal', value: 'Hook API' },
      { label: 'News', value: 'Hook API' },
      { label: 'Chart', value: 'Hook API' },
      { label: 'Earnings', value: 'Hook API' },
    ],
  }
}

export function resolveChartSeries(symbol: string): ChartPoint[] {
  const normalizedSymbol = normalizeSymbol(symbol)

  if (normalizedSymbol in chartSeriesBySymbol) {
    return chartSeriesBySymbol[normalizedSymbol as StockSymbol]
  }

  return chartSeriesBySymbol[defaultStockSymbol]
}

export function resolveNews(symbol: string): NewsItem[] {
  const normalizedSymbol = normalizeSymbol(symbol)

  if (normalizedSymbol in newsBySymbol) {
    return newsBySymbol[normalizedSymbol as StockSymbol]
  }

  return [
    {
      source: 'Custom feed',
      timestamp: 'Now',
      title: `${normalizedSymbol} is using the fallback news resolver`,
      summary: 'Replace resolveNews in src/data/mockStockData.ts with your own endpoint response.',
    },
  ]
}

export function resolveEarnings(symbol: string): EarningsItem[] {
  const normalizedSymbol = normalizeSymbol(symbol)

  if (normalizedSymbol in earningsBySymbol) {
    return earningsBySymbol[normalizedSymbol as StockSymbol]
  }

  return [
    {
      date: 'TBD',
      title: `${normalizedSymbol} earnings placeholder`,
      expectation: 'Add guidance',
      focus: 'Connect your earnings calendar provider and replace this mock item.',
    },
  ]
}

export function resolveRelated(symbol: string): RelatedItem[] {
  const normalizedSymbol = normalizeSymbol(symbol)

  if (normalizedSymbol in relatedBySymbol) {
    return relatedBySymbol[normalizedSymbol as StockSymbol]
  }

  return [
    {
      symbol: defaultStockSymbol,
      name: stockSnapshots[defaultStockSymbol].company,
      theme: 'Fallback related symbol',
      correlation: 'Custom',
    },
  ]
}