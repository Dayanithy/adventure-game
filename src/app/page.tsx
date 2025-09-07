
'use client';

import { useRouter } from 'next/navigation';
import ThemeCard from '@/components/common/ThemeCard';
import { ThemeCard as ThemeCardType } from '@/lib/types/game.types';

const themes: ThemeCardType[] = [
  {
    id: 'space',
    title: 'Space Explorer',
    emoji: '🚀',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    description: 'Blast off to planets and meet friendly aliens!'
  },
  {
    id: 'ocean',
    title: 'Ocean Adventure',
    emoji: '🌊',
    color: 'linear-gradient(135deg, #667eea 0%, #1e3c72 100%)',
    description: 'Dive deep and discover underwater treasures!',
    isLocked: true
  },
  {
    id: 'forest',
    title: 'Forest Quest',
    emoji: '🌲',
    color: 'linear-gradient(135deg, #2eb398 0%, #0b6623 100%)',
    description: 'Explore magical forests and help forest friends!',
    isLocked: true
  },
  {
    id: 'dino',
    title: 'Dino Detective',
    emoji: '🦕',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    description: 'Solve mysteries with friendly dinosaurs!',
    isLocked: true
  }
];

export default function HomePage() {
  const router = useRouter();

  const handleThemeSelect = (themeId: string) => {
    router.push(`/game/${themeId}`);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary animate-slideUp">
            Choose Your Adventure! 🌟
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium animate-slideUp" style={{animationDelay: '0.2s'}}>
            Pick a story and start your exciting journey!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {themes.map((theme, index) => (
            <div
              key={theme.id}
              className="animate-fadeIn"
              style={{animationDelay: `${0.1 * (index + 1)}s`}}
            >
              <ThemeCard
                theme={theme}
                onClick={handleThemeSelect}
              />
            </div>
          ))}
        </div>

        <div className="text-center animate-fadeIn" style={{animationDelay: '0.8s'}}>
          <div className="flex items-center justify-center gap-2 text-lg text-muted-foreground font-medium">
            <span className="text-2xl">🔒</span>
            <p>More magical adventures coming soon!</p>
            <span className="text-2xl animate-pulse-slow">✨</span>
          </div>
        </div>
      </div>
    </main>
  );
}
