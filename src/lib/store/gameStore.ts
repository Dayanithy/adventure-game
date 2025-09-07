'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Story, GameState, Choice } from '@/lib/types/game.types';

interface GameStore extends GameState {
  // Actions
  loadStory: (story: Story) => void;
  makeChoice: (choiceId: string) => void;
  resetGame: () => void;
  restartCurrentStory: () => void;
  
  // Computed getters
  getCurrentNode: () => Story['nodes'][string] | null;
  getProgress: () => { current: number; total: number };
  isGameComplete: () => boolean;
  getEndingStats: () => { discovered: number; total: number };
}

const initialState: GameState = {
  currentStory: null,
  currentNodeId: null,
  visitedNodes: [],
  choicesMade: [],
  isComplete: false,
  completedStories: [],
  discoveredEndings: {},
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      loadStory: (story: Story) => {
        set({
          currentStory: story,
          currentNodeId: story.startNodeId,
          visitedNodes: [story.startNodeId],
          choicesMade: [],
          isComplete: false,
        });
      },

      makeChoice: (choiceId: string) => {
        const state = get();
        const currentNode = state.getCurrentNode();
        
        if (!currentNode || !state.currentStory) return;

        const choice = currentNode.choices.find(c => c.id === choiceId);
        if (!choice) return;

        const nextNodeId = choice.nextNodeId;
        const nextNode = state.currentStory.nodes[nextNodeId];
        
        if (!nextNode) return;

        set((state) => {
          const newVisitedNodes = [...state.visitedNodes];
          if (!newVisitedNodes.includes(nextNodeId)) {
            newVisitedNodes.push(nextNodeId);
          }

          const newChoicesMade = [
            ...state.choicesMade,
            { nodeId: state.currentNodeId!, choiceId }
          ];

          const isComplete = nextNode.isEnding || false;
          const completedStories = isComplete && state.currentStory
            ? [...state.completedStories.filter(id => id !== state.currentStory.id), state.currentStory.id]
            : state.completedStories;

          // Track discovered endings
          const discoveredEndings = { ...state.discoveredEndings };
          if (isComplete && state.currentStory) {
            const storyId = state.currentStory.id;
            const currentEndings = discoveredEndings[storyId] || [];
            if (!currentEndings.includes(nextNodeId)) {
              discoveredEndings[storyId] = [...currentEndings, nextNodeId];
            }
          }

          return {
            currentNodeId: nextNodeId,
            visitedNodes: newVisitedNodes,
            choicesMade: newChoicesMade,
            isComplete,
            completedStories,
            discoveredEndings,
          };
        });
      },

      resetGame: () => {
        set({
          currentStory: null,
          currentNodeId: null,
          visitedNodes: [],
          choicesMade: [],
          isComplete: false,
        });
      },

      restartCurrentStory: () => {
        const state = get();
        if (state.currentStory) {
          state.loadStory(state.currentStory);
        }
      },

      getCurrentNode: () => {
        const state = get();
        if (!state.currentStory || !state.currentNodeId) return null;
        return state.currentStory.nodes[state.currentNodeId] || null;
      },

      getProgress: () => {
        const state = get();
        if (!state.currentStory) return { current: 0, total: 0 };
        
        const totalNodes = Object.keys(state.currentStory.nodes).length;
        const visitedCount = state.visitedNodes.length;
        
        return { current: visitedCount, total: totalNodes };
      },

      isGameComplete: () => {
        const state = get();
        return state.isComplete;
      },

      getEndingStats: () => {
        const state = get();
        if (!state.currentStory) return { discovered: 0, total: 0 };
        
        const storyId = state.currentStory.id;
        const discoveredCount = state.discoveredEndings[storyId]?.length || 0;
        
        // Count total endings in current story
        const totalEndings = Object.values(state.currentStory.nodes)
          .filter(node => node.isEnding).length;
        
        return { discovered: discoveredCount, total: totalEndings };
      },
    }),
    {
      name: 'kids-adventure-game-storage',
      partialize: (state) => ({
        completedStories: state.completedStories,
        discoveredEndings: state.discoveredEndings,
        // Don't persist current game session, only progress tracking
      }),
    }
  )
);