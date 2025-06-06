import { useState, useEffect } from 'react';

/**
 * This hook fixes hydration issues when using persistent state with localStorage.
 * @param store A Zustand store hook that takes an optional selector function.
 * @param callback A function to select a portion of the store's state (defaults to returning the entire state).
 * @returns The selected state or undefined during SSR/hydration.
 */
export function useStore<T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
): F | undefined {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
}
