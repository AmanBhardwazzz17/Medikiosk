import React from 'react';

export interface TactileOrbProps {
  size?: number;
  gradient?: string;
  glow?: boolean;
  pulsing?: boolean;
  icon?: React.ReactNode;
  label?: string;
  onClick?: () => void;
  active?: boolean;
}

export const TactileOrb: React.FC<TactileOrbProps> = ({
  size = 72,
  gradient = 'var(--medi-gradient-primary)',
  glow = true,
  pulsing = false,
  icon,
  label,
  onClick,
  active = false,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <button
        onClick={onClick}
        type="button"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          border: 'none',
          cursor: onClick ? 'pointer' : 'default',
          boxShadow: glow
            ? active
              ? '0 0 28px rgba(239, 68, 68, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.4)'
              : '0 12px 28px -4px rgba(99, 102, 241, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.4)'
            : 'var(--medi-shadow-card)',
          transition: 'var(--medi-spring)',
          transform: active ? 'scale(1.06)' : 'scale(1)',
          animation: pulsing ? 'pulseGlow 1.8s infinite' : undefined,
          position: 'relative',
          userSelect: 'none',
        }}
        onMouseDown={(e) => {
          if (onClick) e.currentTarget.style.transform = 'scale(0.94)';
        }}
        onMouseUp={(e) => {
          if (onClick) e.currentTarget.style.transform = active ? 'scale(1.06)' : 'scale(1)';
        }}
      >
        {icon}
      </button>
      {label && (
        <span
          style={{
            fontSize: '0.82rem',
            fontWeight: 600,
            color: 'var(--medi-text-secondary)',
            textAlign: 'center',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};
