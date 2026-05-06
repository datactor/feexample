import {
  filterStockSearchOptions,
  findExactStockSearchOption,
  type StockSearchMarket,
  type StockSearchOption,
} from '../data/stockWorkspaceData'

type SearchStockSymbolsParams = {
  limit?: number
  market: StockSearchMarket
  query: string
}

export async function searchStockSymbols({
  limit = 8,
  market,
  query,
}: SearchStockSymbolsParams): Promise<StockSearchOption[]> {
  return filterStockSearchOptions(query, market).slice(0, limit)
}

export async function resolveStockSearchOption(
  query: string,
  market: StockSearchMarket,
): Promise<StockSearchOption | null> {
  const matchedOption = findExactStockSearchOption(query)

  if (matchedOption) {
    return matchedOption
  }

  const [fallbackOption] = await searchStockSymbols({ limit: 1, market, query })

  return fallbackOption ?? null
}