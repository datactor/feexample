import {
  Background,
  Controls,
  Position,
  ReactFlow,
  type Edge,
  type Node,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import type { SectorMindMapEdge, SectorMindMapNode } from '../data/workspaceFocusData'

type SectorMindMapProps = {
  edges: SectorMindMapEdge[]
  nodes: SectorMindMapNode[]
  onSelectNode?: (nodeId: string) => void
  selectedNodeId?: string
}

function resolveMindMapNodeStyle(kind: SectorMindMapNode['kind'], isSelected: boolean) {
  const baseStyle = (() => {
    switch (kind) {
      case 'root':
        return {
          background: '#112033',
          border: '1px solid rgba(17, 32, 51, 0.92)',
          borderRadius: '18px',
          color: '#fffaf7',
          fontSize: '14px',
          fontWeight: 700,
          minWidth: '140px',
          padding: '14px 18px',
        }
      case 'branch':
        return {
          background: 'rgba(15, 118, 110, 0.12)',
          border: '1px solid rgba(15, 118, 110, 0.22)',
          borderRadius: '16px',
          color: '#0d3e49',
          fontSize: '13px',
          fontWeight: 700,
          minWidth: '124px',
          padding: '11px 14px',
        }
      case 'leaf':
      default:
        return {
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(17, 32, 51, 0.12)',
          borderRadius: '14px',
          color: '#25384b',
          fontSize: '12px',
          fontWeight: 600,
          minWidth: '116px',
          padding: '10px 13px',
        }
    }
  })()

  if (isSelected) {
    return {
      ...baseStyle,
      border: '1px solid rgba(15, 118, 110, 0.9)',
      boxShadow: '0 0 0 3px rgba(15, 118, 110, 0.16)',
    }
  }

  return {
    ...baseStyle,
    cursor: 'pointer',
  }
}

export function SectorMindMap({ edges, nodes, onSelectNode, selectedNodeId }: SectorMindMapProps) {
  const flowNodes: Node<{ label: string }>[] = nodes.map((node) => ({
    id: node.id,
    data: { label: node.label },
    draggable: false,
    position: node.position,
    selectable: false,
    sourcePosition: Position.Right,
    style: resolveMindMapNodeStyle(node.kind, selectedNodeId === node.id),
    targetPosition: Position.Left,
  }))

  const flowEdges: Edge[] = edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    type: 'smoothstep',
    animated: false,
    selectable: false,
    style: {
      stroke: '#92a4b5',
      strokeWidth: 1.4,
    },
  }))

  return (
    <div className="sector-mindmap">
      <ReactFlow
        edges={flowEdges}
        elementsSelectable={false}
        fitView
        fitViewOptions={{ padding: 0.18 }}
        maxZoom={1.4}
        minZoom={0.6}
        nodes={flowNodes}
        nodesConnectable={false}
        nodesDraggable={false}
        onNodeClick={(_, node) => onSelectNode?.(node.id)}
        panOnDrag
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#d5dde7" gap={20} size={1.1} />
        <Controls position="bottom-right" showInteractive={false} />
      </ReactFlow>
    </div>
  )
}