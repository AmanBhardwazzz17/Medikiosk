import { Home, Mic, Stethoscope, ScanLine } from 'lucide-react';

export interface MobileNavProps {
  currentView: 'home' | 'kiosk' | 'doctor';
  kioskStep?: 'splash' | 'intake' | 'ocr';
  onSelectView: (view: 'home' | 'kiosk' | 'doctor') => void;
  onQuickVoice?: () => void;
  isVoiceActive?: boolean;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentView,
  onSelectView,
  onQuickVoice,
  isVoiceActive = false,
}) => {
  const navItemStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '6px 8px',
    borderRadius: 'var(--medi-radius-md)',
    color: isActive ? 'var(--medi-primary)' : 'var(--medi-text-secondary)',
    transition: 'color 0.2s ease, transform 0.15s ease',
    flex: 1,
    minWidth: 0,
  });

  const labelStyle = (isActive: boolean): React.CSSProperties => ({
    fontSize: '0.62rem',
    fontWeight: isActive ? 800 : 600,
    letterSpacing: '0.02em',
    color: isActive ? 'var(--medi-primary)' : 'var(--medi-text-secondary)',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
  });

  return (
    <nav
      className="medi-bottom-nav"
      style={{
        backgroundColor: 'var(--medi-navbar-bg)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRadius: '999px',
        padding: '6px 10px',
        boxShadow: 'var(--medi-navbar-shadow)',
        border: 'var(--medi-navbar-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2px',
        transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Home */}
      <button type="button" onClick={() => onSelectView('home')} style={navItemStyle(currentView === 'home')} aria-label="Home">
        <Home size={19} />
        <span style={labelStyle(currentView === 'home')}>Home</span>
      </button>

      {/* Intake */}
      <button type="button" onClick={() => onSelectView('kiosk')} style={navItemStyle(currentView === 'kiosk')} aria-label="Patient Kiosk">
        <ScanLine size={19} />
        <span style={labelStyle(currentView === 'kiosk')}>Intake</span>
      </button>

      {/* Center Voice Orb */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', flex: '0 0 auto', padding: '0 4px' }}>
        <button
          type="button"
          onClick={onQuickVoice}
          aria-label="Quick voice intake"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            background: isVoiceActive
              ? 'linear-gradient(135deg, #EF4444 0%, #F97316 100%)'
              : 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isVoiceActive
              ? '0 0 20px rgba(239,68,68,0.6), 0 4px 14px rgba(0,0,0,0.3)'
              : '0 0 20px rgba(99,102,241,0.5), 0 4px 14px rgba(0,0,0,0.3)',
            transition: 'all 0.25s ease',
            transform: isVoiceActive ? 'scale(1.08)' : 'scale(1)',
          }}
        >
          <Mic size={20} />
        </button>
        <span style={{ fontSize: '0.58rem', fontWeight: 700, color: 'var(--medi-text-muted)', fontFamily: 'inherit' }}>Voice</span>
      </div>

      {/* Doctor */}
      <button type="button" onClick={() => onSelectView('doctor')} style={navItemStyle(currentView === 'doctor')} aria-label="Doctor Panel">
        <Stethoscope size={19} />
        <span style={labelStyle(currentView === 'doctor')}>Doctor</span>
      </button>
    </nav>
  );
};
