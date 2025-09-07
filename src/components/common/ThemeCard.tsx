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
      className={`cursor-pointer transition-all hover:scale-105 hover:shadow-lg min-h-[200px] ${
        theme.isLocked ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={handleClick}
      style={{ backgroundColor: theme.color }}
    >
      <CardContent className="p-6 text-center h-full flex flex-col justify-center">
        <div className="text-6xl mb-4">{theme.emoji}</div>
        <h3 className="text-xl font-bold mb-2 text-card-foreground">
          {theme.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {theme.description}
        </p>
        {theme.isLocked && (
          <div className="mt-2">
            <span className="text-2xl">🔒</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}