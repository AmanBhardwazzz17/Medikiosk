import React from 'react';

export interface TactileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'alert' | 'ayush' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export const TactileButton: React.FC<TactileButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  isLoading,
  disabled,
  className = '',
  style,
  ...props
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          background: 'var(--medi-gradient-primary)',
          color: '#FFFFFF',
          boxShadow: '0 8px 20px -2px rgba(99, 102, 241, 0.35), var(--medi-inner-highlight)',
          border: 'none',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--medi-surface-card)',
          color: 'var(--medi-text-primary)',
          boxShadow: 'var(--medi-shadow-sm), var(--medi-inner-highlight)',
          border: '1px solid var(--medi-border-subtle)',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--medi-primary)',
          border: '1.5px solid var(--medi-primary)',
          boxShadow: 'none',
        };
      case 'alert':
        return {
          background: 'var(--medi-gradient-alert)',
          color: '#FFFFFF',
          boxShadow: '0 8px 20px -2px rgba(239, 68, 68, 0.4), var(--medi-inner-highlight)',
          border: 'none',
        };
      case 'ayush':
        return {
          background: 'var(--medi-gradient-ayush)',
          color: '#FFFFFF',
          boxShadow: '0 8px 20px -2px rgba(16, 185, 129, 0.35), var(--medi-inner-highlight)',
          border: 'none',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--medi-text-secondary)',
          border: 'none',
          boxShadow: 'none',
        };
    }
  };

  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case 'sm':
        return {
          padding: '8px 14px',
          fontSize: '0.85rem',
          borderRadius: 'var(--medi-radius-sm)',
          minHeight: '36px',
        };
      case 'md':
        return {
          padding: '12px 22px',
          fontSize: '0.95rem',
          borderRadius: 'var(--medi-radius-md)',
          minHeight: '46px',
        };
      case 'lg':
        return {
          padding: '14px 28px',
          fontSize: '1.05rem',
          borderRadius: 'var(--medi-radius-lg)',
          minHeight: '52px',
        };
    }
  };

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: 600,
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.55 : 1,
    transition: 'var(--medi-spring)',
    userSelect: 'none',
    touchAction: 'manipulation',
    outline: 'none',
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...style,
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`tactile-btn ${className}`}
      style={baseStyles}
      onMouseDown={(e) => {
        if (!disabled && !isLoading) {
          e.currentTarget.style.transform = 'translateY(1.5px) scale(0.985)';
        }
      }}
      onMouseUp={(e) => {
        if (!disabled && !isLoading) {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !isLoading) {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
        }
      }}
      onTouchStart={(e) => {
        if (!disabled && !isLoading) {
          e.currentTarget.style.transform = 'translateY(1.5px) scale(0.985)';
        }
      }}
      onTouchEnd={(e) => {
        if (!disabled && !isLoading) {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
        }
      }}
      {...props}
    >
      {isLoading ? (
        <span
          style={{
            width: '18px',
            height: '18px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spinSlow 0.8s linear infinite',
          }}
        />
      ) : (
        icon
      )}
      {children}
    </button>
  );
};
