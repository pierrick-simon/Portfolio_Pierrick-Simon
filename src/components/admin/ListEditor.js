'use client';

import { useId, useState } from 'react';
import MediaInput from './MediaInput';
import { acceptFor, uploadFile } from './uploadFile';

// Editable list with add, remove and ↑/↓ reorder. The rows are sent as JSON
// in a hidden input called `name` (read on the server with json()).
//
// Without `fields`, each row is a plain string.
// With `fields`, each row is an object, e.g.
//   fields={[{ key: 'label', label: 'Libellé' }, { key: 'url', label: 'URL', type: 'url' }]}
// A field with `options` renders a <select>; for plain rows, pass `options`
// to the editor itself (e.g. picking contributors among people).
// With `media` ({ kind, scope }), each plain row is a media field and several
// files can be uploaded at once, one new row each (the project gallery).
function ListEditor({ name, initial = [], fields, options, addLabel = 'Ajouter', placeholder, multiline = false, media }) {
  // Each row gets a stable id so React keeps inputs in place when rows move.
  const [rows, setRows] = useState(() => initial.map((value, id) => ({ id, value })));
  // Random ids for new rows: uploads finish later and must not reuse an id.
  const add = (values = [empty()]) => {
    setRows((list) => [...list, ...values.map((value) => ({ id: crypto.randomUUID(), value }))]);
  };

  const filesId = useId();
  const [uploading, setUploading] = useState(null); // "2 / 5" while sending, or an error
  const uploadMany = async (e) => {
    const files = [...(e.target.files ?? [])];
    e.target.value = '';
    const keys = [];
    try {
      for (const [i, file] of files.entries()) {
        setUploading(`Envoi ${i + 1} / ${files.length}…`);
        keys.push(await uploadFile(file, media.kind, media.scope));
      }
      setUploading(null);
    } catch (err) {
      setUploading(`${keys.length} / ${files.length} envoyé(s). ${err.message}`);
    }
    if (keys.length) add(keys);
  };

  const empty = () => (fields
    ? Object.fromEntries(fields.map((f) => [f.key, f.options?.[0]?.value ?? '']))
    : options?.[0]?.value ?? '');
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
    const choices = fields ? f.options : options;
    if (choices) {
      return (
        <select key={f?.key ?? 'value'} value={value} onChange={onChange} aria-label={label}>
          {choices.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      );
    }
    if (media && !fields) {
      return <MediaInput key='value' kind={media.kind} scope={media.scope} value={value} onChange={(v) => update(row.id, v)} label={label} placeholder={placeholder} />;
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
      <div className='admin-actions'>
        <button type='button' className='btn btn-secondary btn-small' onClick={() => add()}>
          + {addLabel}
        </button>
        {media && (
          <>
            <label htmlFor={filesId} className='btn btn-secondary btn-small'>Envoyer des fichiers…</label>
            <input id={filesId} type='file' multiple accept={acceptFor(media.kind)} onChange={uploadMany} hidden />
          </>
        )}
        {uploading && <span className='admin-hint'>{uploading}</span>}
      </div>
    </div>
  );
}

export default ListEditor;
