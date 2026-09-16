import React, { useState } from 'react';
import { QrCode, ChevronRight, Mic, Globe, User, Phone, Heart, Edit3, Scan } from 'lucide-react';
import { PatientProfile, LanguageCode } from '../../types/clinical';
import { AbhaQrScannerModal } from '../common/AbhaQrScannerModal';
import { logger } from '../../lib/logger';

export interface MediSplashViewProps {
  patient: PatientProfile;
  language: LanguageCode;
  onUpdatePatient: (updated: Partial<PatientProfile>) => void;
  onUpdateLanguage: (lang: LanguageCode) => void;
  onStartFlow: () => void;
}

/* Shared styles */
const card: React.CSSProperties = {
  width: '100%',
  background: 'var(--medi-glass-card)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: 'var(--medi-border-glass)',
  borderRadius: 'var(--medi-radius-lg)',
  padding: '20px',
  boxShadow: 'var(--medi-shadow-card)',
};

const inputBase: React.CSSProperties = {
  width: '100%',
  background: 'var(--medi-input-bg)',
  border: 'var(--medi-input-border)',
  borderRadius: 'var(--medi-radius-md)',
  padding: '11px 14px',
  color: 'var(--medi-text-primary)',
  fontFamily: 'inherit',
  fontSize: '0.9rem',
  fontWeight: 500,
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  boxSizing: 'border-box',
};

const labelSt: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 700,
  color: 'var(--medi-text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: '6px',
  display: 'block',
};

export const MediSplashView: React.FC<MediSplashViewProps> = ({
  patient,
  language,
  onUpdatePatient,
  onUpdateLanguage,
  onStartFlow,
}) => {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [entryMode, setEntryMode] = useState<'abha' | 'manual'>('abha');

  const handleAbhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/[^\d-]/g, '');
    const digitsOnly = raw.replace(/\D/g, '');
    if (digitsOnly.length <= 14) {
      const parts = [];
      if (digitsOnly.length > 0) parts.push(digitsOnly.substring(0, 2));
      if (digitsOnly.length > 2) parts.push(digitsOnly.substring(2, 6));
      if (digitsOnly.length > 6) parts.push(digitsOnly.substring(6, 10));
      if (digitsOnly.length > 10) parts.push(digitsOnly.substring(10, 14));
      raw = parts.join('-');
    }
    onUpdatePatient({ abhaId: raw });
  };

  const languages = [
    { code: 'en' as const, native: 'EN', label: 'English' },
    { code: 'hi' as const, native: 'हिन्दी', label: 'Hindi' },
    { code: 'bh' as const, native: 'भोजपुरी', label: 'Bhojpuri' },
  ];

  const canProceed = entryMode === 'abha'
    ? patient.abhaId.replace(/\D/g, '').length >= 14
    : patient.name.trim().length >= 2;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        padding: '16px 0 32px',
        width: '100%',
        maxWidth: '560px',
        margin: '0 auto',
        animation: 'fadeInUp 0.5s ease both',
      }}
    >
      {/* ── Step Progress ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {['Identity', 'Symptoms', 'Records'].map((s, i) => (
          <React.Fragment key={s}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
              <div
                style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: i === 0 ? 'var(--medi-gradient-primary)' : 'rgba(255,255,255,0.07)',
                  border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.10)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.74rem', fontWeight: 700,
                  color: i === 0 ? '#fff' : 'var(--medi-text-muted)',
                }}
              >
                {i + 1}
              </div>
              <span style={{ fontSize: '0.6rem', color: i === 0 ? 'var(--medi-primary-light)' : 'var(--medi-text-muted)', fontWeight: 600 }}>
                {s}
              </span>
            </div>
            {i < 2 && <div style={{ width: '28px', height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '14px' }} />}
          </React.Fragment>
        ))}
      </div>

      {/* ── Orb Hero ── */}
      <div style={{ position: 'relative' }}>
        <div className="medi-giant-orb">
          <div className="medi-orb-wave" />
          <svg viewBox="0 0 200 200" style={{ position: 'absolute', width: '88%', height: '88%', opacity: 0.65 }}>
            <path d="M 10,100 C 40,40 70,160 100,100 C 130,40 160,160 190,100" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
            <path d="M 15,100 C 45,60 75,140 105,100 C 135,60 165,140 185,100" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          </svg>
        </div>
        <div style={{ position: 'absolute', inset: '-20px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      </div>

      {/* ── Header ── */}
      <div style={{ textAlign: 'center' }}>
        <div className="editorial-eyebrow" style={{ color: 'var(--medi-primary)', marginBottom: '4px' }}>
          PATIENT INTAKE // STEP 01
        </div>
        <h1 className="editorial-title" style={{ fontSize: '1.55rem', marginBottom: '3px' }}>
          Citizen <span className="editorial-italic">Identity</span> Verification
        </h1>
        <p style={{ fontSize: '0.78rem', color: 'var(--medi-text-secondary)' }}>
          Scan Ayushman Bharat ABHA card or enter details manually
        </p>
      </div>

      {/* ── Entry Mode Toggle ── */}
      <div style={card}>
        <p style={{ ...labelSt, marginBottom: '10px' }}>How would you like to register?</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { mode: 'abha' as const, icon: <Scan size={15} />, label: 'ABHA ID / QR Code' },
            { mode: 'manual' as const, icon: <Edit3 size={15} />, label: 'Manual Entry' },
          ].map(({ mode, icon, label }) => (
            <button
              key={mode}
              type="button"
              onClick={() => setEntryMode(mode)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 12px',
                borderRadius: 'var(--medi-radius-md)',
                border: entryMode === mode ? '1px solid rgba(99,102,241,0.5)' : 'var(--medi-border-glass)',
                background: entryMode === mode ? 'rgba(99,102,241,0.15)' : 'var(--medi-glass-primary)',
                color: entryMode === mode ? 'var(--medi-primary)' : 'var(--medi-text-secondary)',
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {icon}{label}
            </button>
          ))}
        </div>
      </div>

      {/* ── ABHA Entry ── */}
      {entryMode === 'abha' && (
        <div style={card}>
          <label style={labelSt}>
            <Scan size={12} style={{ display: 'inline', marginRight: '4px' }} />
            ABHA Health ID (14-digit)
          </label>
          <div style={{
            display: 'flex',
            gap: '8px',
            background: 'var(--medi-input-bg)',
            border: 'var(--medi-input-border)',
            borderRadius: 'var(--medi-radius-md)',
            padding: '4px 6px 4px 12px',
            alignItems: 'center',
            width: '100%',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}>
            <input
              type="text"
              inputMode="numeric"
              placeholder="12-3456-7890-1234"
              value={patient.abhaId}
              onChange={handleAbhaChange}
              style={{
                flex: 1,
                minWidth: 0,
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: 'clamp(0.85rem, 3.6vw, 1.05rem)',
                fontWeight: 700,
                color: 'var(--medi-text-primary)',
                letterSpacing: 'clamp(0.5px, 1.5vw, 2px)',
                fontFamily: 'inherit',
                padding: '8px 0',
              }}
            />
            <button
              type="button"
              onClick={() => setIsQrModalOpen(true)}
              aria-label="Scan QR Code"
              style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: 'var(--medi-gradient-primary)',
                border: 'none',
                borderRadius: 'var(--medi-radius-md)',
                color: '#FFFFFF',
                fontFamily: 'inherit',
                fontSize: '0.78rem',
                fontWeight: 700,
                padding: '8px 12px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              <QrCode size={15} /> Scan QR
            </button>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--medi-text-muted)', marginTop: '8px' }}>
            Enter your 14-digit ABHA number or scan the QR code from your Ayushman Bharat Health Account card.
          </p>
        </div>
      )}

      {/* ── Manual Entry Form ── */}
      {entryMode === 'manual' && (
        <div style={card}>
          <p style={{ ...labelSt, marginBottom: '16px' }}>
            <User size={12} style={{ display: 'inline', marginRight: '4px' }} />
            Patient Details
          </p>
          <div className="intake-form-grid">
            {/* Full Name */}
            <div className="intake-form-full">
              <label style={labelSt}>Full Name *</label>
              <input
                type="text"
                placeholder="e.g. Ramesh Kumar Gupta"
                value={patient.name}
                onChange={(e) => onUpdatePatient({ name: e.target.value })}
                style={inputBase}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(99,102,241,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.12)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.10)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            {/* Age */}
            <div>
              <label style={labelSt}>Age (Years) *</label>
              <input
                type="number"
                inputMode="numeric"
                placeholder="e.g. 45"
                value={patient.age || ''}
                min={1}
                max={120}
                onChange={(e) => onUpdatePatient({ age: parseInt(e.target.value) || 0 })}
                style={inputBase}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(99,102,241,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.12)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.10)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            {/* Gender */}
            <div>
              <label style={labelSt}>Gender *</label>
              <div className="medi-select-wrapper">
                <select
                  value={patient.gender}
                  onChange={(e) => onUpdatePatient({ gender: e.target.value as PatientProfile['gender'] })}
                  className="medi-glass-select"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label style={labelSt}>
                <Phone size={11} style={{ display: 'inline', marginRight: '3px' }} />
                Mobile Number
              </label>
              <input
                type="tel"
                inputMode="tel"
                placeholder="e.g. 9876543210"
                value={patient.phone || ''}
                onChange={(e) => onUpdatePatient({ phone: e.target.value })}
                style={inputBase}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(99,102,241,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.12)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.10)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            {/* Blood Group */}
            <div>
              <label style={labelSt}>
                <Heart size={11} style={{ display: 'inline', marginRight: '3px' }} />
                Blood Group
              </label>
              <div className="medi-select-wrapper">
                <select
                  value={patient.bloodGroup || ''}
                  onChange={(e) => onUpdatePatient({ bloodGroup: e.target.value })}
                  className="medi-glass-select"
                >
                  <option value="">Unknown</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* ABHA optional */}
            <div className="intake-form-full">
              <label style={labelSt}>ABHA ID (optional)</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="12-3456-7890-1234 (optional)"
                value={patient.abhaId}
                onChange={handleAbhaChange}
                style={inputBase}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(99,102,241,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.12)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.10)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Language Selector ── */}
      <div style={card}>
        <p style={{ ...labelSt, display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '12px' }}>
          <Globe size={13} /> Preferred Language for Voice Intake
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => onUpdateLanguage(item.code)}
              style={{
                padding: '10px 8px',
                borderRadius: 'var(--medi-radius-md)',
                border: language === item.code ? '1px solid rgba(99,102,241,0.5)' : 'var(--medi-border-glass)',
                background: language === item.code ? 'rgba(99,102,241,0.15)' : 'var(--medi-glass-primary)',
                color: language === item.code ? 'var(--medi-primary)' : 'var(--medi-text-secondary)',
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'center',
              }}
            >
              {item.native}
            </button>
          ))}
        </div>
      </div>

      {/* ── Proceed Button ── */}
      <button
        type="button"
        onClick={onStartFlow}
        disabled={!canProceed}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '16px 24px',
          borderRadius: 'var(--medi-radius-full)',
          border: canProceed ? 'none' : 'var(--medi-border-glass)',
          background: canProceed ? 'var(--medi-gradient-primary)' : 'var(--medi-glass-primary)',
          color: canProceed ? '#FFFFFF' : 'var(--medi-text-muted)',
          fontFamily: 'inherit',
          fontSize: '1rem',
          fontWeight: 800,
          cursor: canProceed ? 'pointer' : 'not-allowed',
          boxShadow: canProceed ? '0 4px 24px rgba(99,102,241,0.45)' : 'none',
          transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        onMouseEnter={(e) => {
          if (canProceed) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.6)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = canProceed ? '0 4px 24px rgba(99,102,241,0.45)' : 'none';
        }}
      >
        <Mic size={20} />
        {canProceed ? 'Begin Symptom Intake' : entryMode === 'abha' ? 'Enter ABHA ID to Continue' : 'Enter Name to Continue'}
        {canProceed && <ChevronRight size={20} />}
      </button>

      <p style={{ fontSize: '0.7rem', color: 'var(--medi-text-muted)', textAlign: 'center' }}>
        Smart India Hackathon 2026 • Ayushman Bharat Digital Mission
      </p>

      <AbhaQrScannerModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        onSelectPatient={(p) => {
          onUpdatePatient(p);
          logger.info('QR_SCAN', 'Patient verified via ABHA QR', { abhaId: p.abhaId });
        }}
      />
    </div>
  );
};
