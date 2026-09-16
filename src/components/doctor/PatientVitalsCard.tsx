import React from 'react';
import { User, Activity, Heart, Thermometer, Wind, ShieldCheck } from 'lucide-react';
import { TactileCard } from '../ui/TactileCard';
import { TactileBadge } from '../ui/TactileBadge';
import { PatientProfile, ClinicalVitals } from '../../types/clinical';

export interface PatientVitalsCardProps {
  patient: PatientProfile;
  vitals: ClinicalVitals;
}

export const PatientVitalsCard: React.FC<PatientVitalsCardProps> = ({ patient, vitals }) => {
  const isBpElevated = vitals.bloodPressureSys >= 140 || vitals.bloodPressureDia >= 90;

  return (
    <TactileCard elevation="card" radius="xl">
      {/* Patient Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: 'var(--medi-radius-md)',
              background: 'var(--medi-gradient-primary)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
            }}
          >
            <User size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--medi-text-primary)' }}>
              {patient.name}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--medi-text-muted)' }}>
              {patient.age} Yrs • {patient.gender} • Blood Group: {patient.bloodGroup || 'B+'}
            </span>
          </div>
        </div>

        <TactileBadge variant="primary" icon={<ShieldCheck size={14} />}>
          ABHA: {patient.abhaId}
        </TactileBadge>
      </div>

      {/* Vitals Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginTop: '16px' }}>
        {/* Blood Pressure */}
        <div
          style={{
            backgroundColor: isBpElevated ? 'rgba(239, 68, 68, 0.08)' : 'var(--medi-bg-subtle)',
            border: isBpElevated ? '1.5px solid var(--medi-red)' : '1px solid var(--medi-border-subtle)',
            borderRadius: 'var(--medi-radius-md)',
            padding: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: isBpElevated ? 'var(--medi-red)' : 'var(--medi-text-secondary)', marginBottom: '4px' }}>
            <Activity size={16} />
            <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase' }}>BP (SYS/DIA)</span>
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: isBpElevated ? 'var(--medi-red)' : 'var(--medi-text-primary)' }}>
            {vitals.bloodPressureSys}/{vitals.bloodPressureDia}
            <span style={{ fontSize: '0.72rem', fontWeight: 500, color: 'var(--medi-text-muted)', marginLeft: '4px' }}>mmHg</span>
          </div>
          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: isBpElevated ? 'var(--medi-red)' : 'var(--medi-emerald)' }}>
            {isBpElevated ? 'Stage 2 HTN' : 'Normal'}
          </span>
        </div>

        {/* Pulse / Heart Rate */}
        <div
          style={{
            backgroundColor: 'var(--medi-bg-subtle)',
            border: '1px solid var(--medi-border-subtle)',
            borderRadius: 'var(--medi-radius-md)',
            padding: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--medi-primary)', marginBottom: '4px' }}>
            <Heart size={16} />
            <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase' }}>HEART RATE</span>
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--medi-text-primary)' }}>
            {vitals.heartRateBpm}
            <span style={{ fontSize: '0.72rem', fontWeight: 500, color: 'var(--medi-text-muted)', marginLeft: '4px' }}>BPM</span>
          </div>
          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: vitals.heartRateBpm > 100 ? 'var(--medi-amber)' : 'var(--medi-emerald)' }}>
            {vitals.heartRateBpm > 100 ? 'Tachycardia' : 'Regular'}
          </span>
        </div>

        {/* SpO2 */}
        <div
          style={{
            backgroundColor: 'var(--medi-bg-subtle)',
            border: '1px solid var(--medi-border-subtle)',
            borderRadius: 'var(--medi-radius-md)',
            padding: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--medi-cyan)', marginBottom: '4px' }}>
            <Wind size={16} />
            <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase' }}>OXYGEN (SPO2)</span>
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--medi-text-primary)' }}>
            {vitals.spO2Percent}%
          </div>
          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: vitals.spO2Percent >= 95 ? 'var(--medi-emerald)' : 'var(--medi-red)' }}>
            {vitals.spO2Percent >= 95 ? 'Optimal' : 'Low O2'}
          </span>
        </div>

        {/* Temperature */}
        <div
          style={{
            backgroundColor: 'var(--medi-bg-subtle)',
            border: '1px solid var(--medi-border-subtle)',
            borderRadius: 'var(--medi-radius-md)',
            padding: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--medi-purple)', marginBottom: '4px' }}>
            <Thermometer size={16} />
            <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase' }}>TEMP</span>
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--medi-text-primary)' }}>
            {vitals.temperatureF}°
            <span style={{ fontSize: '0.72rem', fontWeight: 500, color: 'var(--medi-text-muted)', marginLeft: '4px' }}>F</span>
          </div>
          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--medi-emerald)' }}>
            Afebrile
          </span>
        </div>
      </div>
    </TactileCard>
  );
};
