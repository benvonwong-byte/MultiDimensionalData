import { useStore } from '../store/useStore';
import { dimensionMap } from '../data/dimensions';
import { ZZCell } from './ZZCell';
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

function Connector({ color, direction }: { color: string; direction: 'h' | 'v' }) {
  return (
    <div style={{
      width: direction === 'h' ? 20 : 2,
      height: direction === 'h' ? 2 : 20,
      background: `${color}66`,
      flexShrink: 0,
      borderRadius: 1,
    }} />
  );
}

function RankLabel({ dim, value, side }: { dim: DimensionDef; value: string; side: 'left' | 'right' | 'top' | 'bottom' }) {
  const isVertical = side === 'top' || side === 'bottom';
  return (
    <div style={{
      display: 'flex',
      flexDirection: isVertical ? 'row' : 'column',
      alignItems: 'center',
      gap: 4,
      padding: isVertical ? '8px 0' : '0 12px',
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
      <span style={{
        fontSize: 11,
        color: 'var(--color-text-muted)',
      }}>
        {value}
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
          <RankLabel dim={vDim} value={vValue} side="top" />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0,
            overflow: 'auto',
            maxHeight: '30vh',
            paddingBottom: 4,
          }}>
            {vSplit.negward.map((p, i) => (
              <div key={p.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ZZCell person={p} />
                <Connector color={vDim.color} direction="v" />
              </div>
            ))}
          </div>
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
        {/* H label left */}
        {hDim && <RankLabel dim={hDim} value={hValue} side="left" />}

        {/* H negward */}
        {hDim && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            overflow: 'auto',
            maxWidth: '30vw',
            flexShrink: 1,
          }}>
            {hSplit.negward.map(p => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center' }}>
                <ZZCell person={p} />
                <Connector color={hDim.color} direction="h" />
              </div>
            ))}
          </div>
        )}

        {/* Connector into cursor from negward */}
        {hDim && hSplit.negward.length === 0 && vDim && (
          <div style={{ width: 12 }} />
        )}

        {/* Cursor cell */}
        <ZZCell person={cursor} isCursor />

        {/* H posward */}
        {hDim && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            overflow: 'auto',
            maxWidth: '30vw',
            flexShrink: 1,
          }}>
            {hSplit.posward.map(p => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center' }}>
                <Connector color={hDim.color} direction="h" />
                <ZZCell person={p} />
              </div>
            ))}
          </div>
        )}

        {/* H label right */}
        {hDim && (
          <div style={{ padding: '0 8px', fontSize: 14, color: `${hDim.color}66`, flexShrink: 0 }}>
            {hSplit.posward.length > 0 ? '' : ''}
          </div>
        )}
      </div>

      {/* V posward (below cursor) */}
      {vDim && (
        <>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0,
            overflow: 'auto',
            maxHeight: '30vh',
            paddingTop: 4,
          }}>
            {vSplit.posward.map(p => (
              <div key={p.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Connector color={vDim.color} direction="v" />
                <ZZCell person={p} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
