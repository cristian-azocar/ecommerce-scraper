import { useEffect, useState } from 'react';

export default function useWindowScroll(): number {
  const [scrollY, setScrollY] = useState(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return function cleanup(): void {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleScroll(): void {
    setScrollY(window.pageYOffset);
  }

  return scrollY;
}
