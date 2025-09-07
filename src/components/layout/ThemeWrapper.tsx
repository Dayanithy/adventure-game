'use client';

import { useEffect } from 'react';

interface ThemeWrapperProps {
  theme: string;
  children: React.ReactNode;
}

export default function ThemeWrapper({ theme, children }: ThemeWrapperProps) {
  useEffect(() => {
    const body = document.body;
    
    // Remove any existing theme classes
    body.className = body.className
      .split(' ')
      .filter(className => !className.startsWith('theme-'))
      .join(' ');
    
    // Add the new theme class
    body.classList.add(`theme-${theme}`);
    
    // Add theme-specific background pattern
    const patterns = {
      space: 'bg-space-pattern',
      ocean: 'bg-ocean-pattern',
      forest: 'bg-home-pattern',
      dino: 'bg-home-pattern'
    };
    
    // Remove existing pattern classes
    body.className = body.className
      .split(' ')
      .filter(className => !className.includes('-pattern'))
      .join(' ');
    
    // Add theme-specific pattern
    const pattern = patterns[theme as keyof typeof patterns] || 'bg-home-pattern';
    body.classList.add(pattern);
    
    // Cleanup on unmount - return to home theme
    return () => {
      body.className = body.className
        .split(' ')
        .filter(className => !className.startsWith('theme-') && !className.includes('-pattern'))
        .join(' ');
      body.classList.add('bg-home-pattern');
    };
  }, [theme]);

  return <>{children}</>;
}