import GameEngine from '@/components/engine/GameEngine';
import ThemeWrapper from '@/components/layout/ThemeWrapper';

interface GamePageProps {
  params: Promise<{
    themeId: string;
  }>;
}

export default async function GamePage({ params }: GamePageProps) {
  const { themeId } = await params;
  
  return (
    <ThemeWrapper theme={themeId}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <GameEngine storyId={themeId} />
        </div>
      </div>
    </ThemeWrapper>
  );
}

export function generateStaticParams() {
  return [
    { themeId: 'space' },
    { themeId: 'ocean' },
    { themeId: 'forest' },
    { themeId: 'dino' },
  ];
}