'use client';

import { useFormStatus } from 'react-dom';

// Submit button that shows the form is being saved.
export function SubmitButton({ children = 'Enregistrer', pending: pendingLabel = 'Enregistrement…', className = 'btn' }) {
  const { pending } = useFormStatus();
  return (
    <button type='submit' className={className} disabled={pending}>
      {pending ? pendingLabel : children}
    </button>
  );
}

// Submit button that asks for confirmation first (deletions).
// `formAction` lets it trigger a different action than its form's.
export function ConfirmButton({ message, children = 'Supprimer', className = 'btn btn-danger', formAction }) {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      className={className}
      disabled={pending}
      formAction={formAction}
      onClick={(e) => { if (!window.confirm(message)) e.preventDefault(); }}
    >
      {children}
    </button>
  );
}
