import { useStore } from '../store/useStore';
import { FIELD_COLORS } from '../utils/colors';
import { countryName } from '../data/hierarchies';

export function DetailPanel() {
  const cursorId = useStore(s => s.cursorId);
  const people = useStore(s => s.people);
  const hoveredId = useStore(s => s.hoveredPersonId);

  // Show detail for hovered person, fallback to cursor
  const targetId = hoveredId ?? cursorId;
  if (!targetId) return null;

  const person = people.find(p => p.id === targetId);
  if (!person) return null;

  const fieldColor = FIELD_COLORS[person.fieldOfFame] ?? '#888';

  return (
    <div style={{
      position: 'absolute',
      top: 16,
      right: 16,
      width: 280,
      background: 'rgba(20, 20, 32, 0.95)',
      border: '1px solid var(--color-border)',
      borderRadius: 12,
      padding: 16,
      zIndex: 20,
      backdropFilter: 'blur(8px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{person.name}</h2>
        {hoveredId && (
          <span style={{ fontSize: 10, color: 'var(--color-text-muted)', alignSelf: 'center' }}>hovered</span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
        <Row label="Field" value={person.fieldOfFame.charAt(0).toUpperCase() + person.fieldOfFame.slice(1)} color={fieldColor} />
        <Row label="Born" value={`${person.birthYear}`} />
        <Row label="Died" value={person.deathYear ? `${person.deathYear}` : 'Living'} />
        <Row label="Gender" value={person.gender.charAt(0).toUpperCase() + person.gender.slice(1)} />
        <Row label="Country" value={countryName[person.nationality] ?? person.nationality} />
        <Row label="Tier" value={`${person.impact.culturalInfluenceTier}-tier`} />
        <Row label="Wiki Views" value={formatViews(person.impact.wikiPageViewsMonthly)} />
        {person.impact.notableAwards.length > 0 && (
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 8 }}>
            <div style={{ color: 'var(--color-text-muted)', fontSize: 11, marginBottom: 4 }}>Awards</div>
            {person.impact.notableAwards.map((a, i) => (
              <div key={i} style={{ fontSize: 12, color: 'var(--color-text)', paddingLeft: 8 }}>
                {a}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <span style={{ color: 'var(--color-text-muted)', minWidth: 80 }}>{label}</span>
      <span style={{ color: color ?? 'var(--color-text)' }}>{value}</span>
    </div>
  );
}

function formatViews(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M/mo`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K/mo`;
  return `${v}/mo`;
}
