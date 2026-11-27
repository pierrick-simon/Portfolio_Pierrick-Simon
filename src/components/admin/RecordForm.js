'use client';

import { useActionState } from 'react';
import ListEditor from './ListEditor';
import { FieldError, FormError } from './FormMessages';
import { SubmitButton } from './Buttons';

// Small form for one record (an experience, a person, a group…).
// fields: [{ name, label, type: 'text' | 'url' | 'list', placeholder, readOnly, required }]
// `action(previousState, formData)` returns { error, fields, values } or redirects.
function RecordForm({ action, fields, values = {}, submitLabel = 'Enregistrer' }) {
  const [state, formAction] = useActionState(action, null);
  const current = state?.values ?? values;

  return (
    <form action={formAction} className='admin-form admin-form-wide'>
      <div className='admin-grid'>
        {fields.filter((f) => f.type !== 'list').map((f) => (
          <label key={f.name}>
            {f.label}{f.required ? ' *' : ''}
            <input
              name={f.name}
              type={f.type ?? 'text'}
              defaultValue={current[f.name] ?? ''}
              placeholder={f.placeholder}
              readOnly={f.readOnly}
              required={f.required}
            />
            {f.hint && <span className='admin-hint'>{f.hint}</span>}
            <FieldError state={state} name={f.name} />
          </label>
        ))}
      </div>
      {fields.filter((f) => f.type === 'list').map((f) => (
        <div key={f.name}>
          <span className='admin-hint'>{f.label}</span>
          <ListEditor name={f.name} initial={values[f.name] ?? []} addLabel={f.addLabel} placeholder={f.placeholder} />
        </div>
      ))}
      <FormError state={state} />
      <div className='admin-actions'>
        <SubmitButton>{submitLabel}</SubmitButton>
      </div>
    </form>
  );
}

export default RecordForm;
