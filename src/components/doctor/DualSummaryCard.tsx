import React from 'react';
import { HeartPulse, Leaf } from 'lucide-react';
import { TactileCard } from '../ui/TactileCard';
import { TactileBadge } from '../ui/TactileBadge';
import { SocratesIntake, DashavidhaIntake } from '../../types/clinical';

export interface DualSummaryCardProps {
  socrates: SocratesIntake;
  dashavidha: DashavidhaIntake;
}

export const DualSummaryCard: React.FC<DualSummaryCardProps> = ({ socrates, dashavidha }) => {
  return (
    <TactileCard elevation="card" radius="xl">
      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--medi-text-primary)', marginBottom: '16px' }}>
        AI Structured Clinical Intake Summary
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Allopathic SOCRATES Summary Block */}
        <div
          style={{
            backgroundColor: 'rgba(99, 102, 241, 0.05)',
            borderLeft: '4px solid var(--medi-primary)',
            borderRadius: 'var(--medi-radius-md)',
            padding: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HeartPulse size={18} color="var(--medi-primary)" />
              <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--medi-text-primary)' }}>
                SOCRATES (Allopathic Framework)
              </h4>
            </div>
            <TactileBadge variant="alert" size="sm">
              Pain Scale: {socrates.severity}/10
            </TactileBadge>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem', color: 'var(--medi-text-secondary)' }}>
            <li>
              <strong style={{ color: 'var(--medi-text-primary)' }}>Site:</strong> {socrates.site || 'Substernal chest region radiating to left shoulder'}
            </li>
            <li>
              <strong style={{ color: 'var(--medi-text-primary)' }}>Onset:</strong> {socrates.onset || 'Sudden acute onset 2 hours ago'}
            </li>
            <li>
              <strong style={{ color: 'var(--medi-text-primary)' }}>Character:</strong> {socrates.character || 'Heavy squeezing, tight pressure sensation'}
            </li>
            {socrates.radiation && (
              <li>
                <strong style={{ color: 'var(--medi-text-primary)' }}>Radiation:</strong> {socrates.radiation}
              </li>
            )}
            {socrates.associations && (
              <li>
                <strong style={{ color: 'var(--medi-text-primary)' }}>Associated Symptoms:</strong> {socrates.associations}
              </li>
            )}
          </ul>
        </div>

        {/* AYUSH Dashavidha Summary Block */}
        <div
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.05)',
            borderLeft: '4px solid var(--medi-emerald)',
            borderRadius: 'var(--medi-radius-md)',
            padding: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Leaf size={18} color="var(--medi-emerald)" />
              <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--medi-text-primary)' }}>
                Dashavidha Pariksha (AYUSH Framework)
              </h4>
            </div>
            <TactileBadge variant="ayush" size="sm">
              Constitutional Profile
            </TactileBadge>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem', color: 'var(--medi-text-secondary)' }}>
            <li>
              <strong style={{ color: 'var(--medi-text-primary)' }}>Prakriti:</strong> {dashavidha.prakriti}
            </li>
            <li>
              <strong style={{ color: 'var(--medi-text-primary)' }}>Agni (Metabolic Fire):</strong> {dashavidha.agni}
            </li>
            <li>
              <strong style={{ color: 'var(--medi-text-primary)' }}>Satmya (Dietary Habit):</strong> {dashavidha.satmya}
            </li>
            <li>
              <strong style={{ color: 'var(--medi-text-primary)' }}>Ahara Shakti (Digestion):</strong> {dashavidha.aharaShakti}
            </li>
          </ul>
        </div>
      </div>
    </TactileCard>
  );
};
