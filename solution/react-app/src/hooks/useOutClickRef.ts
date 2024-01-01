import {useCallback, useEffect} from "react";

export const useOutClickRef = (ref: RefObject<HTMLElement>, callback: () => void) => {
  const handleClick = useCallback ((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
      callback();
    }
  }, [ref, callback]);

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, callback, handleClick]);
}