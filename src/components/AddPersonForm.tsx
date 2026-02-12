import { useState } from 'react';
import { useStore } from '../store/useStore';
import type { Person, FieldOfFame, Gender } from '../data/types';

const FIELDS: FieldOfFame[] = [
  'science', 'art', 'politics', 'sports', 'music', 'literature',
  'philosophy', 'business', 'film', 'mathematics', 'engineering',
  'medicine', 'exploration', 'religion', 'activism', 'military',
];

export function AddPersonForm() {
  const addPerson = useStore(s => s.addPerson);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('1950');
  const [field, setField] = useState<FieldOfFame>('science');
  const [gender, setGender] = useState<Gender>('male');
  const [nationality, setNationality] = useState('US');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const shortName = name.split(' ').pop() ?? name;

    const person: Person = {
      id,
      name: name.trim(),
      shortName,
      birthYear: parseInt(birthYear),
      deathYear: null,
      isAlive: true,
      gender,
      nationality,
      secondaryNationalities: [],
      birthPlace: '',
      fieldOfFame: field,
      secondaryFields: [],
      impact: {
        wikiPageViewsMonthly: 100000,
        wikiLanguageEditions: 30,
        notableAwardsCount: 0,
        culturalInfluenceTier: 'B',
        primaryContributionType: 'practical',
        notableAwards: [],
      },
    };

    addPerson(person);
    setName('');
    setIsOpen(false);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '6px 8px',
    fontSize: 12,
    background: 'var(--color-bg)',
    color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
    borderRadius: 4,
    outline: 'none',
  };

  return (
    <div style={{ padding: '12px 14px' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%', padding: '8px 12px',
          background: isOpen ? 'var(--color-surface-hover)' : 'var(--color-accent)',
          color: isOpen ? 'var(--color-text-muted)' : 'white',
          border: 'none', borderRadius: 6, cursor: 'pointer',
          fontSize: 13, fontWeight: 600,
        }}
      >
        {isOpen ? 'Cancel' : '+ Add Person'}
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} style={{
          marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          <div>
            <label style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name..." autoFocus style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Birth Year</label>
              <input value={birthYear} onChange={e => setBirthYear(e.target.value)} type="number" style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Nationality</label>
              <input value={nationality} onChange={e => setNationality(e.target.value)} placeholder="US" maxLength={2} style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Field</label>
            <select value={field} onChange={e => setField(e.target.value as FieldOfFame)} style={{ ...inputStyle, cursor: 'pointer' }}>
              {FIELDS.map(f => (
                <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Gender</label>
            <select value={gender} onChange={e => setGender(e.target.value as Gender)} style={{ ...inputStyle, cursor: 'pointer' }}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
            </select>
          </div>
          <button type="submit" style={{
            padding: '8px 12px', background: 'var(--color-accent)', color: 'white',
            border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600,
          }}>
            Add to Scene
          </button>
        </form>
      )}
    </div>
  );
}
