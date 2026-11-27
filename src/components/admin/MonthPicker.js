'use client';

import { useEffect, useRef, useState } from 'react';

const MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];

const label = (value, yearsOnly) => {
  if (!value) return null;
  if (yearsOnly) return value;
  const [y, m] = value.split('-');
  return `${MONTHS[Number(m) - 1]} ${y}`;
};

// Button that opens a small calendar: pick a month ("YYYY-MM") or, with `yearsOnly`, a year ("YYYY").
// Same in every browser (Firefox and Safari have no native month picker).
function MonthPicker({ value, onChange, yearsOnly = false, min = '', disabled = false, placeholder = 'Choisir…' }) {
  const [open, setOpen] = useState(false);
  const thisYear = new Date().getFullYear();
  const [year, setYear] = useState(Number(value?.slice(0, 4)) || thisYear);
  const rootRef = useRef(null);

  // Close on a click outside or Escape.
  useEffect(() => {
    if (!open) return undefined;
    const onClick = (e) => { if (!rootRef.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const toggle = () => {
    if (!open) setYear(Number(value?.slice(0, 4)) || Number(min?.slice(0, 4)) || thisYear);
    setOpen(!open);
  };
  const pick = (v) => { onChange(v); setOpen(false); };
  const tooEarly = (v) => Boolean(min) && v < min.slice(0, v.length);

  // Years mode shows 12 years per page, months mode 12 months of one year.
  const firstYear = year - (year % 12);
  const cells = yearsOnly
    ? Array.from({ length: 12 }, (_, i) => { const v = String(firstYear + i); return { v, text: v }; })
    : MONTHS.map((m, i) => ({ v: `${year}-${String(i + 1).padStart(2, '0')}`, text: m }));
  const step = yearsOnly ? 12 : 1;

  return (
    <div className='month-picker' ref={rootRef}>
      <button type='button' className='month-picker-toggle' onClick={toggle} disabled={disabled} aria-expanded={open}>
        <span className={value ? '' : 'month-picker-empty'}>{label(value, yearsOnly) ?? placeholder}</span>
        <svg viewBox='0 0 24 24' aria-hidden='true'>
          <rect x='3' y='5' width='18' height='16' rx='2' /><path d='M3 10h18M8 3v4M16 3v4' />
        </svg>
      </button>
      {open && (
        <div className='month-picker-pop' role='dialog'>
          <div className='month-picker-head'>
            <button type='button' onClick={() => setYear(year - step)} aria-label='Précédent'>‹</button>
            <span>{yearsOnly ? `${firstYear} – ${firstYear + 11}` : year}</span>
            <button type='button' onClick={() => setYear(year + step)} aria-label='Suivant'>›</button>
          </div>
          <div className='month-picker-grid'>
            {cells.map(({ v, text }) => (
              <button
                key={v}
                type='button'
                disabled={tooEarly(v)}
                aria-pressed={v === value}
                onClick={() => pick(v)}
              >
                {text}
              </button>
            ))}
          </div>
          {value && <button type='button' className='month-picker-clear' onClick={() => pick('')}>Effacer</button>}
        </div>
      )}
    </div>
  );
}

export default MonthPicker;
