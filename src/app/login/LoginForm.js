'use client';

import { useActionState } from 'react';
import { login } from './actions';

function LoginForm() {
  const [state, action, pending] = useActionState(login, null);

  return (
    <form action={action} className='admin-form'>
      <label>
        Email
        <input name='email' type='email' autoComplete='username' required defaultValue={state?.email} />
      </label>
      <label>
        Mot de passe
        <input name='password' type='password' autoComplete='current-password' required />
      </label>
      {state?.error && <p className='admin-error' role='alert'>{state.error}</p>}
      <button type='submit' className='btn' disabled={pending}>
        {pending ? 'Connexion…' : 'Se connecter'}
      </button>
    </form>
  );
}

export default LoginForm;
