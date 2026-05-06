type StockChartProps = {
  height?: number
  symbol: string
}

const defaultSymbol = 'NASDAQ:NVDA'

const tradingViewConfig = {
  allow_symbol_change: false,
  autosize: true,
  backgroundColor: '#FFFCF7',
  calendar: false,
  compareSymbols: [],
  details: false,
  gridColor: '#E7EBF1',
  hide_legend: false,
  hide_side_toolbar: false,
  hide_top_toolbar: false,
  hide_volume: false,
  hotlist: false,
  interval: 'D',
  locale: 'en',
  save_image: false,
  studies: [],
  style: '1',
  support_host: 'https://www.tradingview.com',
  theme: 'light',
  timezone: 'Etc/UTC',
  watchlist: [],
  withdateranges: true,
}

function resolveTradingViewSymbol(symbol: string) {
  const normalizedSymbol = symbol.trim().toUpperCase()

  if (!normalizedSymbol) {
    return defaultSymbol
  }

  if (normalizedSymbol.includes(':')) {
    return normalizedSymbol
  }

  return `NASDAQ:${normalizedSymbol}`
}

function resolveTradingViewSymbolUrl(symbol: string) {
  const [exchange, ticker] = symbol.split(':')

  if (!exchange || !ticker) {
    return 'https://www.tradingview.com/'
  }

  return `https://www.tradingview.com/symbols/${exchange}-${ticker}/`
}
function resolveTradingViewEmbedUrl(symbol: string) {
  const configuration = {
    ...tradingViewConfig,
    height: '100%',
    symbol,
    utm_campaign: 'advanced-chart',
    utm_medium: 'widget_new',
    utm_source: 'localhost',
    width: '100%',
  }

  return `https://www.tradingview-widget.com/embed-widget/advanced-chart/?locale=en#${encodeURIComponent(
    JSON.stringify(configuration),
  )}`
}

export function StockChart({ symbol = defaultSymbol, height = 320 }: StockChartProps) {
  const tradingViewSymbol = resolveTradingViewSymbol(symbol)

  const embedUrl = resolveTradingViewEmbedUrl(tradingViewSymbol)

  return (
    <div className="stock-chart tradingview-widget-container" style={{ height }}>
      <iframe
        key={tradingViewSymbol}
        className="tradingview-widget-frame"
        loading="lazy"
        src={embedUrl}
        title={`${tradingViewSymbol} TradingView chart`}
      />
      <div className="tradingview-widget-copyright">
        <a href={resolveTradingViewSymbolUrl(tradingViewSymbol)} rel="noopener nofollow" target="_blank">
          <span className="blue-text">{tradingViewSymbol} chart</span>
        </a>
        <span className="trademark"> by TradingView</span>
      </div>
    </div>
  )
}