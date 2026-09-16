import React from 'react';

export interface TactileBadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'alert' | 'neutral' | 'ayush';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  pulsing?: boolean;
}

export const TactileBadge: React.FC<TactileBadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  pulsing = false,
}) => {
  const getBadgeStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'rgba(99, 102, 241, 0.12)',
          color: 'var(--medi-primary)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
        };
      case 'success':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          color: '#059669',
          border: '1px solid rgba(16, 185, 129, 0.25)',
        };
      case 'warning':
        return {
          backgroundColor: 'rgba(245, 158, 11, 0.12)',
          color: '#D97706',
          border: '1px solid rgba(245, 158, 11, 0.25)',
        };
      case 'alert':
        return {
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          color: 'var(--medi-red)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        };
      case 'ayush':
        return {
          backgroundColor: 'rgba(5, 150, 105, 0.12)',
          color: '#059669',
          border: '1px solid rgba(5, 150, 105, 0.25)',
        };
      case 'neutral':
        return {
          backgroundColor: 'var(--medi-bg-subtle)',
          color: 'var(--medi-text-secondary)',
          border: '1px solid var(--medi-border-subtle)',
        };
    }
  };

  const isSmall = size === 'sm';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: isSmall ? '3px 8px' : '5px 12px',
        fontSize: isSmall ? '0.74rem' : '0.82rem',
        fontWeight: 600,
        borderRadius: 'var(--medi-radius-full)',
        boxShadow: pulsing ? '0 0 10px rgba(239, 68, 68, 0.3)' : 'var(--medi-shadow-sm)',
        animation: pulsing ? 'pulseGlow 2s infinite' : undefined,
        ...getBadgeStyles(),
      }}
    >
      {icon}
      {children}
    </span>
  );
};
