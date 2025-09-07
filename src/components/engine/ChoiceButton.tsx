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
      variant="outline"
      size="lg"
      className="w-full min-h-[80px] text-left justify-start gap-4 p-6 text-lg font-medium hover:scale-105 transition-transform"
    >
      <span className="text-3xl">{choice.emoji}</span>
      <span className="flex-1">{choice.text}</span>
    </Button>
  );
}