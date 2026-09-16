import React from 'react';
import { FileText, CheckCircle2, Pill, AlertTriangle } from 'lucide-react';
import { TactileCard } from '../ui/TactileCard';
import { TactileBadge } from '../ui/TactileBadge';
import { OcrExtractedRecord } from '../../types/clinical';

export interface OCRHistoryCardProps {
  records: OcrExtractedRecord[];
}

export const OCRHistoryCard: React.FC<OCRHistoryCardProps> = ({ records }) => {
  return (
    <TactileCard elevation="card" radius="xl">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={20} color="var(--medi-primary)" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--medi-text-primary)' }}>
            Digitized OCR Medical History
          </h3>
        </div>
        <TactileBadge variant="primary" size="sm">
          {records.length} Scanned Documents
        </TactileBadge>
      </div>

      {records.length === 0 ? (
        <div
          style={{
            padding: '24px',
            textAlign: 'center',
            backgroundColor: 'var(--medi-bg-subtle)',
            borderRadius: 'var(--medi-radius-md)',
            color: 'var(--medi-text-muted)',
            fontSize: '0.88rem',
          }}
        >
          No historical medical documents uploaded for this case.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {records.map((doc) => (
            <div
              key={doc.id}
              style={{
                backgroundColor: 'var(--medi-bg-subtle)',
                borderRadius: 'var(--medi-radius-md)',
                padding: '16px',
                border: '1px solid var(--medi-border-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--medi-text-primary)' }}>
                  Scanned Record ({doc.scanDate}):
                </span>
                <TactileBadge variant="success" size="sm" icon={<CheckCircle2 size={12} />}>
                  OCR Confidence: {doc.confidenceScore}%
                </TactileBadge>
              </div>

              <p style={{ fontSize: '0.86rem', color: 'var(--medi-text-secondary)', marginBottom: '10px' }}>
                <strong>Prior Diagnosis:</strong> {doc.extractedDiagnosis}
              </p>

              {/* Medication tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                {doc.activeMedications.map((med, i) => (
                  <span
                    key={i}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: 'var(--medi-surface-card)',
                      padding: '4px 10px',
                      borderRadius: 'var(--medi-radius-full)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--medi-text-primary)',
                      border: '1px solid var(--medi-border-subtle)',
                    }}
                  >
                    <Pill size={12} color="var(--medi-primary)" />
                    {med.name} {med.dosage}
                  </span>
                ))}
              </div>

              {doc.criticalAlerts.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.78rem',
                    color: '#B45309',
                    fontWeight: 600,
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    padding: '6px 10px',
                    borderRadius: 'var(--medi-radius-xs)',
                  }}
                >
                  <AlertTriangle size={14} />
                  <span>{doc.criticalAlerts[0]}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </TactileCard>
  );
};
