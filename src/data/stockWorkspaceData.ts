export type StockSymbol = 'NVDA' | 'AAPL' | 'MSFT' | 'AMZN' | 'TSLA'
export type RankingTab = '거래대금' | '상승률'
export type AnalysisTab = '섹터' | '관련주'
export type EntityTab = 'News' | 'Reports' | 'Summary' | '투자자별'
export type StockSearchMarket = '국내주식' | '미국주식'

export type ChartCandle = {
  close: number
  high: number
  low: number
  open: number
  time: string
}

type QuickFact = {
  label: string
  value: string
}

export type StockSearchOption = {
  aliases: string[]
  code: string
  company: string
  exchange: string
  market: StockSearchMarket
  overview: string
  quickFacts: QuickFact[]
  symbol: string
}

type StockSnapshot = {
  ticker: string
  company: string
  price: string
  change: string
  overview: string
  exchange: string
  quickFacts: QuickFact[]
}

type RankingEntry = {
  symbol: StockSymbol
  company: string
  value: string
  secondary: string
}

type AnalysisEntry = {
  id: string
  title: string
  subtitle: string
  metric: string
  symbol?: StockSymbol
}

type EntityEntry = {
  id: string
  source: string
  timestamp: string
  title: string
  lead: string
  body: string[]
  points: string[]
}

export type StockWorkspace = {
  ticker: string
  company: string
  price: string
  change: string
  overview: string
  exchange: string
  quickFacts: QuickFact[]
  chartSeries: ChartCandle[]
  ranking: Record<RankingTab, RankingEntry[]>
  analysis: Record<AnalysisTab, AnalysisEntry[]>
  entities: Record<EntityTab, EntityEntry[]>
}

export const defaultSymbol: StockSymbol = 'NVDA'
export const stockSymbols: StockSymbol[] = ['NVDA', 'AAPL', 'MSFT', 'AMZN', 'TSLA']
export const rankingTabs: RankingTab[] = ['거래대금', '상승률']
export const analysisTabs: AnalysisTab[] = ['섹터', '관련주']
export const entityTabs: EntityTab[] = ['News', 'Reports', 'Summary', '투자자별']
export const stockSearchMarkets: StockSearchMarket[] = ['국내주식', '미국주식']

const initialConsonants = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

function toInitialConsonants(input: string) {
  return input
    .split('')
    .map((character) => {
      const code = character.charCodeAt(0)

      if (code >= 0xac00 && code <= 0xd7a3) {
        return initialConsonants[Math.floor((code - 0xac00) / 588)]
      }

      if (/[ㄱ-ㅎa-zA-Z0-9]/.test(character)) {
        return character.toUpperCase()
      }

      return ''
    })
    .join('')
}

export const stockSearchOptions: StockSearchOption[] = [
  {
    symbol: 'KRX:005930',
    code: '005930',
    company: 'Samsung Electronics',
    market: '국내주식',
    exchange: 'KRX · TradingView live',
    overview: '국내 대형 반도체 대표주를 바로 차트로 띄울 수 있게 국내주식 검색 옵션에 포함했습니다.',
    aliases: ['Samsung Electronics', '삼전', '삼성전자'],
    quickFacts: [
      { label: 'Market Cap', value: '₩445T' },
      { label: 'Volume', value: '18.2M' },
      { label: 'RSI', value: '55.4' },
      { label: 'Signal', value: 'Range' },
    ],
  },
  {
    symbol: 'KRX:000660',
    code: '000660',
    company: 'SK Hynix',
    market: '국내주식',
    exchange: 'KRX · TradingView live',
    overview: 'HBM과 메모리 사이클을 볼 때 빠르게 접근하도록 국내주식 목록에 배치했습니다.',
    aliases: ['SK Hynix', '하이닉스', 'SK하이닉스'],
    quickFacts: [
      { label: 'Market Cap', value: '₩146T' },
      { label: 'Volume', value: '3.7M' },
      { label: 'RSI', value: '61.1' },
      { label: 'Signal', value: 'Momentum' },
    ],
  },
  {
    symbol: 'KRX:035420',
    code: '035420',
    company: 'NAVER',
    market: '국내주식',
    exchange: 'KRX · TradingView live',
    overview: '플랫폼과 AI 서비스 흐름을 국내주식에서 같이 보기 좋도록 넣었습니다.',
    aliases: ['네이버'],
    quickFacts: [
      { label: 'Market Cap', value: '₩30T' },
      { label: 'Volume', value: '0.9M' },
      { label: 'RSI', value: '49.8' },
      { label: 'Signal', value: 'Rebuild' },
    ],
  },
  {
    symbol: 'KRX:005380',
    code: '005380',
    company: 'Hyundai Motor',
    market: '국내주식',
    exchange: 'KRX · TradingView live',
    overview: '자동차 섹터와 원화 민감도를 함께 보기에 적합한 국내주식 예시입니다.',
    aliases: ['Hyundai Motor', '현대차'],
    quickFacts: [
      { label: 'Market Cap', value: '₩58T' },
      { label: 'Volume', value: '0.6M' },
      { label: 'RSI', value: '57.3' },
      { label: 'Signal', value: 'Trend' },
    ],
  },
  {
    symbol: 'NVDA',
    code: 'NVDA',
    company: 'NVIDIA',
    market: '미국주식',
    exchange: 'NASDAQ · Live preview',
    overview: 'AI 인프라 수요가 유지되는 동안 차트와 사이드 인텔리전스를 한 화면에 모은 스톡 워크스페이스입니다.',
    aliases: ['엔비디아'],
    quickFacts: [
      { label: 'Market Cap', value: '$2.31T' },
      { label: 'Volume', value: '42.1M' },
      { label: 'RSI', value: '64.2' },
      { label: 'Signal', value: 'Breakout' },
    ],
  },
  {
    symbol: 'AAPL',
    code: 'AAPL',
    company: 'Apple',
    market: '미국주식',
    exchange: 'NASDAQ · Live preview',
    overview: '대형주 품질주 흐름을 보면서 리포트와 투자자별 데이터를 함께 보는 형태로 구성했습니다.',
    aliases: ['애플'],
    quickFacts: [
      { label: 'Market Cap', value: '$3.18T' },
      { label: 'Volume', value: '51.4M' },
      { label: 'RSI', value: '58.9' },
      { label: 'Signal', value: 'Trend' },
    ],
  },
  {
    symbol: 'MSFT',
    code: 'MSFT',
    company: 'Microsoft',
    market: '미국주식',
    exchange: 'NASDAQ · Live preview',
    overview: '클라우드와 AI 테마를 따라가면서 관련주와 뉴스 콘텐츠를 오른쪽에서 바로 읽는 흐름에 맞췄습니다.',
    aliases: ['마이크로소프트'],
    quickFacts: [
      { label: 'Market Cap', value: '$3.48T' },
      { label: 'Volume', value: '28.4M' },
      { label: 'RSI', value: '61.3' },
      { label: 'Signal', value: 'Leadership' },
    ],
  },
  {
    symbol: 'AMZN',
    code: 'AMZN',
    company: 'Amazon',
    market: '미국주식',
    exchange: 'NASDAQ · Live preview',
    overview: '전자상거래와 AWS 흐름을 함께 확인할 수 있게 뉴스와 요약 콘텐츠를 아래 엔티티 영역으로 분리했습니다.',
    aliases: ['아마존'],
    quickFacts: [
      { label: 'Market Cap', value: '$2.05T' },
      { label: 'Volume', value: '37.5M' },
      { label: 'RSI', value: '56.7' },
      { label: 'Signal', value: 'Expansion' },
    ],
  },
  {
    symbol: 'TSLA',
    code: 'TSLA',
    company: 'Tesla',
    market: '미국주식',
    exchange: 'NASDAQ · Live preview',
    overview: '변동성이 큰 종목을 대상으로 랭킹과 투자자별 흐름이 어떻게 붙는지 보기 좋은 레이아웃입니다.',
    aliases: ['테슬라'],
    quickFacts: [
      { label: 'Market Cap', value: '$627B' },
      { label: 'Volume', value: '94.8M' },
      { label: 'RSI', value: '48.6' },
      { label: 'Signal', value: 'Reactive' },
    ],
  },
  {
    symbol: 'KRX:373220',
    code: '373220',
    company: 'LG Energy Solution',
    market: '국내주식',
    exchange: 'KRX · TradingView live',
    overview: '2차전지 대표주를 바로 차트에 연결할 수 있게 국내주식 검색 풀에 추가했습니다.',
    aliases: ['LG Energy Solution', '엘지엔솔', 'LG에너지솔루션'],
    quickFacts: [
      { label: 'Market Cap', value: '₩85T' },
      { label: 'Volume', value: '0.4M' },
      { label: 'RSI', value: '53.2' },
      { label: 'Signal', value: 'Battery' },
    ],
  },
  {
    symbol: 'KRX:035720',
    code: '035720',
    company: 'Kakao',
    market: '국내주식',
    exchange: 'KRX · TradingView live',
    overview: '플랫폼과 콘텐츠 흐름을 한국 성장주 축에서 빠르게 확인할 수 있도록 넣었습니다.',
    aliases: ['Kakao', '카카오'],
    quickFacts: [
      { label: 'Market Cap', value: '₩21T' },
      { label: 'Volume', value: '1.3M' },
      { label: 'RSI', value: '47.9' },
      { label: 'Signal', value: 'Rebound' },
    ],
  },
  {
    symbol: 'KRX:051910',
    code: '051910',
    company: 'LG Chem',
    market: '국내주식',
    exchange: 'KRX · TradingView live',
    overview: '배터리 밸류체인과 화학 업황을 한 번에 볼 수 있는 대표 종목입니다.',
    aliases: ['LG Chem', 'LG화학'],
    quickFacts: [
      { label: 'Market Cap', value: '₩26T' },
      { label: 'Volume', value: '0.2M' },
      { label: 'RSI', value: '50.4' },
      { label: 'Signal', value: 'Base' },
    ],
  },
  {
    symbol: 'KRX:207940',
    code: '207940',
    company: 'Samsung Biologics',
    market: '국내주식',
    exchange: 'KRX · TradingView live',
    overview: '바이오 대형주 흐름을 국내주식 탭에서 바로 비교할 수 있게 추가했습니다.',
    aliases: ['Samsung Biologics', '삼바', '삼성바이오로직스'],
    quickFacts: [
      { label: 'Market Cap', value: '₩55T' },
      { label: 'Volume', value: '0.1M' },
      { label: 'RSI', value: '58.1' },
      { label: 'Signal', value: 'Defensive' },
    ],
  },
  {
    symbol: 'KRX:000270',
    code: '000270',
    company: 'Kia',
    market: '국내주식',
    exchange: 'KRX · TradingView live',
    overview: '완성차 수출과 환율 민감도를 같이 보기 좋은 국내 대표 자동차 종목입니다.',
    aliases: ['Kia', '기아'],
    quickFacts: [
      { label: 'Market Cap', value: '₩49T' },
      { label: 'Volume', value: '1.0M' },
      { label: 'RSI', value: '56.8' },
      { label: 'Signal', value: 'Export' },
    ],
  },
  {
    symbol: 'KRX:005490',
    code: '005490',
    company: 'POSCO Holdings',
    market: '국내주식',
    exchange: 'KRX · TradingView live',
    overview: '철강과 2차전지 소재를 함께 보는 관점에서 검색 풀에 포함했습니다.',
    aliases: ['POSCO Holdings', '포스코홀딩스', 'POSCO홀딩스'],
    quickFacts: [
      { label: 'Market Cap', value: '₩33T' },
      { label: 'Volume', value: '0.5M' },
      { label: 'RSI', value: '51.6' },
      { label: 'Signal', value: 'Cyclical' },
    ],
  },
  {
    symbol: 'KRX:068270',
    code: '068270',
    company: 'Celltrion',
    market: '국내주식',
    exchange: 'KRX · TradingView live',
    overview: '헬스케어 대형주의 수급과 뉴스 흐름을 확인하기 위한 종목입니다.',
    aliases: ['Celltrion', '셀트리온'],
    quickFacts: [
      { label: 'Market Cap', value: '₩37T' },
      { label: 'Volume', value: '0.6M' },
      { label: 'RSI', value: '54.0' },
      { label: 'Signal', value: 'Healthcare' },
    ],
  },
  {
    symbol: 'KRX:012450',
    code: '012450',
    company: 'Hanwha Aerospace',
    market: '국내주식',
    exchange: 'KRX · TradingView live',
    overview: '방산 테마 강도를 확인할 때 바로 불러올 수 있게 추가했습니다.',
    aliases: ['Hanwha Aerospace', '한화에어로', '한화에어로스페이스'],
    quickFacts: [
      { label: 'Market Cap', value: '₩18T' },
      { label: 'Volume', value: '0.7M' },
      { label: 'RSI', value: '66.4' },
      { label: 'Signal', value: 'Defense' },
    ],
  },
  {
    symbol: 'NASDAQ:META',
    code: 'META',
    company: 'Meta Platforms',
    market: '미국주식',
    exchange: 'NASDAQ · TradingView live',
    overview: '디지털 광고와 AI 서비스 모멘텀을 같이 보기 위한 미국 대형주 확장 항목입니다.',
    aliases: ['Meta', '메타'],
    quickFacts: [
      { label: 'Market Cap', value: '$1.27T' },
      { label: 'Volume', value: '12.4M' },
      { label: 'RSI', value: '62.1' },
      { label: 'Signal', value: 'Ad Tech' },
    ],
  },
  {
    symbol: 'NASDAQ:GOOGL',
    code: 'GOOGL',
    company: 'Alphabet',
    market: '미국주식',
    exchange: 'NASDAQ · TradingView live',
    overview: '검색 광고와 클라우드 흐름을 동시에 확인할 수 있는 미국 빅테크 대표 종목입니다.',
    aliases: ['Google', '구글', '알파벳'],
    quickFacts: [
      { label: 'Market Cap', value: '$2.11T' },
      { label: 'Volume', value: '21.8M' },
      { label: 'RSI', value: '59.7' },
      { label: 'Signal', value: 'Platform' },
    ],
  },
  {
    symbol: 'NASDAQ:AMD',
    code: 'AMD',
    company: 'Advanced Micro Devices',
    market: '미국주식',
    exchange: 'NASDAQ · TradingView live',
    overview: '반도체 경쟁 구도와 AI 가속기 수요를 같이 보기 좋은 미국 종목입니다.',
    aliases: ['AMD', '에이엠디'],
    quickFacts: [
      { label: 'Market Cap', value: '$286B' },
      { label: 'Volume', value: '54.2M' },
      { label: 'RSI', value: '63.0' },
      { label: 'Signal', value: 'Semis' },
    ],
  },
  {
    symbol: 'NASDAQ:NFLX',
    code: 'NFLX',
    company: 'Netflix',
    market: '미국주식',
    exchange: 'NASDAQ · TradingView live',
    overview: '미디어 구독 성장주 흐름을 살필 수 있도록 미국 검색 풀에 포함했습니다.',
    aliases: ['Netflix', '넷플릭스'],
    quickFacts: [
      { label: 'Market Cap', value: '$468B' },
      { label: 'Volume', value: '4.1M' },
      { label: 'RSI', value: '57.2' },
      { label: 'Signal', value: 'Content' },
    ],
  },
  {
    symbol: 'NASDAQ:AVGO',
    code: 'AVGO',
    company: 'Broadcom',
    market: '미국주식',
    exchange: 'NASDAQ · TradingView live',
    overview: 'AI 네트워킹과 반도체 인프라를 확인하기 위한 미국 대형 반도체 종목입니다.',
    aliases: ['Broadcom', '브로드컴'],
    quickFacts: [
      { label: 'Market Cap', value: '$785B' },
      { label: 'Volume', value: '6.8M' },
      { label: 'RSI', value: '64.8' },
      { label: 'Signal', value: 'Infra' },
    ],
  },
  {
    symbol: 'NASDAQ:INTC',
    code: 'INTC',
    company: 'Intel',
    market: '미국주식',
    exchange: 'NASDAQ · TradingView live',
    overview: '레거시 반도체와 파운드리 전환을 같이 살피는 비교 종목으로 넣었습니다.',
    aliases: ['Intel', '인텔'],
    quickFacts: [
      { label: 'Market Cap', value: '$132B' },
      { label: 'Volume', value: '47.3M' },
      { label: 'RSI', value: '45.7' },
      { label: 'Signal', value: 'Turnaround' },
    ],
  },
  {
    symbol: 'NYSE:JPM',
    code: 'JPM',
    company: 'JPMorgan Chase',
    market: '미국주식',
    exchange: 'NYSE · TradingView live',
    overview: '금융주 강도와 금리 민감도를 볼 수 있게 미국 대표 은행주를 추가했습니다.',
    aliases: ['JPMorgan', '제이피모건'],
    quickFacts: [
      { label: 'Market Cap', value: '$618B' },
      { label: 'Volume', value: '8.9M' },
      { label: 'RSI', value: '58.0' },
      { label: 'Signal', value: 'Banks' },
    ],
  },
  {
    symbol: 'NYSE:V',
    code: 'V',
    company: 'Visa',
    market: '미국주식',
    exchange: 'NYSE · TradingView live',
    overview: '소비 결제 데이터와 경기 민감도를 보기 위한 미국 대형주 확장 항목입니다.',
    aliases: ['Visa', '비자'],
    quickFacts: [
      { label: 'Market Cap', value: '$558B' },
      { label: 'Volume', value: '6.1M' },
      { label: 'RSI', value: '60.2' },
      { label: 'Signal', value: 'Payments' },
    ],
  },
  {
    symbol: 'NYSE:WMT',
    code: 'WMT',
    company: 'Walmart',
    market: '미국주식',
    exchange: 'NYSE · TradingView live',
    overview: '방어 소비주 흐름과 실적 시즌 반응을 보기 좋도록 편입했습니다.',
    aliases: ['Walmart', '월마트'],
    quickFacts: [
      { label: 'Market Cap', value: '$487B' },
      { label: 'Volume', value: '10.3M' },
      { label: 'RSI', value: '55.9' },
      { label: 'Signal', value: 'Defensive' },
    ],
  },
  {
    symbol: 'NYSE:DIS',
    code: 'DIS',
    company: 'Walt Disney',
    market: '미국주식',
    exchange: 'NYSE · TradingView live',
    overview: '미디어와 테마파크 경기 민감도를 같이 보기 좋은 미국 소비주입니다.',
    aliases: ['Disney', '디즈니'],
    quickFacts: [
      { label: 'Market Cap', value: '$215B' },
      { label: 'Volume', value: '9.5M' },
      { label: 'RSI', value: '52.6' },
      { label: 'Signal', value: 'Recovery' },
    ],
  },
]

function matchesStockSearchOption(option: StockSearchOption, query: string) {
  const trimmedQuery = query.trim()

  if (!trimmedQuery) {
    return true
  }

  const normalizedQuery = trimmedQuery.toUpperCase()
  const initialsQuery = toInitialConsonants(trimmedQuery)
  const searchTokens = [
    option.company,
    option.company.toUpperCase(),
    option.code.toUpperCase(),
    option.symbol.toUpperCase(),
    ...option.aliases,
    ...option.aliases.map((alias) => alias.toUpperCase()),
    toInitialConsonants(option.company),
  ]

  return searchTokens.some((token) => token.includes(normalizedQuery) || (initialsQuery.length > 0 && token.includes(initialsQuery)))
}

function isExactStockSearchOptionMatch(
  option: StockSearchOption,
  normalizedQuery: string,
  initialsQuery: string,
) {
  const exactTokens = [
    option.symbol.toUpperCase(),
    option.code.toUpperCase(),
    option.company.toUpperCase(),
    ...option.aliases.map((alias) => alias.toUpperCase()),
    toInitialConsonants(option.company),
  ]

  return exactTokens.includes(normalizedQuery) || (initialsQuery.length > 0 && exactTokens.includes(initialsQuery))
}

export function findExactStockSearchOption(query: string) {
  const trimmedQuery = query.trim()

  if (!trimmedQuery) {
    return null
  }

  const normalizedQuery = trimmedQuery.toUpperCase()
  const initialsQuery = toInitialConsonants(trimmedQuery)

  return (
    stockSearchOptions.find((option) =>
      isExactStockSearchOptionMatch(option, normalizedQuery, initialsQuery),
    ) ?? null
  )
}

export function filterStockSearchOptions(query: string, market: StockSearchMarket) {
  return stockSearchOptions.filter(
    (option) => option.market === market && matchesStockSearchOption(option, query),
  )
}

export function findStockSearchOption(query: string) {
  const trimmedQuery = query.trim()

  if (!trimmedQuery) {
    return null
  }

  const exactMatch = findExactStockSearchOption(trimmedQuery)

  if (exactMatch) {
    return exactMatch
  }

  return stockSearchOptions.find((option) => matchesStockSearchOption(option, trimmedQuery)) ?? null
}

function findStockSearchOptionBySymbol(symbol: string) {
  const normalizedSymbol = symbol.trim().toUpperCase()

  return (
    stockSearchOptions.find(
      (option) => option.symbol.toUpperCase() === normalizedSymbol || option.code.toUpperCase() === normalizedSymbol,
    ) ?? null
  )
}

function buildCandles(basePrice: number, moves: number[]) {
  let previousClose = basePrice

  return moves.map((move, index) => {
    const open = previousClose
    const close = Number((open + move).toFixed(2))
    const wickTop = Math.max(Math.abs(move) * 0.45, 1.2)
    const wickBottom = Math.max(Math.abs(move) * 0.35, 0.9)
    const high = Number((Math.max(open, close) + wickTop).toFixed(2))
    const low = Number((Math.min(open, close) - wickBottom).toFixed(2))

    previousClose = close

    return {
      time: `2026-04-${String(index + 10).padStart(2, '0')}`,
      open: Number(open.toFixed(2)),
      high,
      low,
      close,
    }
  })
}

const snapshots: Record<StockSymbol, StockSnapshot> = {
  NVDA: {
    ticker: 'NVDA',
    company: 'NVIDIA',
    price: '$942.31',
    change: '+2.84%',
    overview: 'A stock workspace built to keep the chart and side intelligence in one view while AI infrastructure demand remains firm.',
    exchange: 'NASDAQ · Live preview',
    quickFacts: [
      { label: 'Market Cap', value: '$2.31T' },
      { label: 'Volume', value: '42.1M' },
      { label: 'RSI', value: '64.2' },
      { label: 'Signal', value: 'Breakout' },
    ],
  },
  AAPL: {
    ticker: 'AAPL',
    company: 'Apple',
    price: '$213.40',
    change: '+1.16%',
    overview: 'Designed to track large-cap quality leadership while reading reports and investor-flow data together.',
    exchange: 'NASDAQ · Live preview',
    quickFacts: [
      { label: 'Market Cap', value: '$3.18T' },
      { label: 'Volume', value: '51.4M' },
      { label: 'RSI', value: '58.9' },
      { label: 'Signal', value: 'Trend' },
    ],
  },
  MSFT: {
    ticker: 'MSFT',
    company: 'Microsoft',
    price: '$468.11',
    change: '+1.94%',
    overview: 'Built around a workflow where cloud and AI themes can be tracked while related names and news stay readable on the right.',
    exchange: 'NASDAQ · Live preview',
    quickFacts: [
      { label: 'Market Cap', value: '$3.48T' },
      { label: 'Volume', value: '28.4M' },
      { label: 'RSI', value: '61.3' },
      { label: 'Signal', value: 'Leadership' },
    ],
  },
  AMZN: {
    ticker: 'AMZN',
    company: 'Amazon',
    price: '$197.66',
    change: '+0.88%',
    overview: 'News and summary content are separated into the lower entity area so ecommerce and AWS flows can be checked together.',
    exchange: 'NASDAQ · Live preview',
    quickFacts: [
      { label: 'Market Cap', value: '$2.05T' },
      { label: 'Volume', value: '37.5M' },
      { label: 'RSI', value: '56.7' },
      { label: 'Signal', value: 'Expansion' },
    ],
  },
  TSLA: {
    ticker: 'TSLA',
    company: 'Tesla',
    price: '$196.72',
    change: '-1.43%',
    overview: 'A good layout for testing how rankings and investor-flow panels behave on a highly volatile name.',
    exchange: 'NASDAQ · Live preview',
    quickFacts: [
      { label: 'Market Cap', value: '$627B' },
      { label: 'Volume', value: '94.8M' },
      { label: 'RSI', value: '48.6' },
      { label: 'Signal', value: 'Reactive' },
    ],
  },
}

const chartSeriesBySymbol: Record<StockSymbol, ChartCandle[]> = {
  NVDA: buildCandles(884, [6, 8, -3, 5, 7, -2, 9, 4, 6, 3, 7, 5]),
  AAPL: buildCandles(202, [0.4, 0.6, 1.2, -0.2, 0.8, 0.5, 0.3, 0.7, -0.1, 0.6, 0.8, 0.4]),
  MSFT: buildCandles(448, [1.8, 2.7, -0.9, 3.2, 2.1, 1.6, 2.4, 1.1, -0.4, 2.9, 1.3, 1.2]),
  AMZN: buildCandles(188, [0.6, 0.9, 1.4, -0.3, 1.1, 0.8, 1.2, 0.7, 0.5, 1.1, -0.2, 0.9]),
  TSLA: buildCandles(208, [-2.6, 1.8, -1.9, 2.2, -1.4, 0.9, -2.1, 1.3, -1.7, 1.9, -1.6, -0.8]),
}

const rankingData: Record<RankingTab, RankingEntry[]> = {
  거래대금: [
    { symbol: 'NVDA', company: 'NVIDIA', value: 'KRW 382B', secondary: 'Execution strength 117' },
    { symbol: 'MSFT', company: 'Microsoft', value: 'KRW 296B', secondary: 'Execution strength 109' },
    { symbol: 'AAPL', company: 'Apple', value: 'KRW 214B', secondary: 'Execution strength 104' },
    { symbol: 'AMZN', company: 'Amazon', value: 'KRW 188B', secondary: 'Execution strength 101' },
    { symbol: 'TSLA', company: 'Tesla', value: 'KRW 124B', secondary: 'Execution strength 92' },
  ],
  상승률: [
    { symbol: 'NVDA', company: 'NVIDIA', value: '+2.84%', secondary: 'AI strength holding' },
    { symbol: 'MSFT', company: 'Microsoft', value: '+1.94%', secondary: 'Cloud flows improving' },
    { symbol: 'AAPL', company: 'Apple', value: '+1.16%', secondary: 'Breadth widening' },
    { symbol: 'AMZN', company: 'Amazon', value: '+0.88%', secondary: 'Measured recovery' },
    { symbol: 'TSLA', company: 'Tesla', value: '-1.43%', secondary: 'Volatility expanding' },
  ],
}

const relatedSymbols: Record<StockSymbol, AnalysisEntry[]> = {
  NVDA: [
    { id: 'nvda-rel-msft', title: 'MSFT', subtitle: 'Cloud AI demand', metric: 'High linkage', symbol: 'MSFT' },
    { id: 'nvda-rel-amzn', title: 'AMZN', subtitle: 'AWS infrastructure expansion', metric: 'Medium linkage', symbol: 'AMZN' },
    { id: 'nvda-rel-aapl', title: 'AAPL', subtitle: 'Large-cap tech rotation', metric: 'Medium linkage', symbol: 'AAPL' },
  ],
  AAPL: [
    { id: 'aapl-rel-msft', title: 'MSFT', subtitle: 'Large-cap quality tech', metric: 'High correlation', symbol: 'MSFT' },
    { id: 'aapl-rel-amzn', title: 'AMZN', subtitle: 'Consumer spending sensitivity', metric: 'Medium correlation', symbol: 'AMZN' },
    { id: 'aapl-rel-nvda', title: 'NVDA', subtitle: 'AI device expectations', metric: 'Medium correlation', symbol: 'NVDA' },
  ],
  MSFT: [
    { id: 'msft-rel-nvda', title: 'NVDA', subtitle: 'Core AI infrastructure beneficiary', metric: 'High linkage', symbol: 'NVDA' },
    { id: 'msft-rel-amzn', title: 'AMZN', subtitle: 'Cloud competition setup', metric: 'High linkage', symbol: 'AMZN' },
    { id: 'msft-rel-aapl', title: 'AAPL', subtitle: 'Large-cap capital rotation', metric: 'Medium linkage', symbol: 'AAPL' },
  ],
  AMZN: [
    { id: 'amzn-rel-msft', title: 'MSFT', subtitle: 'Cloud demand comparison', metric: 'High linkage', symbol: 'MSFT' },
    { id: 'amzn-rel-aapl', title: 'AAPL', subtitle: 'Consumer indicator sensitivity', metric: 'Medium linkage', symbol: 'AAPL' },
    { id: 'amzn-rel-tsla', title: 'TSLA', subtitle: 'Growth beta rotation', metric: 'Low linkage', symbol: 'TSLA' },
  ],
  TSLA: [
    { id: 'tsla-rel-nvda', title: 'NVDA', subtitle: 'Risk-on growth proxy', metric: 'Medium linkage', symbol: 'NVDA' },
    { id: 'tsla-rel-aapl', title: 'AAPL', subtitle: 'Consumer tech comparison', metric: 'Low linkage', symbol: 'AAPL' },
    { id: 'tsla-rel-amzn', title: 'AMZN', subtitle: 'Big tech flow rotation', metric: 'Low linkage', symbol: 'AMZN' },
  ],
}

function buildSectorEntries(snapshot: StockSnapshot): AnalysisEntry[] {
  return [
    { id: `${snapshot.ticker}-sec-1`, title: 'Semiconductors', subtitle: 'Capital inflow holding', metric: 'Strength +2.1%' },
    { id: `${snapshot.ticker}-sec-2`, title: 'Software', subtitle: 'Linked to AI demand', metric: 'Strength +1.4%' },
    { id: `${snapshot.ticker}-sec-3`, title: 'Consumer', subtitle: 'Large-cap defensiveness', metric: 'Strength +0.7%' },
    { id: `${snapshot.ticker}-sec-4`, title: 'Autos', subtitle: 'Volatility expanding', metric: 'Strength -0.3%' },
  ]
}

function buildEntityEntries(snapshot: StockSnapshot): Record<EntityTab, EntityEntry[]> {
  return {
    News: [
      {
        id: `${snapshot.ticker}-news-1`,
        source: 'Reuters',
        timestamp: '09:12',
        title: `${snapshot.company} Draws Heavy Early Flow`,
        lead: `The layout is built so fast headlines tied to ${snapshot.company} are scanned from a tight list and read in full on the right.`,
        body: [
          `${snapshot.company} is seeing early turnover build quickly, which makes the top chart and ranking panel useful together right after the open.`,
          `This screen keeps the headline list short and pushes the longer reading into the right-side content panel.`,
        ],
        points: ['Short path between chart and headlines', 'Naturally linked to turnover rankings', 'Easy to upgrade to a live news API'],
      },
      {
        id: `${snapshot.ticker}-news-2`,
        source: 'Bloomberg',
        timestamp: '10:03',
        title: `${snapshot.company} Picks Up a Macro Headline`,
        lead: `When an intraday issue appears, the workflow starts with a one-line list and moves directly into the detailed panel.`,
        body: [
          `News entities stay title-first on the left so the list can remain dense even when the headline count grows.`,
          `The detail panel separates context from key points so reading and summarizing can happen at the same time.`,
        ],
        points: ['Single-line list density', 'Body and bullet points separated', 'Well suited to breaking news'],
      },
      {
        id: `${snapshot.ticker}-news-3`,
        source: 'WSJ',
        timestamp: '11:26',
        title: `${snapshot.company} Mentioned in a Valuation Reset`,
        lead: `A core goal of this layout is to change only the right panel on click while keeping the overall structure fixed.`,
        body: [
          `The lower section is designed so News, Reports, Briefing, and Investor Flow all share the same layout system.`,
          `Only the tab changes while the list-and-detail structure remains stable, keeping maintenance and customization costs low.`,
        ],
        points: ['Shared entity layout', 'Expandable through tab switching', 'Maintains web-first information density'],
      },
    ],
    Reports: [
      {
        id: `${snapshot.ticker}-report-1`,
        source: 'Broker Note',
        timestamp: '08:40',
        title: `${snapshot.company} Gets a Higher Target Price`,
        lead: `The Reports tab keeps titles compact and pushes the key investment read into the right-side card.`,
        body: [
          `Recent reports on ${snapshot.company} combine earnings visibility with improving flows so they can be read in the same context as the top chart signal.`,
          `In the web version, the goal is to read the chart, rankings, and report body on one screen, so the panel heights are intentionally aligned.`,
        ],
        points: ['Report body prioritized', 'Read beside the chart signal', 'Right column optimized for longer copy'],
      },
      {
        id: `${snapshot.ticker}-report-2`,
        source: 'Sell-side',
        timestamp: '09:55',
        title: `${snapshot.company} Earnings Momentum Recheck`,
        lead: `Reports are usually longer than news items, so the right-side reading experience takes priority here.`,
        body: [
          `The detail panel is split into title, lead, body, and key points so users can stop at the level of depth they need.`,
          `The same structure can extend cleanly to earnings previews, target changes, and industry check-in notes.`,
        ],
        points: ['Works for document-style content', 'Longer copy stays readable', 'Key points remain separate'],
      },
      {
        id: `${snapshot.ticker}-report-3`,
        source: 'Research Desk',
        timestamp: '12:18',
        title: `${snapshot.company} Flow-Based Band Analysis`,
        lead: `This report type is meant to connect directly to the ranking panel and explain the flow setup behind it.`,
        body: [
          `The intended workflow is to pick a name from the Turnover or Gainers tab and read the detailed take in the lower report section.`,
          `That keeps the eye travel short even when exploration and document reading happen in separate panels.`,
        ],
        points: ['Exploration and reading separated', 'Directly linked to the ranking panel', 'Fits a dashboard-style web UX'],
      },
    ],
    Summary: [
      {
        id: `${snapshot.ticker}-summary-1`,
        source: 'Desk Summary',
        timestamp: '13:05',
        title: `${snapshot.company} Session Summary`,
        lead: `The Briefing tab compresses intraday data and headlines into a short read for quick context recovery.`,
        body: [
          `${snapshot.company} is currently moving around ${snapshot.change}, with the chart still holding the active signal state.`,
          `This tab is written in shorter, stronger lines than News or Reports so context can be recovered quickly mid-session.`,
        ],
        points: ['Fast context recovery', 'Built for intraday speed', 'Sits between News and Reports'],
      },
      {
        id: `${snapshot.ticker}-summary-2`,
        source: 'Closing Brief',
        timestamp: '14:24',
        title: `${snapshot.company} Flow and Chart Brief`,
        lead: `A compact entity that pulls together the key read from the chart, ranking, and analysis panels.`,
        body: [
          `When the top three panels are compressed again in the lower Briefing tab, users can still capture direction without reading every panel in detail.`,
          `This slot is also a strong candidate for future LLM or rules-based summaries.`,
        ],
        points: ['Easy path to LLM summaries', 'Compresses the full panel stack', 'Keeps web-first density intact'],
      },
      {
        id: `${snapshot.ticker}-summary-3`,
        source: 'Signal Brief',
        timestamp: '15:02',
        title: `${snapshot.company} Signal Brief`,
        lead: `A support tab for moments when you want a very short, signal-first read.`,
        body: [
          `Because Briefing should stay short, both the left list and the right detail panel are tuned for rapid scanning.`,
          `This layer makes intraday decisions easier even when you do not want to read every article and report.`,
        ],
        points: ['Short-body format', 'Supports trading decisions', 'Minimizes reading load'],
      },
    ],
    투자자별: [
      {
        id: `${snapshot.ticker}-investor-1`,
        source: 'Flow Data',
        timestamp: '09:48',
        title: `${snapshot.company} Foreign Buying Accelerates`,
        lead: `The Investor Flow tab uses the same content-panel structure, but swaps article copy for flow commentary.`,
        body: [
          `Listing foreign, institutional, and retail flow like short headlines lets data-driven content reuse the same UI pattern as news.`,
          `It also connects naturally with the ranking tabs, where turnover changes and investor flow are read together.`,
        ],
        points: ['Same UI for data-style content', 'Strong connection to ranking panels', 'Well suited to commentary-heavy views'],
      },
      {
        id: `${snapshot.ticker}-investor-2`,
        source: 'Flow Data',
        timestamp: '11:07',
        title: `${snapshot.company} Institutions Turn Net Buyers`,
        lead: `The one-line list shows the event only, while the right panel adds the time-based context behind it.`,
        body: [
          `Institutional flow matters for judging short-term strength, so it is kept in a separate tab instead of being mixed into the news feed.`,
          `This panel also leaves room for future additions such as execution strength, flow charts, or extra chart indicators.`,
        ],
        points: ['Keeps articles and data separate', 'Supports time-based flow commentary', 'Leaves plenty of room for expansion'],
      },
      {
        id: `${snapshot.ticker}-investor-3`,
        source: 'Flow Data',
        timestamp: '14:41',
        title: `${snapshot.company} Retail Buying Heat Check`,
        lead: `The Investor Flow tab stays click-driven, just like News, so users can use it without learning a new interaction.`,
        body: [
          `Users repeat the same left-select, right-read pattern even when the entity type changes.`,
          `That consistency keeps overall dashboard complexity lower as the content surface expands.`,
        ],
        points: ['Consistent interaction pattern', 'Stable as content types expand', 'Good base for future web growth'],
      },
    ],
  }
}

function normalizeSymbol(symbol: string) {
  const normalized = symbol.trim().toUpperCase()

  if (stockSymbols.includes(normalized as StockSymbol)) {
    return normalized as StockSymbol
  }

  return null
}

export function resolveStockWorkspace(
  symbol: string,
  selectedSearchOption?: StockSearchOption | null,
): StockWorkspace {
  const normalizedSymbol = normalizeSymbol(symbol)
  const matchedSearchOption = selectedSearchOption ?? findStockSearchOptionBySymbol(symbol)
  const snapshot = normalizedSymbol
    ? snapshots[normalizedSymbol]
    : matchedSearchOption
      ? {
          ticker: matchedSearchOption.code,
          company: matchedSearchOption.company,
          price: 'TradingView',
          change: 'Live',
          overview: matchedSearchOption.overview,
          exchange: matchedSearchOption.exchange,
          quickFacts: matchedSearchOption.quickFacts,
        }
    : {
        ticker: symbol.trim().toUpperCase() || defaultSymbol,
        company: 'Custom Symbol',
        price: 'Connect feed',
        change: 'N/A',
        overview: 'Custom symbols are supported, and the same layout can be preserved once a real market data source is connected.',
        exchange: 'Custom source',
        quickFacts: [
          { label: 'Market Cap', value: 'Hook API' },
          { label: 'Volume', value: 'Hook API' },
          { label: 'RSI', value: 'Hook API' },
          { label: 'Signal', value: 'Hook API' },
        ],
      }

  const relatedEntries = normalizedSymbol ? relatedSymbols[normalizedSymbol] : relatedSymbols[defaultSymbol]

  return {
    ticker: snapshot.ticker,
    company: snapshot.company,
    price: snapshot.price,
    change: snapshot.change,
    overview: snapshot.overview,
    exchange: snapshot.exchange,
    quickFacts: snapshot.quickFacts,
    chartSeries: normalizedSymbol ? chartSeriesBySymbol[normalizedSymbol] : chartSeriesBySymbol[defaultSymbol],
    ranking: rankingData,
    analysis: {
      섹터: buildSectorEntries(snapshot),
      관련주: relatedEntries,
    },
    entities: buildEntityEntries(snapshot),
  }
}