import React, { useState } from 'react';
import { QrCode, ArrowRight, User, Globe2, ShieldCheck, Phone } from 'lucide-react';
import { TactileCard } from '../ui/TactileCard';
import { TactileInput } from '../ui/TactileInput';
import { TactileButton } from '../ui/TactileButton';
import { TactileBadge } from '../ui/TactileBadge';
import { AbhaQrScannerModal } from '../common/AbhaQrScannerModal';
import { PatientProfile, LanguageCode } from '../../types/clinical';
import { PatientRegistrationSchema } from '../../lib/validators';
import { logger } from '../../lib/logger';

export interface StepRegistrationProps {
  patient: PatientProfile;
  language: LanguageCode;
  onUpdatePatient: (updated: Partial<PatientProfile>) => void;
  onUpdateLanguage: (lang: LanguageCode) => void;
  onNext: () => void;
}

export const StepRegistration: React.FC<StepRegistrationProps> = ({
  patient,
  language,
  onUpdatePatient,
  onUpdateLanguage,
  onNext,
}) => {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAbhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/[^\d-]/g, '');
    const digitsOnly = raw.replace(/\D/g, '');
    if (digitsOnly.length <= 14) {
      const parts = [];
      if (digitsOnly.length > 0) parts.push(digitsOnly.substring(0, 2));
      if (digitsOnly.length > 2) parts.push(digitsOnly.substring(2, 6));
      if (digitsOnly.length > 6) parts.push(digitsOnly.substring(6, 10));
      if (digitsOnly.length > 10) parts.push(digitsOnly.substring(10, 14));
      raw = parts.join('-');
    }
    onUpdatePatient({ abhaId: raw });
    if (errors.abhaId) {
      setErrors((prev) => ({ ...prev, abhaId: '' }));
    }
  };

  const handleValidateAndProceed = () => {
    const result = PatientRegistrationSchema.safeParse({
      abhaId: patient.abhaId,
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      preferredLanguage: language,
    });

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) formattedErrors[issue.path[0].toString()] = issue.message;
      });
      setErrors(formattedErrors);
      logger.warn('VALIDATION', 'Patient registration validation failed', formattedErrors);
      return;
    }

    setErrors({});
    logger.info('REGISTRATION', 'Patient identity validated successfully', {
      abhaId: patient.abhaId,
      name: patient.name,
    });
    onNext();
  };

  const handlePatientSelectedFromQr = (selected: PatientProfile) => {
    onUpdatePatient(selected);
    setErrors({});
    logger.info('QR_SCAN', 'Patient auto-populated via ABHA QR code', { abhaId: selected.abhaId });
  };

  return (
    <TactileCard elevation="card" radius="xl" style={{ padding: 'clamp(16px, 3vw, 28px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.45rem)', fontWeight: 800, color: 'var(--medi-text-primary)' }}>
            Patient Registration & ABHA Check-In
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--medi-text-secondary)', marginTop: '2px' }}>
            Enter 14-digit Ayushman Bharat Health Account (ABHA) ID or scan health QR card
          </p>
        </div>
        <TactileBadge variant="primary" icon={<ShieldCheck size={14} />}>
          ABDM Verified
        </TactileBadge>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {/* Left Column: Form Fields */}
        <div>
          <TactileInput
            label="ABHA Health ID (14-digit)"
            placeholder="e.g. 12-3456-7890-1234"
            value={patient.abhaId}
            onChange={handleAbhaChange}
            error={errors.abhaId}
            icon={<User size={18} />}
            actionButton={
              <button
                type="button"
                onClick={() => setIsQrModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 10px',
                  borderRadius: 'var(--medi-radius-sm)',
                  backgroundColor: 'var(--medi-surface-card)',
                  border: '1px solid var(--medi-border-subtle)',
                  color: 'var(--medi-text-primary)',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--medi-shadow-sm)',
                  whiteSpace: 'nowrap',
                }}
              >
                <QrCode size={14} /> Scan QR
              </button>
            }
          />

          <TactileInput
            label="Full Patient Name"
            placeholder="e.g. Rajesh Kumar"
            value={patient.name}
            onChange={(e) => onUpdatePatient({ name: e.target.value })}
            error={errors.name}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <TactileInput
              label="Age (Years)"
              type="number"
              placeholder="e.g. 42"
              value={patient.age || ''}
              onChange={(e) => onUpdatePatient({ age: parseInt(e.target.value) || 0 })}
              error={errors.age}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--medi-text-secondary)' }}>
                Gender
              </label>
              <select
                value={patient.gender}
                onChange={(e) => onUpdatePatient({ gender: e.target.value as 'Male' | 'Female' | 'Other' })}
                style={{
                  height: '50px',
                  borderRadius: 'var(--medi-radius-md)',
                  backgroundColor: 'var(--medi-bg-subtle)',
                  border: '1px solid var(--medi-border-subtle)',
                  padding: '0 14px',
                  color: 'var(--medi-text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Language & OPD Queue */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: 'var(--medi-text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '8px',
                }}
              >
                <Globe2 size={16} color="var(--medi-primary)" />
                Preferred Voice & UI Language (Bhashini AI)
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { code: 'en' as const, label: 'English', sub: 'Standard' },
                  { code: 'hi' as const, label: 'हिन्दी', sub: 'Hindi' },
                  { code: 'bh' as const, label: 'भोजपुरी', sub: 'Bhojpuri' },
                ].map((item) => {
                  const isSelected = language === item.code;
                  return (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => onUpdateLanguage(item.code)}
                      style={{
                        flex: 1,
                        padding: '10px 6px',
                        borderRadius: 'var(--medi-radius-md)',
                        backgroundColor: isSelected ? 'var(--medi-surface-elevated)' : 'var(--medi-bg-subtle)',
                        border: isSelected ? '2px solid var(--medi-primary)' : '1px solid var(--medi-border-subtle)',
                        boxShadow: isSelected ? '0 8px 18px rgba(99, 102, 241, 0.2)' : 'none',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'var(--medi-spring)',
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: isSelected ? 'var(--medi-primary)' : 'var(--medi-text-primary)' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--medi-text-muted)' }}>{item.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* OPD Queue Preview Card */}
            <div
              style={{
                backgroundColor: 'var(--medi-bg-subtle)',
                borderRadius: 'var(--medi-radius-lg)',
                padding: '16px',
                border: '1px solid var(--medi-border-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--medi-text-muted)' }}>
                  ASSIGNED OPD TOKEN
                </span>
                <TactileBadge variant="success" size="sm">
                  Active Queue
                </TactileBadge>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--medi-primary)', letterSpacing: '-0.02em' }}>
                {patient.queueNo}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--medi-text-secondary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={14} /> Registered Mobile: {patient.phone || '+91 98765 43210'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <TactileButton
              variant="primary"
              size="lg"
              icon={<ArrowRight size={18} />}
              onClick={handleValidateAndProceed}
              style={{ width: '100%', maxWidth: '260px' }}
            >
              Next: Symptom Intake
            </TactileButton>
          </div>
        </div>
      </div>

      {/* QR Scanner Simulation Modal */}
      <AbhaQrScannerModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        onSelectPatient={handlePatientSelectedFromQr}
      />
    </TactileCard>
  );
};
