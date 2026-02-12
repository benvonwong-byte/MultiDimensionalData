import { create } from 'zustand';
import type { Person, PersonId, DimensionId, ChannelSlot } from '../data/types';
import { celebrities } from '../data/celebrities';
import { DIMENSIONS } from '../data/dimensions';

const ALL_CHANNELS: ChannelSlot[] = ['h', 'v', 'color', 'size'];

interface ExplorerStore {
  people: Person[];
  cursorId: PersonId;
  channels: Record<ChannelSlot, DimensionId | null>;
  hoveredPersonId: PersonId | null;

  setCursor: (id: PersonId) => void;
  assignChannel: (ch: ChannelSlot, dimId: DimensionId) => void;
  clearChannel: (ch: ChannelSlot) => void;
  rotateDimension: (ch: 'h' | 'v', direction: 1 | -1) => void;
  hoverPerson: (id: PersonId | null) => void;
  addPerson: (person: Person) => void;
}

export const useStore = create<ExplorerStore>()((set, get) => ({
  people: celebrities,
  cursorId: celebrities[0].id,
  channels: { h: null, v: null, color: null, size: null },
  hoveredPersonId: null,

  setCursor: (id) => set({ cursorId: id }),

  assignChannel: (ch, dimId) => {
    const current = { ...get().channels };
    // Remove this dimension from any other channel first (mutual exclusion)
    for (const key of ALL_CHANNELS) {
      if (current[key] === dimId) {
        current[key] = null;
      }
    }
    current[ch] = dimId;
    set({ channels: current });
  },

  clearChannel: (ch) => {
    set({ channels: { ...get().channels, [ch]: null } });
  },

  rotateDimension: (ch, direction) => {
    const { channels } = get();
    const currentDimId = channels[ch];
    const otherCh = ch === 'h' ? 'v' : 'h';
    const otherDimId = channels[otherCh];

    // Get available dimensions (exclude the one assigned to the other axis)
    const available = DIMENSIONS.filter(d => d.id !== otherDimId);
    if (available.length === 0) return;

    if (!currentDimId) {
      // Nothing assigned yet — pick first available
      set({ channels: { ...channels, [ch]: available[0].id } });
      return;
    }

    const currentIdx = available.findIndex(d => d.id === currentDimId);
    const nextIdx = (currentIdx + direction + available.length) % available.length;
    set({ channels: { ...channels, [ch]: available[nextIdx].id } });
  },

  hoverPerson: (id) => set({ hoveredPersonId: id }),

  addPerson: (person) => {
    set({ people: [...get().people, person] });
  },
}));
