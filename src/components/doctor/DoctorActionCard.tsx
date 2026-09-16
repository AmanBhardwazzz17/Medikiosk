import React, { useState } from 'react';
import { Send, Printer, CheckCircle2 } from 'lucide-react';
import { TactileCard } from '../ui/TactileCard';
import { TactileButton } from '../ui/TactileButton';
import { FhirPreviewModal } from '../common/FhirPreviewModal';
import { ClinicalCaseSummary } from '../../types/clinical';
import { logger } from '../../lib/logger';

export interface DoctorActionCardProps {
  clinicalSummary: ClinicalCaseSummary;
  onUpdateNotes: (notes: string) => void;
  onUpdateDiagnosis: (diag: string) => void;
  onMarkPushed: () => void;
}

export const DoctorActionCard: React.FC<DoctorActionCardProps> = ({
  clinicalSummary,
  onUpdateNotes,
  onUpdateDiagnosis,
  onMarkPushed,
}) => {
  const [isFhirModalOpen, setIsFhirModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handlePrint = () => {
    logger.info('OPD_ACTION', 'Triggering browser print for OPD prescription slip', {
      queueNo: clinicalSummary.patient.queueNo,
    });
    window.print();
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateNotes(e.target.value);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1500);
  };

  return (
    <TactileCard elevation="card" radius="xl">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--medi-text-primary)' }}>
          Physician Assessment & ABDM Dispatch
        </h3>
        {isSaved && (
          <span style={{ fontSize: '0.78rem', color: 'var(--medi-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={14} /> Auto-saved
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Final Diagnosis Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--medi-text-secondary)' }}>
            Working Clinical Diagnosis / Assessment
          </label>
          <input
            type="text"
            value={clinicalSummary.finalDiagnosis}
            onChange={(e) => onUpdateDiagnosis(e.target.value)}
            placeholder="e.g. Acute Coronary Syndrome (Suspected NSTEMI) / Hypertensive Urgency"
            style={{
              height: '46px',
              borderRadius: 'var(--medi-radius-md)',
              backgroundColor: 'var(--medi-bg-subtle)',
              border: '1px solid var(--medi-border-subtle)',
              padding: '0 14px',
              fontSize: '0.92rem',
              color: 'var(--medi-text-primary)',
              outline: 'none',
              fontWeight: 600,
            }}
          />
        </div>

        {/* Doctor Clinical Notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--medi-text-secondary)' }}>
            Physician Orders, Prescribed Medications & Review Advice
          </label>
          <textarea
            rows={4}
            value={clinicalSummary.doctorNotes}
            onChange={handleNotesChange}
            placeholder="Enter clinical assessment, immediate medication orders, ECG/troponin stats, or review instructions..."
            style={{
              borderRadius: 'var(--medi-radius-md)',
              backgroundColor: 'var(--medi-bg-subtle)',
              border: '1px solid var(--medi-border-subtle)',
              padding: '12px 14px',
              color: 'var(--medi-text-primary)',
              fontSize: '0.92rem',
              fontFamily: 'inherit',
              outline: 'none',
              resize: 'vertical',
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '10px' }}>
          <TactileButton
            variant="primary"
            size="md"
            icon={<Send size={16} />}
            onClick={() => setIsFhirModalOpen(true)}
          >
            {clinicalSummary.status === 'Pushed to ABDM' ? 'View ABDM FHIR JSON' : 'Verify & Push to ABDM / HIS'}
          </TactileButton>

          <TactileButton
            variant="secondary"
            size="md"
            icon={<Printer size={16} />}
            onClick={handlePrint}
          >
            Print OPD Slip
          </TactileButton>
        </div>
      </div>

      {/* ABDM FHIR Modal */}
      <FhirPreviewModal
        isOpen={isFhirModalOpen}
        onClose={() => setIsFhirModalOpen(false)}
        clinicalSummary={clinicalSummary}
        onPushedSuccess={() => {
          onMarkPushed();
        }}
      />
    </TactileCard>
  );
};
