'use client';

import { useState, useCallback, useEffect } from 'react';

interface UseAudioReturn {
  speak: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  isSupported: boolean;
  playSound: (soundId: string) => void;
}

export function useAudio(): UseAudioReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Check if Speech Synthesis is supported
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
      setSynthesis(window.speechSynthesis);

      // Listen for speech events
      const handleSpeechEnd = () => setIsSpeaking(false);
      const handleSpeechError = () => setIsSpeaking(false);

      // These events might not work on all browsers, so we also use a timeout
      return () => {
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (!synthesis || !isSupported) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Stop any current speech
    synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice settings for kids
    utterance.rate = 0.8; // Slightly slower than normal
    utterance.pitch = 1.1; // Slightly higher pitch
    utterance.volume = 0.8;

    // Try to use a more kid-friendly voice if available
    const voices = synthesis.getVoices();
    const kidFriendlyVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') ||
      voice.name.toLowerCase().includes('child') ||
      voice.name.toLowerCase().includes('young')
    );
    
    if (kidFriendlyVoice) {
      utterance.voice = kidFriendlyVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthesis.speak(utterance);
    setIsSpeaking(true);

    // Fallback timeout in case events don't fire
    setTimeout(() => {
      setIsSpeaking(false);
    }, text.length * 100 + 2000); // Rough estimate based on text length
  }, [synthesis, isSupported]);

  const stopSpeaking = useCallback(() => {
    if (synthesis) {
      synthesis.cancel();
      setIsSpeaking(false);
    }
  }, [synthesis]);

  const playSound = useCallback((soundId: string) => {
    // For now, just play a simple audio element
    // In a full implementation, you'd have sound files
    try {
      const audio = new Audio(`/sounds/effects/${soundId}.mp3`);
      audio.volume = 0.3;
      audio.play().catch(error => {
        console.warn('Could not play sound:', error);
        // Fallback: use a simple beep or no sound
      });
    } catch (error) {
      console.warn('Sound not available:', soundId);
    }
  }, []);

  return {
    speak,
    stopSpeaking,
    isSpeaking,
    isSupported,
    playSound,
  };
}