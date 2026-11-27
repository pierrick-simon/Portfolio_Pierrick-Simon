// Periods are stored as display text ("fév. 2026 - mars 2027", "2024 - 2029").
// The admin edits them with two date pickers; these helpers convert both ways.

const MONTHS = ['janv.', 'fév.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sep.', 'oct.', 'nov.', 'déc.'];
// Accent- and dot-free prefixes, so "fev", "févr." and "Sept" are all understood.
const MONTH_PREFIXES = ['jan', 'fev', 'mar', 'avr', 'mai', 'juin', 'juil', 'aou', 'sep', 'oct', 'nov', 'dec'];
const NOW = "aujourd'hui";

const plain = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\./g, '').trim();

// "fév. 2026" → { month: "2026-02" }, "2024" → { year: "2024" }, "aujourd'hui" → { ongoing: true }
function parseSide(text) {
  const s = plain(text);
  if (/^(aujourd'?hui|present|en cours)$/.test(s)) return { ongoing: true };
  if (/^\d{4}$/.test(s)) return { year: s };
  const m = s.match(/^([a-z]+)\s+(\d{4})$/);
  if (!m) return null;
  const index = MONTH_PREFIXES.findIndex((p) => m[1].startsWith(p) || p.startsWith(m[1]));
  if (index < 0) return null;
  return { month: `${m[2]}-${String(index + 1).padStart(2, '0')}` };
}

// Text → { start, end, yearsOnly, ongoing } with start/end as "YYYY-MM" (or "YYYY" when yearsOnly).
// Returns null when the text can't be read (it is then kept as is).
export function parsePeriod(text) {
  if (!text?.trim()) return { start: '', end: '', yearsOnly: false, ongoing: false };
  const parts = text.split(/\s+-\s+/);
  if (parts.length > 2) return null;
  const sides = parts.map(parseSide);
  const [a, b = sides[0]] = sides; // "mars 2025" alone: starts and ends that month
  if (!a || !b || a.ongoing) return null;
  const yearsOnly = Boolean(a.year);
  if (b.ongoing) return { start: a.year ?? a.month, end: '', yearsOnly, ongoing: true };
  if (Boolean(b.year) !== yearsOnly) return null;
  return { start: a.year ?? a.month, end: b.year ?? b.month, yearsOnly, ongoing: false };
}

// "2026-02" → "fév. 2026", "2024" → "2024"
function formatSide(value) {
  const [year, month] = value.split('-');
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
}

export function formatPeriod({ start, end, ongoing }) {
  if (!start) return '';
  if (ongoing) return `${formatSide(start)} - ${NOW}`;
  if (!end || end === start) return formatSide(start);
  return `${formatSide(start)} - ${formatSide(end)}`;
}
