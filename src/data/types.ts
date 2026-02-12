// ============================================================
// Core identifiers
// ============================================================

export type PersonId = string;
export type DimensionId = string;

// ============================================================
// Person
// ============================================================

export type Gender = 'male' | 'female' | 'non-binary';

export type FieldOfFame =
  | 'science'
  | 'art'
  | 'politics'
  | 'sports'
  | 'music'
  | 'literature'
  | 'philosophy'
  | 'business'
  | 'film'
  | 'mathematics'
  | 'engineering'
  | 'medicine'
  | 'exploration'
  | 'religion'
  | 'activism'
  | 'military';

export type InfluenceTier = 'S' | 'A' | 'B' | 'C';

export type ContributionType =
  | 'theoretical'
  | 'practical'
  | 'artistic'
  | 'political'
  | 'social'
  | 'athletic'
  | 'spiritual';

export interface ImpactMetrics {
  wikiPageViewsMonthly: number;
  wikiLanguageEditions: number;
  notableAwardsCount: number;
  culturalInfluenceTier: InfluenceTier;
  primaryContributionType: ContributionType;
  notableAwards: string[];
}

export interface Person {
  id: PersonId;
  name: string;
  shortName: string;
  birthYear: number;
  deathYear: number | null;
  isAlive: boolean;
  gender: Gender;
  nationality: string;
  secondaryNationalities: string[];
  birthPlace: string;
  fieldOfFame: FieldOfFame;
  secondaryFields: FieldOfFame[];
  impact: ImpactMetrics;
}

// ============================================================
// ZZstructure types
// ============================================================

export type ChannelSlot = 'h' | 'v' | 'color' | 'size';

export interface DimensionDef {
  id: DimensionId;
  label: string;
  shortLabel: string;
  color: string;
  extractValue: (person: Person) => string;
  orderedValues: string[];
}
