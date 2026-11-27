'use client';

import { useState } from 'react';

// Editable list with add, remove and ↑/↓ reorder. The rows are sent as JSON
// in a hidden input called `name` (read on the server with json()).
//
// Without `fields`, each row is a plain string.
// With `fields`, each row is an object, e.g.
//   fields={[{ key: 'label', label: 'Libellé' }, { key: 'url', label: 'URL', type: 'url' }]}
// A field with `options` renders a <select>.
function ListEditor({ name, initial = [], fields, addLabel = 'Ajouter', placeholder, multiline = false }) {
  // Each row gets a stable id so React keeps inputs in place when rows move.
  const [rows, setRows] = useState(() => initial.map((value, id) => ({ id, value })));
  const [nextId, setNextId] = useState(initial.length);
  const add = () => {
    setRows((list) => [...list, { id: nextId, value: empty() }]);
    setNextId((n) => n + 1);
  };

  const empty = () => (fields ? Object.fromEntries(fields.map((f) => [f.key, f.options?.[0]?.value ?? ''])) : '');
  const update = (id, value) => setRows((list) => list.map((r) => (r.id === id ? { ...r, value } : r)));
  const remove = (id) => setRows((list) => list.filter((r) => r.id !== id));
  const shift = (index, direction) => setRows((list) => {
    const to = index + direction;
    if (to < 0 || to >= list.length) return list;
    const copy = [...list];
    [copy[index], copy[to]] = [copy[to], copy[index]];
    return copy;
  });

  const input = (row, f) => {
    const value = fields ? row.value[f.key] ?? '' : row.value;
    const onChange = (e) => update(row.id, fields ? { ...row.value, [f.key]: e.target.value } : e.target.value);
    const label = f?.label ?? placeholder ?? 'Élément';
    if (f?.options) {
      return (
        <select key={f.key} value={value} onChange={onChange} aria-label={label}>
          {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      );
    }
    const Tag = (f?.multiline ?? multiline) ? 'textarea' : 'input';
    return (
      <Tag
        key={f?.key ?? 'value'}
        type={Tag === 'input' ? f?.type ?? 'text' : undefined}
        rows={Tag === 'textarea' ? 2 : undefined}
        value={value}
        onChange={onChange}
        placeholder={f?.placeholder ?? f?.label ?? placeholder}
        aria-label={label}
      />
    );
  };

  return (
    <div className='list-editor'>
      <input type='hidden' name={name} value={JSON.stringify(rows.map((r) => r.value))} />
      {rows.map((row, index) => (
        <div className='list-editor-row' key={row.id}>
          <div className='list-editor-fields'>{fields ? fields.map((f) => input(row, f)) : input(row)}</div>
          <div className='list-editor-actions'>
            <button type='button' onClick={() => shift(index, -1)} disabled={index === 0} aria-label='Monter'>↑</button>
            <button type='button' onClick={() => shift(index, 1)} disabled={index === rows.length - 1} aria-label='Descendre'>↓</button>
            <button type='button' onClick={() => remove(row.id)} aria-label='Supprimer'>✕</button>
          </div>
        </div>
      ))}
      <button type='button' className='btn btn-secondary btn-small' onClick={add}>
        + {addLabel}
      </button>
    </div>
  );
}

export default ListEditor;
