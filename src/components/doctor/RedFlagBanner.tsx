import React from 'react';
import { AlertOctagon, Flame } from 'lucide-react';
import { TactileBadge } from '../ui/TactileBadge';

export interface RedFlagBannerProps {
  isRedFlag: boolean;
  reason?: string;
  triagePriority?: string;
}

export const RedFlagBanner: React.FC<RedFlagBannerProps> = ({
  isRedFlag,
  reason,
  triagePriority = 'P1 - Immediate',
}) => {
  if (!isRedFlag) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        border: '1.5px solid var(--medi-red)',
        borderRadius: 'var(--medi-radius-lg)',
        padding: '16px 20px',
        marginBottom: '24px',
        boxShadow: '0 8px 24px -4px rgba(239, 68, 68, 0.25)',
        animation: 'pulseGlow 2.5s infinite',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'var(--medi-red)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
          }}
        >
          <AlertOctagon size={22} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 800, fontSize: '0.96rem', color: 'var(--medi-red)' }}>
              RED FLAG CLINICAL TRIAGE ALERT
            </span>
            <TactileBadge variant="alert" size="sm" pulsing>
              {triagePriority}
            </TactileBadge>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--medi-text-primary)', marginTop: '2px', fontWeight: 500 }}>
            {reason || 'High Blood Pressure (160/100 mmHg) & Severe Chest Pain detected. Priority OPD Consultation Recommended!'}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <TactileBadge variant="alert" icon={<Flame size={14} />}>
          Fast-Track Consultation
        </TactileBadge>
      </div>
    </div>
  );
};
