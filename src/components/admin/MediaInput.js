'use client';

import { useId, useState } from 'react';
import { mediaUrl } from '@/lib/media';
import { acceptFor, uploadFile } from './uploadFile';

// Text field holding a media value (R2 key, file name or URL) with a button
// that uploads a file to R2 and fills the field with its key.
// Controlled with `value` + `onChange`, or uncontrolled with `defaultValue`.
function MediaInput({ name, kind = 'image', scope, value, onChange, defaultValue = '', placeholder, label }) {
  const [own, setOwn] = useState(defaultValue);
  const current = value ?? own;
  const set = (v) => (onChange ? onChange(v) : setOwn(v));
  const [status, setStatus] = useState(null); // { progress } | { error }
  const inputId = useId();

  const pick = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setStatus({ progress: 0 });
    try {
      set(await uploadFile(file, kind, scope, (progress) => setStatus({ progress })));
      setStatus(null);
    } catch (err) {
      setStatus({ error: err.message });
    }
  };

  const busy = status && 'progress' in status;
  const url = current ? mediaUrl(current) : null;

  return (
    <div className='media-input'>
      {kind === 'image' && (
        <span className='media-thumb'>{url ? <img src={url} alt='' /> : null}</span>
      )}
      <div className='media-input-main'>
        <div className='media-input-row'>
          <input
            name={name}
            value={current}
            onChange={(e) => set(e.target.value)}
            placeholder={placeholder}
            aria-label={label}
          />
          <label htmlFor={inputId} className={`btn btn-secondary btn-small media-upload${busy ? ' is-busy' : ''}`}>
            {busy ? `${Math.round(status.progress * 100)} %` : 'Envoyer…'}
          </label>
          <input id={inputId} type='file' accept={acceptFor(kind)} onChange={pick} disabled={busy} hidden />
        </div>
        {busy && <progress value={status.progress} max={1} />}
        {status?.error && <span className='admin-error admin-field-error'>{status.error}</span>}
        {url && kind !== 'image' && <a href={url} target='_blank' rel='noreferrer' className='admin-hint'>Ouvrir le fichier ↗</a>}
      </div>
    </div>
  );
}

export default MediaInput;
