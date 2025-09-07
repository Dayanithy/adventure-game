# Kids Adventure Game - Development Specification

## Project Overview
Build an interactive, choice-based adventure game for kindergarteners (ages 5-6) that teaches decision-making through entertaining stories. The game will feature multiple themes, visual storytelling, and audio narration with a moral lesson at the end of each adventure.

## Development Philosophy
- **Iterative Development**: Build core → test → add features → test
- **Mobile-First**: Optimize for touch devices
- **Accessibility**: Audio support, large touch targets, simple navigation
- **Extensible Architecture**: Easy to add new themes and stories

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 18+
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Audio/TTS**: Web Speech API (native browser TTS)
- **Icons**: Lucide React + Emoji
- **Build Tool**: Next.js built-in (Turbopack/Webpack)
- **Type Safety**: TypeScript

## Project Structure
```
kids-adventure-game/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── game/
│   │   └── [themeId]/
│   │       └── page.tsx
│   └── api/
│       └── tts/
│           └── route.ts
├── components/
│   ├── engine/
│   │   ├── GameEngine.tsx
│   │   ├── SceneRenderer.tsx
│   │   ├── ChoiceButton.tsx
│   │   └── NarrationBox.tsx
│   ├── ui/
│   │   └── (shadcn components)
│   └── common/
│       ├── ProgressBar.tsx
│       └── AudioButton.tsx
├── lib/
│   ├── store/
│   │   └── gameStore.ts
│   ├── types/
│   │   └── game.types.ts
│   ├── hooks/
│   │   ├── useAudio.ts
│   │   └── useGameProgress.ts
│   └── utils/
│       └── storyLoader.ts
├── data/
│   └── stories/
│       ├── space-adventure.json
│       ├── dino-detective.json
│       └── story.schema.json
└── public/
    ├── images/
    │   └── scenes/
    └── sounds/
        └── effects/
```

## Phase 1: Core Structure (Iteration 1)
**Goal**: Basic app structure with routing and component shells

### Tasks:
1. Initialize Next.js project with TypeScript and Tailwind
2. Set up basic routing structure
3. Create component shells (no functionality)
4. Implement basic layout with responsive design
5. Add theme selection home page

### Deliverables:
```typescript
// Basic home page with theme cards
// Route: app/page.tsx
interface ThemeCard {
  id: string;
  title: string;
  emoji: string;
  color: string;
  description: string;
}

// Theme selection grid
// Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
```

### Test Criteria:
- [ ] App loads without errors
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] Theme cards are clickable (console.log for now)
- [ ] Navigation structure is clear

## Phase 2: Story Engine (Iteration 2)
**Goal**: Implement the core story engine with state management

### Data Structure:
```typescript
// lib/types/game.types.ts
interface StoryNode {
  id: string;
  text: string;
  imageUrl?: string;
  emoji?: string;
  choices: Choice[];
  isEnding?: boolean;
  moral?: string;
}

interface Choice {
  id: string;
  text: string;
  emoji: string;
  nextNodeId: string;
  consequence?: string; // For tracking decision impacts
}

interface Story {
  id: string;
  theme: string;
  title: string;
  description: string;
  startNodeId: string;
  nodes: Record<string, StoryNode>;
}

interface GameState {
  currentStory: Story | null;
  currentNodeId: string | null;
  visitedNodes: string[];
  choicesMade: Array<{nodeId: string, choiceId: string}>;
  isComplete: boolean;
}
```

### Core Components:
```typescript
// components/engine/GameEngine.tsx
// - Manages game flow
// - Handles choice selection
// - Tracks progress
// - Saves to localStorage

// components/engine/SceneRenderer.tsx
// - Displays current scene
// - Shows text and image
// - Renders choice buttons
```

### Store Implementation:
```typescript
// lib/store/gameStore.ts
interface GameStore {
  gameState: GameState;
  loadStory: (storyId: string) => void;
  makeChoice: (choiceId: string) => void;
  resetGame: () => void;
  saveProgress: () => void;
  loadProgress: () => void;
}
```

### Test Criteria:
- [ ] Can load a story from JSON
- [ ] Navigation between nodes works
- [ ] State persists in localStorage
- [ ] Can reset and restart game

## Phase 3: Simple Test Story (Iteration 3)
**Goal**: Create one complete simple story to test the engine

### Sample Story Structure:
```json
{
  "id": "test-adventure",
  "theme": "space",
  "title": "My First Space Adventure",
  "startNodeId": "start",
  "nodes": {
    "start": {
      "id": "start",
      "text": "You're in a spaceship! Where should we go?",
      "emoji": "🚀",
      "choices": [
        {
          "id": "choice1",
          "text": "To the Moon",
          "emoji": "🌙",
          "nextNodeId": "moon"
        },
        {
          "id": "choice2",
          "text": "To Mars",
          "emoji": "🔴",
          "nextNodeId": "mars"
        }
      ]
    },
    "moon": {
      "id": "moon",
      "text": "You landed on the Moon! You see a friendly alien.",
      "emoji": "👽",
      "choices": [
        {
          "id": "choice3",
          "text": "Say hello",
          "emoji": "👋",
          "nextNodeId": "friend_ending"
        },
        {
          "id": "choice4",
          "text": "Hide",
          "emoji": "🙈",
          "nextNodeId": "shy_ending"
        }
      ]
    },
    "friend_ending": {
      "id": "friend_ending",
      "text": "You made a new friend! The alien shows you moon treasures.",
      "emoji": "🎉",
      "isEnding": true,
      "moral": "Being friendly and brave helps us make new friends!",
      "choices": []
    }
  }
}
```

### Test Criteria:
- [ ] Complete story from start to finish
- [ ] All choices lead to valid nodes
- [ ] Ending displays moral
- [ ] Can replay the story

## Phase 4: UI/UX Enhancement (Iteration 4)
**Goal**: Add animations, styling, and audio support

### Visual Enhancements:
```typescript
// Framer Motion animations
// - Page transitions
// - Choice button hover/tap effects
// - Scene transitions (fade/slide)
// - Celebration animation at ending

// Tailwind styling
// - Gradient backgrounds per theme
// - Large, colorful buttons
// - Kid-friendly fonts (Comic Sans MS fallback)
// - High contrast for readability
```

### Audio Implementation:
```typescript
// lib/hooks/useAudio.ts
interface AudioHook {
  speak: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  playSound: (soundId: string) => void;
}

// Using Web Speech API
// - Auto-narrate on scene change
// - Button to repeat narration
// - Sound effects for choices
```

### Responsive Design:
```css
/* Mobile First Approach */
/* Base: 320px - 768px */
/* Tablet: 768px - 1024px */
/* Desktop: 1024px+ */

/* Touch targets minimum 48x48px */
/* Font size minimum 18px for body text */
/* Choice buttons minimum height 80px */
```

### Test Criteria:
- [ ] Animations are smooth (60fps)
- [ ] TTS works on all major browsers
- [ ] UI is readable and touchable on small devices
- [ ] Visual feedback for all interactions

## Phase 5: First Complete Theme (Iteration 5)
**Goal**: Build one full theme with 15-20 nodes and branching paths

### Theme: Space Explorer
```typescript
// 4-5 major decision points
// 2-3 branches per decision
// 4-5 different endings
// Educational elements:
//   - Counting planets
//   - Color recognition
//   - Basic problem solving
```

### Test Criteria:
- [ ] 10+ minute playthrough
- [ ] Multiple unique paths
- [ ] Replay value (different outcomes)
- [ ] Age-appropriate content verified

## Phase 6: Progress & Achievements (Iteration 6)
**Goal**: Add gamification elements

### Features:
- Progress bar showing story completion
- Sticker collection for endings discovered
- Simple stats (choices made, stories completed)
- "New ending unlocked" celebrations

## API Routes (if needed)
```typescript
// app/api/tts/route.ts
// Fallback TTS endpoint if Web Speech API unavailable

// Future considerations:
// app/api/stories/route.ts - Dynamic story loading
// app/api/progress/route.ts - Cloud save (future)
```

## Development Guidelines

### Code Standards:
- Use TypeScript strict mode
- Component files < 200 lines
- Separate logic from presentation
- Mobile-first CSS approach
- Accessibility first (ARIA labels, keyboard nav)

### Testing Strategy:
- Manual testing with actual device sizes
- Test on touch devices primarily
- Browser compatibility: Chrome, Safari, Firefox, Edge
- Test with screen readers

### Performance Targets:
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Smooth 60fps animations
- Images optimized (WebP with fallbacks)
- Lazy load non-critical assets

## Environment Variables
```env
NEXT_PUBLIC_APP_NAME=Kids Adventure Game
NEXT_PUBLIC_TTS_ENABLED=true
NEXT_PUBLIC_SOUND_EFFECTS_ENABLED=true
```

## Initial Setup Commands
```bash
# Create Next.js project
npx create-next-app@latest kids-adventure-game --typescript --tailwind --app

# Install dependencies
npm install zustand framer-motion lucide-react
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge

# Install dev dependencies
npm install -D @types/node

# Run development server
npm run dev
```

## Success Metrics
- Kid can complete a story without adult help
- Clear cause-and-effect from choices
- Engaging enough for multiple playthroughs
- Parents understand the educational value
- Loads quickly on average mobile connection

## Future Iterations (Post-MVP)
- Additional themes (Dinosaurs, Ocean, Forest)
- Mini-games between story segments
- Parent dashboard
- Difficulty levels
- Multiplayer choices
- Custom story creator
- Offline support (PWA)

## Notes for Implementation
1. Start with mobile layout, scale up to desktop
2. Test with real kindergarteners if possible
3. Keep language simple (kindergarten reading level)
4. Prioritize visual communication over text
5. Every interaction should have feedback
6. Keep sessions short (5-10 minutes per story)
7. Always save progress automatically

---

## Ready to Build!
This specification provides a clear, iterative path to building the kids' adventure game. Each phase builds on the previous one, allowing for testing and refinement at each step. The architecture is designed to be extensible, making it easy to add new themes and features as the project grows.