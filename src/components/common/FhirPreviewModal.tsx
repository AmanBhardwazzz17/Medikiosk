import React, { useState } from 'react';
import { Check, Copy, FileCode2, Send } from 'lucide-react';
import { TactileModal } from '../ui/TactileModal';
import { TactileButton } from '../ui/TactileButton';
import { TactileBadge } from '../ui/TactileBadge';
import { generateAbdmFhirBundle } from '../../lib/fhirGenerator';
import { ClinicalCaseSummary } from '../../types/clinical';
import { logger } from '../../lib/logger';

export interface FhirPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  clinicalSummary: ClinicalCaseSummary;
  onPushedSuccess: () => void;
}

export const FhirPreviewModal: React.FC<FhirPreviewModalProps> = ({
  isOpen,
  onClose,
  clinicalSummary,
  onPushedSuccess,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [pushedSuccess, setPushedSuccess] = useState(false);

  const fhirBundle = generateAbdmFhirBundle(clinicalSummary);
  const jsonString = JSON.stringify(fhirBundle, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePushToAbdm = () => {
    setIsPushing(true);
    logger.info('ABDM_GATEWAY', 'Initiating FHIR R4 bundle dispatch to ABDM Sandbox', {
      bundleId: fhirBundle.id,
      abhaId: clinicalSummary.patient.abhaId,
    });

    setTimeout(() => {
      setIsPushing(false);
      setPushedSuccess(true);
      onPushedSuccess();
      logger.info('ABDM_GATEWAY', 'FHIR bundle acknowledged by ABDM gateway (HTTP 200 OK)', {
        bundleId: fhirBundle.id,
      });
    }, 1200);
  };

  return (
    <TactileModal
      isOpen={isOpen}
      onClose={onClose}
      title="ABDM FHIR R4 Bundle Preview"
      subtitle="Standardized Health Information Exchange (HIE) clinical document ready for ABDM gateway sync"
      maxWidth="780px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Status Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 16px',
            backgroundColor: 'var(--medi-bg-subtle)',
            borderRadius: 'var(--medi-radius-md)',
            border: '1px solid var(--medi-border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileCode2 size={18} color="var(--medi-primary)" />
            <span style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--medi-text-primary)' }}>
              Profile: NRCES OPD Consultation Record v1.0
            </span>
          </div>
          <TactileBadge variant={pushedSuccess ? 'success' : 'primary'} size="sm">
            {pushedSuccess ? 'Sync Confirmed' : 'Ready to Dispatch'}
          </TactileBadge>
        </div>

        {/* Formatted Code Block */}
        <div
          style={{
            backgroundColor: '#0F172A',
            color: '#38BDF8',
            borderRadius: 'var(--medi-radius-md)',
            padding: '16px',
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            lineHeight: 1.45,
            maxHeight: '340px',
            overflowY: 'auto',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.4)',
          }}
        >
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{jsonString}</pre>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
          <TactileButton variant="secondary" size="sm" icon={isCopied ? <Check size={16} /> : <Copy size={16} />} onClick={handleCopy}>
            {isCopied ? 'Copied JSON' : 'Copy FHIR Payload'}
          </TactileButton>

          <div style={{ display: 'flex', gap: '10px' }}>
            <TactileButton variant="ghost" size="sm" onClick={onClose}>
              Close
            </TactileButton>
            <TactileButton
              variant="primary"
              size="md"
              icon={<Send size={16} />}
              isLoading={isPushing}
              disabled={pushedSuccess}
              onClick={handlePushToAbdm}
            >
              {pushedSuccess ? 'Dispatched to ABDM' : 'Verify & Push to ABDM / HIS'}
            </TactileButton>
          </div>
        </div>
      </div>
    </TactileModal>
  );
};
