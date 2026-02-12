import type { DimensionDef, Person } from './types';
import { countryToContinent, yearToEra } from './hierarchies';

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ');
}

export const DIMENSIONS: DimensionDef[] = [
  {
    id: 'field',
    label: 'Field of Fame',
    shortLabel: 'Field',
    color: '#6366f1',
    extractValue: (p: Person) => capitalize(p.fieldOfFame),
    orderedValues: [
      'Science', 'Mathematics', 'Engineering', 'Medicine',
      'Art', 'Music', 'Literature', 'Film', 'Philosophy',
      'Politics', 'Business', 'Military', 'Religion', 'Activism', 'Exploration', 'Sports',
    ],
  },
  {
    id: 'era',
    label: 'Birth Era',
    shortLabel: 'Era',
    color: '#f59e0b',
    extractValue: (p: Person) => yearToEra(p.birthYear),
    orderedValues: ['Ancient', 'Medieval', 'Early Modern', 'Modern', 'Contemporary'],
  },
  {
    id: 'gender',
    label: 'Gender',
    shortLabel: 'Gender',
    color: '#ec4899',
    extractValue: (p: Person) => capitalize(p.gender),
    orderedValues: ['Male', 'Female', 'Non-binary'],
  },
  {
    id: 'region',
    label: 'Region',
    shortLabel: 'Region',
    color: '#10b981',
    extractValue: (p: Person) => countryToContinent[p.nationality] ?? 'Other',
    orderedValues: ['North America', 'South America', 'Europe', 'Asia', 'Africa', 'Oceania'],
  },
  {
    id: 'tier',
    label: 'Influence Tier',
    shortLabel: 'Tier',
    color: '#f97316',
    extractValue: (p: Person) => `${p.impact.culturalInfluenceTier}-tier`,
    orderedValues: ['S-tier', 'A-tier', 'B-tier', 'C-tier'],
  },
  {
    id: 'alive',
    label: 'Living Status',
    shortLabel: 'Status',
    color: '#06b6d4',
    extractValue: (p: Person) => p.isAlive ? 'Living' : 'Deceased',
    orderedValues: ['Living', 'Deceased'],
  },
];

export const dimensionMap = new Map(DIMENSIONS.map(d => [d.id, d]));
