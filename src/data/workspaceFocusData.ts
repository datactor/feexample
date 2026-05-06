export type WorkspacePageTab = 'Stock' | 'Market' | 'Sector'
export type MarketBillboardTab = '지수' | '원자재' | '환율'
export type BriefingTab = 'News' | 'Reports'
export type SectorBoardTab = '거래대금' | '상승률' | '하락률'
export type SectorStockQueueTab = '시가총액' | '거래대금' | '상승률' | '하락률'

type QuickFact = {
  label: string
  value: string
}

type FocusEntityEntry = {
  id: string
  source: string
  timestamp: string
  title: string
  lead: string
  body: string[]
  points: string[]
}

export type MarketBoardEntry = {
  id: string
  symbol: string
  title: string
  subtitle: string
  metric: string
  venue: string
}

export type SectorBoardEntry = {
  id: string
  sectorId: string
  title: string
  subtitle: string
  metric: string
  venue: string
}

export type SectorStockQueueEntry = {
  id: string
  symbol: string
  company: string
  marketCapLabel: string
  marketCapValue: number
  turnoverLabel: string
  turnoverValue: number
  priceChangeLabel: string
  priceChangeValue: number
  headline: string
  overview: string
  currentStatus: string
  connectionLabel: string
  matchedPathLabels: string[]
}

export type SectorKeywordQueue = {
  nodeId: string
  label: string
  path: string[]
  count: number
  subtitle: string
  overview: string
  entries: Record<SectorStockQueueTab, SectorStockQueueEntry[]>
}

export type SectorMindMapNode = {
  id: string
  label: string
  kind: 'root' | 'branch' | 'leaf'
  path: string[]
  position: {
    x: number
    y: number
  }
}

export type SectorMindMapEdge = {
  id: string
  source: string
  target: string
}

type FocusSnapshot = {
  symbol: string
  title: string
  subtitle: string
  overview: string
  exchange: string
  quickFacts: QuickFact[]
}

export type MarketWorkspace = {
  symbol: string
  title: string
  subtitle: string
  overview: string
  exchange: string
  quickFacts: QuickFact[]
  billboard: Record<MarketBillboardTab, MarketBoardEntry[]>
  entities: Record<BriefingTab, FocusEntityEntry[]>
}

export type SectorWorkspace = {
  id: string
  title: string
  subtitle: string
  overview: string
  board: Record<SectorBoardTab, SectorBoardEntry[]>
  defaultNodeId: string
  graph: {
    nodes: SectorMindMapNode[]
    edges: SectorMindMapEdge[]
  }
  stockQueues: Record<string, SectorKeywordQueue>
  entities: Record<BriefingTab, FocusEntityEntry[]>
}

type SectorKeywordRecord = {
  id: string
  symbol: string
  company: string
  marketCap: number
  turnover: number
  priceChange: number
  headline: string
  overview: string
  currentStatus: string
  keywordPaths: string[][]
}

type DerivedSectorCluster = {
  id: string
  title: string
  subtitle: string
  overview: string
  members: SectorKeywordRecord[]
  totalTurnover: number
  averageChange: number
  topKeywords: string[]
  defaultNodeId: string
  graph: {
    nodes: SectorMindMapNode[]
    edges: SectorMindMapEdge[]
  }
  stockQueues: Record<string, SectorKeywordQueue>
  entities: Record<BriefingTab, FocusEntityEntry[]>
}

export const workspacePageTabs: WorkspacePageTab[] = ['Stock', 'Market', 'Sector']
export const marketBillboardTabs: MarketBillboardTab[] = ['지수', '원자재', '환율']
export const briefingTabs: BriefingTab[] = ['News', 'Reports']
export const sectorBoardTabs: SectorBoardTab[] = ['거래대금', '상승률', '하락률']
export const sectorStockQueueTabs: SectorStockQueueTab[] = ['시가총액', '거래대금', '상승률', '하락률']

const marketBillboardData: Record<MarketBillboardTab, MarketBoardEntry[]> = {
  지수: [
    {
      id: 'market-spx',
      symbol: 'AMEX:SPY',
      title: 'S&P 500',
      subtitle: 'US large-cap breadth · SPY proxy',
      metric: '+0.42%',
      venue: 'Index',
    },
    {
      id: 'market-ndx',
      symbol: 'NASDAQ:QQQ',
      title: 'Nasdaq 100',
      subtitle: 'AI beta concentration · QQQ proxy',
      metric: '+0.67%',
      venue: 'Index',
    },
    {
      id: 'market-dji',
      symbol: 'AMEX:DIA',
      title: 'Dow Jones',
      subtitle: 'Defensive rotation · DIA proxy',
      metric: '-0.18%',
      venue: 'Index',
    },
  ],
  원자재: [
    {
      id: 'market-gold',
      symbol: 'OANDA:XAUUSD',
      title: 'Gold',
      subtitle: 'Inflation hedge',
      metric: '+0.91%',
      venue: 'Commodity',
    },
    {
      id: 'market-oil',
      symbol: 'TVC:USOIL',
      title: 'WTI Crude',
      subtitle: 'Sensitive to supply shocks',
      metric: '-0.44%',
      venue: 'Commodity',
    },
    {
      id: 'market-silver',
      symbol: 'OANDA:XAGUSD',
      title: 'Silver',
      subtitle: 'Linked to industrial demand',
      metric: '+0.38%',
      venue: 'Commodity',
    },
  ],
  환율: [
    {
      id: 'market-usdkrw',
      symbol: 'FX_IDC:USDKRW',
      title: 'USD/KRW',
      subtitle: 'KRW risk sentiment',
      metric: '1374.2',
      venue: 'FX',
    },
    {
      id: 'market-eurusd',
      symbol: 'OANDA:EURUSD',
      title: 'EUR/USD',
      subtitle: 'Check for dollar weakness',
      metric: '+0.16%',
      venue: 'FX',
    },
    {
      id: 'market-usdjpy',
      symbol: 'OANDA:USDJPY',
      title: 'USD/JPY',
      subtitle: 'Sensitive to rate spreads',
      metric: '-0.22%',
      venue: 'FX',
    },
  ],
}

const marketSnapshots: Record<string, FocusSnapshot> = {
  'AMEX:SPY': {
    symbol: 'AMEX:SPY',
    title: 'S&P 500',
    subtitle: 'US Large Cap Index',
    overview: 'Market 탭에서는 지수와 원자재, 환율을 오른쪽 billboard에서 훑고 좌측 차트에서 바로 확인하는 흐름으로 구성했습니다.',
    exchange: 'NYSE American · TradingView live',
    quickFacts: [
      { label: 'Theme', value: 'Breadth' },
      { label: 'Flow', value: 'Risk-on' },
      { label: 'Focus', value: 'Mega-cap' },
      { label: 'Watch', value: '5,200 zone' },
    ],
  },
  'NASDAQ:QQQ': {
    symbol: 'NASDAQ:QQQ',
    title: 'Nasdaq 100',
    subtitle: 'AI Beta Concentration',
    overview: '나스닥 계열 지수는 기술주 베타를 한 번에 확인하는 용도로 billboard 상단에서 가장 빠르게 접근하도록 배치했습니다.',
    exchange: 'NASDAQ ETF proxy · TradingView live',
    quickFacts: [
      { label: 'Theme', value: 'AI beta' },
      { label: 'Flow', value: 'Growth' },
      { label: 'Focus', value: 'Semis + Cloud' },
      { label: 'Watch', value: 'Momentum' },
    ],
  },
  'AMEX:DIA': {
    symbol: 'AMEX:DIA',
    title: 'Dow Jones',
    subtitle: 'Defensive Rotation Gauge',
    overview: '다우는 방어주 회전과 경기민감주 조합을 읽는 기준선 역할을 하도록 Market 탭 안에 함께 넣었습니다.',
    exchange: 'NYSE American · TradingView live',
    quickFacts: [
      { label: 'Theme', value: 'Defensive' },
      { label: 'Flow', value: 'Value tilt' },
      { label: 'Focus', value: 'Industrials' },
      { label: 'Watch', value: 'Range-bound' },
    ],
  },
  'OANDA:XAUUSD': {
    symbol: 'OANDA:XAUUSD',
    title: 'Gold',
    subtitle: 'Inflation Hedge',
    overview: '원자재 탭은 매크로 헤지 수단을 빠르게 훑는 용도라 Gold를 기준축으로 두고 다른 자산과 비교하기 쉽게 구성했습니다.',
    exchange: 'OANDA spot proxy · TradingView live',
    quickFacts: [
      { label: 'Theme', value: 'Hedge' },
      { label: 'Flow', value: 'Safe haven' },
      { label: 'Focus', value: 'Real yields' },
      { label: 'Watch', value: 'Breakout test' },
    ],
  },
  'TVC:USOIL': {
    symbol: 'TVC:USOIL',
    title: 'WTI Crude',
    subtitle: 'Oil Futures Front Month',
    overview: 'WTI는 공급 이슈와 위험자산 선호를 함께 읽는 데 유용해서 billboard의 원자재 섹션에서 즉시 전환되도록 배치했습니다.',
    exchange: 'TradingView composite · TradingView live',
    quickFacts: [
      { label: 'Theme', value: 'Supply risk' },
      { label: 'Flow', value: 'Energy beta' },
      { label: 'Focus', value: 'Middle East' },
      { label: 'Watch', value: 'Demand pulse' },
    ],
  },
  'OANDA:XAGUSD': {
    symbol: 'OANDA:XAGUSD',
    title: 'Silver',
    subtitle: 'Industrial + Precious Mix',
    overview: '실버는 산업 수요와 귀금속 수요가 겹쳐 있어 리스크온과 디펜시브 사이를 모두 읽을 수 있는 자산으로 다뤘습니다.',
    exchange: 'OANDA spot proxy · TradingView live',
    quickFacts: [
      { label: 'Theme', value: 'Hybrid' },
      { label: 'Flow', value: 'Volatile' },
      { label: 'Focus', value: 'Manufacturing' },
      { label: 'Watch', value: 'Relative strength' },
    ],
  },
  'FX_IDC:USDKRW': {
    symbol: 'FX_IDC:USDKRW',
    title: 'USD/KRW',
    subtitle: 'KRW Risk Sentiment',
    overview: '환율 탭에서는 한국 시장과 연결되는 USD/KRW를 첫 줄에 두고 지수와 섹터 흐름과 연결해 보도록 만들었습니다.',
    exchange: 'FX IDC · TradingView live',
    quickFacts: [
      { label: 'Theme', value: 'KRW risk' },
      { label: 'Flow', value: 'Dollar bid' },
      { label: 'Focus', value: 'Asia open' },
      { label: 'Watch', value: '1,370 handle' },
    ],
  },
  'OANDA:EURUSD': {
    symbol: 'OANDA:EURUSD',
    title: 'EUR/USD',
    subtitle: 'Dollar Softness Gauge',
    overview: 'EUR/USD는 달러 약세 여부를 확인하는 대표 페어라 환율 탭에서 매크로 방향성을 읽는 중심축 역할을 합니다.',
    exchange: 'OANDA FX · TradingView live',
    quickFacts: [
      { label: 'Theme', value: 'Dollar index' },
      { label: 'Flow', value: 'Macro rates' },
      { label: 'Focus', value: 'ECB/Fed' },
      { label: 'Watch', value: 'Trend carry' },
    ],
  },
  'OANDA:USDJPY': {
    symbol: 'OANDA:USDJPY',
    title: 'USD/JPY',
    subtitle: 'Rates Differential Proxy',
    overview: 'USD/JPY는 금리 차이에 가장 민감한 대표 페어라 환율 탭에서 리스크온과 엔화 개입 가능성을 함께 보게 했습니다.',
    exchange: 'OANDA FX · TradingView live',
    quickFacts: [
      { label: 'Theme', value: 'Rates spread' },
      { label: 'Flow', value: 'Carry trade' },
      { label: 'Focus', value: 'BOJ risk' },
      { label: 'Watch', value: 'Intervention' },
    ],
  },
}

const sectorKeywordRecords: SectorKeywordRecord[] = [
  {
    id: 'sector-stock-samsung',
    symbol: 'KRX:005930',
    company: 'Samsung Electronics',
    marketCap: 4820000,
    turnover: 3820,
    priceChange: 1.2,
    headline: 'Rising HBM demand is reviving interest across the AI memory chain.',
    overview: 'A core name where memory, AI servers, and semiconductor materials overlap at the same time.',
    currentStatus: 'AI server demand and the memory-cycle recovery are being priced in together.',
    keywordPaths: [
      ['Semiconductors', 'AI', 'HBM'],
      ['Semiconductors', 'Materials', 'Hydrogen Fluoride'],
      ['Semiconductors', 'Power', 'Cables'],
    ],
  },
  {
    id: 'sector-stock-hynix',
    symbol: 'KRX:000660',
    company: 'SK Hynix',
    marketCap: 1460000,
    turnover: 2960,
    priceChange: 4.6,
    headline: 'Expected HBM capacity expansion is spilling into equipment and packaging keywords.',
    overview: 'A high-beta semiconductor name where AI memory, packaging, and specialty gas themes overlap.',
    currentStatus: 'This is the strongest momentum axis across the broader memory chain.',
    keywordPaths: [
      ['Semiconductors', 'AI', 'HBM'],
      ['Semiconductors', 'Packaging', 'Glass Substrate'],
      ['Semiconductors', 'Materials', 'Specialty Gas'],
    ],
  },
  {
    id: 'sector-stock-hanmi',
    symbol: 'KRX:042700',
    company: 'Hanmi Semiconductor',
    marketCap: 142000,
    turnover: 1480,
    priceChange: 6.8,
    headline: 'TC bonder order expectations have moved to the center of the packaging theme.',
    overview: 'A representative name linking back-end semiconductor equipment with HBM packaging.',
    currentStatus: 'The stronger packaging demand gets, the more tightly it moves with the HBM chain.',
    keywordPaths: [
      ['Semiconductors', 'Packaging', 'TC Bonder'],
      ['Semiconductors', 'AI', 'HBM'],
      ['Semiconductors', 'Materials', 'Silicon Carbide'],
    ],
  },
  {
    id: 'sector-stock-wonik',
    symbol: 'KRX:240810',
    company: 'Wonik IPS',
    marketCap: 16500,
    turnover: 910,
    priceChange: 2.4,
    headline: 'Deposition equipment and specialty-gas keywords are rebounding together in the equipment group.',
    overview: 'A support name that links semiconductor equipment with specialty-gas keywords.',
    currentStatus: 'Expectations for memory CAPEX recovery are spreading through the equipment value chain.',
    keywordPaths: [
      ['Semiconductors', 'Equipment', 'Deposition'],
      ['Semiconductors', 'Materials', 'Specialty Gas'],
      ['Semiconductors', 'AI', 'High Bandwidth Memory'],
    ],
  },
  {
    id: 'sector-stock-hanwha',
    symbol: 'KRX:012450',
    company: 'Hanwha Aerospace',
    marketCap: 350000,
    turnover: 1740,
    priceChange: 5.2,
    headline: 'Aerospace engine and defense propulsion keywords are surging together.',
    overview: 'A core name where engine, aerospace materials, and defense propulsion themes overlap.',
    currentStatus: 'Aircraft engine exports and defense orders are both driving attention at the same time.',
    keywordPaths: [
      ['Engine Systems', 'Aerospace Engines', 'Turbine Blades'],
      ['Engine Systems', 'Materials', 'Nickel Alloys'],
      ['Engine Systems', 'Defense', 'Propulsion'],
    ],
  },
  {
    id: 'sector-stock-hyundai',
    symbol: 'KRX:005380',
    company: 'Hyundai Motor',
    marketCap: 430000,
    turnover: 820,
    priceChange: 0.9,
    headline: 'Hybrid engine and thermal-management module demand are being mentioned together.',
    overview: 'A name with overlapping automotive engine, thermal management, and lightweight-material themes.',
    currentStatus: 'Engine-related keywords remain active as hybrid sales mix continues to rise.',
    keywordPaths: [
      ['Engine Systems', 'Automotive', 'Hybrids'],
      ['Engine Systems', 'Thermal Management', 'Cooling Modules'],
      ['Engine Systems', 'Materials', 'Aluminum Alloys'],
    ],
  },
  {
    id: 'sector-stock-kia',
    symbol: 'KRX:000270',
    company: 'Kia',
    marketCap: 390000,
    turnover: 780,
    priceChange: -0.4,
    headline: 'SUV sales momentum is holding, but engine themes are mixed with electrification.',
    overview: 'An automotive keyword name where engine and electrification narratives overlap.',
    currentStatus: 'It sits in a transition period where ICE and electrification themes are both active.',
    keywordPaths: [
      ['Engine Systems', 'Automotive', 'SUV'],
      ['Engine Systems', 'Electrification', 'Drive Motors'],
      ['Engine Systems', 'Thermal Management', 'Cooling Modules'],
    ],
  },
  {
    id: 'sector-stock-lges',
    symbol: 'KRX:373220',
    company: 'LG Energy Solution',
    marketCap: 800000,
    turnover: 1360,
    priceChange: -1.3,
    headline: 'Cathode-material and thermal-runaway control themes are both active, but short-term flows remain weak.',
    overview: 'A large battery-cell name where battery-material and safety keywords overlap.',
    currentStatus: 'Slower battery demand concerns and the safety-improvement theme are being priced in together.',
    keywordPaths: [
      ['Battery', 'Materials', 'Cathode Materials'],
      ['Battery', 'Safety', 'Thermal Runaway Control'],
      ['Battery', 'Process', 'Dry Electrode'],
    ],
  },
  {
    id: 'sector-stock-lgchem',
    symbol: 'KRX:051910',
    company: 'LG Chem',
    marketCap: 210000,
    turnover: 980,
    priceChange: -2.4,
    headline: 'Cathode and precursor keywords are holding, but the industry slowdown is having the stronger effect.',
    overview: 'A materials axis name combining battery raw-material and recycling themes.',
    currentStatus: 'The slowdown in materials conditions is weighing on the battery keyword chain.',
    keywordPaths: [
      ['Battery', 'Materials', 'Cathode Materials'],
      ['Battery', 'Recycling', 'Black Mass'],
      ['Battery', 'Raw Materials', 'Precursors'],
    ],
  },
  {
    id: 'sector-stock-posco',
    symbol: 'KRX:005490',
    company: 'POSCO Holdings',
    marketCap: 310000,
    turnover: 860,
    priceChange: -0.8,
    headline: 'Lithium and nickel raw-material keywords remain tightly linked inside the battery chain.',
    overview: 'A raw-materials axis where battery feedstock, minerals, and anode themes intersect.',
    currentStatus: 'The raw-material price correction phase is acting as a lower-level drag on the sector.',
    keywordPaths: [
      ['Battery', 'Raw Materials', 'Lithium'],
      ['Battery', 'Raw Materials', 'Nickel'],
      ['Battery', 'Materials', 'Anode Materials'],
    ],
  },
  {
    id: 'sector-stock-ecopro',
    symbol: 'KRX:247540',
    company: 'EcoPro BM',
    marketCap: 145000,
    turnover: 1120,
    priceChange: 0.4,
    headline: 'Cathode and separator-stability themes are active together, but the group rebound is still limited.',
    overview: 'A representative component name linking battery cathodes with process themes.',
    currentStatus: 'Rotation is returning inside the sector, but a strong trend is still missing.',
    keywordPaths: [
      ['Battery', 'Materials', 'Cathode Materials'],
      ['Battery', 'Process', 'Calcination'],
      ['Battery', 'Safety', 'Separator'],
    ],
  },
  {
    id: 'sector-stock-sambio',
    symbol: 'KRX:207940',
    company: 'Samsung Biologics',
    marketCap: 730000,
    turnover: 730,
    priceChange: 1.7,
    headline: 'CDMO and antibody-production themes are moving back into focus inside biotech.',
    overview: 'A large biotech name built around production, CDMO, and quality-control keywords.',
    currentStatus: 'Expectations for capacity expansion are leading the biotech keyword chain.',
    keywordPaths: [
      ['Biotech', 'CDMO', 'Antibody'],
      ['Biotech', 'Production', 'Cell Culture'],
      ['Biotech', 'Quality', 'Purification'],
    ],
  },
  {
    id: 'sector-stock-celltrion',
    symbol: 'KRX:068270',
    company: 'Celltrion',
    marketCap: 360000,
    turnover: 620,
    priceChange: -0.9,
    headline: 'Antibody and direct-sales themes are intact, but short-term momentum has cooled somewhat.',
    overview: 'A biotech name combining biosimilar and distribution-related keywords.',
    currentStatus: 'It is showing a relatively defensive profile within large-cap biotech.',
    keywordPaths: [
      ['Biotech', 'Biosimilar', 'Antibody'],
      ['Biotech', 'Distribution', 'Direct Sales'],
      ['Biotech', 'Development', 'Clinical Trials'],
    ],
  },
  {
    id: 'sector-stock-naver',
    symbol: 'KRX:035420',
    company: 'NAVER',
    marketCap: 310000,
    turnover: 540,
    priceChange: 1.8,
    headline: 'Search and generative-AI themes are returning to the forefront inside Platform AI.',
    overview: 'A domestic platform axis where search, advertising, and data-center themes intersect.',
    currentStatus: 'Expansion expectations for generative-AI services are supporting platform valuations.',
    keywordPaths: [
      ['Platform AI', 'Search', 'Generative AI'],
      ['Platform AI', 'Ads', 'Commerce'],
      ['Platform AI', 'Infrastructure', 'Data Center'],
    ],
  },
  {
    id: 'sector-stock-kakao',
    symbol: 'KRX:035720',
    company: 'Kakao',
    marketCap: 90000,
    turnover: 430,
    priceChange: -2.2,
    headline: 'Messaging and content themes are still active, but ad momentum remains weak.',
    overview: 'A domestic platform name mixing messaging, content, and cloud themes.',
    currentStatus: 'It is trading through a transition zone where ad weakness and restructuring expectations coexist.',
    keywordPaths: [
      ['Platform AI', 'Messaging', 'Ads'],
      ['Platform AI', 'Content', 'Mobility'],
      ['Platform AI', 'Infrastructure', 'Cloud'],
    ],
  },
  {
    id: 'sector-stock-meta',
    symbol: 'NASDAQ:META',
    company: 'Meta Platforms',
    marketCap: 1850000,
    turnover: 1580,
    priceChange: -0.4,
    headline: 'Recommender-model and open-source LLM themes are becoming a new expansion axis for Platform AI.',
    overview: 'A US platform name where advertising, recommender models, and GPU cluster themes overlap.',
    currentStatus: 'AI infrastructure investment is being priced in alongside expectations for ad recovery.',
    keywordPaths: [
      ['Platform AI', 'Ads', 'Recommender Models'],
      ['Platform AI', 'Open Source', 'LLM'],
      ['Platform AI', 'Infrastructure', 'GPU Cluster'],
    ],
  },
  {
    id: 'sector-stock-google',
    symbol: 'NASDAQ:GOOGL',
    company: 'Alphabet',
    marketCap: 2250000,
    turnover: 1490,
    priceChange: 0.1,
    headline: 'Search-agent and TPU themes continue to connect within the Platform AI category.',
    overview: 'A global platform name combining search, cloud, and TPU infrastructure themes.',
    currentStatus: 'This is a steadier setup where search AI and cloud tooling are both being recognized.',
    keywordPaths: [
      ['Platform AI', 'Search', 'Agents'],
      ['Platform AI', 'Cloud', 'AI Studio'],
      ['Platform AI', 'Infrastructure', 'TPU'],
    ],
  },
]

const allMarketEntries = marketBillboardTabs.flatMap((tab) => marketBillboardData[tab])

export const defaultMarketSymbol = marketBillboardData['지수'][0].symbol

function buildFocusEntities(snapshot: FocusSnapshot, scope: 'market' | 'sector'): Record<BriefingTab, FocusEntityEntry[]> {
  const label = scope === 'market' ? 'Macro Board' : 'Sector Board'

  return {
    News: [
      {
        id: `${snapshot.symbol}-news-1`,
        source: 'Reuters',
        timestamp: '08:12',
        title: `${snapshot.title} Pre-Market Headline`,
        lead: `A news item designed around the flow where a field picked in the ${label} is read directly through the chart on the left.`,
        body: [
          `${snapshot.title} is placed as one of the first fields worth checking from the perspective of ${snapshot.subtitle}.`,
          `Because the top chart and right-side list share the same symbol, list exploration and chart inspection connect in a single click.`,
        ],
        points: ['One click updates the chart', 'Keep macro or sector context on one screen', 'Preserve the existing news panel layout'],
      },
      {
        id: `${snapshot.symbol}-news-2`,
        source: 'Bloomberg',
        timestamp: '10:28',
        title: `${snapshot.title} Intraday Issue Brief`,
        lead: `News and reports reuse the lower structure from the Stock page so the usage pattern stays stable even when the top page changes.`,
        body: [
          `On the Market and Sector pages, headline consumption speed matters, so the left list stays short while long-form reading happens in the right detail panel.`,
          `This structure can scale into a future news API or internal research feed without changing the layout.`,
        ],
        points: ['Reuse the lower structure', 'Separate content length from list density', 'A strong base for real-data expansion'],
      },
    ],
    Reports: [
      {
        id: `${snapshot.symbol}-report-1`,
        source: 'Macro Desk',
        timestamp: '09:05',
        title: `${snapshot.title} Daily Report`,
        lead: `A report-style item built so the chart and commentary can be read side by side for the selection in the ${label}.`,
        body: [
          `${snapshot.title} is designed to be checked for trend via ${snapshot.exchange}, then read in the lower report section for background and interpretation.`,
          `That matters especially on the Market page, where indices, commodities, and FX often interact and need to be read together.`,
        ],
        points: ['Consume chart and document together', 'Link the top selection to lower copy', 'Well suited to report-style content'],
      },
      {
        id: `${snapshot.symbol}-report-2`,
        source: 'Strategy Note',
        timestamp: '11:42',
        title: `${snapshot.title} Positioning Check`,
        lead: `Longer reports keep the same pattern as news so the interaction stays easy to learn.`,
        body: [
          `Users only need to learn the flow of selecting something above and switching between News and Reports below, so interactions remain stable across pages.`,
          `That consistency also helps preserve the dashboard rules if more pages are added later.`,
        ],
        points: ['Same interaction across pages', 'Handles longer reports', 'Keeps dashboard rules consistent'],
      },
    ],
  }
}

function formatSectorTurnover(value: number) {
  const billions = value / 10
  const digits = billions >= 100 ? 0 : 1

  return `KRW ${billions.toFixed(digits)}B`
}

function formatSectorMarketCap(value: number) {
  if (value >= 10000) {
    const convertedValue = value / 10000
    const digits = convertedValue >= 100 ? 0 : 1

    return `KRW ${convertedValue.toFixed(digits)}T`
  }

  const billions = value / 10
  const digits = billions >= 100 ? 0 : 1

  return `KRW ${billions.toFixed(digits)}B`
}

function formatSectorChange(value: number) {
  const sign = value > 0 ? '+' : ''

  return `${sign}${value.toFixed(2)}%`
}

function buildSectorGraph(rootKeyword: string, keywordPaths: string[][]) {
  type GraphDraftNode = {
    id: string
    label: string
    depth: number
    children: string[]
    path: string[]
  }

  const rootId = `${rootKeyword}::root`
  const nodeMap = new Map<string, GraphDraftNode>([
    [rootId, { id: rootId, label: rootKeyword, depth: 0, children: [], path: [rootKeyword] }],
  ])
  const edgeSet = new Set<string>()

  for (const path of keywordPaths) {
    let parentId = rootId

    for (let index = 1; index < path.length; index += 1) {
      const depth = index
      const label = path[index]
      const nodeId = `${rootKeyword}::${path.slice(0, index + 1).join('>')}`

      if (!nodeMap.has(nodeId)) {
        nodeMap.set(nodeId, { id: nodeId, label, depth, children: [], path: path.slice(0, index + 1) })
      }

      const parent = nodeMap.get(parentId)

      if (parent && !parent.children.includes(nodeId)) {
        parent.children.push(nodeId)
      }

      edgeSet.add(`${parentId}->${nodeId}`)
      parentId = nodeId
    }
  }

  for (const node of nodeMap.values()) {
    node.children.sort((left, right) => {
      const leftLabel = nodeMap.get(left)?.label ?? left
      const rightLabel = nodeMap.get(right)?.label ?? right

      return leftLabel.localeCompare(rightLabel, 'en')
    })
  }

  let leafCursor = 0
  const yPositionMap = new Map<string, number>()

  const resolveYPosition = (nodeId: string): number => {
    const cachedPosition = yPositionMap.get(nodeId)

    if (cachedPosition !== undefined) {
      return cachedPosition
    }

    const node = nodeMap.get(nodeId)

    if (!node) {
      return 0
    }

    if (node.children.length === 0) {
      const nextPosition = leafCursor * 96

      leafCursor += 1
      yPositionMap.set(nodeId, nextPosition)

      return nextPosition
    }

    const childPositions = node.children.map(resolveYPosition)
    const averagedPosition = childPositions.reduce((sum, value) => sum + value, 0) / childPositions.length

    yPositionMap.set(nodeId, averagedPosition)

    return averagedPosition
  }

  resolveYPosition(rootId)

  const nodes: SectorMindMapNode[] = [...nodeMap.values()].map((node) => ({
    id: node.id,
    label: node.label,
    kind: node.depth === 0 ? 'root' : node.children.length > 0 ? 'branch' : 'leaf',
    path: node.path,
    position: {
      x: node.depth * 220,
      y: (yPositionMap.get(node.id) ?? 0) + 56,
    },
  }))

  const edges: SectorMindMapEdge[] = [...edgeSet].map((edgeId) => {
    const [source, target] = edgeId.split('->')

    return {
      id: edgeId,
      source,
      target,
    }
  })

  return { nodes, edges }
}

function buildSectorEntities(cluster: {
  title: string
  subtitle: string
  overview: string
  members: SectorKeywordRecord[]
  totalTurnover: number
  averageChange: number
  topKeywords: string[]
}) {
  const turnoverLeader = [...cluster.members].sort((left, right) => right.turnover - left.turnover)[0]
  const momentumLeader = [...cluster.members].sort((left, right) => right.priceChange - left.priceChange)[0]
  const weakestMember = [...cluster.members].sort((left, right) => left.priceChange - right.priceChange)[0]
  const memberSummary = cluster.members.slice(0, 3).map((member) => member.company).join(' · ')
  const keywordSummary = cluster.topKeywords.slice(0, 3).join(' · ')

  return {
    News: [
      {
        id: `${cluster.title}-news-overlap`,
        source: 'Keyword DB',
        timestamp: 'Now',
        title: `${cluster.title} Keyword Overlap Expands`,
        lead: `The ${cluster.title} sector is the result of grouping together names that overlap around ${keywordSummary}.`,
        body: [
          `${cluster.overview}`,
          `${turnoverLeader.company} leads on turnover, while ${momentumLeader.company} is lifting near-term sector sentiment through relative strength.`,
        ],
        points: ['Sector derived from keyword overlap', `Total turnover ${formatSectorTurnover(cluster.totalTurnover)}`, `Average return ${formatSectorChange(cluster.averageChange)}`],
      },
      {
        id: `${cluster.title}-news-status`,
        source: 'Status Merge',
        timestamp: 'Update',
        title: `${cluster.title} Status Summary`,
        lead: `A sector narrative built by merging recent updates from names such as ${memberSummary}.`,
        body: [
          `${momentumLeader.company}: ${momentumLeader.currentStatus}`,
          `${weakestMember.company}: ${weakestMember.currentStatus}`,
        ],
        points: [`Core keywords ${keywordSummary}`, `Leader ${momentumLeader.company}`, `Laggard ${weakestMember.company}`],
      },
    ],
    Reports: [
      {
        id: `${cluster.title}-report-board`,
        source: 'Sector Engine',
        timestamp: 'Report',
        title: `${cluster.title} Board Read`,
        lead: `The sector board ranks names sharing the same keyword root by turnover and average return.`,
        body: [
          `${cluster.title} is built from a shared root keyword across ${cluster.members.length} stocks, with leaves such as ${cluster.subtitle} connected at the same time.`,
          `Switching tabs reorders the same sector set by turnover, gainers, or decliners.`,
        ],
        points: ['Clustered by root keyword', 'Re-ranked by tab', 'Mind map and board share the same source data'],
      },
      {
        id: `${cluster.title}-report-constituents`,
        source: 'Constituent Note',
        timestamp: 'Report',
        title: `${cluster.title} Constituents Check`,
        lead: `Representative names such as ${turnoverLeader.company}, ${momentumLeader.company}, and ${weakestMember.company} reveal the internal balance of the sector.`,
        body: [
          `${turnoverLeader.company}: ${turnoverLeader.overview}`,
          `${momentumLeader.company}: ${momentumLeader.headline}`,
          `${weakestMember.company}: ${weakestMember.headline}`,
        ],
        points: ['Compare representative names', `Turnover leader ${turnoverLeader.company}`, `Top gainer ${momentumLeader.company}`],
      },
    ],
  }
}

function findMatchingKeywordPaths(record: SectorKeywordRecord, keywordPath: string[]) {
  return record.keywordPaths.filter((path) =>
    keywordPath.every((keyword, index) => path[index] === keyword),
  )
}

function buildSectorStockQueueEntries(members: SectorKeywordRecord[], keywordPath: string[], tab: SectorStockQueueTab) {
  const entries = members
    .filter((member) => findMatchingKeywordPaths(member, keywordPath).length > 0)
    .map((member) => {
      const matchingPaths = findMatchingKeywordPaths(member, keywordPath)
      const connectionKeywords = [...new Set(
        matchingPaths.map((path) => path[keywordPath.length] ?? path[path.length - 1]),
      )]

      return {
        id: member.id,
        symbol: member.symbol,
        company: member.company,
        marketCapLabel: formatSectorMarketCap(member.marketCap),
        marketCapValue: member.marketCap,
        turnoverLabel: formatSectorTurnover(member.turnover),
        turnoverValue: member.turnover,
        priceChangeLabel: formatSectorChange(member.priceChange),
        priceChangeValue: member.priceChange,
        headline: member.headline,
        overview: member.overview,
        currentStatus: member.currentStatus,
        connectionLabel: connectionKeywords.join(' · '),
        matchedPathLabels: matchingPaths.map((path) => path.join(' > ')),
      } satisfies SectorStockQueueEntry
    })

  return entries.sort((left, right) => {
    if (tab === '시가총액') {
      return right.marketCapValue - left.marketCapValue || left.company.localeCompare(right.company, 'en')
    }

    if (tab === '거래대금') {
      return right.turnoverValue - left.turnoverValue || left.company.localeCompare(right.company, 'en')
    }

    if (tab === '상승률') {
      return right.priceChangeValue - left.priceChangeValue || left.company.localeCompare(right.company, 'en')
    }

    return left.priceChangeValue - right.priceChangeValue || left.company.localeCompare(right.company, 'en')
  })
}

function buildSectorStockQueues(cluster: {
  members: SectorKeywordRecord[]
  title: string
  subtitle: string
  graph: { nodes: SectorMindMapNode[] }
}) {
  return Object.fromEntries(
    cluster.graph.nodes.map((node) => {
      const matchingMembers = cluster.members.filter(
        (member) => findMatchingKeywordPaths(member, node.path).length > 0,
      )
      const subtitle =
        node.kind === 'root'
          ? `All ${cluster.members.length} stocks · ${cluster.subtitle}`
          : `${node.path.join(' > ')} · ${matchingMembers.length} stocks`
      const overview =
        node.kind === 'root'
          ? `A full stock queue connected to the ${cluster.title} root.`
          : `A re-ranked queue containing only the stocks connected to the ${node.path.join(' > ')} path.`

      return [
        node.id,
        {
          nodeId: node.id,
          label: node.label,
          path: node.path,
          count: matchingMembers.length,
          subtitle,
          overview,
          entries: {
            시가총액: buildSectorStockQueueEntries(cluster.members, node.path, '시가총액'),
            거래대금: buildSectorStockQueueEntries(cluster.members, node.path, '거래대금'),
            상승률: buildSectorStockQueueEntries(cluster.members, node.path, '상승률'),
            하락률: buildSectorStockQueueEntries(cluster.members, node.path, '하락률'),
          },
        } satisfies SectorKeywordQueue,
      ]
    }),
  ) as Record<string, SectorKeywordQueue>
}

function buildSectorClusters(records: SectorKeywordRecord[]) {
  const rootKeywordMap = new Map<string, SectorKeywordRecord[]>()

  for (const record of records) {
    const rootKeywords = new Set(record.keywordPaths.map((path) => path[0]))

    for (const rootKeyword of rootKeywords) {
      const bucket = rootKeywordMap.get(rootKeyword) ?? []

      bucket.push(record)
      rootKeywordMap.set(rootKeyword, bucket)
    }
  }

  return [...rootKeywordMap.entries()]
    .filter(([, members]) => members.length >= 2)
    .map(([rootKeyword, members]) => {
      const keywordPaths = members.flatMap((member) =>
        member.keywordPaths.filter((path) => path[0] === rootKeyword),
      )
      const totalTurnover = members.reduce((sum, member) => sum + member.turnover, 0)
      const averageChange = members.reduce((sum, member) => sum + member.priceChange, 0) / members.length
      const keywordFrequency = new Map<string, number>()

      for (const keywordPath of keywordPaths) {
        for (const keyword of keywordPath.slice(1)) {
          keywordFrequency.set(keyword, (keywordFrequency.get(keyword) ?? 0) + 1)
        }
      }

      const topKeywords = [...keywordFrequency.entries()]
        .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], 'en'))
        .slice(0, 4)
        .map(([keyword]) => keyword)

      const subtitle = topKeywords.slice(0, 3).join(' · ')
      const overview = `${rootKeyword} groups ${members.length} stocks whose keywords repeatedly overlap across news, overview, and status data.`
      const graph = buildSectorGraph(rootKeyword, keywordPaths)
      const defaultNodeId = graph.nodes.find((node) => node.kind === 'root')?.id ?? `${rootKeyword}::root`

      return {
        id: rootKeyword,
        title: rootKeyword,
        subtitle,
        overview,
        members,
        totalTurnover,
        averageChange,
        topKeywords,
        defaultNodeId,
        graph,
        stockQueues: buildSectorStockQueues({
          members,
          title: rootKeyword,
          subtitle,
          graph,
        }),
        entities: buildSectorEntities({
          title: rootKeyword,
          subtitle,
          overview,
          members,
          totalTurnover,
          averageChange,
          topKeywords,
        }),
      } satisfies DerivedSectorCluster
    })
}

function buildSectorBoardEntries(clusters: DerivedSectorCluster[], tab: SectorBoardTab) {
  const sortedClusters = [...clusters].sort((left, right) => {
    if (tab === '거래대금') {
      return right.totalTurnover - left.totalTurnover
    }

    if (tab === '상승률') {
      return right.averageChange - left.averageChange
    }

    return left.averageChange - right.averageChange
  })

  return sortedClusters.map((cluster) => ({
    id: `${tab}-${cluster.id}`,
    sectorId: cluster.id,
    title: cluster.title,
    subtitle: cluster.subtitle,
    metric: tab === '거래대금' ? formatSectorTurnover(cluster.totalTurnover) : formatSectorChange(cluster.averageChange),
    venue: `${cluster.members.length} stocks`,
  }))
}

const derivedSectorClusters = buildSectorClusters(sectorKeywordRecords)
const derivedSectorMap = new Map(derivedSectorClusters.map((cluster) => [cluster.id, cluster]))
const sectorBoardData: Record<SectorBoardTab, SectorBoardEntry[]> = {
  거래대금: buildSectorBoardEntries(derivedSectorClusters, '거래대금'),
  상승률: buildSectorBoardEntries(derivedSectorClusters, '상승률'),
  하락률: buildSectorBoardEntries(derivedSectorClusters, '하락률'),
}

export const defaultSectorId = sectorBoardData['거래대금'][0]?.sectorId ?? derivedSectorClusters[0]?.id ?? 'Semiconductors'

function findEntryBySymbol(entries: MarketBoardEntry[], symbol: string) {
  const normalized = symbol.trim().toUpperCase()

  return entries.find((entry) => entry.symbol.toUpperCase() === normalized) ?? null
}

export function resolveMarketWorkspace(symbol: string): MarketWorkspace {
  const activeEntry = findEntryBySymbol(allMarketEntries, symbol) ?? marketBillboardData['지수'][0]
  const snapshot = marketSnapshots[activeEntry.symbol] ?? marketSnapshots[defaultMarketSymbol]

  return {
    symbol: snapshot.symbol,
    title: snapshot.title,
    subtitle: snapshot.subtitle,
    overview: snapshot.overview,
    exchange: snapshot.exchange,
    quickFacts: snapshot.quickFacts,
    billboard: marketBillboardData,
    entities: buildFocusEntities(snapshot, 'market'),
  }
}

export function resolveSectorWorkspace(sectorId: string): SectorWorkspace {
  const activeCluster = derivedSectorMap.get(sectorId) ?? derivedSectorMap.get(defaultSectorId)

  return {
    id: activeCluster?.id ?? defaultSectorId,
    title: activeCluster?.title ?? 'Sector',
    subtitle: activeCluster?.subtitle ?? '',
    overview: activeCluster?.overview ?? '',
    board: sectorBoardData,
    defaultNodeId: activeCluster?.defaultNodeId ?? `${defaultSectorId}::root`,
    graph: activeCluster?.graph ?? { nodes: [], edges: [] },
    stockQueues: activeCluster?.stockQueues ?? {},
    entities: activeCluster?.entities ?? {
      News: [],
      Reports: [],
    },
  }
}