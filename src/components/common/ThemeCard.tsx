'use client';

import { ThemeCard as ThemeCardType } from '@/lib/types/game.types';
import { Card, CardContent } from '@/components/ui/card';

interface ThemeCardProps {
  theme: ThemeCardType;
  onClick: (themeId: string) => void;
}

export default function ThemeCard({ theme, onClick }: ThemeCardProps) {
  const handleClick = () => {
    if (!theme.isLocked) {
      onClick(theme.id);
    }
  };

  return (
    <Card 
      className={`theme-card cursor-pointer w-full h-[280px] animate-fadeIn border-2 border-white/20 shadow-lg ${
        theme.isLocked ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-2xl'
      }`}
      onClick={handleClick}
      style={{ background: theme.color }}
    >
      <CardContent className="p-6 text-center h-full flex flex-col justify-between relative overflow-hidden">
        {/* Top section with emoji */}
        <div className="flex-shrink-0">
          <div className="text-6xl mb-3 animate-bounceIn" style={{animationDelay: '0.2s'}}>
            {theme.emoji}
          </div>
        </div>
        
        {/* Middle section with content */}
        <div className="flex-grow flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {theme.title}
          </h3>
          <p className="text-base text-white/95 font-medium leading-snug drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            {theme.description}
          </p>
        </div>

        {/* Bottom section with lock or sparkles */}
        <div className="flex-shrink-0 h-8 flex items-center justify-center">
          {theme.isLocked ? (
            <div className="animate-pulse">
              <span className="text-2xl drop-shadow-md filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">🔒</span>
            </div>
          ) : (
            <div className="w-full relative h-full">
              {/* Decorative sparkles for unlocked cards */}
              <div className="absolute top-0 left-2 text-sm animate-pulse-slow opacity-70">✨</div>
              <div className="absolute top-0 right-2 text-sm animate-pulse-slow delay-1000 opacity-70">⭐</div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-sm animate-pulse-slow delay-500 opacity-70">🌟</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}