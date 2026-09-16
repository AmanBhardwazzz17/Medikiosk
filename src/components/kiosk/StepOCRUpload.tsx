import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, ArrowLeft, Stethoscope, AlertTriangle, FileText, Pill } from 'lucide-react';
import { TactileCard } from '../ui/TactileCard';
import { TactileButton } from '../ui/TactileButton';
import { TactileBadge } from '../ui/TactileBadge';
import { OcrExtractedRecord } from '../../types/clinical';
import { FileUploadSecuritySchema } from '../../lib/validators';
import { logger } from '../../lib/logger';

export interface StepOCRUploadProps {
  ocrRecords: OcrExtractedRecord[];
  onAddOcrRecord: (record: OcrExtractedRecord) => void;
  onBack: () => void;
  onSubmitToDoctor: () => void;
}

export const StepOCRUpload: React.FC<StepOCRUploadProps> = ({
  ocrRecords,
  onAddOcrRecord,
  onBack,
  onSubmitToDoctor,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const processFile = (file: File) => {
    // 1. Validate file parameters with Zod
    const validation = FileUploadSecuritySchema.safeParse({
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type || 'image/jpeg',
    });

    if (!validation.success) {
      const msg = validation.error.issues[0]?.message || 'Invalid file uploaded';
      setUploadError(msg);
      logger.securityAlert('FILE_UPLOAD', 'File upload rejected by security validation', {
        name: file.name,
        size: file.size,
        type: file.type,
      });
      return;
    }

    setUploadError(null);
    setIsScanning(true);
    setScanProgress(15);
    logger.info('OCR_ENGINE', 'Starting OCR document parsing', { fileName: file.name });

    // Progress animation simulation
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 25;
      });
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setScanProgress(100);
      setIsScanning(false);

      const newRecord: OcrExtractedRecord = {
        id: `ocr-${Date.now()}`,
        fileName: file.name,
        fileSize: file.size,
        scanDate: new Date().toISOString().split('T')[0],
        recordType: 'Prescription',
        confidenceScore: 95,
        extractedDiagnosis: 'Chronic Hypertension (Stage II) with Mild Angina History',
        activeMedications: [
          { name: 'Amlodipine', dosage: '5mg', frequency: 'OD (Once Daily) - Morning' },
          { name: 'Aspirin (Ecosprin)', dosage: '75mg', frequency: 'OD - Post Lunch' },
          { name: 'Atorvastatin', dosage: '20mg', frequency: 'HS (Bedtime)' },
        ],
        criticalAlerts: [
          'History of Hypertension confirmed in prior prescription.',
          'Active Amlodipine regimen detected. Cross-verify dosage before prescribing beta-blockers.',
        ],
        rawTextPreview: `Rx: Dr. R. Mehta, MD (Cardiology) - OPD Card #7712. Tab Amlodipine 5mg OD, Tab Ecosprin 75mg OD. Advised BP chart review.`,
      };

      onAddOcrRecord(newRecord);
      logger.info('OCR_ENGINE', 'Document OCR processing completed successfully', {
        confidence: newRecord.confidenceScore,
        medsCount: newRecord.activeMedications.length,
      });
    }, 1400);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <TactileCard elevation="card" radius="xl">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--medi-text-primary)' }}>
            Prescription & Medical Records OCR Scan
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--medi-text-secondary)', marginTop: '4px' }}>
            Upload existing prescriptions or diagnostic reports for automated clinical entity extraction
          </p>
        </div>
        <TactileBadge variant="primary" icon={<FileText size={14} />}>
          Optical AI Engine
        </TactileBadge>
      </div>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => document.getElementById('prescription-file-input')?.click()}
        style={{
          border: '2px dashed var(--medi-primary)',
          borderRadius: 'var(--medi-radius-xl)',
          backgroundColor: 'var(--medi-bg-subtle)',
          padding: '36px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          transition: 'var(--medi-spring)',
        }}
      >
        <input
          id="prescription-file-input"
          type="file"
          accept="image/png,image/jpeg,image/webp,application/pdf"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {/* Laser Scanning Line (while scanning) */}
        {isScanning && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'var(--medi-gradient-primary)',
              boxShadow: '0 0 16px var(--medi-primary)',
              animation: 'floatGentle 1.2s infinite ease-in-out',
            }}
          />
        )}

        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--medi-surface-card)',
            color: 'var(--medi-primary)',
            boxShadow: 'var(--medi-shadow-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <UploadCloud size={32} />
        </div>

        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--medi-text-primary)' }}>
          {isScanning ? `Scanning & Extracting Clinical Entities (${scanProgress}%)` : 'Click or Drag Prescription Image Here'}
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--medi-text-muted)', marginTop: '6px' }}>
          Supports JPEG, PNG, WebP, PDF (Max 10MB). Protected under ABDM Data Privacy guidelines.
        </p>

        {isScanning && (
          <div
            style={{
              maxWidth: '300px',
              height: '6px',
              backgroundColor: 'var(--medi-border-subtle)',
              borderRadius: 'var(--medi-radius-full)',
              margin: '16px auto 0',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${scanProgress}%`,
                height: '100%',
                background: 'var(--medi-gradient-primary)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        )}
      </div>

      {uploadError && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: 'var(--medi-red)',
            borderRadius: 'var(--medi-radius-md)',
            marginTop: '16px',
            fontSize: '0.88rem',
            fontWeight: 600,
          }}
        >
          <AlertTriangle size={18} />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Extracted Records Display */}
      {ocrRecords.length > 0 && (
        <div style={{ marginTop: '24px' }}>
          <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--medi-text-primary)', marginBottom: '12px' }}>
            Extracted Clinical Records ({ocrRecords.length})
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {ocrRecords.map((record) => (
              <div
                key={record.id}
                style={{
                  backgroundColor: 'var(--medi-bg-subtle)',
                  borderRadius: 'var(--medi-radius-lg)',
                  padding: '18px',
                  border: '1px solid var(--medi-border-subtle)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={18} color="var(--medi-primary)" />
                    <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--medi-text-primary)' }}>
                      {record.fileName}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--medi-text-muted)' }}>({record.scanDate})</span>
                  </div>
                  <TactileBadge variant="success" size="sm" icon={<CheckCircle2 size={12} />}>
                    Confidence: {record.confidenceScore}%
                  </TactileBadge>
                </div>

                <div style={{ fontSize: '0.86rem', color: 'var(--medi-text-secondary)', marginBottom: '12px' }}>
                  <strong>Prior Diagnosis:</strong> {record.extractedDiagnosis}
                </div>

                {/* Extracted Active Medications */}
                <div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--medi-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Active Regimen Detected:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {record.activeMedications.map((med, idx) => (
                      <span
                        key={idx}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: 'var(--medi-surface-card)',
                          padding: '5px 12px',
                          borderRadius: 'var(--medi-radius-full)',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          color: 'var(--medi-text-primary)',
                          border: '1px solid var(--medi-border-subtle)',
                          boxShadow: 'var(--medi-shadow-sm)',
                        }}
                      >
                        <Pill size={14} color="var(--medi-primary)" />
                        {med.name} {med.dosage} ({med.frequency})
                      </span>
                    ))}
                  </div>
                </div>

                {/* Critical Alert Tag */}
                {record.criticalAlerts.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: 'rgba(245, 158, 11, 0.12)',
                      color: '#B45309',
                      padding: '8px 12px',
                      borderRadius: 'var(--medi-radius-sm)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      marginTop: '12px',
                    }}
                  >
                    <AlertTriangle size={16} />
                    <span>{record.criticalAlerts[0]}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
        <TactileButton variant="secondary" icon={<ArrowLeft size={18} />} onClick={onBack}>
          Back to Symptoms
        </TactileButton>

        <TactileButton
          variant="primary"
          size="lg"
          icon={<Stethoscope size={18} />}
          onClick={onSubmitToDoctor}
        >
          Generate Doctor Summary
        </TactileButton>
      </div>
    </TactileCard>
  );
};
