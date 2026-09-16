import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface TactileModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const TactileModal: React.FC<TactileModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '640px',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(10, 14, 26, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        className="tactile-modal-box"
        style={{
          width: '100%',
          maxWidth,
          backgroundColor: 'var(--medi-surface-card)',
          borderRadius: 'var(--medi-radius-xl)',
          boxShadow: 'var(--medi-shadow-floating)',
          border: '1px solid var(--medi-border-subtle)',
          padding: '28px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          animation: 'floatGentle 0.3s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle Indicator */}
        <div
          className="mobile-drag-handle"
          style={{
            width: '36px',
            height: '4px',
            backgroundColor: 'var(--medi-border-subtle)',
            borderRadius: 'var(--medi-radius-full)',
            margin: '-8px auto 16px',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--medi-text-primary)' }}>{title}</h3>
            {subtitle && (
              <p style={{ fontSize: '0.85rem', color: 'var(--medi-text-secondary)', marginTop: '4px' }}>{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'var(--medi-bg-subtle)',
              border: 'none',
              borderRadius: 'var(--medi-radius-full)',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--medi-text-secondary)',
              transition: 'var(--medi-ease)',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};
