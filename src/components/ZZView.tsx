import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { dimensionMap } from '../data/dimensions';
import { ZZCell } from './ZZCell';
import { RankArm } from './RankArm';
import { clearCellPositions } from '../utils/cellPositions';
import type { Person, DimensionDef } from '../data/types';

function getRank(people: Person[], dim: DimensionDef, cursor: Person): Person[] {
  const value = dim.extractValue(cursor);
  return people.filter(p => dim.extractValue(p) === value);
}

function splitRank(rank: Person[], cursorId: string): { negward: Person[]; posward: Person[] } {
  const idx = rank.findIndex(p => p.id === cursorId);
  if (idx === -1) return { negward: [], posward: rank };
  return {
    negward: rank.slice(0, idx),
    posward: rank.slice(idx + 1),
  };
}

function RankLabel({ dim, value, count, side }: { dim: DimensionDef; value: string; count: number; side: 'left' | 'right' | 'top' | 'bottom' }) {
  const isVertical = side === 'top' || side === 'bottom';
  return (
    <div style={{
      display: 'flex',
      flexDirection: isVertical ? 'row' : 'column',
      alignItems: 'center',
      gap: 4,
      padding: isVertical ? '6px 0' : '0 10px',
      flexShrink: 0,
    }}>
      <span style={{
        fontSize: 10,
        fontWeight: 700,
        color: dim.color,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}>
        {dim.shortLabel}
      </span>
      <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
        {value}
      </span>
      <span style={{ fontSize: 9, color: `${dim.color}88` }}>
        ({count})
      </span>
    </div>
  );
}

export function ZZView() {
  const people = useStore(s => s.people);
  const cursorId = useStore(s => s.cursorId);
  const hDimId = useStore(s => s.channels.h);
  const vDimId = useStore(s => s.channels.v);

  const cursor = people.find(p => p.id === cursorId);

  // Clear cell positions on re-render (they'll be re-registered by ZZCell)
  useEffect(() => { clearCellPositions(); });

  if (!cursor) return null;

  const hDim = hDimId ? dimensionMap.get(hDimId) : null;
  const vDim = vDimId ? dimensionMap.get(vDimId) : null;

  const hRank = hDim ? getRank(people, hDim, cursor) : [];
  const vRank = vDim ? getRank(people, vDim, cursor) : [];

  const hSplit = splitRank(hRank, cursorId);
  const vSplit = splitRank(vRank, cursorId);

  const hValue = hDim ? hDim.extractValue(cursor) : '';
  const vValue = vDim ? vDim.extractValue(cursor) : '';

  // No dimensions assigned
  if (!hDim && !vDim) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
      }}>
        <ZZCell person={cursor} isCursor />
        <div style={{
          fontSize: 13,
          color: 'var(--color-text-muted)',
          textAlign: 'center',
          lineHeight: 1.6,
        }}>
          Drag dimensions to H or V slots<br />
          to explore rank connections
        </div>
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* V negward (above cursor) */}
      {vDim && (
        <>
          <RankLabel dim={vDim} value={vValue} count={vRank.length} side="top" />
          <RankArm items={vSplit.negward} direction="v" side="neg" dimColor={vDim.color} />
        </>
      )}

      {/* Horizontal row (contains cursor) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        overflow: 'hidden',
        width: '100%',
        justifyContent: 'center',
      }}>
        {hDim && <RankLabel dim={hDim} value={hValue} count={hRank.length} side="left" />}

        {hDim && (
          <RankArm items={hSplit.negward} direction="h" side="neg" dimColor={hDim.color} />
        )}

        {hDim && hSplit.negward.length === 0 && vDim && (
          <div style={{ width: 12 }} />
        )}

        <ZZCell person={cursor} isCursor />

        {hDim && (
          <RankArm items={hSplit.posward} direction="h" side="pos" dimColor={hDim.color} />
        )}
      </div>

      {/* V posward (below cursor) */}
      {vDim && (
        <RankArm items={vSplit.posward} direction="v" side="pos" dimColor={vDim.color} />
      )}
    </div>
  );
}
