'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <p className="py-4 italic">Something went wrong.</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
