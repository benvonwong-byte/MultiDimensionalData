import { useStore } from '../store/useStore';
import { FIELD_COLORS, RELATIONSHIP_COLORS } from '../utils/colors';
import { countryName } from '../data/hierarchies';
import type { RelationType } from '../data/types';

const REL_LABELS: Record<RelationType, string> = {
  influenced_by: 'Influenced',
  collaborated: 'Collaborated',
  mentored_by: 'Mentored',
  rivaled: 'Rivaled',
  related_to: 'Connected',
};

export function DetailPanel() {
  const cursorId = useStore(s => s.cursorId);
  const people = useStore(s => s.people);
  const hoveredId = useStore(s => s.hoveredPersonId);
  const setCursor = useStore(s => s.setCursor);

  const targetId = hoveredId ?? cursorId;
  if (!targetId) return null;

  const person = people.find(p => p.id === targetId);
  if (!person) return null;

  const fieldColor = FIELD_COLORS[person.fieldOfFame] ?? '#888';

  return (
    <div style={{
      position: 'absolute',
      top: 12,
      right: 12,
      width: 280,
      maxHeight: 'calc(100vh - 24px)',
      overflowY: 'auto',
      background: 'rgba(20, 20, 32, 0.95)',
      border: '1px solid var(--color-border)',
      borderRadius: 12,
      padding: 14,
      zIndex: 20,
      backdropFilter: 'blur(8px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      fontSize: 12,
    }}>
      {/* Header with image */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'center' }}>
        {person.imageUrl ? (
          <img
            src={person.imageUrl}
            alt=""
            style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: `2px solid ${fieldColor}44` }}
          />
        ) : (
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: `${fieldColor}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: fieldColor, flexShrink: 0 }}>
            {person.shortName.charAt(0)}
          </div>
        )}
        <div style={{ minWidth: 0 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>{person.name}</h2>
          {hoveredId && <span style={{ fontSize: 9, color: 'var(--color-text-muted)' }}>hovered</span>}
        </div>
      </div>

      {/* Description */}
      {person.description && (
        <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.5, margin: '0 0 8px' }}>
          {person.description}
        </p>
      )}

      {/* Quote */}
      {person.quote && (
        <div style={{ borderLeft: `2px solid ${fieldColor}55`, paddingLeft: 8, marginBottom: 10, fontStyle: 'italic', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
          "{person.quote}"
        </div>
      )}

      {/* Facts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 10 }}>
        <Row label="Field" value={person.fieldOfFame.charAt(0).toUpperCase() + person.fieldOfFame.slice(1)} color={fieldColor} />
        <Row label="Born" value={`${person.birthYear}`} />
        <Row label="Died" value={person.deathYear ? `${person.deathYear}` : 'Living'} />
        <Row label="Country" value={countryName[person.nationality] ?? person.nationality} />
        <Row label="Tier" value={`${person.impact.culturalInfluenceTier}-tier`} />
        <Row label="Wiki Views" value={formatViews(person.impact.wikiPageViewsMonthly)} />
      </div>

      {/* Links */}
      {person.links && person.links.length > 0 && (
        <div style={{ marginBottom: 10 }}>
          <SectionHeader>Links</SectionHeader>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {person.wikiUrl && (
              <ExtLink href={person.wikiUrl} label="Wikipedia" />
            )}
            {person.links.map((l, i) => (
              <ExtLink key={i} href={l.url} label={l.label} />
            ))}
          </div>
        </div>
      )}

      {/* Relationships */}
      {person.relationships && person.relationships.length > 0 && (
        <div>
          <SectionHeader>Connections</SectionHeader>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {person.relationships.map((rel, i) => {
              const related = people.find(p => p.id === rel.personId);
              const relColor = RELATIONSHIP_COLORS[rel.type];
              return (
                <div
                  key={i}
                  style={{ display: 'flex', gap: 6, alignItems: 'flex-start', cursor: related ? 'pointer' : 'default' }}
                  onClick={() => related && setCursor(related.id)}
                >
                  <span style={{
                    fontSize: 9, fontWeight: 700, color: relColor,
                    background: `${relColor}22`, borderRadius: 3,
                    padding: '1px 4px', flexShrink: 0, marginTop: 1,
                  }}>
                    {REL_LABELS[rel.type]}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: 11 }}>
                      {related?.name ?? rel.personId}
                    </div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: 10, lineHeight: 1.3 }}>
                      {rel.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Awards */}
      {person.impact.notableAwards.length > 0 && (
        <div style={{ marginTop: 10 }}>
          <SectionHeader>Awards</SectionHeader>
          {person.impact.notableAwards.map((a, i) => (
            <div key={i} style={{ fontSize: 11, color: 'var(--color-text)', paddingLeft: 8 }}>
              {a}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ color: 'var(--color-text-muted)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4, borderTop: '1px solid var(--color-border)', paddingTop: 6 }}>
      {children}
    </div>
  );
}

function Row({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <span style={{ color: 'var(--color-text-muted)', minWidth: 72, fontSize: 11 }}>{label}</span>
      <span style={{ color: color ?? 'var(--color-text)', fontSize: 11 }}>{value}</span>
    </div>
  );
}

function ExtLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#818cf8', fontSize: 11, textDecoration: 'none' }}
      onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
      onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
    >
      {label} ↗
    </a>
  );
}

function formatViews(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M/mo`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K/mo`;
  return `${v}/mo`;
}
