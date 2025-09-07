'use client';

import { Button } from '@/components/ui/button';

interface AudioButtonProps {
  isPlaying: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export default function AudioButton({ 
  isPlaying, 
  onClick, 
  disabled = false,
  className = '' 
}: AudioButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="outline"
      size="default"
      className={`${className} gap-2`}
      aria-label={isPlaying ? 'Stop reading' : 'Read aloud'}
    >
      <span className="text-lg">
        {isPlaying ? '🔊' : '📖'}
      </span>
      <span className="font-medium">
        {isPlaying ? 'Stop Reading' : 'Read Aloud'}
      </span>
    </Button>
  );
}