import { Story } from '@/lib/types/game.types';

// Story cache to avoid repeated loading
const storyCache = new Map<string, Story>();

export async function loadStory(storyId: string): Promise<Story> {
  // Check cache first
  if (storyCache.has(storyId)) {
    return storyCache.get(storyId)!;
  }

  try {
    // Try to load from public data directory
    const response = await fetch(`/data/stories/${storyId}.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to load story: ${response.statusText}`);
    }

    const story: Story = await response.json();
    
    // Validate story structure
    validateStory(story);
    
    // Cache the story
    storyCache.set(storyId, story);
    
    return story;
  } catch (error) {
    console.error('Error loading story:', error);
    
    // Return fallback story for development
    return getFallbackStory(storyId);
  }
}

function validateStory(story: Story): void {
  if (!story.id || !story.title || !story.startNodeId || !story.nodes) {
    throw new Error('Invalid story structure');
  }

  if (!story.nodes[story.startNodeId]) {
    throw new Error(`Start node ${story.startNodeId} not found in story nodes`);
  }

  // Validate that all choice nextNodeIds exist
  for (const [nodeId, node] of Object.entries(story.nodes)) {
    for (const choice of node.choices) {
      if (!story.nodes[choice.nextNodeId]) {
        throw new Error(`Choice ${choice.id} in node ${nodeId} points to non-existent node ${choice.nextNodeId}`);
      }
    }
  }
}

function getFallbackStory(storyId: string): Story {
  // Fallback story for development/testing
  return {
    id: storyId,
    theme: storyId,
    title: `${storyId.charAt(0).toUpperCase() + storyId.slice(1)} Adventure`,
    description: `An exciting ${storyId} adventure!`,
    startNodeId: 'start',
    nodes: {
      start: {
        id: 'start',
        text: `Welcome to your ${storyId} adventure! This is a placeholder story while we load the real one.`,
        emoji: '🌟',
        choices: [
          {
            id: 'continue',
            text: 'Start Adventure',
            emoji: '▶️',
            nextNodeId: 'middle'
          }
        ]
      },
      middle: {
        id: 'middle',
        text: 'You are on an amazing journey! What would you like to do next?',
        emoji: '✨',
        choices: [
          {
            id: 'explore',
            text: 'Explore around',
            emoji: '🔍',
            nextNodeId: 'ending'
          },
          {
            id: 'rest',
            text: 'Take a rest',
            emoji: '😴',
            nextNodeId: 'ending'
          }
        ]
      },
      ending: {
        id: 'ending',
        text: 'What an adventure! You did great exploring and making choices.',
        emoji: '🎉',
        isEnding: true,
        moral: 'Every adventure teaches us something new!',
        choices: []
      }
    }
  };
}

export async function getAvailableStories(): Promise<string[]> {
  // For now, return the stories we know about
  // In a real app, this could query an API or file system
  return ['space', 'ocean', 'forest', 'dino'];
}

export function preloadStory(storyId: string): void {
  // Preload a story in the background
  loadStory(storyId).catch(error => {
    console.warn(`Failed to preload story ${storyId}:`, error);
  });
}