import { useRef, useCallback } from 'react'

export const DEFAULT_DELAY = 500

/**
 * hook useDebounce
 * @param callback  - debaunced callback
 * @param delay - delay in ms
 * @returns debouncedValue - value after delay
 */
export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  const timer = useRef<number | null>(null)

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
      timer.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )

  return debouncedFn
}
