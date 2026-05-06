import type { ChartCandle } from '../data/stockWorkspaceData'

type QuickFact = {
  label: string
  value: string
}

export type LiveStockData = {
  asOf: string
  chartSeries: ChartCandle[]
  change: string
  price: string
  quickFacts: QuickFact[]
}

type AlphaVantageDailyResponse = {
  'Error Message'?: string
  Information?: string
  Note?: string
  'Time Series (Daily)'?: Record<
    string,
    {
      '1. open': string
      '2. high': string
      '3. low': string
      '4. close': string
      '5. volume': string
    }
  >
}

const alphaVantageApiKey = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY?.trim() ?? ''

export function hasAlphaVantageApiKey() {
  return alphaVantageApiKey.length > 0
}

function formatUsd(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value)
}

function formatCompactNumber(value: number) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export async function fetchAlphaVantageDailySeries(symbol: string, signal?: AbortSignal) {
  if (!hasAlphaVantageApiKey()) {
    throw new Error('missing-api-key')
  }

  const endpoint = new URL('https://www.alphavantage.co/query')
  endpoint.searchParams.set('function', 'TIME_SERIES_DAILY')
  endpoint.searchParams.set('symbol', symbol)
  endpoint.searchParams.set('outputsize', 'compact')
  endpoint.searchParams.set('apikey', alphaVantageApiKey)

  const response = await fetch(endpoint, { signal })

  if (!response.ok) {
    throw new Error('request-failed')
  }

  const payload = (await response.json()) as AlphaVantageDailyResponse

  if (payload['Error Message'] || payload.Information || payload.Note) {
    throw new Error(payload['Error Message'] ?? payload.Information ?? payload.Note ?? 'api-error')
  }

  const dailySeries = payload['Time Series (Daily)']

  if (!dailySeries) {
    throw new Error('missing-daily-series')
  }

  const sortedEntries = Object.entries(dailySeries).sort(([left], [right]) =>
    left.localeCompare(right),
  )
  const latestEntries = sortedEntries.slice(-30)

  if (latestEntries.length < 2) {
    throw new Error('insufficient-series-data')
  }

  const chartSeries: ChartCandle[] = latestEntries.map(([date, values]) => ({
    time: date,
    open: Number(values['1. open']),
    high: Number(values['2. high']),
    low: Number(values['3. low']),
    close: Number(values['4. close']),
  }))

  const [, previousDayValues] = latestEntries.at(-2) ?? []
  const [, latestDayValues] = latestEntries.at(-1) ?? []

  if (!previousDayValues || !latestDayValues) {
    throw new Error('missing-latest-values')
  }

  const latestClose = Number(latestDayValues['4. close'])
  const previousClose = Number(previousDayValues['4. close'])
  const percentageChange = ((latestClose - previousClose) / previousClose) * 100
  const signedChange = `${percentageChange >= 0 ? '+' : ''}${percentageChange.toFixed(2)}%`

  return {
    asOf: latestEntries.at(-1)?.[0] ?? 'latest close',
    chartSeries,
    change: signedChange,
    price: formatUsd(latestClose),
    quickFacts: [
      { label: 'Open', value: formatUsd(Number(latestDayValues['1. open'])) },
      { label: 'High', value: formatUsd(Number(latestDayValues['2. high'])) },
      { label: 'Low', value: formatUsd(Number(latestDayValues['3. low'])) },
      { label: 'Volume', value: formatCompactNumber(Number(latestDayValues['5. volume'])) },
    ],
  }
}