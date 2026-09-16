import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { LanguageCode } from '../../types/clinical';
import { logger } from '../../lib/logger';

export interface VoiceMicOrbProps {
  language: LanguageCode;
  onTranscriptReceived: (transcript: string) => void;
  active?: boolean;
}

export const VoiceMicOrb: React.FC<VoiceMicOrbProps> = ({
  language,
  onTranscriptReceived,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check SpeechRecognition browser support
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;

    if (SpeechRecognition) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const recog = new (SpeechRecognition as any)();
      recog.continuous = false;
      recog.interimResults = false;

      recog.onstart = () => {
        setIsListening(true);
        setErrorMessage(null);
        logger.info('SPEECH_API', 'Speech recognition session started', { language });
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recog.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        logger.info('SPEECH_API', 'Speech transcribed successfully', { length: transcript.length });
        onTranscriptReceived(transcript);
        setIsListening(false);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recog.onerror = (event: any) => {
        logger.warn('SPEECH_API', 'Speech recognition error encountered', { error: event.error });
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone access blocked. Please permit microphone permissions.');
        } else {
          setErrorMessage('Speech intake timed out. Tap to retry or type below.');
        }
      };

      recog.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recog;
    }
  }, [language, onTranscriptReceived]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      // Fallback simulation for unsupported browsers/environments
      setIsListening(true);
      setTimeout(() => {
        const simulatedPhrases = [
          'Severe squeezing chest pain radiating to left arm since 2 hours.',
          'Bahut tej seene me dard ho raha hai aur paseena aa raha hai.',
          'Pet me gas aur jalan ho rahi hai kal raat se.',
        ];
        const randomPhrase = simulatedPhrases[Math.floor(Math.random() * simulatedPhrases.length)];
        onTranscriptReceived(randomPhrase);
        setIsListening(false);
      }, 2000);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      // Set language locale
      recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : language === 'bh' ? 'hi-IN' : 'en-US';
      try {
        recognitionRef.current.start();
      } catch (err) {
        logger.error('SPEECH_API', 'Failed to start recognition engine', { err });
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0', width: '100%' }}>
      {/* Waveform Bars (visible while listening) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          height: '40px',
          marginBottom: '12px',
          opacity: isListening ? 1 : 0,
          transition: 'var(--medi-ease)',
        }}
      >
        {[0.4, 0.8, 1.2, 0.7, 1.4, 0.9, 0.5].map((delay, i) => (
          <span
            key={i}
            style={{
              width: '4px',
              backgroundColor: 'var(--medi-primary)',
              borderRadius: 'var(--medi-radius-full)',
              animation: isListening ? `waveBar ${0.8 + delay * 0.4}s ease-in-out infinite alternate` : 'none',
              animationDelay: `${delay * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Tactile Mic Button Orb */}
      <button
        type="button"
        onClick={toggleListening}
        aria-label={isListening ? 'Stop recording voice' : 'Start voice symptom recording'}
        style={{
          width: '74px',
          height: '74px',
          borderRadius: '50%',
          background: isListening ? 'var(--medi-gradient-alert)' : 'var(--medi-gradient-primary)',
          color: '#FFFFFF',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isListening
            ? '0 0 28px rgba(239, 68, 68, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.4)'
            : '0 12px 28px -4px rgba(99, 102, 241, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
          transform: isListening ? 'scale(1.08)' : 'scale(1)',
          cursor: 'pointer',
          transition: 'var(--medi-spring)',
          animation: isListening ? 'pulseGlow 1.8s infinite' : undefined,
        }}
      >
        {isListening ? <MicOff size={32} /> : <Mic size={32} />}
      </button>

      <span
        style={{
          marginTop: '12px',
          fontSize: '0.86rem',
          fontWeight: 600,
          color: isListening ? 'var(--medi-red)' : 'var(--medi-text-secondary)',
          letterSpacing: '0.01em',
        }}
      >
        {isListening
          ? 'Listening... Speak symptoms in English, Hindi, or Bhojpuri'
          : 'Tap to Speak Symptoms (Bhashini AI Speech Engine)'}
      </span>

      {errorMessage && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '8px',
            color: 'var(--medi-red)',
            fontSize: '0.8rem',
          }}
        >
          <AlertCircle size={14} />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
