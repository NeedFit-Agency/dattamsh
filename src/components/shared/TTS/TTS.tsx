import React, { useState, useEffect } from 'react';
import styles from './TTS.module.css';

interface TTSProps {
  text: string;
  className?: string;
  iconClassName?: string;
  showText?: boolean;
  autoPlay?: boolean;
  voice?: string; // Voice name preference
  rate?: number; // Speech rate (0.1 to 10)
  pitch?: number; // Voice pitch (0 to 2)
  volume?: number; // Volume (0 to 1)
  excitement?: 'low' | 'medium' | 'high'; // Excitement level
  naturalPauses?: boolean; // Add natural pauses
  humanLike?: boolean; // Enable human-like speech patterns
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: any) => void;
}

const TTS: React.FC<TTSProps> = ({
  text,
  className = '',
  iconClassName = '',
  showText = true,
  autoPlay = false,
  voice,
  rate = 0.9,
  pitch = 1,
  volume = 1,
  excitement = 'medium',
  naturalPauses = true,
  humanLike = true,
  onStart,
  onEnd,
  onError
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Enhanced text processing for human-like speech
  const enhanceTextForNaturalSpeech = (inputText: string): string => {
    if (!humanLike && !naturalPauses) return inputText;

    let enhancedText = inputText;

    // Add natural pauses for punctuation
    if (naturalPauses) {
      // Add pauses after periods, exclamation marks, and question marks
      enhancedText = enhancedText.replace(/([.!?])\s+/g, '$1... ');
      
      // Add slight pauses after commas
      enhancedText = enhancedText.replace(/,\s+/g, ', ... ');
      
      // Add pauses before "and", "but", "or" for natural flow
      enhancedText = enhancedText.replace(/\s+(and|but|or|so|then|now|next)\s+/gi, ' ... $1 ... ');
      
      // Add emphasis pauses around important words
      enhancedText = enhancedText.replace(/\b(amazing|great|wonderful|excellent|perfect|correct|wrong|try again|well done)\b/gi, '... $1 ...');
    }

    if (humanLike) {
      // Add excitement markers for enthusiastic words
      const excitementWords = /\b(amazing|fantastic|wonderful|excellent|great|awesome|perfect|brilliant|superb|outstanding|incredible|marvelous)\b/gi;
      enhancedText = enhancedText.replace(excitementWords, (match) => `${match.toUpperCase()}!`);
      
      // Add gentle emphasis to instructional words
      const instructionalWords = /\b(listen|look|try|drag|drop|click|arrange|sort|match|remember|think)\b/gi;
      enhancedText = enhancedText.replace(instructionalWords, (match) => `${match.toLowerCase()}`);
      
      // Add encouraging tone to positive feedback
      enhancedText = enhancedText.replace(/\b(you did it|well done|good job|nice work)\b/gi, 'WOW! $1!');
      
      // Make questions more engaging
      enhancedText = enhancedText.replace(/\?/g, '?');
    }

    return enhancedText;
  };

  // Get excitement-based speech parameters
  const getExcitementParameters = () => {
    switch (excitement) {
      case 'high':
        return {
          rate: Math.min(rate * 1.2, 2.0), // Faster speech
          pitch: Math.min(pitch * 1.3, 2.0), // Higher pitch
          volume: Math.min(volume * 1.1, 1.0), // Slightly louder
        };
      case 'low':
        return {
          rate: Math.max(rate * 0.8, 0.3), // Slower speech
          pitch: Math.max(pitch * 0.9, 0.1), // Lower pitch
          volume: Math.max(volume * 0.9, 0.1), // Slightly quieter
        };
      default: // medium
        return {
          rate: rate,
          pitch: pitch,
          volume: volume,
        };
    }
  };

  // Find the best quality voice for natural speech
  const findBestVoice = (availableVoices: SpeechSynthesisVoice[]) => {
    let preferredVoice = null;
    
    if (voice) {
      preferredVoice = availableVoices.find(v => v.name.includes(voice));
    }
    
    if (!preferredVoice) {
      // Prioritize high-quality neural voices
      const neuralVoices = availableVoices.filter(v => 
        v.lang.startsWith('en') && 
        (v.name.includes('Neural') || v.name.includes('Premium') || v.name.includes('Enhanced'))
      );
      
      if (neuralVoices.length > 0) {
        // Prefer female voices for educational content (research shows better engagement)
        preferredVoice = neuralVoices.find(v => 
          v.name.includes('Female') || v.name.includes('Woman') || 
          v.name.includes('Jenny') || v.name.includes('Aria') || 
          v.name.includes('Emma') || v.name.includes('Nova')
        ) || neuralVoices[0];
      }
    }
    
    // Fallback to Google or Microsoft voices (usually high quality)
    if (!preferredVoice) {
      preferredVoice = availableVoices.find(v => 
        v.lang.startsWith('en') && 
        (v.name.includes('Google') || v.name.includes('Microsoft')) &&
        !v.name.includes('eSpeak') // Avoid low-quality eSpeak voices
      );
    }
    
    // Fallback to any English voice that's not eSpeak
    if (!preferredVoice) {
      preferredVoice = availableVoices.find(v => 
        v.lang.startsWith('en') && !v.name.includes('eSpeak')
      );
    }
    
    // Last resort: use first available voice
    if (!preferredVoice && availableVoices.length > 0) {
      preferredVoice = availableVoices[0];
    }
    
    return preferredVoice;
  };

  // Load available voices with enhanced selection
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis?.getVoices() || [];
      setVoices(availableVoices);
      
      const bestVoice = findBestVoice(availableVoices);
      setSelectedVoice(bestVoice || null);
    };

    loadVoices();
    
    // Some browsers load voices asynchronously
    if (window.speechSynthesis?.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [voice]);

  // Auto play on mount if enabled
  useEffect(() => {
    if (autoPlay && text && selectedVoice) {
      handlePlay();
    }
  }, [autoPlay, text, selectedVoice]);

  const handlePlay = () => {
    // Stop any current speech
    window.speechSynthesis?.cancel();

    if (isPlaying) {
      setIsPlaying(false);
      onEnd?.();
      return;
    }

    if (!text || typeof window === 'undefined' || !window.speechSynthesis) {
      console.warn('TTS not supported or no text provided');
      return;
    }

    try {
      // Enhance text for natural speech
      const enhancedText = enhanceTextForNaturalSpeech(text);
      const utterance = new SpeechSynthesisUtterance(enhancedText);
      
      // Get excitement-based parameters
      const speechParams = getExcitementParameters();
      
      // Configure voice settings with enhanced parameters
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      // Apply dynamic speech parameters
      utterance.rate = speechParams.rate;
      utterance.pitch = speechParams.pitch;
      utterance.volume = speechParams.volume;

      // Add subtle variations for more human-like speech
      if (humanLike) {
        // Add slight random variations to make speech less robotic
        const rateVariation = 0.05; // 5% variation
        const pitchVariation = 0.03; // 3% variation
        
        utterance.rate += (Math.random() - 0.5) * rateVariation;
        utterance.pitch += (Math.random() - 0.5) * pitchVariation;
        
        // Ensure values stay within valid ranges
        utterance.rate = Math.max(0.1, Math.min(10, utterance.rate));
        utterance.pitch = Math.max(0, Math.min(2, utterance.pitch));
      }

      // Event handlers with enhanced feedback
      utterance.onstart = () => {
        setIsPlaying(true);
        onStart?.();
        console.log('🎤 Starting speech:', {
          text: enhancedText.substring(0, 50) + '...',
          voice: selectedVoice?.name,
          rate: utterance.rate.toFixed(2),
          pitch: utterance.pitch.toFixed(2),
          excitement: excitement
        });
      };

      utterance.onend = () => {
        setIsPlaying(false);
        onEnd?.();
        console.log('🎤 Speech completed successfully');
      };

      utterance.onpause = () => {
        setIsPlaying(false);
        console.log('🎤 Speech paused');
      };

      utterance.onresume = () => {
        setIsPlaying(true);
        console.log('🎤 Speech resumed');
      };

      utterance.onerror = (event) => {
        console.error('🎤 TTS Error:', event);
        setIsPlaying(false);
        onError?.(event);
      };

      // Add boundary events for word-level control (if supported)
      utterance.onboundary = (event) => {
        if (event.name === 'word' && humanLike) {
          // Subtle breathing pauses at natural points
          const currentWord = enhancedText.substring(event.charIndex, event.charIndex + event.charLength);
          if (['and', 'but', 'or', 'so', 'then', 'now'].includes(currentWord.toLowerCase())) {
            // Add micro-pause for natural flow (handled by enhanced text)
          }
        }
      };

      // Start speaking with enhanced settings
      window.speechSynthesis.speak(utterance);

    } catch (error) {
      console.error('🎤 TTS failed:', error);
      setIsPlaying(false);
      onError?.(error);
    }
  };

  const stopSpeech = () => {
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
    onEnd?.();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  return (
    <div className={`${styles.ttsContainer} ${className}`}>
      <button
        className={`${styles.ttsButton} ${isPlaying ? styles.playing : ''} ${iconClassName}`}
        onClick={handlePlay}
        disabled={!text}
        aria-label={isPlaying ? 'Stop speech' : 'Play speech'}
        title={isPlaying ? 'Stop reading' : 'Listen to text'}
      >
        {isPlaying ? (
          <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        ) : (
          <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/>
          </svg>
        )}
      </button>
      
      {showText && (
        <span className={styles.ttsText}>
          {isPlaying ? 'Playing...' : 'Listen'}
        </span>
      )}
    </div>
  );
};

export default TTS;
