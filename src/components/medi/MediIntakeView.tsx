import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Mic, HeartPulse, Leaf, ScanLine } from 'lucide-react';
import { SocratesIntake, DashavidhaIntake, LanguageCode, PatientProfile } from '../../types/clinical';
import { VoiceMicOrb } from '../kiosk/VoiceMicOrb';

export interface MediIntakeViewProps {
  patient: PatientProfile;
  socrates: SocratesIntake;
  dashavidha: DashavidhaIntake;
  language: LanguageCode;
  onUpdateSocrates: (updated: Partial<SocratesIntake>) => void;
  onUpdateDashavidha: (updated: Partial<DashavidhaIntake>) => void;
  onBack: () => void;
  onProceedToOcr: () => void;
}

const GlassCard: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      background: 'var(--medi-glass-card)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: 'var(--medi-border-glass)',
      borderRadius: 'var(--medi-radius-lg)',
      boxShadow: 'var(--medi-shadow-card)',
      padding: '20px',
      ...style,
    }}
  >
    {children}
  </div>
);

const InputWell: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      background: 'var(--medi-input-bg)',
      border: 'var(--medi-input-border)',
      borderRadius: 'var(--medi-radius-md)',
      padding: '10px 14px',
      width: '100%',
      boxSizing: 'border-box',
      transition: 'all 0.2s ease',
      ...style,
    }}
  >
    {children}
  </div>
);

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  fontFamily: 'inherit',
  fontSize: '0.9rem',
  color: 'var(--medi-text-primary)',
  resize: 'none' as const,
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  fontWeight: 700,
  color: 'var(--medi-text-muted)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
  marginBottom: '6px',
  display: 'block',
};

export const MediIntakeView: React.FC<MediIntakeViewProps> = ({
  patient,
  socrates,
  dashavidha,
  language,
  onUpdateSocrates,
  onUpdateDashavidha,
  onBack,
  onProceedToOcr,
}) => {
  const [activeTab, setActiveTab] = useState<'allopathy' | 'ayush'>('allopathy');

  const handleVoiceTranscript = (text: string) => {
    // Voice transcript appended to symptom site/onset description
    const current = socrates.site;
    onUpdateSocrates({ site: current ? `${current} ${text}` : text });
  };

  const tabs = [
    { id: 'allopathy' as const, label: 'Allopathic', sublabel: 'SOCRATES', icon: <HeartPulse size={16} /> },
    { id: 'ayush' as const, label: 'AYUSH', sublabel: 'Dashavidha', icon: <Leaf size={16} /> },
  ];

  const severityColor = (s: number) => {
    if (s >= 8) return '#EF4444';
    if (s >= 5) return '#F59E0B';
    return '#10B981';
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px 0 130px',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        animation: 'fadeInUp 0.5s ease both',
      }}
    >
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--medi-glass-primary)',
            backdropFilter: 'blur(12px)',
            border: 'var(--medi-border-glass)',
            borderRadius: 'var(--medi-radius-full)',
            padding: '8px 14px',
            color: 'var(--medi-text-secondary)',
            fontFamily: 'inherit',
            fontSize: '0.84rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ textAlign: 'center' }}>
          <div
            className="editorial-eyebrow"
            style={{
              fontSize: '0.66rem',
              color: 'var(--medi-primary)',
            }}
          >
            STEP 02 // SYMPTOM INTAKE
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '2px',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: 'var(--medi-gradient-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: '#fff',
              }}
            >
              {patient.name.charAt(0)}
            </div>
            <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--medi-text-primary)' }}>
              {patient.name}
            </span>
          </div>
        </div>

        <div style={{ width: '80px' }} />
      </div>

      {/* Step Dots */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            height: '6px',
            borderRadius: '3px',
            background: i === 0 ? 'rgba(255,255,255,0.2)' : i === 1 ? 'var(--medi-gradient-primary)' : 'rgba(255,255,255,0.1)',
            width: i === 1 ? '24px' : '8px',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      {/* Voice Orb Hero — PRIMARY INPUT */}
      <GlassCard style={{ textAlign: 'center', padding: '24px 20px' }}>
        <div style={{ marginBottom: '12px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: 'var(--medi-radius-full)',
            background: 'rgba(99,102,241,0.15)',
            border: '1px solid rgba(99,102,241,0.3)',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: 'var(--medi-primary-light)',
            marginBottom: '12px',
          }}>
            <Mic size={12} /> PRIMARY — Speak Your Symptoms
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--medi-text-secondary)', lineHeight: 1.5 }}>
            Tap the orb and describe your symptoms. You can speak in{' '}
            <strong style={{ color: 'var(--medi-text-primary)' }}>Hindi, Bhojpuri, or English</strong>.
          </p>
        </div>
        <VoiceMicOrb language={language} onTranscriptReceived={handleVoiceTranscript} />

        {socrates.site && (
          <div style={{
            marginTop: '16px',
            padding: '12px 16px',
            background: 'rgba(99,102,241,0.08)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: 'var(--medi-radius-md)',
            textAlign: 'left',
          }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--medi-primary-light)', fontWeight: 700, marginBottom: '4px' }}>
              RECORDED TRANSCRIPT
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--medi-text-primary)', lineHeight: 1.5 }}>{socrates.site}</p>
          </div>
        )}
      </GlassCard>

      {/* Tab Toggle */}
      <div style={{
        display: 'flex',
        gap: '6px',
        background: 'var(--medi-glass-primary)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: 'var(--medi-border-glass)',
        borderRadius: 'var(--medi-radius-full)',
        padding: '4px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              padding: '10px 8px',
              borderRadius: 'var(--medi-radius-full)',
              border: 'none',
              background: activeTab === tab.id ? 'var(--medi-gradient-primary)' : 'transparent',
              color: activeTab === tab.id ? '#FFFFFF' : 'var(--medi-text-secondary)',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: 'clamp(0.74rem, 2.7vw, 0.85rem)',
              cursor: 'pointer',
              transition: 'all 0.22s ease',
              boxShadow: activeTab === tab.id ? '0 4px 12px rgba(99,102,241,0.35)' : 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
            <span style={{ fontSize: '0.72em', opacity: 0.8, fontWeight: 500 }}>({tab.sublabel})</span>
          </button>
        ))}
      </div>

      {/* ALLOPATHIC FORM — SOCRATES */}
      {activeTab === 'allopathy' && (
        <GlassCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--medi-text-primary)' }}>
              SOCRATES Assessment
            </span>
            <span style={{
              fontSize: '0.84rem',
              fontWeight: 800,
              color: severityColor(socrates.severity),
              background: `${severityColor(socrates.severity)}20`,
              border: `1px solid ${severityColor(socrates.severity)}40`,
              padding: '2px 10px',
              borderRadius: 'var(--medi-radius-full)',
            }}>
              Pain {socrates.severity}/10
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Site + Onset */}
            <div>
              <label style={labelStyle}>Site & Onset — Kahan se? Kab se?</label>
              <InputWell>
                <textarea
                  rows={2}
                  value={socrates.site}
                  onChange={(e) => onUpdateSocrates({ site: e.target.value })}
                  placeholder="e.g. Substernal chest pain, started 2 hours ago..."
                  style={inputStyle}
                />
              </InputWell>
            </div>

            {/* Character */}
            <div>
              <label style={labelStyle}>Character — Kaisa dard hai?</label>
              <InputWell>
                <input
                  type="text"
                  value={socrates.character}
                  onChange={(e) => onUpdateSocrates({ character: e.target.value })}
                  placeholder="e.g. Crushing, sharp, dull, burning..."
                  style={inputStyle}
                />
              </InputWell>
            </div>

            {/* Associations */}
            <div>
              <label style={labelStyle}>Associations — Saath kya ho raha hai?</label>
              <InputWell>
                <input
                  type="text"
                  value={socrates.associations}
                  onChange={(e) => onUpdateSocrates({ associations: e.target.value })}
                  placeholder="e.g. Sweating, nausea, shortness of breath..."
                  style={inputStyle}
                />
              </InputWell>
            </div>

            {/* Severity Slider */}
            <div>
              <label style={labelStyle}>Pain Severity — {socrates.severity}/10</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--medi-emerald)', fontWeight: 700 }}>1</span>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={socrates.severity}
                  onChange={(e) => onUpdateSocrates({ severity: parseInt(e.target.value) })}
                  style={{
                    flex: 1,
                    accentColor: severityColor(socrates.severity),
                    cursor: 'pointer',
                    height: '4px',
                  }}
                />
                <span style={{ fontSize: '0.78rem', color: '#EF4444', fontWeight: 700 }}>10</span>
              </div>
              {socrates.severity >= 8 && (
                <div style={{
                  marginTop: '8px',
                  padding: '8px 12px',
                  background: 'rgba(239,68,68,0.12)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: 'var(--medi-radius-sm)',
                  fontSize: '0.78rem',
                  color: '#EF4444',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  ⚠️ High severity — Red Flag will be raised for doctor
                </div>
              )}
            </div>
          </div>
        </GlassCard>
      )}

      {/* AYUSH FORM — Dashavidha */}
      {activeTab === 'ayush' && (
        <GlassCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--medi-text-primary)' }}>
              Dashavidha AYUSH Profile
            </span>
            <span style={{
              fontSize: '0.72rem',
              color: '#10B981',
              fontWeight: 700,
              background: 'rgba(16,185,129,0.12)',
              border: '1px solid rgba(16,185,129,0.3)',
              padding: '2px 10px',
              borderRadius: 'var(--medi-radius-full)',
            }}>
              Constitutional
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={labelStyle}>Prakriti (Dosha Constitution)</label>
              <div className="medi-select-wrapper">
                <select
                  value={dashavidha.prakriti}
                  onChange={(e) => onUpdateDashavidha({ prakriti: e.target.value as DashavidhaIntake['prakriti'] })}
                  className="medi-glass-select"
                >
                  <option value="Vata Pradhan">Vata Pradhan</option>
                  <option value="Pitta Pradhan">Pitta Pradhan</option>
                  <option value="Kapha Pradhan">Kapha Pradhan</option>
                  <option value="Vata-Pitta">Vata-Pitta</option>
                  <option value="Pitta-Kapha">Pitta-Kapha</option>
                  <option value="Tridoshaja">Tridoshaja (Balanced)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Agni (Digestive Fire)</label>
              <div className="medi-select-wrapper">
                <select
                  value={dashavidha.agni}
                  onChange={(e) => onUpdateDashavidha({ agni: e.target.value as DashavidhaIntake['agni'] })}
                  className="medi-glass-select"
                >
                  <option value="Mandagni (Sluggish)">Mandagni — Sluggish Digestion</option>
                  <option value="Tikshnagni (Intense)">Tikshnagni — Intense Digestion</option>
                  <option value="Vishamagni (Irregular)">Vishamagni — Irregular Digestion</option>
                  <option value="Samagni (Balanced)">Samagni — Balanced Digestion</option>
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Satmya (Diet Suitability)</label>
              <div className="medi-select-wrapper">
                <select
                  value={dashavidha.satmya}
                  onChange={(e) => onUpdateDashavidha({ satmya: e.target.value as DashavidhaIntake['satmya'] })}
                  className="medi-glass-select"
                >
                  <option value="Madhura & Lavana Rasa">Madhura & Lavana Rasa (Sweet & Salty)</option>
                  <option value="Katu & Tikta">Katu & Tikta (Spicy & Bitter)</option>
                  <option value="Sarva Rasa Satmya">Sarva Rasa Satmya (All foods)</option>
                </select>
              </div>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Proceed Button */}
      <button
        type="button"
        onClick={onProceedToOcr}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '16px 32px',
          borderRadius: 'var(--medi-radius-full)',
          border: 'none',
          background: 'var(--medi-gradient-primary)',
          color: '#FFFFFF',
          fontFamily: 'inherit',
          fontSize: '1rem',
          fontWeight: 800,
          cursor: 'pointer',
          boxShadow: '0 4px 24px rgba(99,102,241,0.5)',
          transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.6)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(99,102,241,0.5)'; }}
      >
        <ScanLine size={20} />
        Next: Upload Records
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
