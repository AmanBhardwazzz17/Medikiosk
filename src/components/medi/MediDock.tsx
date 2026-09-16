import React from 'react';
import { Home, UserCheck, Mic, FileText, Stethoscope } from 'lucide-react';

export type MediTab = 'splash' | 'intake' | 'ocr' | 'doctor';

export interface MediDockProps {
  currentTab: MediTab;
  onSelectTab: (tab: MediTab) => void;
  onQuickAi: () => void;
  isAiListening?: boolean;
}

export const MediDock: React.FC<MediDockProps> = ({
  currentTab,
  onSelectTab,
  onQuickAi,
  isAiListening = false,
}) => {
  return (
    <nav className="medi-sculpted-dock">
      {/* 1. HOME / SPLASH */}
      <button
        type="button"
        onClick={() => onSelectTab('splash')}
        aria-label="Home"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: currentTab === 'splash' ? 'var(--medi-primary)' : 'var(--medi-text-muted)',
          padding: '4px 6px',
          transition: 'var(--medi-ease)',
        }}
      >
        <Home size={18} />
        <span style={{ fontSize: '0.64rem', fontWeight: 800, letterSpacing: '0.5px' }}>HOME</span>
      </button>

      {/* 2. INTAKE */}
      <button
        type="button"
        onClick={() => onSelectTab('intake')}
        aria-label="Clinical Intake"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: currentTab === 'intake' ? 'var(--medi-primary)' : 'var(--medi-text-muted)',
          padding: '4px 6px',
          transition: 'var(--medi-ease)',
        }}
      >
        <UserCheck size={18} />
        <span style={{ fontSize: '0.64rem', fontWeight: 800, letterSpacing: '0.5px' }}>INTAKE</span>
      </button>

      {/* 3. CENTER ELEVATED GLOWING IRIDESCENT AI ORB BUTTON */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button
          type="button"
          onClick={onQuickAi}
          aria-label="MediKiosk AI Voice Intake"
          className="medi-center-orb-btn"
          style={{
            animation: isAiListening ? 'pulseGlow 1.5s infinite' : undefined,
          }}
        >
          <Mic size={22} color="#FFFFFF" />
        </button>
        <span
          style={{
            fontSize: '0.64rem',
            fontWeight: 900,
            letterSpacing: '0.5px',
            color: 'var(--medi-primary)',
            transform: 'translateY(-8px)',
          }}
        >
          AI
        </span>
      </div>

      {/* 4. OCR RECORDS */}
      <button
        type="button"
        onClick={() => onSelectTab('ocr')}
        aria-label="OCR Prescriptions"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: currentTab === 'ocr' ? 'var(--medi-primary)' : 'var(--medi-text-muted)',
          padding: '4px 6px',
          transition: 'var(--medi-ease)',
        }}
      >
        <FileText size={18} />
        <span style={{ fontSize: '0.64rem', fontWeight: 800, letterSpacing: '0.5px' }}>FEEDS</span>
      </button>

      {/* 5. DOCTOR OPD PANEL */}
      <button
        type="button"
        onClick={() => onSelectTab('doctor')}
        aria-label="Doctor Panel"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: currentTab === 'doctor' ? 'var(--medi-primary)' : 'var(--medi-text-muted)',
          padding: '4px 6px',
          transition: 'var(--medi-ease)',
        }}
      >
        <Stethoscope size={18} />
        <span style={{ fontSize: '0.64rem', fontWeight: 800, letterSpacing: '0.5px' }}>DOCTOR</span>
      </button>
    </nav>
  );
};
