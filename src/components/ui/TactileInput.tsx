import React from 'react';

export interface TactileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  actionButton?: React.ReactNode;
}

export const TactileInput: React.FC<TactileInputProps> = ({
  label,
  error,
  icon,
  actionButton,
  id,
  className = '',
  style,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', marginBottom: '16px' }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: '0.88rem',
            fontWeight: 600,
            color: 'var(--medi-text-secondary)',
            letterSpacing: '0.01em',
          }}
        >
          {label}
        </label>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--medi-bg-subtle)',
          borderRadius: 'var(--medi-radius-md)',
          border: error ? '1.5px solid var(--medi-red)' : '1px solid var(--medi-border-subtle)',
          boxShadow: 'var(--medi-shadow-pressed)',
          padding: '2px 14px',
          transition: 'var(--medi-ease)',
        }}
      >
        {icon && <span style={{ color: 'var(--medi-text-muted)', marginRight: '10px', display: 'flex' }}>{icon}</span>}
        <input
          id={inputId}
          className={`tactile-input ${className}`}
          style={{
            width: '100%',
            height: '46px',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: '0.95rem',
            color: 'var(--medi-text-primary)',
            fontFamily: 'inherit',
            ...style,
          }}
          {...props}
        />
        {actionButton && <div style={{ marginLeft: '8px' }}>{actionButton}</div>}
      </div>
      {error && (
        <span
          style={{
            fontSize: '0.8rem',
            color: 'var(--medi-red)',
            fontWeight: 500,
            marginTop: '2px',
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
};
