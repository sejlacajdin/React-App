import { useState, useEffect } from 'react';

export function useBeforeFirstRender (f) {
  const [hasRendered, setHasRendered] = useState(false)
  useEffect(() => setHasRendered(true), [hasRendered])
  if (!hasRendered) {
    f()
  }
}