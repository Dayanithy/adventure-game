export interface Choice {
  id: string;
  text: string;
  emoji: string;
  nextNodeId: string;
  consequence?: string; // For tracking decision impacts
}

export interface StoryNode {
  id: string;
  text: string;
  emoji: string;
  choices: Choice[];
  isEnding?: boolean;
  moral?: string;
  imageUrl?: string;
}

export interface Story {
  id: string;
  theme: string;
  title: string;
  description: string;
  startNodeId: string;
  nodes: Record<string, StoryNode>;
}

export interface GameState {
  currentStory: Story | null;
  currentNodeId: string | null;
  visitedNodes: string[];
  choicesMade: Array<{nodeId: string; choiceId: string}>;
  isComplete: boolean;
  completedStories: string[];
  discoveredEndings: Record<string, string[]>; // storyId -> array of ending node IDs
}

export interface ThemeCard {
  id: string;
  title: string;
  emoji: string;
  color: string;
  description: string;
  isLocked?: boolean;
}

export interface GameProgress {
  storiesCompleted: number;
  totalChoices: number;
  endingsDiscovered: string[];
  achievements: string[];
}

export type GameTheme = 'space' | 'ocean' | 'forest' | 'dino';