'use client';

interface NarrationBoxProps {
  text: string;
  emoji: string;
  onSpeak?: () => void;
  isSpeaking?: boolean;
}

export default function NarrationBox({ 
  text, 
  emoji, 
  onSpeak, 
  isSpeaking = false 
}: NarrationBoxProps) {
  return (
    <div className="bg-card border rounded-lg p-6 mb-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="text-4xl flex-shrink-0">{emoji}</div>
        <div className="flex-1">
          <p className="text-xl leading-relaxed text-card-foreground">
            {text}
          </p>
        </div>
        {onSpeak && (
          <button
            onClick={onSpeak}
            disabled={isSpeaking}
            className="flex-shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
            aria-label="Read story aloud"
          >
            <span className="text-sm">
              {isSpeaking ? '🔊' : '📖'}
            </span>
            <span className="text-sm">
              {isSpeaking ? 'Reading...' : 'Read Aloud'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}