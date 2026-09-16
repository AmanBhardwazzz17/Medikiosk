import React from 'react';

export interface TactileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 'flat' | 'card' | 'elevated' | 'floating' | 'glass';
  radius?: 'sm' | 'md' | 'lg' | 'xl';
  glowBorder?: boolean;
}

export const TactileCard: React.FC<TactileCardProps> = ({
  children,
  elevation = 'card',
  radius = 'lg',
  glowBorder = false,
  className = '',
  style,
  ...props
}) => {
  const getElevationStyles = (): React.CSSProperties => {
    switch (elevation) {
      case 'flat':
        return {
          backgroundColor: 'var(--medi-surface-sunken)',
          boxShadow: 'none',
          border: '1px solid var(--medi-border-subtle)',
        };
      case 'card':
        return {
          backgroundColor: 'var(--medi-surface-card)',
          boxShadow: 'var(--medi-shadow-card)',
          border: '1px solid var(--medi-border-subtle)',
        };
      case 'elevated':
        return {
          backgroundColor: 'var(--medi-surface-elevated)',
          boxShadow: 'var(--medi-shadow-elevated)',
          border: '1px solid var(--medi-border-subtle)',
        };
      case 'floating':
        return {
          backgroundColor: 'var(--medi-surface-card)',
          boxShadow: 'var(--medi-shadow-floating)',
          border: '1px solid var(--medi-border-subtle)',
        };
      case 'glass':
        return {
          background: 'var(--medi-gradient-glass)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: 'var(--medi-shadow-elevated)',
          border: '1px solid var(--medi-surface-glass-border)',
        };
    }
  };

  const getRadius = (): string => {
    switch (radius) {
      case 'sm':
        return 'var(--medi-radius-sm)';
      case 'md':
        return 'var(--medi-radius-md)';
      case 'lg':
        return 'var(--medi-radius-lg)';
      case 'xl':
        return 'var(--medi-radius-xl)';
    }
  };

  const baseStyles: React.CSSProperties = {
    borderRadius: getRadius(),
    padding: '24px',
    boxShadow: glowBorder ? '0 0 0 1.5px var(--medi-primary), var(--medi-shadow-elevated)' : undefined,
    position: 'relative',
    transition: 'var(--medi-ease)',
    ...getElevationStyles(),
    ...style,
  };

  return (
    <div className={`tactile-card ${className}`} style={baseStyles} {...props}>
      {children}
    </div>
  );
};
