import React from 'react';
import { CheckCircle2, Users } from 'lucide-react';
import { TactileBadge } from '../ui/TactileBadge';

export interface DoctorHeaderProps {
  queueCount?: number;
  activePatientQueueNo: string;
}

export const DoctorHeader: React.FC<DoctorHeaderProps> = ({
  queueCount = 3,
  activePatientQueueNo,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--medi-text-primary)' }}>
            OPD Doctor Clinical Summary Panel
          </h1>
          <TactileBadge variant="primary" size="sm">
            Current: {activePatientQueueNo}
          </TactileBadge>
        </div>
        <p style={{ fontSize: '0.86rem', color: 'var(--medi-text-secondary)', marginTop: '2px' }}>
          AI-structured triage insights, dual allopathic & AYUSH summaries, and verified ABDM documentation
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <TactileBadge variant="neutral" icon={<Users size={14} />}>
          Queue: {queueCount} Patients Waiting
        </TactileBadge>

        <TactileBadge variant="success" icon={<CheckCircle2 size={14} />}>
          Active Kiosk Sync
        </TactileBadge>
      </div>
    </div>
  );
};
