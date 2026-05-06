import { useEffect, useRef, useState, type FocusEvent, type FormEvent, type KeyboardEvent } from 'react'
import {
  analysisTabs,
  defaultSymbol,
  entityTabs,
  findStockSearchOption,
  rankingTabs,
  resolveStockWorkspace,
  stockSearchMarkets,
  type AnalysisTab,
  type EntityTab,
  type RankingTab,
  type StockSearchMarket,
  type StockSearchOption,
} from '../data/stockWorkspaceData'
import { resolveStockSearchOption, searchStockSymbols } from '../services/stockSymbolSearch'
import {
  briefingTabs,
  defaultMarketSymbol,
  defaultSectorId,
  marketBillboardTabs,
  resolveMarketWorkspace,
  resolveSectorWorkspace,
  sectorBoardTabs,
  sectorStockQueueTabs,
  workspacePageTabs,
  type BriefingTab,
  type MarketBillboardTab,
  type MarketBoardEntry,
  type SectorBoardEntry,
  type SectorBoardTab,
  type SectorKeywordQueue,
  type SectorStockQueueEntry,
  type SectorStockQueueTab,
  type WorkspacePageTab,
} from '../data/workspaceFocusData'
import '../stock-workspace.css'
import { SectorMindMap } from './SectorMindMap'
import { StockChart } from './StockChart'

type DetailEntry = {
  id: string
  source: string
  timestamp: string
  title: string
  lead: string
  body: string[]
  points: string[]
}

type EntitySectionProps<T extends string> = {
  activeTab: T
  contextLabel: string
  entities: Record<T, DetailEntry[]>
  onChangeTab: (tab: T) => void
  onSelectEntityId: (entityId: string) => void
  selectedEntityId: string
  tabs: readonly T[]
}

function resolveEntityListTitle(tab: string) {
  switch (tab) {
    case 'Reports':
      return 'Report Feed'
    case 'Summary':
      return 'Briefing Feed'
    case '투자자별':
      return 'Investor Flow Feed'
    case 'News':
    default:
      return 'News Feed'
  }
}

function resolveDisplayLabel(label: string) {
  const labelMap: Record<string, string> = {
    '거래대금': 'Turnover',
    '상승률': 'Gainers',
    '하락률': 'Decliners',
    '시가총액': 'Market Cap',
    '섹터': 'Sectors',
    '관련주': 'Related Stocks',
    '투자자별': 'Investor Flow',
    '지수': 'Indices',
    '원자재': 'Commodities',
    '환율': 'FX',
    '국내주식': 'Korea',
    '미국주식': 'US',
  }

  return labelMap[label] ?? label
}

function resolveRankingValue(value: string) {
  const parsedValue = Number.parseFloat(value.replace(/[^0-9+-.]/g, ''))

  return Number.isFinite(parsedValue) ? parsedValue : Number.NEGATIVE_INFINITY
}

function resolveSectorQueueMetric(entry: SectorStockQueueEntry, tab: SectorStockQueueTab) {
  switch (tab) {
    case '시가총액':
      return entry.marketCapLabel
    case '거래대금':
      return entry.turnoverLabel
    case '상승률':
    case '하락률':
    default:
      return entry.priceChangeLabel
  }
}

function EntitySection<T extends string>({
  activeTab,
  contextLabel,
  entities,
  onChangeTab,
  onSelectEntityId,
  selectedEntityId,
  tabs,
}: EntitySectionProps<T>) {
  const entityEntries = entities[activeTab]
  const activeEntity = entityEntries.find((item) => item.id === selectedEntityId) ?? entityEntries[0]
  const entityListTitle = resolveEntityListTitle(activeTab)

  useEffect(() => {
    if (!entityEntries.some((item) => item.id === selectedEntityId)) {
      onSelectEntityId(entityEntries[0]?.id ?? '')
    }
  }, [entityEntries, onSelectEntityId, selectedEntityId])

  if (!activeEntity) {
    return null
  }

  return (
    <section className="workspace-bottom-grid">
      <aside className="workspace-panel entity-list-panel">
        <div className="panel-header panel-header-stack">
          <div className="panel-copy">
            <span className="panel-kicker">Feed</span>
            <h3>{entityListTitle}</h3>
          </div>

          <div className="panel-tabs entity-tabs">
            {tabs.map((tab) => (
              <button
                className={`panel-tab ${activeTab === tab ? 'is-active' : ''}`}
                key={tab}
                type="button"
                onClick={() => onChangeTab(tab)}
              >
                {resolveDisplayLabel(tab)}
              </button>
            ))}
          </div>
        </div>

        <div className="entity-list-scroll">
          {entityEntries.map((entry) => (
            <button
              className={`entity-row ${activeEntity.id === entry.id ? 'is-active' : ''}`}
              key={entry.id}
              type="button"
              onClick={() => onSelectEntityId(entry.id)}
            >
              <div className="entity-row-meta">
                <span>{entry.source}</span>
                <span>{entry.timestamp}</span>
              </div>
              <strong className="entity-row-title">{entry.title}</strong>
              <p className="entity-row-lead">{entry.lead}</p>
            </button>
          ))}
        </div>
      </aside>

      <article className="workspace-panel entity-content-panel">
        <div className="entity-content-head">
          <span className="panel-kicker">{activeTab}</span>
          <h2 className="entity-content-title">{activeEntity.title}</h2>
          <div className="entity-content-meta">
            <span>{activeEntity.source}</span>
            <span>{activeEntity.timestamp}</span>
            <span>{contextLabel}</span>
          </div>
        </div>

        <p className="entity-content-lead">{activeEntity.lead}</p>

        <div className="entity-content-body">
          <div className="entity-paragraphs">
            {activeEntity.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <aside className="entity-points-card">
            <span className="panel-kicker">Contents</span>
            <ul className="entity-points">
              {activeEntity.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </aside>
        </div>
      </article>
    </section>
  )
}

function BillboardRows({
  entries,
  onSelect,
  selectedSymbol,
}: {
  entries: MarketBoardEntry[]
  onSelect: (symbol: string) => void
  selectedSymbol: string
}) {
  return (
    <div className="panel-list-scroll">
      {entries.map((entry) => (
        <button
          className={`panel-row analysis-row billboard-row ${selectedSymbol === entry.symbol ? 'is-selected' : ''}`}
          key={entry.id}
          type="button"
          onClick={() => onSelect(entry.symbol)}
        >
          <div className="row-copy compact-copy">
            <strong>{entry.title}</strong>
            <p>{entry.subtitle}</p>
          </div>
          <div className="row-metric compact-metric">
            <strong>{entry.metric}</strong>
            <span>{entry.venue}</span>
          </div>
        </button>
      ))}
    </div>
  )
}

function SectorBoardRows({
  entries,
  onSelect,
  selectedSectorId,
}: {
  entries: SectorBoardEntry[]
  onSelect: (sectorId: string) => void
  selectedSectorId: string
}) {
  return (
    <div className="panel-list-scroll">
      {entries.map((entry) => (
        <button
          className={`panel-row analysis-row billboard-row ${selectedSectorId === entry.sectorId ? 'is-selected' : ''}`}
          key={entry.id}
          type="button"
          onClick={() => onSelect(entry.sectorId)}
        >
          <div className="row-copy compact-copy">
            <strong>{entry.title}</strong>
            <p>{entry.subtitle}</p>
          </div>
          <div className="row-metric compact-metric">
            <strong>{entry.metric}</strong>
            <span>{entry.venue}</span>
          </div>
        </button>
      ))}
    </div>
  )
}

function SectorStockQueueSection({
  activeQueue,
  activeTab,
  onChangeTab,
  onSelectEntryId,
  selectedEntryId,
}: {
  activeQueue: SectorKeywordQueue
  activeTab: SectorStockQueueTab
  onChangeTab: (tab: SectorStockQueueTab) => void
  onSelectEntryId: (entryId: string) => void
  selectedEntryId: string
}) {
  const queueEntries = activeQueue.entries[activeTab]
  const displayedQueueEntries = queueEntries.slice(0, 5)
  const activeEntry = displayedQueueEntries.find((entry) => entry.id === selectedEntryId) ?? displayedQueueEntries[0]

  useEffect(() => {
    if (!displayedQueueEntries.some((entry) => entry.id === selectedEntryId)) {
      onSelectEntryId(displayedQueueEntries[0]?.id ?? '')
    }
  }, [displayedQueueEntries, onSelectEntryId, selectedEntryId])

  if (!activeEntry) {
    return null
  }

  return (
    <section className="workspace-bottom-grid sector-stock-grid">
      <article className="workspace-panel chart-panel chart-panel--focus sector-stock-chart-panel">
        <div className="stock-chart-shell sector-stock-chart-shell">
          <StockChart symbol={activeEntry.symbol} height={560} />
        </div>
      </article>

      <aside className="workspace-panel entity-list-panel sector-stock-list-panel">
          <div className="panel-header panel-header-stack">
            <div className="panel-copy">
              <span className="panel-kicker">Related Stocks</span>
              <h3>{activeQueue.label} Top 5</h3>
            </div>

            <div className="panel-tabs entity-tabs">
              {sectorStockQueueTabs.map((tab) => (
                <button
                  className={`panel-tab ${activeTab === tab ? 'is-active' : ''}`}
                  key={tab}
                  type="button"
                  onClick={() => onChangeTab(tab)}
                >
                  {resolveDisplayLabel(tab)}
                </button>
              ))}
            </div>
          </div>

          <div className="entity-list-scroll">
            {displayedQueueEntries.map((entry, index) => (
              <button
                className={`entity-row sector-stock-row ${activeEntry.id === entry.id ? 'is-active' : ''}`}
                key={entry.id}
                type="button"
                onClick={() => onSelectEntryId(entry.id)}
              >
                <div className="entity-row-meta">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>{entry.symbol}</span>
                </div>
                <strong className="entity-row-title">{entry.company}</strong>
                <div className="sector-stock-row-metrics">
                  <span>{entry.connectionLabel}</span>
                  <strong>{resolveSectorQueueMetric(entry, activeTab)}</strong>
                </div>
              </button>
            ))}
          </div>
      </aside>
    </section>
  )
}

type StockSearchComboboxProps = {
  activeMarket: StockSearchMarket
  isLoading: boolean
  onChangeInput: (value: string) => void
  onChangeMarket: (market: StockSearchMarket) => void
  onSelectOption: (option: StockSearchOption) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  options: StockSearchOption[]
  searchInput: string
  selectedSymbol: string
}

function StockSearchCombobox({
  activeMarket,
  isLoading,
  onChangeInput,
  onChangeMarket,
  onSelectOption,
  onSubmit,
  options,
  searchInput,
  selectedSymbol,
}: StockSearchComboboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleBlurCapture = (event: FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as Node | null

    if (!event.currentTarget.contains(nextTarget)) {
      setIsOpen(false)
    }
  }

  const handleInputClick = () => {
    setIsOpen(true)
  }

  const handleInputFocus = () => {
    setIsOpen(true)
  }

  const handleClearClick = () => {
    onChangeInput('')
    setIsOpen(true)
    inputRef.current?.focus()
  }

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      if (searchInput) {
        onChangeInput('')
        return
      }

      setIsOpen(false)
    }
  }

  const handleSelectOption = (option: StockSearchOption) => {
    onSelectOption(option)
    setIsOpen(false)
  }

  return (
    <div
      className={`workspace-search-combobox workspace-search--in-panel ${isOpen ? 'is-open' : ''}`}
      onBlurCapture={handleBlurCapture}
    >
      <form className="workspace-search" onSubmit={onSubmit}>
        <div className="workspace-search-field">
          <input
            ref={inputRef}
            className="workspace-search-input"
            value={searchInput}
            onClick={handleInputClick}
            onChange={(event) => onChangeInput(event.target.value)}
            onFocus={handleInputFocus}
            onKeyDown={handleInputKeyDown}
            placeholder="Search by company, code, or initials"
          />

          {searchInput ? (
            <button
              aria-label="Clear search"
              className="workspace-search-clear"
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={handleClearClick}
            >
              <svg aria-hidden="true" className="workspace-clear-icon" viewBox="0 0 16 16">
                <path d="M4 4l8 8" />
                <path d="M12 4l-8 8" />
              </svg>
            </button>
          ) : null}
        </div>

        <button aria-label="Load symbol" className="workspace-search-button" type="submit">
          <svg aria-hidden="true" className="workspace-search-icon" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4 4" />
          </svg>
        </button>
      </form>

      <div className="workspace-search-popover" aria-hidden={!isOpen}>
        <div className="workspace-search-market-tabs">
          {stockSearchMarkets.map((market) => (
            <button
              className={`search-market-button ${activeMarket === market ? 'is-active' : ''}`}
              key={market}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => onChangeMarket(market)}
            >
              {resolveDisplayLabel(market)}
            </button>
          ))}
        </div>

        <div className="workspace-search-result-list">
          {options.length > 0 ? (
            options.map((option) => (
              <button
                className={`search-option ${selectedSymbol === option.symbol ? 'is-selected' : ''}`}
                key={option.symbol}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelectOption(option)}
              >
                <div className="search-option-copy">
                  <strong>{option.company}</strong>
                  <span>{option.code}</span>
                </div>
                <div className="search-option-meta">
                  <strong>{resolveDisplayLabel(option.market)}</strong>
                  <span>{option.exchange}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="workspace-search-empty">
              {isLoading ? 'Searching...' : 'No results found.'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function StockWorkspace() {
  const initialSelectedOption = findStockSearchOption(defaultSymbol)
  const profileImageUrl: string | null = null
  const [pageTab, setPageTab] = useState<WorkspacePageTab>('Stock')
  const [searchInput, setSearchInput] = useState<string>(
    () => initialSelectedOption?.company ?? defaultSymbol,
  )
  const [selectedSymbol, setSelectedSymbol] = useState<string>(defaultSymbol)
  const [selectedSearchOption, setSelectedSearchOption] = useState<StockSearchOption | null>(
    initialSelectedOption,
  )
  const [stockSearchMarket, setStockSearchMarket] = useState<StockSearchMarket>(
    initialSelectedOption?.market ?? '미국주식',
  )
  const [searchOptions, setSearchOptions] = useState<StockSearchOption[]>([])
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [rankingTab, setRankingTab] = useState<RankingTab>('거래대금')
  const [analysisTab, setAnalysisTab] = useState<AnalysisTab>('섹터')
  const [stockEntityTab, setStockEntityTab] = useState<EntityTab>('News')
  const [selectedStockEntityId, setSelectedStockEntityId] = useState('')
  const [marketBillboardTab, setMarketBillboardTab] = useState<MarketBillboardTab>('지수')
  const [selectedMarketSymbol, setSelectedMarketSymbol] = useState<string>(defaultMarketSymbol)
  const [marketEntityTab, setMarketEntityTab] = useState<BriefingTab>('News')
  const [selectedMarketEntityId, setSelectedMarketEntityId] = useState('')
  const [sectorBoardTab, setSectorBoardTab] = useState<SectorBoardTab>('거래대금')
  const [selectedSectorId, setSelectedSectorId] = useState<string>(defaultSectorId)
  const [sectorStockQueueTab, setSectorStockQueueTab] = useState<SectorStockQueueTab>('시가총액')
  const [selectedSectorNodeId, setSelectedSectorNodeId] = useState<string>(() =>
    resolveSectorWorkspace(defaultSectorId).defaultNodeId,
  )
  const [selectedSectorStockId, setSelectedSectorStockId] = useState('')

  const stockWorkspace = resolveStockWorkspace(selectedSymbol, selectedSearchOption)
  const rankingEntries = [...stockWorkspace.ranking[rankingTab]].sort(
    (left, right) => resolveRankingValue(right.value) - resolveRankingValue(left.value),
  )
  const analysisEntries = stockWorkspace.analysis[analysisTab]
  const marketWorkspace = resolveMarketWorkspace(selectedMarketSymbol)
  const marketBoardEntries = marketWorkspace.billboard[marketBillboardTab]
  const sectorWorkspace = resolveSectorWorkspace(selectedSectorId)
  const sectorBoardEntries = sectorWorkspace.board[sectorBoardTab]
  const activeSectorQueue =
    sectorWorkspace.stockQueues[selectedSectorNodeId] ??
    sectorWorkspace.stockQueues[sectorWorkspace.defaultNodeId]

  useEffect(() => {
    let isCancelled = false

    setIsSearchLoading(true)

    searchStockSymbols({ limit: 8, market: stockSearchMarket, query: searchInput })
      .then((nextOptions) => {
        if (!isCancelled) {
          setSearchOptions(nextOptions)
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setSearchOptions([])
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsSearchLoading(false)
        }
      })

    return () => {
      isCancelled = true
    }
  }, [searchInput, stockSearchMarket])

  useEffect(() => {
    if (!marketBoardEntries.some((entry) => entry.symbol === selectedMarketSymbol)) {
      setSelectedMarketSymbol(marketBoardEntries[0]?.symbol ?? defaultMarketSymbol)
    }
  }, [marketBoardEntries, selectedMarketSymbol])

  useEffect(() => {
    if (!sectorBoardEntries.some((entry) => entry.sectorId === selectedSectorId)) {
      setSelectedSectorId(sectorBoardEntries[0]?.sectorId ?? defaultSectorId)
    }
  }, [sectorBoardEntries, selectedSectorId])

  useEffect(() => {
    if (!sectorWorkspace.stockQueues[selectedSectorNodeId]) {
      setSelectedSectorNodeId(sectorWorkspace.defaultNodeId)
    }
  }, [sectorWorkspace.defaultNodeId, sectorWorkspace.stockQueues, selectedSectorNodeId])

  const applySearchOption = (option: StockSearchOption) => {
    setSelectedSearchOption(option)
    setSelectedSymbol(option.symbol)
    setSearchInput(option.company)
    setStockSearchMarket(option.market)
  }

  const applySymbol = (symbol: string) => {
    const matchedOption = findStockSearchOption(symbol)

    if (matchedOption) {
      applySearchOption(matchedOption)
      return
    }

    const normalizedSymbol = symbol.trim().toUpperCase() || defaultSymbol

    setSelectedSearchOption(null)
    setSelectedSymbol(normalizedSymbol)
    setSearchInput(normalizedSymbol)
  }

  const handleSelectSector = (sectorId: string) => {
    const nextSectorWorkspace = resolveSectorWorkspace(sectorId)

    setSelectedSectorId(sectorId)
    setSelectedSectorNodeId(nextSectorWorkspace.defaultNodeId)
  }

  const pageTitle = pageTab === 'Stock' ? 'Stock Page' : pageTab === 'Market' ? 'Market Page' : 'Sector Page'
  const accountButtonLabel = profileImageUrl ? 'Account menu' : 'Sign in'

  const handleSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const matchedOption = await resolveStockSearchOption(searchInput, stockSearchMarket)

    if (matchedOption) {
      applySearchOption(matchedOption)
      return
    }

    const normalizedSymbol = searchInput.trim().toUpperCase()

    if (!normalizedSymbol) {
      applySymbol(defaultSymbol)
      return
    }

    applySymbol(normalizedSymbol)
  }

  return (
    <div className="stock-workspace">
      <header className="workspace-header">
        <div className="workspace-brand">
          <span className="workspace-brand-mark">S</span>
          <div className="workspace-title-block">
            <span className="workspace-kicker">Web Stock Workspace</span>
            <strong className="workspace-title">{pageTitle}</strong>
          </div>
        </div>

        <nav className="workspace-nav" aria-label="Primary navigation">
          {workspacePageTabs.map((tab) => (
            <button
              className={`workspace-nav-tab ${pageTab === tab ? 'is-active' : ''}`}
              key={tab}
              type="button"
              onClick={() => setPageTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="workspace-header-actions">
          <button
            className={`header-account ${profileImageUrl ? 'is-authenticated' : 'is-login'}`}
            type="button"
            aria-label={accountButtonLabel}
          >
            {profileImageUrl ? <img alt="" src={profileImageUrl} /> : <span>Sign in</span>}
          </button>
        </div>
      </header>

      {pageTab === 'Stock' ? (
        <>
          <section className="workspace-top-grid">
            <article className="workspace-panel chart-panel">
              <div className="chart-toolbar">
                <StockSearchCombobox
                  activeMarket={stockSearchMarket}
                  isLoading={isSearchLoading}
                  onChangeInput={setSearchInput}
                  onChangeMarket={setStockSearchMarket}
                  onSelectOption={applySearchOption}
                  onSubmit={handleSearchSubmit}
                  options={searchOptions}
                  searchInput={searchInput}
                  selectedSymbol={selectedSymbol}
                />
              </div>

              <div className="stock-chart-shell">
                <StockChart symbol={selectedSymbol} height={500} />
              </div>
            </article>

            <aside className="workspace-panel side-panel ranking-panel">
              <div className="panel-header">
                <div className="panel-copy">
                  <span className="panel-kicker">Ranking</span>
                </div>

                <div className="panel-tabs">
                  {rankingTabs.map((tab) => (
                    <button
                      className={`panel-tab ${rankingTab === tab ? 'is-active' : ''}`}
                      key={tab}
                      type="button"
                      onClick={() => setRankingTab(tab)}
                    >
                      {resolveDisplayLabel(tab)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="panel-list-scroll">
                {rankingEntries.map((entry, index) => (
                  <button
                    className="panel-row ranking-row"
                    key={`${rankingTab}-${entry.symbol}`}
                    type="button"
                    onClick={() => applySymbol(entry.symbol)}
                  >
                    <div className="row-index">{String(index + 1).padStart(2, '0')}</div>
                    <div className="row-copy">
                      <strong>{entry.symbol}</strong>
                      <p>{entry.company}</p>
                    </div>
                    <div className="row-metric">
                      <strong>{entry.value}</strong>
                      <span>{entry.secondary}</span>
                    </div>
                  </button>
                ))}
              </div>
            </aside>

            <aside className="workspace-panel side-panel analysis-panel">
              <div className="panel-header panel-header-stack">
                <div className="panel-copy">
                  <span className="panel-kicker">Analysis</span>
                  <h3>Sectors / Related Stocks</h3>
                </div>

                <div className="panel-tabs vertical-tabs">
                  {analysisTabs.map((tab) => (
                    <button
                      className={`panel-tab ${analysisTab === tab ? 'is-active' : ''}`}
                      key={tab}
                      type="button"
                      onClick={() => setAnalysisTab(tab)}
                    >
                      {resolveDisplayLabel(tab)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="panel-list-scroll">
                {analysisEntries.map((entry) => (
                  <button
                    className={`panel-row analysis-row ${entry.symbol ? '' : 'is-passive'}`}
                    disabled={!entry.symbol}
                    key={entry.id}
                    type="button"
                    onClick={() => entry.symbol && applySymbol(entry.symbol)}
                  >
                    <div className="row-copy compact-copy">
                      <strong>{entry.title}</strong>
                      <p>{entry.subtitle}</p>
                    </div>
                    <div className="row-metric compact-metric">
                      <strong>{entry.metric}</strong>
                    </div>
                  </button>
                ))}
              </div>
            </aside>
          </section>

          <EntitySection
            activeTab={stockEntityTab}
            contextLabel={stockWorkspace.ticker}
            entities={stockWorkspace.entities}
            onChangeTab={setStockEntityTab}
            onSelectEntityId={setSelectedStockEntityId}
            selectedEntityId={selectedStockEntityId}
            tabs={entityTabs}
          />
        </>
      ) : pageTab === 'Market' ? (
        <>
          <section className="workspace-focus-grid">
            <article className="workspace-panel chart-panel chart-panel--focus">
              <div className="stock-chart-shell">
                <StockChart symbol={marketWorkspace.symbol} height={500} />
              </div>
            </article>

            <aside className="workspace-panel billboard-panel">
              <div className="panel-header">
                <div className="panel-copy">
                  <span className="panel-kicker">Billboard</span>
                  <h3>Indices / Commodities / FX</h3>
                </div>

                <div className="panel-tabs">
                  {marketBillboardTabs.map((tab) => (
                    <button
                      className={`panel-tab ${marketBillboardTab === tab ? 'is-active' : ''}`}
                      key={tab}
                      type="button"
                      onClick={() => setMarketBillboardTab(tab)}
                    >
                      {resolveDisplayLabel(tab)}
                    </button>
                  ))}
                </div>
              </div>

              <p className="panel-note">Click any row to update the chart on the left instantly.</p>

              <BillboardRows
                entries={marketBoardEntries}
                onSelect={setSelectedMarketSymbol}
                selectedSymbol={marketWorkspace.symbol}
              />
            </aside>
          </section>

          <EntitySection
            activeTab={marketEntityTab}
            contextLabel={marketWorkspace.title}
            entities={marketWorkspace.entities}
            onChangeTab={setMarketEntityTab}
            onSelectEntityId={setSelectedMarketEntityId}
            selectedEntityId={selectedMarketEntityId}
            tabs={briefingTabs}
          />
        </>
      ) : (
        <>
          <section className="workspace-focus-grid sector-focus-grid">
            <article className="workspace-panel chart-panel chart-panel--focus">
              <div className="sector-mindmap-shell">
                <SectorMindMap
                  edges={sectorWorkspace.graph.edges}
                  nodes={sectorWorkspace.graph.nodes}
                  selectedNodeId={activeSectorQueue?.nodeId ?? sectorWorkspace.defaultNodeId}
                  onSelectNode={setSelectedSectorNodeId}
                />
              </div>
            </article>

            <aside className="workspace-panel billboard-panel sector-board-panel">
              <div className="panel-header">
                <div className="panel-copy">
                  <span className="panel-kicker">Sector Board</span>
                  <h3>Sector Ranking</h3>
                </div>

                <div className="panel-tabs">
                  {sectorBoardTabs.map((tab) => (
                    <button
                      className={`panel-tab ${sectorBoardTab === tab ? 'is-active' : ''}`}
                      key={tab}
                      type="button"
                      onClick={() => setSectorBoardTab(tab)}
                    >
                      {resolveDisplayLabel(tab)}
                    </button>
                  ))}
                </div>
              </div>

              <p className="panel-note panel-note--compact">Shared keyword clusters, re-ranked by tab.</p>

              <SectorBoardRows
                entries={sectorBoardEntries}
                onSelect={handleSelectSector}
                selectedSectorId={sectorWorkspace.id}
              />
            </aside>
          </section>

          {activeSectorQueue ? (
            <SectorStockQueueSection
              activeQueue={activeSectorQueue}
              activeTab={sectorStockQueueTab}
              onChangeTab={setSectorStockQueueTab}
              onSelectEntryId={setSelectedSectorStockId}
              selectedEntryId={selectedSectorStockId}
            />
          ) : null}
        </>
      )}
    </div>
  )
}