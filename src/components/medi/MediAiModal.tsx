import React, { useState } from 'react';
import { Mic } from 'lucide-react';
import { TactileModal } from '../ui/TactileModal';
import { LanguageCode } from '../../types/clinical';

export interface MediAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
  onAppendSymptom: (symptom: string) => void;
}

export const MediAiModal: React.FC<MediAiModalProps> = ({
  isOpen,
  onClose,
  language,
  onAppendSymptom,
}) => {
  const [transcript] = useState(
    language === 'hi'
      ? 'Seene me bahut tej dabav aur jalan ho rahi hai, baye kandhe ki taraf dard fail raha hai.'
      : 'Severe retrosternal squeezing pain radiating to left shoulder and arm. Experiencing cold sweats.'
  );

  if (!isOpen) return null;

  return (
    <TactileModal
      isOpen={isOpen}
      onClose={onClose}
      title="Bhashini AI Clinical Voice Assistant"
      subtitle={`Listening & structuring symptoms (${language.toUpperCase()})`}
      maxWidth="480px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
        {/* Giant Glowing Pulsing Orb */}
        <div style={{ position: 'relative', margin: '10px 0' }}>
          <div className="medi-giant-orb" style={{ width: '160px', height: '160px' }}>
            <div className="medi-orb-wave" />
            <Mic size={48} color="#FFFFFF" style={{ zIndex: 2 }} />
          </div>
        </div>

        {/* Waveform Bars */}
        <div style={{ display: 'flex', gap: '4px', height: '24px', alignItems: 'center' }}>
          {[12, 24, 18, 28, 16, 22, 10].map((h, i) => (
            <span
              key={i}
              style={{
                width: '4px',
                height: `${h}px`,
                backgroundColor: 'var(--medi-primary)',
                borderRadius: '4px',
                animation: 'waveBar 0.8s ease-in-out infinite alternate',
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Inset Transcript Box */}
        <div className="medi-inset-well" style={{ borderRadius: 'var(--medi-radius-lg)', width: '100%' }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--medi-text-primary)', fontWeight: 600, margin: 0, textAlign: 'left' }}>
            "{transcript}"
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
          <button
            type="button"
            className="medi-pill-btn"
            style={{ flex: 1 }}
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="medi-cta-gradient-btn"
            style={{ flex: 2, padding: '12px 18px', fontSize: '0.88rem' }}
            onClick={() => {
              onAppendSymptom(transcript);
              onClose();
            }}
          >
            ADD TO CASE INTAKE
          </button>
        </div>
      </div>
    </TactileModal>
  );
};
