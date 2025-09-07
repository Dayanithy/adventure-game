'use client';

import { useEffect, useState } from 'react';
import { StoryNode } from '@/lib/types/game.types';
import { useAudio } from '@/lib/hooks/useAudio';
import NarrationBox from './NarrationBox';
import ChoiceButton from './ChoiceButton';
import AudioButton from '@/components/common/AudioButton';

interface SceneRendererProps {
  node: StoryNode | null;
  onChoiceSelect: (choiceId: string) => void;
  onRestart: () => void;
  onGoHome: () => void;
  isGameComplete: boolean;
}

export default function SceneRenderer({ 
  node, 
  onChoiceSelect, 
  onRestart, 
  onGoHome, 
  isGameComplete 
}: SceneRendererProps) {
  const { speak, stopSpeaking, isSpeaking, isSupported } = useAudio();

  // Disabled auto-speak for better UX - users can choose to read aloud

  const handleSpeak = () => {
    if (!node) return;
    
    if (isSpeaking) {
      stopSpeaking();
    } else {
      let textToSpeak = node.text;
      if (node.isEnding && node.moral) {
        textToSpeak += ` Moral of the story: ${node.moral}`;
      }
      speak(textToSpeak);
    }
  };

  if (!node) {
    return (
      <div className="text-center p-8">
        <div className="text-4xl mb-4">⏳</div>
        <p className="text-lg text-muted-foreground">Loading scene...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Scene content with narration box */}
      <div className="mb-6">
        <NarrationBox
          text={node.text}
          emoji={node.emoji}
          onSpeak={isSupported ? handleSpeak : undefined}
          isSpeaking={isSpeaking}
        />
      </div>
      
      {/* Game ending */}
      {node.isEnding ? (
        <div className="text-center space-y-6">
          {/* Celebration */}
          <div className="text-8xl animate-bounce">🎉</div>
          
          {/* Moral lesson */}
          {node.moral && (
            <div className="bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl p-6 border-2 border-accent/30">
              <div className="text-2xl mb-3">✨</div>
              <p className="font-bold text-lg text-accent-foreground mb-2">
                What We Learned:
              </p>
              <p className="text-xl leading-relaxed font-medium">
                {node.moral}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={onRestart}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 min-h-[60px] flex items-center gap-3"
            >
              <span className="text-2xl">🔄</span>
              Play Again
            </button>
            <button 
              onClick={onGoHome}
              className="bg-secondary text-secondary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-secondary/80 transition-all hover:scale-105 min-h-[60px] flex items-center gap-3"
            >
              <span className="text-2xl">🏠</span>
              More Stories
            </button>
          </div>
        </div>
      ) : (
        /* Story choices */
        <div className="space-y-4">
          <div className="text-center mb-6">
            <p className="text-lg font-medium text-muted-foreground">
              What would you like to do?
            </p>
          </div>
          
          {node.choices.map((choice, index) => (
            <div
              key={choice.id}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-fadeIn"
            >
              <ChoiceButton
                choice={choice}
                onClick={onChoiceSelect}
              />
            </div>
          ))}
        </div>
      )}

      {/* Floating audio control */}
      {isSupported && (
        <div className="fixed bottom-6 right-6 z-10">
          <AudioButton
            isPlaying={isSpeaking}
            onClick={handleSpeak}
            className="shadow-lg bg-card border-2"
          />
        </div>
      )}
    </div>
  );
}