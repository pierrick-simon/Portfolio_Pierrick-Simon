'use client';

import { useState } from 'react';
import { formatPeriod, parsePeriod } from '@/lib/admin/period';

// Start and end pickers that send the period as text in a hidden input `name`.
function PeriodField({ name = 'period', label = 'Période', defaultValue = '', required = false, error }) {
  const parsed = parsePeriod(defaultValue);
  const [start, setStart] = useState(parsed?.start ?? '');
  const [end, setEnd] = useState(parsed?.end ?? '');
  const [yearsOnly, setYearsOnly] = useState(parsed?.yearsOnly ?? false);
  const [ongoing, setOngoing] = useState(parsed?.ongoing ?? false);
  // Text that couldn't be read is kept until a picker is used.
  const [legacy, setLegacy] = useState(parsed ? null : defaultValue);

  const touch = (fn) => (e) => { setLegacy(null); fn(e); };
  const value = legacy ?? formatPeriod({ start, end, ongoing });

  // Switching precision keeps the year: "2026-02" ↔ "2026".
  const toYears = (v) => v.slice(0, 4);
  const toMonths = (v) => (v ? `${v.slice(0, 4)}-01` : '');
  const switchPrecision = touch((e) => {
    const years = e.target.checked;
    const convert = years ? toYears : toMonths;
    setYearsOnly(years);
    setStart(convert(start));
    setEnd(convert(end));
  });

  const picker = (props) => (yearsOnly
    ? <input type='number' min='1990' max='2100' step='1' placeholder='2026' {...props} />
    : <input type='month' {...props} />);

  return (
    <fieldset className='period-field'>
      <legend>{label}{required ? ' *' : ''}</legend>
      <input type='hidden' name={name} value={value} />
      <div className='period-pickers'>
        <label>
          Début
          {picker({ value: start, required: required && !legacy, onChange: touch((e) => setStart(e.target.value)) })}
        </label>
        <label>
          Fin
          {picker({
            value: ongoing ? '' : end,
            min: start || undefined,
            disabled: ongoing,
            onChange: touch((e) => setEnd(e.target.value)),
          })}
        </label>
      </div>
      <div className='period-options'>
        <label className='admin-check'>
          <input type='checkbox' checked={ongoing} onChange={touch((e) => setOngoing(e.target.checked))} />
          En cours
        </label>
        <label className='admin-check'>
          <input type='checkbox' checked={yearsOnly} onChange={switchPrecision} />
          Années seulement
        </label>
      </div>
      <span className='admin-hint'>
        {value ? <>Affiché : <strong>{value}</strong></> : 'Fin vide = un seul mois.'}
        {legacy && ' (format non reconnu, choisis les dates pour le remplacer)'}
      </span>
      {error}
    </fieldset>
  );
}

export default PeriodField;
