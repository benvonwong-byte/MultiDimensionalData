import { useEffect, useCallback } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { ZZView } from './components/ZZView';
import { Sidebar } from './components/Sidebar';
import { DetailPanel } from './components/DetailPanel';
import { RelationshipOverlay } from './components/RelationshipOverlay';
import { useStore } from './store/useStore';
import { dimensionMap } from './data/dimensions';
import type { ChannelSlot, Person, DimensionDef } from './data/types';

function getRank(people: Person[], dim: DimensionDef, cursor: Person): Person[] {
  const value = dim.extractValue(cursor);
  return people.filter(p => dim.extractValue(p) === value);
}

export default function App() {
  const assignChannel = useStore(s => s.assignChannel);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const dimensionId = active.data.current?.dimensionId as string | undefined;
    const channel = over.data.current?.channel as ChannelSlot | undefined;

    if (dimensionId && channel) {
      assignChannel(channel, dimensionId);
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Skip when typing in an input
    if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'SELECT') return;

    const { people, cursorId, channels, setCursor, rotateDimension, toggleRelationships, cycleRelType } = useStore.getState();
    const cursor = people.find(p => p.id === cursorId);
    if (!cursor) return;

    // Relationship overlay
    if (e.key === 'r') {
      e.preventDefault();
      toggleRelationships();
      return;
    }
    if (e.key === 't') {
      e.preventDefault();
      cycleRelType();
      return;
    }

    // Dimension rotation
    if (e.key === '[') {
      e.preventDefault();
      rotateDimension('h', -1);
      return;
    }
    if (e.key === ']') {
      e.preventDefault();
      rotateDimension('h', 1);
      return;
    }
    if (e.key === '{') {
      e.preventDefault();
      rotateDimension('v', -1);
      return;
    }
    if (e.key === '}') {
      e.preventDefault();
      rotateDimension('v', 1);
      return;
    }

    // Arrow key stepping
    const hDimId = channels.h;
    const vDimId = channels.v;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      if (!hDimId) return;
      const hDim = dimensionMap.get(hDimId);
      if (!hDim) return;
      e.preventDefault();
      const rank = getRank(people, hDim, cursor);
      const idx = rank.findIndex(p => p.id === cursorId);
      if (idx === -1) return;
      const next = e.key === 'ArrowRight' ? idx + 1 : idx - 1;
      if (next >= 0 && next < rank.length) {
        setCursor(rank[next].id);
      }
      return;
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      if (!vDimId) return;
      const vDim = dimensionMap.get(vDimId);
      if (!vDim) return;
      e.preventDefault();
      const rank = getRank(people, vDim, cursor);
      const idx = rank.findIndex(p => p.id === cursorId);
      if (idx === -1) return;
      const next = e.key === 'ArrowDown' ? idx + 1 : idx - 1;
      if (next >= 0 && next < rank.length) {
        setCursor(rank[next].id);
      }
      return;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}>
        <Sidebar />

        {/* ZZ Viewport */}
        <div data-viewport style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0 }}>
          <ZZView />
          <RelationshipOverlay />
          <DetailPanel />
        </div>
      </div>
    </DndContext>
  );
}
