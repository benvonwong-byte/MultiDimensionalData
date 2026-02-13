import { useStore } from '../store/useStore';
import { resolveBlockColor, resolveBlockScale } from '../utils/colors';
import { dimensionMap } from '../data/dimensions';
import type { Person } from '../data/types';

interface Props {
  person: Person;
  isCursor?: boolean;
}

export function ZZCell({ person, isCursor }: Props) {
  const setCursor = useStore(s => s.setCursor);
  const hoverPerson = useStore(s => s.hoverPerson);
  const hoveredId = useStore(s => s.hoveredPersonId);
  const colorDim = useStore(s => s.channels.color);
  const sizeDim = useStore(s => s.channels.size);

  const isHovered = hoveredId === person.id;
  const bgColor = resolveBlockColor(colorDim, person);
  const scale = resolveBlockScale(sizeDim, person);

  const baseSize = isCursor ? 100 : 76;
  const size = baseSize * scale;

  const tierBadge = person.impact.culturalInfluenceTier;

  // Get dimension values for subtitle
  const fieldDim = dimensionMap.get('field');
  const field = fieldDim ? fieldDim.extractValue(person) : '';

  return (
    <div
      onClick={() => setCursor(person.id)}
      onMouseEnter={() => hoverPerson(person.id)}
      onMouseLeave={() => hoverPerson(null)}
      style={{
        width: size,
        minWidth: size,
        height: size,
        borderRadius: 10,
        background: isCursor
          ? `linear-gradient(135deg, ${bgColor}dd, ${bgColor}88)`
          : `${bgColor}44`,
        border: isCursor
          ? `2px solid ${bgColor}`
          : isHovered
            ? `2px solid ${bgColor}aa`
            : `1px solid ${bgColor}33`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isCursor ? 'default' : 'pointer',
        transition: 'all 200ms ease',
        boxShadow: isCursor
          ? `0 0 24px ${bgColor}44, 0 4px 16px rgba(0,0,0,0.3)`
          : isHovered
            ? `0 0 12px ${bgColor}22`
            : 'none',
        position: 'relative',
        flexShrink: 0,
        transform: isHovered && !isCursor ? 'scale(1.08)' : undefined,
      }}
    >
      {/* Tier badge */}
      <span style={{
        position: 'absolute',
        top: 4,
        right: 6,
        fontSize: 9,
        fontWeight: 700,
        color: isCursor ? 'rgba(255,255,255,0.9)' : `${bgColor}cc`,
        letterSpacing: '0.04em',
      }}>
        {tierBadge}
      </span>

      {/* Name */}
      <span style={{
        fontSize: isCursor ? 14 : 11,
        fontWeight: 700,
        color: isCursor ? '#fff' : 'var(--color-text)',
        textAlign: 'center',
        lineHeight: 1.2,
        padding: '0 6px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: '100%',
      }}>
        {person.shortName}
      </span>

      {/* Field subtitle */}
      <span style={{
        fontSize: isCursor ? 10 : 9,
        color: isCursor ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)',
        marginTop: 2,
        textAlign: 'center',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: '100%',
        padding: '0 4px',
      }}>
        {field}
      </span>
    </div>
  );
}
