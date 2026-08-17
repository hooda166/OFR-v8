import { useState, useEffect } from 'react';

export const useScrollSpy = (targetIds: string[], offset = 100) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      const selected = targetIds.find((id) => {
        const element = document.getElementById(id);
        if (!element) return false;

        const { top, bottom } = element.getBoundingClientRect();
        const elementTop = top + window.scrollY;
        const elementBottom = bottom + window.scrollY;

        return scrollPosition >= elementTop && scrollPosition <= elementBottom;
      });

      if (selected !== activeId) {
        setActiveId(selected || null);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [targetIds, offset, activeId]);

  return activeId;
};