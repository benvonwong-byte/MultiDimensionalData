import { useDroppable } from '@dnd-kit/core';
import { DimensionChip } from './DimensionChip';
import { AddPersonForm } from './AddPersonForm';
import { useStore } from '../store/useStore';
import { DIMENSIONS, dimensionMap } from '../data/dimensions';
import { countryName } from '../data/hierarchies';
import type { ChannelSlot } from '../data/types';

function ChannelSlotDrop({ channel, label }: { channel: ChannelSlot; label: string }) {
  const channels = useStore(s => s.channels);
  const clearChannel = useStore(s => s.clearChannel);
  const rotateDimension = useStore(s => s.rotateDimension);

  const dimId = channels[channel];
  const dim = dimId ? dimensionMap.get(dimId) : null;
  const isAxis = channel === 'h' || channel === 'v';

  const { setNodeRef, isOver } = useDroppable({
    id: `channel-${channel}`,
    data: { channel },
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4,
        padding: '5px 8px', background: isOver ? 'rgba(99, 102, 241, 0.15)' : 'var(--color-bg)',
        borderRadius: 6,
        border: isOver ? '2px solid #6366f1' : dim ? `1px solid ${dim.color}44` : '1px solid var(--color-border)',
        transition: 'all 150ms',
        minHeight: 34,
      }}
    >
      <span style={{
        fontSize: 12, fontWeight: 700,
        color: isOver ? '#6366f1' : dim?.color ?? 'var(--color-text-muted)',
        width: 24, textAlign: 'center', flexShrink: 0,
      }}>
        {label}
      </span>

      {dim ? (
        <>
          <span style={{ flex: 1, fontSize: 12, color: dim.color, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {dim.label}
          </span>
          {isAxis && (
            <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
              <RotateBtn onClick={() => rotateDimension(channel as 'h' | 'v', -1)} label="<" />
              <RotateBtn onClick={() => rotateDimension(channel as 'h' | 'v', 1)} label=">" />
            </div>
          )}
          <button onClick={() => clearChannel(channel)} style={{
            background: 'transparent', border: 'none',
            color: 'var(--color-text-muted)', cursor: 'pointer',
            fontSize: 14, lineHeight: 1, padding: 0, flexShrink: 0,
          }}>x</button>
        </>
      ) : (
        <span style={{
          flex: 1, fontSize: 11, fontStyle: 'italic',
          color: isOver ? '#a5b4fc' : 'var(--color-text-muted)',
        }}>
          {isOver ? 'Release to assign...' : 'Drop here...'}
        </span>
      )}
    </div>
  );
}

function RotateBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} style={{
      width: 20, height: 20,
      background: 'var(--color-surface-hover)',
      border: '1px solid var(--color-border)',
      borderRadius: 4,
      color: 'var(--color-text-muted)',
      cursor: 'pointer',
      fontSize: 11,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      lineHeight: 1,
    }}>
      {label}
    </button>
  );
}

function CursorInfo() {
  const cursorId = useStore(s => s.cursorId);
  const people = useStore(s => s.people);
  const cursor = people.find(p => p.id === cursorId);
  if (!cursor) return null;

  const dims = DIMENSIONS.map(d => ({
    label: d.shortLabel,
    value: d.extractValue(cursor),
    color: d.color,
  }));

  return (
    <div style={{ padding: '10px 14px', borderTop: '1px solid var(--color-border)' }}>
      <div style={{
        fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: 6,
      }}>
        Cursor
      </div>
      <div style={{
        fontSize: 14, fontWeight: 700, color: 'var(--color-text)', marginBottom: 6,
      }}>
        {cursor.name}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {dims.map(d => (
          <div key={d.label} style={{ display: 'flex', gap: 6, fontSize: 11 }}>
            <span style={{ color: d.color, width: 44, flexShrink: 0, fontWeight: 600 }}>{d.label}</span>
            <span style={{ color: 'var(--color-text-muted)' }}>{d.value}</span>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 6, fontSize: 11, marginTop: 2 }}>
          <span style={{ color: 'var(--color-text-muted)', width: 44, flexShrink: 0, fontWeight: 600 }}>Born</span>
          <span style={{ color: 'var(--color-text-muted)' }}>{cursor.birthYear}</span>
        </div>
        <div style={{ display: 'flex', gap: 6, fontSize: 11 }}>
          <span style={{ color: 'var(--color-text-muted)', width: 44, flexShrink: 0, fontWeight: 600 }}>From</span>
          <span style={{ color: 'var(--color-text-muted)' }}>{countryName[cursor.nationality] ?? cursor.nationality}</span>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const people = useStore(s => s.people);
  const channels = useStore(s => s.channels);
  const assignedDimIds = new Set(
    Object.values(channels).filter(Boolean) as string[]
  );

  return (
    <div style={{
      width: 260,
      minWidth: 260,
      background: 'var(--color-surface)',
      borderRight: '1px solid var(--color-border)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: 10,
    }}>
      {/* Title */}
      <div style={{ padding: '16px 14px 12px', borderBottom: '1px solid var(--color-border)' }}>
        <h1 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: 'var(--color-text)', letterSpacing: '0.02em' }}>
          ZZ Explorer
        </h1>
        <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4 }}>
          {people.length} people &middot; Click cells to navigate
        </div>
      </div>

      {/* Dimension Axes (H/V) */}
      <div style={{ padding: '10px 14px 6px' }}>
        <div style={{
          fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: 6,
        }}>
          Dimensions
        </div>
        <ChannelSlotDrop channel="h" label="H" />
        <ChannelSlotDrop channel="v" label="V" />
      </div>

      {/* Visual Channels */}
      <div style={{ padding: '4px 14px 10px' }}>
        <div style={{
          fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: 6,
        }}>
          Visual
        </div>
        <ChannelSlotDrop channel="color" label="CLR" />
        <ChannelSlotDrop channel="size" label="SZ" />
      </div>

      {/* Dimension Chips */}
      <div style={{ padding: '0 14px 12px' }}>
        <div style={{
          fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: 6,
        }}>
          Available
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {DIMENSIONS.map(dim => (
            <DimensionChip
              key={dim.id}
              dimension={dim}
              isAssigned={assignedDimIds.has(dim.id)}
            />
          ))}
        </div>
      </div>

      {/* Cursor Info */}
      <CursorInfo />

      {/* Add Person */}
      <div style={{ flex: 1, overflow: 'auto', borderTop: '1px solid var(--color-border)' }}>
        <AddPersonForm />
      </div>

      {/* Keyboard shortcuts */}
      <div style={{
        padding: '8px 14px', borderTop: '1px solid var(--color-border)',
        fontSize: 10, color: 'var(--color-text-muted)', lineHeight: 1.6,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)' }}>Arrow keys</span> step cursor &middot;{' '}
        <span style={{ fontFamily: 'var(--font-mono)' }}>[ ]</span> rotate H &middot;{' '}
        <span style={{ fontFamily: 'var(--font-mono)' }}>{'{ }'}</span> rotate V
      </div>
    </div>
  );
}
