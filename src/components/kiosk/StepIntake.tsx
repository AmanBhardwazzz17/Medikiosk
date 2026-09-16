import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, HeartPulse, Leaf, Sparkles, Activity } from 'lucide-react';
import { TactileCard } from '../ui/TactileCard';
import { TactileButton } from '../ui/TactileButton';
import { TactileBadge } from '../ui/TactileBadge';
import { VoiceMicOrb } from './VoiceMicOrb';
import { SocratesIntake, DashavidhaIntake, LanguageCode } from '../../types/clinical';
import { logger } from '../../lib/logger';

export interface StepIntakeProps {
  socrates: SocratesIntake;
  dashavidha: DashavidhaIntake;
  language: LanguageCode;
  onUpdateSocrates: (updated: Partial<SocratesIntake>) => void;
  onUpdateDashavidha: (updated: Partial<DashavidhaIntake>) => void;
  onBack: () => void;
  onNext: () => void;
}

export const StepIntake: React.FC<StepIntakeProps> = ({
  socrates,
  dashavidha,
  language,
  onUpdateSocrates,
  onUpdateDashavidha,
  onBack,
  onNext,
}) => {
  const [activeTab, setActiveTab] = useState<'socrates' | 'dashavidha'>('socrates');

  const handleVoiceTranscript = (text: string) => {
    logger.info('INTAKE', 'Appending transcribed voice data to active chief complaint', { text });
    const currentSite = socrates.site ? `${socrates.site} ${text}` : text;
    onUpdateSocrates({ site: currentSite });
  };

  const getSeverityColor = (val: number): string => {
    if (val >= 8) return 'var(--medi-red)';
    if (val >= 5) return 'var(--medi-amber)';
    return 'var(--medi-emerald)';
  };

  return (
    <TactileCard elevation="card" radius="xl">
      {/* Header & Tabs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--medi-text-primary)' }}>
              Dual Clinical Case Taking Intake
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--medi-text-secondary)', marginTop: '4px' }}>
              Multilingual holistic history intake integrating Modern Allopathic and Traditional AYUSH assessments
            </p>
          </div>
          <TactileBadge variant="primary" icon={<Sparkles size={14} />}>
            Bhashini AI Driven
          </TactileBadge>
        </div>

        {/* Tactile Tab Pill Switcher */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'var(--medi-bg-subtle)',
            padding: '6px',
            borderRadius: 'var(--medi-radius-full)',
            width: 'fit-content',
            border: '1px solid var(--medi-border-subtle)',
            gap: '8px',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('socrates')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              borderRadius: 'var(--medi-radius-full)',
              border: 'none',
              backgroundColor: activeTab === 'socrates' ? 'var(--medi-surface-card)' : 'transparent',
              color: activeTab === 'socrates' ? 'var(--medi-primary)' : 'var(--medi-text-secondary)',
              fontWeight: 700,
              fontSize: '0.88rem',
              boxShadow: activeTab === 'socrates' ? 'var(--medi-shadow-sm)' : 'none',
              cursor: 'pointer',
              transition: 'var(--medi-spring)',
            }}
          >
            <HeartPulse size={16} /> Allopathic (SOCRATES)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('dashavidha')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              borderRadius: 'var(--medi-radius-full)',
              border: 'none',
              backgroundColor: activeTab === 'dashavidha' ? 'var(--medi-surface-card)' : 'transparent',
              color: activeTab === 'dashavidha' ? 'var(--medi-emerald)' : 'var(--medi-text-secondary)',
              fontWeight: 700,
              fontSize: '0.88rem',
              boxShadow: activeTab === 'dashavidha' ? 'var(--medi-shadow-sm)' : 'none',
              cursor: 'pointer',
              transition: 'var(--medi-spring)',
            }}
          >
            <Leaf size={16} /> AYUSH (Dashavidha Pariksha)
          </button>
        </div>
      </div>

      {/* TAB 1: SOCRATES Allopathic Intake */}
      {activeTab === 'socrates' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Circular Voice Mic Element */}
          <div
            style={{
              backgroundColor: 'var(--medi-bg-subtle)',
              borderRadius: 'var(--medi-radius-lg)',
              padding: '16px',
              border: '1px solid var(--medi-border-subtle)',
            }}
          >
            <VoiceMicOrb language={language} onTranscriptReceived={handleVoiceTranscript} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {/* Site & Onset */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--medi-text-secondary)' }}>
                Site & Onset (Kahan aur kab se takleef hai?)
              </label>
              <textarea
                rows={3}
                value={socrates.site}
                onChange={(e) => onUpdateSocrates({ site: e.target.value })}
                placeholder="e.g. Substernal chest pain radiating to left shoulder, started 2 hours ago..."
                style={{
                  borderRadius: 'var(--medi-radius-md)',
                  backgroundColor: 'var(--medi-bg-subtle)',
                  border: '1px solid var(--medi-border-subtle)',
                  padding: '12px 14px',
                  color: 'var(--medi-text-primary)',
                  fontSize: '0.92rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* Character & Radiation */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--medi-text-secondary)' }}>
                Character & Quality (Kaisa dard hai?)
              </label>
              <textarea
                rows={3}
                value={socrates.character}
                onChange={(e) => onUpdateSocrates({ character: e.target.value })}
                placeholder="e.g. Squeezing pressure, heavy tightness, sharp prick..."
                style={{
                  borderRadius: 'var(--medi-radius-md)',
                  backgroundColor: 'var(--medi-bg-subtle)',
                  border: '1px solid var(--medi-border-subtle)',
                  padding: '12px 14px',
                  color: 'var(--medi-text-primary)',
                  fontSize: '0.92rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </div>
          </div>

          {/* Severity Pain Slider (1 - 10) */}
          <div
            style={{
              backgroundColor: 'var(--medi-bg-subtle)',
              borderRadius: 'var(--medi-radius-md)',
              padding: '18px',
              border: '1px solid var(--medi-border-subtle)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--medi-text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={18} color={getSeverityColor(socrates.severity)} />
                Pain Severity Score: {socrates.severity} / 10
              </label>
              <TactileBadge variant={socrates.severity >= 8 ? 'alert' : socrates.severity >= 5 ? 'warning' : 'success'}>
                {socrates.severity >= 8 ? 'High Risk / Severe' : socrates.severity >= 5 ? 'Moderate Pain' : 'Mild'}
              </TactileBadge>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={socrates.severity}
              onChange={(e) => onUpdateSocrates({ severity: parseInt(e.target.value) })}
              style={{
                width: '100%',
                accentColor: getSeverityColor(socrates.severity),
                cursor: 'pointer',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--medi-text-muted)', marginTop: '4px' }}>
              <span>1 - Mild Discomfort</span>
              <span>5 - Moderate</span>
              <span>10 - Unbearable / Emergency</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AYUSH Dashavidha Pariksha */}
      {activeTab === 'dashavidha' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* Prakriti */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--medi-text-secondary)' }}>
              Prakriti (Constitutional Dominance)
            </label>
            <select
              value={dashavidha.prakriti}
              onChange={(e) => onUpdateDashavidha({ prakriti: e.target.value as DashavidhaIntake['prakriti'] })}
              style={{
                height: '48px',
                borderRadius: 'var(--medi-radius-md)',
                backgroundColor: 'var(--medi-bg-subtle)',
                border: '1px solid var(--medi-border-subtle)',
                padding: '0 14px',
                color: 'var(--medi-text-primary)',
                fontSize: '0.92rem',
                outline: 'none',
              }}
            >
              <option value="Vata Pradhan">Vata Pradhan (Air/Ether dominant)</option>
              <option value="Pitta Pradhan">Pitta Pradhan (Fire/Water dominant)</option>
              <option value="Kapha Pradhan">Kapha Pradhan (Earth/Water dominant)</option>
              <option value="Vata-Pitta">Vata-Pitta</option>
              <option value="Pitta-Kapha">Pitta-Kapha</option>
              <option value="Tridoshaja">Tridoshaja (Balanced)</option>
            </select>
          </div>

          {/* Agni */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--medi-text-secondary)' }}>
              Agni (Digestive & Metabolic Fire)
            </label>
            <select
              value={dashavidha.agni}
              onChange={(e) => onUpdateDashavidha({ agni: e.target.value as DashavidhaIntake['agni'] })}
              style={{
                height: '48px',
                borderRadius: 'var(--medi-radius-md)',
                backgroundColor: 'var(--medi-bg-subtle)',
                border: '1px solid var(--medi-border-subtle)',
                padding: '0 14px',
                color: 'var(--medi-text-primary)',
                fontSize: '0.92rem',
                outline: 'none',
              }}
            >
              <option value="Mandagni (Sluggish)">Mandagni (Sluggish / Low digestion)</option>
              <option value="Tikshnagni (Intense)">Tikshnagni (Intense / High appetite)</option>
              <option value="Vishamagni (Irregular)">Vishamagni (Irregular / Bloating)</option>
              <option value="Samagni (Balanced)">Samagni (Balanced digestion)</option>
            </select>
          </div>

          {/* Satmya */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--medi-text-secondary)' }}>
              Satmya (Dietary Habituation & Taste)
            </label>
            <select
              value={dashavidha.satmya}
              onChange={(e) => onUpdateDashavidha({ satmya: e.target.value as DashavidhaIntake['satmya'] })}
              style={{
                height: '48px',
                borderRadius: 'var(--medi-radius-md)',
                backgroundColor: 'var(--medi-bg-subtle)',
                border: '1px solid var(--medi-border-subtle)',
                padding: '0 14px',
                color: 'var(--medi-text-primary)',
                fontSize: '0.92rem',
                outline: 'none',
              }}
            >
              <option value="Madhura & Lavana Rasa">Madhura & Lavana Rasa (Sweet & Salty preference)</option>
              <option value="Katu & Tikta">Katu & Tikta (Spicy & Bitter preference)</option>
              <option value="Sarva Rasa Satmya">Sarva Rasa Satmya (Balanced intake)</option>
            </select>
          </div>

          {/* Ahara Shakti */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--medi-text-secondary)' }}>
              Ahara Shakti (Digestive Capacity)
            </label>
            <select
              value={dashavidha.aharaShakti}
              onChange={(e) => onUpdateDashavidha({ aharaShakti: e.target.value as DashavidhaIntake['aharaShakti'] })}
              style={{
                height: '48px',
                borderRadius: 'var(--medi-radius-md)',
                backgroundColor: 'var(--medi-bg-subtle)',
                border: '1px solid var(--medi-border-subtle)',
                padding: '0 14px',
                color: 'var(--medi-text-primary)',
                fontSize: '0.92rem',
                outline: 'none',
              }}
            >
              <option value="Jarana Shakti (Moderate Digestion)">Jarana Shakti (Moderate Digestion)</option>
              <option value="Abhyavaharana (Good Appetite)">Abhyavaharana (Good Appetite)</option>
              <option value="Hina (Poor Digestion)">Hina (Poor Digestion / Indigestion)</option>
            </select>
          </div>
        </div>
      )}

      {/* Action Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px' }}>
        <TactileButton variant="secondary" icon={<ArrowLeft size={18} />} onClick={onBack}>
          Back to Registration
        </TactileButton>

        <TactileButton variant="primary" icon={<ArrowRight size={18} />} onClick={onNext}>
          Next: Prescription OCR
        </TactileButton>
      </div>
    </TactileCard>
  );
};
