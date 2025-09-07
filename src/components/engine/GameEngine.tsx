'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '@/lib/store/gameStore';
import { loadStory } from '@/lib/utils/storyLoader';
import { useAudio } from '@/lib/hooks/useAudio';
import SceneRenderer from './SceneRenderer';
import ProgressBar from '@/components/common/ProgressBar';

interface GameEngineProps {
  storyId: string;
}

export default function GameEngine({ storyId }: GameEngineProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const {
    currentStory,
    loadStory: setStory,
    makeChoice,
    resetGame,
    restartCurrentStory,
    getCurrentNode,
    getProgress,
    isGameComplete,
    getEndingStats
  } = useGameStore();

  const { speak, isSpeaking, isSupported } = useAudio();

  useEffect(() => {
    async function initializeGame() {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Loading story:', storyId);
        const story = await loadStory(storyId);
        setStory(story);
        
        console.log('Story loaded successfully:', story.title);
      } catch (err) {
        console.error('Failed to load story:', err);
        setError('Failed to load the story. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    initializeGame();
  }, [storyId, setStory]);

  const handleChoiceSelect = (choiceId: string) => {
    makeChoice(choiceId);
  };

  const handleRestart = () => {
    restartCurrentStory();
  };

  const handleGoHome = () => {
    resetGame();
    window.location.href = '/';
  };

  const currentNode = getCurrentNode();
  const progress = getProgress();
  const endingStats = getEndingStats();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">📖</div>
          <h1 className="text-2xl font-bold mb-4">Loading Your Adventure...</h1>
          <p className="text-lg text-muted-foreground">Getting ready for {storyId} story!</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">😅</div>
          <h1 className="text-2xl font-bold mb-4">Oops!</h1>
          <p className="text-lg text-muted-foreground mb-4">{error}</p>
          <button 
            onClick={handleGoHome}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            🏠 Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!currentStory || !currentNode) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">❓</div>
          <h1 className="text-2xl font-bold mb-4">Story Not Found</h1>
          <button 
            onClick={handleGoHome}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            🏠 Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header with story title and progress */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold">{currentStory.title}</h1>
            <p className="text-muted-foreground">{currentStory.description}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleGoHome}
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/80 transition-colors text-sm"
            >
              🏠 Home
            </button>
            {isGameComplete() && (
              <button
                onClick={handleRestart}
                className="bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors text-sm"
              >
                🔄 Play Again
              </button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <ProgressBar
            current={progress.current}
            total={progress.total}
            label="Story Progress"
          />
          <ProgressBar
            current={endingStats.discovered}
            total={endingStats.total}
            label="Endings Discovered"
          />
        </div>
        
        {/* Achievement celebration for new endings */}
        {endingStats.discovered > 0 && (
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-lg">🌟</span>
              <span className="font-medium">
                {endingStats.discovered === endingStats.total 
                  ? "🎉 All endings discovered! You're a master explorer!" 
                  : `${endingStats.discovered}/${endingStats.total} endings discovered! ${endingStats.total - endingStats.discovered} more to find!`
                }
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Main game scene */}
      <SceneRenderer
        node={currentNode}
        onChoiceSelect={handleChoiceSelect}
        onRestart={handleRestart}
        onGoHome={handleGoHome}
        isGameComplete={isGameComplete()}
      />
    </div>
  );
}