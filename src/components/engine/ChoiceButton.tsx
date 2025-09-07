'use client';

import { Choice } from '@/lib/types/game.types';
import { Button } from '@/components/ui/button';

interface ChoiceButtonProps {
  choice: Choice;
  onClick: (choiceId: string) => void;
  disabled?: boolean;
}

export default function ChoiceButton({ choice, onClick, disabled = false }: ChoiceButtonProps) {
  return (
    <Button
      onClick={() => onClick(choice.id)}
      disabled={disabled}
      variant="secondary"
      size="lg"
      className="w-full min-h-[80px] text-left justify-start gap-4 p-6 text-lg font-semibold hover:scale-105 transition-all duration-300 bg-card/90 hover:bg-card text-card-foreground border-2 border-border/50 hover:border-primary/50 shadow-lg hover:shadow-xl backdrop-blur-sm"
    >
      <span className="text-3xl flex-shrink-0">{choice.emoji}</span>
      <span className="flex-1">{choice.text}</span>
    </Button>
  );
}