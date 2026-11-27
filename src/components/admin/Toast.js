'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const MESSAGES = {
  saved: 'Modifications enregistrées.',
  created: 'Élément créé.',
  deleted: 'Élément supprimé.',
};

// Shows the message named by ?toast=… (set by a redirect after a save),
// then removes it from the URL and hides it after a few seconds.
function Toast() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const key = params.get('toast');
  const [message, setMessage] = useState(null);
  const [seenKey, setSeenKey] = useState(null);

  // Pick up a new ?toast= during render (React's pattern for state that follows a prop).
  if (key && key !== seenKey) {
    setSeenKey(key);
    setMessage(MESSAGES[key] ?? key);
  } else if (!key && seenKey) {
    setSeenKey(null);
  }

  useEffect(() => {
    if (!key) return;
    const rest = new URLSearchParams(params);
    rest.delete('toast');
    router.replace(rest.size ? `${pathname}?${rest}` : pathname, { scroll: false });
  }, [key, params, pathname, router]);

  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(() => setMessage(null), 3500);
    return () => clearTimeout(timer);
  }, [message]);

  if (!message) return null;
  return <div className='toast' role='status'>{message}</div>;
}

export default Toast;
