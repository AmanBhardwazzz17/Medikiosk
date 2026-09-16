import React from 'react';
import { Activity, Home, Stethoscope, Sun, Moon, Sparkles, ScanLine } from 'lucide-react';

export interface NavbarProps {
  currentView: 'home' | 'kiosk' | 'doctor';
  onSelectView: (view: 'home' | 'kiosk' | 'doctor') => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onSelectView, theme, onToggleTheme }) => {
  const navBtnStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: 'var(--medi-radius-full)',
    border: isActive ? '1px solid rgba(99,102,241,0.4)' : '1px solid transparent',
    backgroundColor: isActive ? 'rgba(99,102,241,0.15)' : 'transparent',
    color: isActive ? (theme === 'light' ? '#4F46E5' : 'var(--medi-primary-light)') : 'var(--medi-text-secondary)',
    fontFamily: 'inherit',
    fontWeight: 700,
    fontSize: '0.85rem',
    cursor: 'pointer',
    transition: 'all 0.22s ease',
    whiteSpace: 'nowrap',
  });

  return (
    <header className="medi-navbar">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--medi-navbar-bg)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: 'var(--medi-radius-full)',
          padding: '8px 12px 8px 16px',
          boxShadow: 'var(--medi-navbar-shadow)',
          border: 'var(--medi-navbar-border)',
          gap: '12px',
          transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Brand */}
        <div
          onClick={() => onSelectView('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flexShrink: 0 }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              minWidth: '36px',
              borderRadius: 'var(--medi-radius-md)',
              background: 'var(--medi-gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
            }}
          >
            <Activity size={18} />
          </div>
          <div>
            <span
              style={{
                fontSize: '1.1rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                background: 'var(--medi-gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MediKiosk
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav-links" style={{ alignItems: 'center', gap: '4px', flex: 1, justifyContent: 'center' }}>
          <button type="button" onClick={() => onSelectView('home')} style={navBtnStyle(currentView === 'home')}>
            <Home size={15} /> Overview
          </button>
          <button type="button" onClick={() => onSelectView('kiosk')} style={navBtnStyle(currentView === 'kiosk')}>
            <ScanLine size={15} /> Patient Kiosk
          </button>
          <button type="button" onClick={() => onSelectView('doctor')} style={navBtnStyle(currentView === 'doctor')}>
            <Stethoscope size={15} /> Doctor OPD
          </button>
        </nav>

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
              width: '36px',
              height: '36px',
              minWidth: '36px',
              borderRadius: 'var(--medi-radius-full)',
              background: 'var(--medi-glass-primary)',
              border: 'var(--medi-border-glass)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {theme === 'dark'
              ? <Sun size={17} color="#FBBF24" />
              : <Moon size={17} color="#6366F1" />
            }
          </button>

          {/* CTA button — desktop only */}
          <button
            type="button"
            className="desktop-nav-cta"
            onClick={() => onSelectView(currentView === 'doctor' ? 'kiosk' : 'doctor')}
            style={{
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: 'var(--medi-radius-full)',
              border: 'none',
              background: 'var(--medi-gradient-primary)',
              color: '#FFFFFF',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: '0.84rem',
              boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.22s ease',
            }}
          >
            <Sparkles size={14} />
            {currentView === 'doctor' ? 'Patient Kiosk' : 'Doctor Panel'}
          </button>
        </div>
      </div>
    </header>
  );
};
