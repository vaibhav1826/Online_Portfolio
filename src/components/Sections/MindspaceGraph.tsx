import { useMemo } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import SectionTitle from '../UI/SectionTitle'
import AnimatedCard from '../UI/AnimatedCard'
import { mindspaceGraphData } from '../../utils/chartData'

type MindspaceGraphProps = {
  id: string
}

type MindspaceNode = {
  id: string
  group: string
}

const nodeColors: Record<string, string> = {
  Core: '#1C2520',
  Visualization: '#86A789',
  Experience: '#A5C9A1',
  Platform: '#5F7F64',
  Focus: '#7BAE83',
  Values: '#4E7A5A',
  Process: '#98B89B',
  Output: '#37594F',
}

const MindspaceGraph = ({ id }: MindspaceGraphProps) => {
  const graphData = useMemo(
    () => ({
      nodes: mindspaceGraphData.nodes,
      links: mindspaceGraphData.links,
    }),
    [],
  )

  return (
    <section id={id} className="flex flex-col gap-10">
      <SectionTitle
        eyebrow="mindspace graph"
        title="A network of skills, interests, and research"
        subtitle="Each connection represents hands-on experience linking tools, domains, and values."
      />

      <AnimatedCard className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-charcoal/60">
              explorer mode
            </p>
            <h3 className="font-display text-xl">Navigate the living skill map</h3>
            <p className="text-sm text-charcoal/70">
              Hover a node to reveal how it connects to active projects and areas of research.
            </p>
          </div>
          <div className="flex gap-2 text-xs text-charcoal/70">
            {Object.entries(nodeColors).map(([group, color]) => (
              <span key={group} className="flex items-center gap-2 rounded-full bg-white/40 px-3 py-1">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {group}
              </span>
            ))}
          </div>
        </div>

        <div className="h-[420px] overflow-hidden rounded-3xl border border-white/30 bg-white/40">
          <ForceGraph2D
            graphData={graphData}
            cooldownTicks={50}
            linkWidth={(link) => Number((link as { value?: number }).value ?? 1) * 0.6}
            linkColor={() => 'rgba(134, 167, 137, 0.35)'}
            nodeRelSize={6}
            nodeColor={(node) => nodeColors[(node as MindspaceNode).group] ?? '#86A789'}
            nodeLabel={(node) => `${(node as MindspaceNode).id} — ${(node as MindspaceNode).group}`}
            backgroundColor="rgba(220, 239, 225, 0.2)"
            autoPauseRedraw={false}
            enablePointerInteraction
          />
        </div>
      </AnimatedCard>
    </section>
  )
}

export default MindspaceGraph

