import React, { useState } from 'react';
import { ArrowLeft, UploadCloud, Pill, ScanLine, CheckCircle2, ChevronRight, Stethoscope, AlertTriangle } from 'lucide-react';
import { OcrExtractedRecord } from '../../types/clinical';
import { FileUploadSecuritySchema } from '../../lib/validators';
import { logger } from '../../lib/logger';

export interface MediOcrViewProps {
  ocrRecords: OcrExtractedRecord[];
  onAddOcrRecord: (record: OcrExtractedRecord) => void;
  onBack: () => void;
  onProceedToDoctor: () => void;
}

export const MediOcrView: React.FC<MediOcrViewProps> = ({
  ocrRecords,
  onAddOcrRecord,
  onBack,
  onProceedToDoctor,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const processFile = (file: File) => {
    const validation = FileUploadSecuritySchema.safeParse({
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type || 'image/jpeg',
    });

    if (!validation.success) {
      const msg = validation.error.issues[0]?.message || 'Invalid file uploaded';
      setUploadError(msg);
      return;
    }

    setUploadError(null);
    setIsScanning(true);
    setScanProgress(10);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 90) { clearInterval(interval); return 90; }
        return prev + 20;
      });
    }, 250);

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
        confidenceScore: 96,
        extractedDiagnosis: 'Essential Hypertension Stage II • Previous Angina Episode',
        activeMedications: [
          { name: 'Amlodipine', dosage: '5mg', frequency: 'OD - Morning' },
          { name: 'Aspirin (Ecosprin)', dosage: '75mg', frequency: 'OD - Post Lunch' },
          { name: 'Atorvastatin', dosage: '20mg', frequency: 'HS - Bedtime' },
        ],
        criticalAlerts: ['Confirmed hypertension history; active calcium channel blocker.'],
        rawTextPreview: 'Rx: Tab Amlodipine 5mg OD, Tab Ecosprin 75mg OD. Advised ECG.',
      };

      onAddOcrRecord(newRecord);
      logger.info('OCR_ENGINE', 'Prescription digitized via MediKiosk OCR', { id: newRecord.id });
    }, 1400);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const glassCard: React.CSSProperties = {
    background: 'var(--medi-glass-card)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: 'var(--medi-border-glass)',
    borderRadius: 'var(--medi-radius-lg)',
    boxShadow: 'var(--medi-shadow-card)',
    padding: '20px',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px 0 130px',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        animation: 'fadeInUp 0.5s ease both',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--medi-glass-primary)',
            backdropFilter: 'blur(12px)',
            border: 'var(--medi-border-glass)',
            borderRadius: 'var(--medi-radius-full)',
            padding: '8px 14px',
            color: 'var(--medi-text-secondary)',
            fontFamily: 'inherit',
            fontSize: '0.84rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={16} /> Back
        </button>
        <div style={{ textAlign: 'center' }}>
          <div className="editorial-eyebrow" style={{ fontSize: '0.66rem', color: 'var(--medi-primary)' }}>
            STEP 03 // PRESCRIPTION DIGITIZATION
          </div>
        </div>
        <div style={{ width: '80px' }} />
      </div>

      {/* Step Dots */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            height: '6px',
            borderRadius: '3px',
            background: i < 2 ? 'rgba(255,255,255,0.2)' : 'var(--medi-gradient-primary)',
            width: i === 2 ? '24px' : '8px',
          }} />
        ))}
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        style={{
          ...glassCard,
          border: isDragOver
            ? '2px dashed rgba(99,102,241,0.6)'
            : isScanning
            ? '2px solid rgba(99,102,241,0.4)'
            : '2px dashed rgba(255,255,255,0.15)',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          background: isDragOver ? 'rgba(99,102,241,0.08)' : 'var(--medi-glass-card)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Scan animation beam */}
        {isScanning && (
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '2px',
            background: 'var(--medi-gradient-primary)',
            boxShadow: '0 0 12px rgba(99,102,241,0.8)',
            top: `${scanProgress}%`,
            transition: 'top 0.25s ease',
          }} />
        )}

        <label style={{ cursor: 'pointer', display: 'block' }}>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) processFile(file);
            }}
          />
          <div style={{ marginBottom: '12px' }}>
            {isScanning ? (
              <ScanLine size={36} color="var(--medi-primary-light)" style={{ animation: 'pulseGlow 1s infinite' }} />
            ) : (
              <UploadCloud size={36} color="var(--medi-text-muted)" />
            )}
          </div>
          <div style={{ fontWeight: 700, color: 'var(--medi-text-primary)', marginBottom: '6px' }}>
            {isScanning ? 'Scanning Prescription...' : 'Upload Prescription / Lab Report'}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--medi-text-muted)' }}>
            {isScanning
              ? `AI extracting medicines... ${scanProgress}%`
              : 'Drag & drop or tap to upload • JPG, PNG, PDF'}
          </div>
        </label>

        {isScanning && (
          <div style={{ marginTop: '16px', height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${scanProgress}%`,
              background: 'var(--medi-gradient-primary)',
              borderRadius: '2px',
              transition: 'width 0.25s ease',
            }} />
          </div>
        )}
      </div>

      {uploadError && (
        <div style={{
          padding: '12px 16px',
          background: 'rgba(239,68,68,0.12)',
          border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: 'var(--medi-radius-md)',
          fontSize: '0.84rem',
          color: '#EF4444',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <AlertTriangle size={16} />
          {uploadError}
        </div>
      )}

      {/* OCR Results */}
      {ocrRecords.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--medi-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Extracted Records ({ocrRecords.length})
          </div>
          {ocrRecords.map((rec) => (
            <div key={rec.id} style={glassCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--medi-text-primary)' }}>{rec.fileName}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--medi-text-muted)', marginTop: '2px' }}>{rec.recordType} • {rec.scanDate}</div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '3px 10px',
                  background: 'rgba(16,185,129,0.12)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  borderRadius: 'var(--medi-radius-full)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#10B981',
                }}>
                  <CheckCircle2 size={12} />
                  {rec.confidenceScore}% confident
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--medi-text-secondary)', marginBottom: '12px' }}>
                {rec.extractedDiagnosis}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {rec.activeMedications.map((med, i) => (
                  <span key={i} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 10px',
                    background: 'rgba(99,102,241,0.10)',
                    border: '1px solid rgba(99,102,241,0.2)',
                    borderRadius: 'var(--medi-radius-full)',
                    fontSize: '0.74rem',
                    color: 'var(--medi-primary-light)',
                    fontWeight: 600,
                  }}>
                    <Pill size={11} />
                    {med.name} {med.dosage}
                  </span>
                ))}
              </div>

              {rec.criticalAlerts.length > 0 && (
                <div style={{
                  marginTop: '10px',
                  padding: '8px 12px',
                  background: 'rgba(245,158,11,0.10)',
                  border: '1px solid rgba(245,158,11,0.25)',
                  borderRadius: 'var(--medi-radius-sm)',
                  fontSize: '0.76rem',
                  color: '#F59E0B',
                }}>
                  ⚠️ {rec.criticalAlerts[0]}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Proceed Button */}
      <button
        type="button"
        onClick={onProceedToDoctor}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '16px 32px',
          borderRadius: 'var(--medi-radius-full)',
          border: ocrRecords.length > 0 ? 'none' : 'var(--medi-border-glass)',
          background: ocrRecords.length > 0 ? 'var(--medi-gradient-primary)' : 'var(--medi-glass-primary)',
          color: ocrRecords.length > 0 ? '#FFFFFF' : 'var(--medi-text-primary)',
          fontFamily: 'inherit',
          fontSize: '1rem',
          fontWeight: 800,
          cursor: 'pointer',
          boxShadow: ocrRecords.length > 0 ? '0 4px 24px rgba(99,102,241,0.5)' : 'var(--medi-shadow-sm)',
          transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        } as React.CSSProperties}
        onMouseEnter={(e) => {
          if (ocrRecords.length > 0) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.6)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = ocrRecords.length > 0 ? '0 4px 24px rgba(99,102,241,0.5)' : 'none';
        }}
      >
        <Stethoscope size={20} />
        {ocrRecords.length > 0 ? 'Send to Doctor Dashboard' : 'Skip — Go to Doctor Panel'}
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
