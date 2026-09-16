import React, { useState } from 'react';
import { AlertOctagon, Activity, Pill, Send, Printer, HeartPulse, Stethoscope, FileText, Thermometer } from 'lucide-react';
import { ClinicalCaseSummary } from '../../types/clinical';
import { FhirPreviewModal } from '../common/FhirPreviewModal';

export interface MediDoctorViewProps {
  clinicalSummary: ClinicalCaseSummary;
  onUpdateNotes: (notes: string) => void;
  onUpdateDiagnosis: (diag: string) => void;
  onMarkPushed: () => void;
}

const GlassCard: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      background: 'var(--medi-glass-card)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: 'var(--medi-border-glass)',
      borderRadius: 'var(--medi-radius-lg)',
      boxShadow: 'var(--medi-shadow-card)',
      padding: '18px',
      ...style,
    }}
  >
    {children}
  </div>
);

export const MediDoctorView: React.FC<MediDoctorViewProps> = ({
  clinicalSummary,
  onUpdateNotes,
  onUpdateDiagnosis,
  onMarkPushed,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'vitals' | 'abdm'>('overview');
  const [isFhirModalOpen, setIsFhirModalOpen] = useState(false);
  const { patient, vitals, socrates, ocrRecords, isRedFlag, redFlagReason, triagePriority } = clinicalSummary;

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'vitals' as const, label: 'Vitals' },
    { id: 'abdm' as const, label: 'ABDM' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '8px 0 130px',
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        animation: 'fadeInUp 0.5s ease both',
      }}
    >
      {/* Doctor Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
        <div>
          <div className="editorial-eyebrow" style={{ color: 'var(--medi-primary)', marginBottom: '2px' }}>
            CLINICAL TRIAGE // LIVE OPD
          </div>
          <h1
            className="editorial-title"
            style={{
              fontSize: '1.45rem',
              lineHeight: 1.2,
            }}
          >
            Doctor <span className="editorial-italic">OPD</span> Panel
          </h1>
          <p style={{ fontSize: '0.74rem', color: 'var(--medi-text-secondary)', marginTop: '2px' }}>
            Live clinical summary from patient intake kiosk
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              background: 'rgba(16,185,129,0.12)',
              border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: 'var(--medi-radius-full)',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#10B981',
            }}
          >
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', animation: 'pulseGlow 2s infinite' }} />
            KIOSK LIVE
          </div>
        </div>
      </div>

      {/* Red Flag Alert — only shown if triggered */}
      {isRedFlag && (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            background: 'rgba(239,68,68,0.10)',
            border: '1px solid rgba(239,68,68,0.35)',
            borderRadius: 'var(--medi-radius-lg)',
            padding: '14px 16px',
            boxShadow: '0 0 24px rgba(239,68,68,0.15)',
            animation: 'pulseGlow 3s infinite',
          }}
        >
          <AlertOctagon size={22} color="#EF4444" style={{ marginTop: '1px', flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.86rem', color: '#EF4444', marginBottom: '4px' }}>
              🚨 RED FLAG — {triagePriority}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--medi-text-secondary)', lineHeight: 1.5 }}>
              {redFlagReason || `BP ${vitals.bloodPressureSys}/${vitals.bloodPressureDia} mmHg with pain severity ${socrates.severity}/10`}
            </div>
          </div>
        </div>
      )}

      {/* Patient Overview */}
      <GlassCard>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'var(--medi-gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              fontWeight: 800,
              color: '#fff',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
            }}
          >
            {patient.name.charAt(0)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--medi-text-primary)' }}>{patient.name}</div>
            <div style={{ fontSize: '0.76rem', color: 'var(--medi-text-muted)', fontWeight: 600 }}>
              {patient.age} yrs • {patient.gender} • {patient.bloodGroup}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--medi-primary-light)', letterSpacing: '-0.02em' }}>
              {patient.queueNo}
            </div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--medi-text-muted)', textTransform: 'uppercase' }}>OPD Token</div>
          </div>
        </div>

        {/* ABHA ID */}
        <div style={{ padding: '10px 14px', background: 'var(--medi-input-bg)', border: 'var(--medi-input-border)', borderRadius: 'var(--medi-radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--medi-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>ABHA ID</span>
          <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--medi-text-primary)', letterSpacing: '1px' }}>{patient.abhaId}</span>
        </div>
      </GlassCard>

      {/* Tab Bar */}
      <div style={{
        display: 'flex',
        gap: '4px',
        background: 'var(--medi-glass-primary)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: 'var(--medi-border-glass)',
        borderRadius: 'var(--medi-radius-full)',
        padding: '4px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: 'var(--medi-radius-full)',
              border: 'none',
              background: activeTab === tab.id ? 'var(--medi-gradient-primary)' : 'transparent',
              color: activeTab === tab.id ? '#FFFFFF' : 'var(--medi-text-secondary)',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: '0.84rem',
              cursor: 'pointer',
              transition: 'all 0.22s ease',
              boxShadow: activeTab === tab.id ? '0 4px 12px rgba(99,102,241,0.35)' : 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <>
          {/* SOCRATES Summary */}
          <GlassCard>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--medi-text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HeartPulse size={16} color="#6366F1" /> SOCRATES Intake
              </span>
              <span style={{
                padding: '2px 10px',
                borderRadius: 'var(--medi-radius-full)',
                fontSize: '0.72rem',
                fontWeight: 700,
                background: socrates.severity >= 8 ? 'rgba(239,68,68,0.15)' : 'rgba(99,102,241,0.12)',
                color: socrates.severity >= 8 ? '#EF4444' : 'var(--medi-primary-light)',
                border: socrates.severity >= 8 ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(99,102,241,0.2)',
              }}>
                Pain {socrates.severity}/10
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: 'Site & Onset', value: socrates.site },
                { label: 'Character', value: socrates.character },
                { label: 'Associations', value: socrates.associations },
              ].map((item) => item.value && (
                <div key={item.label} style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--medi-text-muted)', minWidth: '90px', paddingTop: '2px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{item.label}</span>
                  <span style={{ fontSize: '0.84rem', color: 'var(--medi-text-primary)', lineHeight: 1.5, flex: 1 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* OCR Medications */}
          {ocrRecords.length > 0 && (
            <GlassCard>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--medi-text-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Pill size={16} color="#06B6D4" /> OCR Extracted Medications
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {ocrRecords[0]?.activeMedications.map((med, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '6px 14px',
                      background: 'rgba(6,182,212,0.10)',
                      border: '1px solid rgba(6,182,212,0.2)',
                      borderRadius: 'var(--medi-radius-full)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#06B6D4',
                    }}
                  >
                    {med.name} {med.dosage} — {med.frequency}
                  </div>
                ))}
              </div>
              {ocrRecords[0]?.criticalAlerts.map((alert, i) => (
                <div key={i} style={{ marginTop: '10px', padding: '8px 12px', background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 'var(--medi-radius-sm)', fontSize: '0.76rem', color: '#F59E0B' }}>
                  ⚠️ {alert}
                </div>
              ))}
            </GlassCard>
          )}
        </>
      )}

      {/* VITALS TAB */}
      {activeTab === 'vitals' && (
        <div className="vitals-grid">
          {[
            { label: 'Blood Pressure', value: `${vitals.bloodPressureSys}/${vitals.bloodPressureDia}`, unit: 'mmHg', icon: <Activity size={18} />, color: vitals.bloodPressureSys >= 150 ? '#EF4444' : '#10B981' },
            { label: 'Heart Rate', value: `${vitals.heartRateBpm}`, unit: 'bpm', icon: <HeartPulse size={18} />, color: '#F59E0B' },
            { label: 'SpO2', value: `${vitals.spO2Percent}`, unit: '%', icon: <Activity size={18} />, color: vitals.spO2Percent < 95 ? '#EF4444' : '#10B981' },
            { label: 'Temperature', value: `${vitals.temperatureF}`, unit: '°F', icon: <Thermometer size={18} />, color: '#6366F1' },
          ].map((v) => (
            <GlassCard key={v.label} style={{ textAlign: 'center' }}>
              <div style={{ color: v.color, marginBottom: '8px' }}>{v.icon}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: v.color, letterSpacing: '-0.03em' }}>
                {v.value}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--medi-text-muted)', fontWeight: 600 }}>{v.unit}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--medi-text-secondary)', marginTop: '4px', fontWeight: 600 }}>{v.label}</div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* ABDM TAB */}
      {activeTab === 'abdm' && (
        <GlassCard>
          <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--medi-text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileText size={16} color="#8B5CF6" /> ABDM FHIR R4 Bundle
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--medi-text-secondary)', lineHeight: 1.6, marginBottom: '14px' }}>
            Generate a HL7 FHIR R4 compliant clinical document for ABDM Health Locker. This includes patient demographics, SOCRATES intake, vitals, OCR-extracted medications, and final diagnosis.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['Patient Resource', 'Encounter', 'Observation', 'MedicationStatement', 'AllergyIntolerance'].map((r) => (
              <span key={r} style={{ padding: '3px 10px', background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 'var(--medi-radius-full)', fontSize: '0.72rem', fontWeight: 600, color: '#8B5CF6' }}>
                {r}
              </span>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Doctor Notes & Actions */}
      <GlassCard>
        <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--medi-text-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Stethoscope size={16} color="#6366F1" /> Final Diagnosis & Orders
        </div>

        {/* Diagnosis Input */}
        <div style={{ marginBottom: '10px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--medi-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
            Working Diagnosis
          </div>
          <div style={{ background: 'var(--medi-input-bg)', border: 'var(--medi-input-border)', borderRadius: 'var(--medi-radius-md)', padding: '10px 14px' }}>
            <input
              type="text"
              value={clinicalSummary.finalDiagnosis}
              onChange={(e) => onUpdateDiagnosis(e.target.value)}
              placeholder="Working Clinical Diagnosis..."
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'var(--medi-text-primary)',
              }}
            />
          </div>
        </div>

        {/* Notes Input */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--medi-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
            Clinical Notes
          </div>
          <div style={{ background: 'var(--medi-input-bg)', border: 'var(--medi-input-border)', borderRadius: 'var(--medi-radius-md)', padding: '10px 14px' }}>
            <textarea
              rows={3}
              value={clinicalSummary.doctorNotes}
              onChange={(e) => onUpdateNotes(e.target.value)}
              placeholder="Enter assessment, medication orders, or review instructions..."
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                fontSize: '0.86rem',
                color: 'var(--medi-text-primary)',
                resize: 'none',
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setIsFhirModalOpen(true)}
            style={{
              flex: '2 1 180px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: 'var(--medi-gradient-primary)',
              border: 'none',
              borderRadius: 'var(--medi-radius-full)',
              padding: '12px 16px',
              color: '#FFFFFF',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: '0.84rem',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
              transition: 'all 0.22s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,102,241,0.4)'; }}
          >
            <Send size={15} /> Push to ABDM
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            style={{
              flex: '1 1 100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: 'var(--medi-glass-primary)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: 'var(--medi-border-glass)',
              borderRadius: 'var(--medi-radius-full)',
              padding: '12px 16px',
              color: 'var(--medi-text-primary)',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: '0.84rem',
              cursor: 'pointer',
              transition: 'all 0.22s ease',
            }}
          >
            <Printer size={15} /> Print
          </button>
        </div>
      </GlassCard>

      <FhirPreviewModal
        isOpen={isFhirModalOpen}
        onClose={() => setIsFhirModalOpen(false)}
        clinicalSummary={clinicalSummary}
        onPushedSuccess={() => { onMarkPushed(); }}
      />
    </div>
  );
};
