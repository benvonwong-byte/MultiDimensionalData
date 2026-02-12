import { useDraggable } from '@dnd-kit/core';
import type { DimensionDef } from '../data/types';

interface Props {
  dimension: DimensionDef;
  isAssigned: boolean;
}

export function DimensionChip({ dimension, isAssigned }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `dim-${dimension.id}`,
    data: { dimensionId: dimension.id },
    disabled: isAssigned,
  });

  const style: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 10px',
    background: isAssigned ? `${dimension.color}22` : 'var(--color-bg)',
    border: `1px solid ${isAssigned ? dimension.color + '55' : 'var(--color-border)'}`,
    borderRadius: 6,
    cursor: isAssigned ? 'default' : isDragging ? 'grabbing' : 'grab',
    opacity: isAssigned ? 0.5 : isDragging ? 0.8 : 1,
    fontSize: 13,
    color: isAssigned ? dimension.color : 'var(--color-text)',
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    zIndex: isDragging ? 100 : 'auto',
    transition: isDragging ? 'none' : 'opacity 150ms, background 150ms',
    touchAction: 'none',
    userSelect: 'none',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <span style={{
        width: 10, height: 10, borderRadius: '50%',
        background: dimension.color, flexShrink: 0,
      }} />
      <span style={{ flex: 1 }}>{dimension.label}</span>
      {isAssigned && (
        <span style={{ fontSize: 10, color: dimension.color }}>active</span>
      )}
    </div>
  );
}
