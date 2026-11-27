// Error messages returned by a Server Action ({ error, fields }).

export function FormError({ state }) {
  if (!state?.error) return null;
  return <p className='admin-error' role='alert'>{state.error}</p>;
}

export function FieldError({ state, name }) {
  const message = state?.fields?.[name];
  if (!message) return null;
  return <span className='admin-error admin-field-error'>{message}</span>;
}
