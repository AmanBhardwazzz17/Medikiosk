import React, { useState } from 'react';
import { QrCode, CheckCircle2, User } from 'lucide-react';
import { TactileModal } from '../ui/TactileModal';
import { TactileButton } from '../ui/TactileButton';
import { TactileBadge } from '../ui/TactileBadge';
import { SAMPLE_PATIENTS } from '../../mocks/data';
import { PatientProfile } from '../../types/clinical';

export interface AbhaQrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPatient: (patient: PatientProfile) => void;
}

export const AbhaQrScannerModal: React.FC<AbhaQrScannerModalProps> = ({
  isOpen,
  onClose,
  onSelectPatient,
}) => {
  const [selectedId, setSelectedId] = useState<string>(SAMPLE_PATIENTS[0].abhaId);
  const [isScanning, setIsScanning] = useState(false);

  const handleScanSimulation = (patient: PatientProfile) => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onSelectPatient(patient);
      onClose();
    }, 900);
  };

  return (
    <TactileModal
      isOpen={isOpen}
      onClose={onClose}
      title="Scan ABHA Card / QR Code"
      subtitle="Present physical ABHA card QR or select an authenticated digital health identity"
      maxWidth="580px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Animated Scanner Viewfinder */}
        <div
          style={{
            height: '180px',
            borderRadius: 'var(--medi-radius-lg)',
            backgroundColor: 'var(--medi-bg-subtle)',
            border: '2px dashed var(--medi-primary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'var(--medi-gradient-primary)',
              boxShadow: '0 0 12px var(--medi-primary)',
              animation: 'floatGentle 1.6s infinite ease-in-out',
            }}
          />
          <QrCode size={54} color="var(--medi-primary)" style={{ opacity: 0.85, marginBottom: '8px' }} />
          <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--medi-text-secondary)' }}>
            {isScanning ? 'Decrypting ABHA QR payload...' : 'Align ABHA QR Code within this frame'}
          </p>
          <TactileBadge variant="primary" size="sm" icon={<CheckCircle2 size={12} />}>
            ABDM M1 & M2 Compliant
          </TactileBadge>
        </div>

        {/* Quick Presets for Demo & Registration */}
        <div>
          <label style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--medi-text-secondary)', marginBottom: '10px', display: 'block' }}>
            Or select registered citizen identity:
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {SAMPLE_PATIENTS.map((p) => {
              const isCurrent = selectedId === p.abhaId;
              return (
                <div
                  key={p.abhaId}
                  onClick={() => {
                    setSelectedId(p.abhaId);
                    handleScanSimulation(p);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 'var(--medi-radius-md)',
                    backgroundColor: isCurrent ? 'rgba(99, 102, 241, 0.08)' : 'var(--medi-surface-card)',
                    border: isCurrent ? '1.5px solid var(--medi-primary)' : '1px solid var(--medi-border-subtle)',
                    cursor: 'pointer',
                    transition: 'var(--medi-spring)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--medi-bg-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--medi-primary)',
                      }}
                    >
                      <User size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--medi-text-primary)' }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--medi-text-muted)' }}>
                        ABHA: {p.abhaId} • {p.age} Yrs / {p.gender}
                      </div>
                    </div>
                  </div>
                  <TactileButton size="sm" variant={isCurrent ? 'primary' : 'secondary'}>
                    Select
                  </TactileButton>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
          <TactileButton variant="secondary" onClick={onClose}>
            Cancel
          </TactileButton>
        </div>
      </div>
    </TactileModal>
  );
};
