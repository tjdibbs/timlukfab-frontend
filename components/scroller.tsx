'use client';

import { useRef, type ReactNode } from 'react';
import { Button } from './ui/button';
import { ChevronUp } from 'lucide-react';
import useScrollPosition from '@/hooks/useScrollPosition';

const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const isScrolled = useScrollPosition(250);

  const ref = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section>
      <div ref={ref} />
      {children}
      {isScrolled && (
        <Button className='fixed bottom-4 right-4 z-50' onClick={scrollToTop}>
          <ChevronUp className='h-5 w-5' />
        </Button>
      )}
    </section>
  );
};
export default ScrollProvider;
