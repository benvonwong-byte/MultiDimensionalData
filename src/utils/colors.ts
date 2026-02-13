import { dimensionMap } from '../data/dimensions';
import type { Person } from '../data/types';

export const FIELD_COLORS: Record<string, string> = {
  science: '#3b82f6',
  mathematics: '#6366f1',
  engineering: '#8b5cf6',
  medicine: '#06b6d4',
  art: '#f43f5e',
  music: '#ec4899',
  literature: '#a855f7',
  film: '#f97316',
  philosophy: '#14b8a6',
  politics: '#ef4444',
  business: '#22c55e',
  military: '#64748b',
  religion: '#eab308',
  activism: '#f59e0b',
  exploration: '#0ea5e9',
  sports: '#10b981',
};

export const TIER_SCALE: Record<string, number> = {
  S: 0.55,
  A: 0.42,
  B: 0.34,
  C: 0.28,
};

/** Color palette per dimension — maps extracted value string → hex color */
export const VALUE_COLOR_PALETTES: Record<string, Record<string, string>> = {
  field: {
    Science: '#3b82f6',
    Mathematics: '#6366f1',
    Engineering: '#8b5cf6',
    Medicine: '#06b6d4',
    Art: '#f43f5e',
    Music: '#ec4899',
    Literature: '#a855f7',
    Film: '#f97316',
    Philosophy: '#14b8a6',
    Politics: '#ef4444',
    Business: '#22c55e',
    Military: '#64748b',
    Religion: '#eab308',
    Activism: '#f59e0b',
    Exploration: '#0ea5e9',
    Sports: '#10b981',
  },
  tier: {
    'S-tier': '#eab308',
    'A-tier': '#a3a3a3',
    'B-tier': '#cd7f32',
    'C-tier': '#64748b',
  },
  era: {
    Ancient: '#1e3a5f',
    Medieval: '#1e5f5f',
    'Early Modern': '#2d6a4f',
    Modern: '#b89b00',
    Contemporary: '#e97316',
  },
  gender: {
    Male: '#3b82f6',
    Female: '#ec4899',
    'Non-binary': '#a855f7',
  },
  region: {
    'North America': '#3b82f6',
    'South America': '#22c55e',
    Europe: '#f59e0b',
    Asia: '#ef4444',
    Africa: '#a855f7',
    Oceania: '#06b6d4',
  },
  alive: {
    Living: '#22c55e',
    Deceased: '#64748b',
  },
};

/** Size scale per dimension — maps extracted value string → scale multiplier */
export const SIZE_SCALE_MAP: Record<string, Record<string, number>> = {
  tier: {
    'S-tier': 1.4,
    'A-tier': 1.1,
    'B-tier': 0.85,
    'C-tier': 0.65,
  },
  era: {
    Ancient: 0.7,
    Medieval: 0.8,
    'Early Modern': 0.95,
    Modern: 1.1,
    Contemporary: 1.3,
  },
  field: {
    Science: 1.0, Mathematics: 1.0, Engineering: 1.0, Medicine: 1.0,
    Art: 1.0, Music: 1.0, Literature: 1.0, Film: 1.0,
    Philosophy: 1.0, Politics: 1.0, Business: 1.0, Military: 1.0,
    Religion: 1.0, Activism: 1.0, Exploration: 1.0, Sports: 1.0,
  },
  gender: {
    Male: 1.0,
    Female: 1.0,
    'Non-binary': 1.0,
  },
  region: {
    'North America': 1.0, 'South America': 1.0, Europe: 1.0,
    Asia: 1.0, Africa: 1.0, Oceania: 1.0,
  },
  alive: {
    Living: 1.15,
    Deceased: 0.85,
  },
};

const DEFAULT_COLOR = '#6b7280';
const DEFAULT_SCALE = 1.0;

/** Resolve the block color for a person given the color channel's dimension ID */
export function resolveBlockColor(dimId: string | null, person: Person): string {
  if (!dimId) return DEFAULT_COLOR;
  const dim = dimensionMap.get(dimId);
  if (!dim) return DEFAULT_COLOR;
  const val = dim.extractValue(person);
  return VALUE_COLOR_PALETTES[dimId]?.[val] ?? DEFAULT_COLOR;
}

/** Resolve the block scale multiplier for a person given the size channel's dimension ID */
export function resolveBlockScale(dimId: string | null, person: Person): number {
  if (!dimId) return DEFAULT_SCALE;
  const dim = dimensionMap.get(dimId);
  if (!dim) return DEFAULT_SCALE;
  const val = dim.extractValue(person);
  return SIZE_SCALE_MAP[dimId]?.[val] ?? DEFAULT_SCALE;
}
