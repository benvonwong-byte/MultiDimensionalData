// ============================================================
// Geography: Country code → Continent → Region
// ============================================================

export const countryToContinent: Record<string, string> = {
  US: 'North America', CA: 'North America', MX: 'North America', JM: 'North America',
  BR: 'South America', AR: 'South America', CO: 'South America', VE: 'South America', PE: 'South America',
  GB: 'Europe', FR: 'Europe', DE: 'Europe', IT: 'Europe', ES: 'Europe',
  NL: 'Europe', AT: 'Europe', PL: 'Europe', RU: 'Europe', DK: 'Europe',
  NO: 'Europe', SE: 'Europe', CZ: 'Europe', RO: 'Europe', GR: 'Europe',
  CN: 'Asia', JP: 'Asia', IN: 'Asia', PK: 'Asia', IR: 'Asia',
  IQ: 'Asia', SA: 'Asia', IL: 'Asia', NP: 'Asia', AF: 'Asia',
  EG: 'Africa', ZA: 'Africa', NG: 'Africa', GH: 'Africa', KE: 'Africa',
  SN: 'Africa', TZ: 'Africa', TN: 'Africa', MA: 'Africa',
  AU: 'Oceania', NZ: 'Oceania',
  MN: 'Asia', HK: 'Asia', RS: 'Europe',
};

export const countryToRegion: Record<string, string> = {
  US: 'Americas', CA: 'Americas', MX: 'Americas', JM: 'Americas',
  BR: 'Americas', AR: 'Americas', CO: 'Americas', VE: 'Americas', PE: 'Americas',
  GB: 'Western World', FR: 'Western World', DE: 'Western World', IT: 'Western World', ES: 'Western World',
  NL: 'Western World', AT: 'Western World', PL: 'Western World', DK: 'Western World',
  NO: 'Western World', SE: 'Western World', CZ: 'Western World', RO: 'Eastern Europe', GR: 'Western World',
  RU: 'Eastern Europe', RS: 'Eastern Europe',
  CN: 'East Asia', JP: 'East Asia', HK: 'East Asia', MN: 'East Asia',
  IN: 'South Asia', PK: 'South Asia', NP: 'South Asia',
  IR: 'Middle East', IQ: 'Middle East', SA: 'Middle East', IL: 'Middle East', AF: 'Middle East',
  EG: 'North Africa', TN: 'North Africa', MA: 'North Africa',
  ZA: 'Sub-Saharan Africa', NG: 'Sub-Saharan Africa', GH: 'Sub-Saharan Africa',
  KE: 'Sub-Saharan Africa', SN: 'Sub-Saharan Africa', TZ: 'Sub-Saharan Africa',
  AU: 'Oceania', NZ: 'Oceania',
};

export const countryName: Record<string, string> = {
  US: 'United States', CA: 'Canada', MX: 'Mexico', JM: 'Jamaica',
  BR: 'Brazil', AR: 'Argentina', CO: 'Colombia', VE: 'Venezuela', PE: 'Peru',
  GB: 'United Kingdom', FR: 'France', DE: 'Germany', IT: 'Italy', ES: 'Spain',
  NL: 'Netherlands', AT: 'Austria', PL: 'Poland', RU: 'Russia', DK: 'Denmark',
  NO: 'Norway', SE: 'Sweden', CZ: 'Czech Republic', RO: 'Romania', GR: 'Greece',
  CN: 'China', JP: 'Japan', IN: 'India', PK: 'Pakistan', IR: 'Iran',
  IQ: 'Iraq', SA: 'Saudi Arabia', IL: 'Israel', NP: 'Nepal', AF: 'Afghanistan',
  EG: 'Egypt', ZA: 'South Africa', NG: 'Nigeria', GH: 'Ghana', KE: 'Kenya',
  SN: 'Senegal', TZ: 'Tanzania', TN: 'Tunisia', MA: 'Morocco',
  AU: 'Australia', NZ: 'New Zealand', MN: 'Mongolia', HK: 'Hong Kong',
  RS: 'Serbia',
};

// ============================================================
// Time: birthYear → Decade → Century → Era
// ============================================================

export type EraName = 'Ancient' | 'Medieval' | 'Early Modern' | 'Modern' | 'Contemporary';

export function yearToEra(year: number): EraName {
  if (year < 500) return 'Ancient';
  if (year < 1400) return 'Medieval';
  if (year < 1750) return 'Early Modern';
  if (year < 1950) return 'Modern';
  return 'Contemporary';
}

export function yearToCentury(year: number): string {
  if (year < 0) {
    const c = Math.ceil(Math.abs(year) / 100);
    return `${c}${ordinalSuffix(c)} century BCE`;
  }
  const c = Math.floor((year - 1) / 100) + 1;
  return `${c}${ordinalSuffix(c)} century`;
}

export function yearToDecade(year: number): string {
  if (year < 0) return `${Math.floor(year / 10) * 10}s BCE`;
  return `${Math.floor(year / 10) * 10}s`;
}

function ordinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

export const eraOrder: Record<EraName, number> = {
  'Ancient': 0,
  'Medieval': 1,
  'Early Modern': 2,
  'Modern': 3,
  'Contemporary': 4,
};

// ============================================================
// Field of Fame: Field → Domain
// ============================================================

export type DomainName = 'Sciences & Technology' | 'Arts & Culture' | 'Power & Society';

export const fieldToDomain: Record<string, DomainName> = {
  science: 'Sciences & Technology',
  mathematics: 'Sciences & Technology',
  engineering: 'Sciences & Technology',
  medicine: 'Sciences & Technology',
  art: 'Arts & Culture',
  music: 'Arts & Culture',
  literature: 'Arts & Culture',
  film: 'Arts & Culture',
  philosophy: 'Arts & Culture',
  politics: 'Power & Society',
  business: 'Power & Society',
  military: 'Power & Society',
  religion: 'Power & Society',
  activism: 'Power & Society',
  exploration: 'Power & Society',
  sports: 'Power & Society',
};

export const domainOrder: Record<DomainName, number> = {
  'Sciences & Technology': 0,
  'Arts & Culture': 1,
  'Power & Society': 2,
};

// ============================================================
// Influence tier ordering
// ============================================================

export const tierOrder: Record<string, number> = {
  'S': 0,
  'A': 1,
  'B': 2,
  'C': 3,
};
