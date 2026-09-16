import React from 'react';
import {
  Clock, Languages, FileText, ShieldCheck,
  Stethoscope, ScanLine, Activity, Users, Mic, Sparkles
} from 'lucide-react';

export interface LandingPageProps {
  onStartKiosk: () => void;
  onOpenDoctor: () => void;
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
      padding: '24px',
      ...style,
    }}
  >
    {children}
  </div>
);

const GlassButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, onClick, primary, icon, style }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 28px',
      borderRadius: 'var(--medi-radius-full)',
      border: primary ? 'none' : 'var(--medi-border-glass)',
      background: primary ? 'var(--medi-gradient-primary)' : 'var(--medi-glass-primary)',
      backdropFilter: primary ? 'none' : 'blur(12px)',
      WebkitBackdropFilter: primary ? 'none' : 'blur(12px)',
      color: primary ? '#FFFFFF' : 'var(--medi-text-primary)',
      fontFamily: 'inherit',
      fontSize: '0.95rem',
      fontWeight: 700,
      cursor: 'pointer',
      boxShadow: primary ? '0 4px 20px rgba(99,102,241,0.4)' : 'var(--medi-shadow-sm)',
      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      whiteSpace: 'nowrap',
      ...style,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = primary
        ? '0 8px 32px rgba(99,102,241,0.55)'
        : 'var(--medi-shadow-card)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = primary ? '0 4px 20px rgba(99,102,241,0.4)' : 'var(--medi-shadow-sm)';
    }}
  >
    {icon}
    {children}
  </button>
);

export const LandingPage: React.FC<LandingPageProps> = ({ onStartKiosk, onOpenDoctor }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', paddingBottom: '32px' }}>

      {/* ========== 1. HERO SECTION ========== */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '48px 16px 24px',
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto',
          animation: 'fadeInUp 0.6s ease both',
        }}
      >
        {/* Badge Row */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { label: 'SIH 2026 // PS 26047', color: '#6366F1' },
            { label: 'ABDM M1 & M2 COMPLIANT', color: '#10B981' },
            { label: 'BHASHINI AI VOICE', color: '#06B6D4' },
          ].map((b, i) => (
            <span
              key={i}
              className="editorial-eyebrow"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 12px',
                borderRadius: 'var(--medi-radius-full)',
                background: `${b.color}15`,
                border: `1px solid ${b.color}35`,
                color: b.color,
                fontSize: '0.66rem',
              }}
            >
              <Sparkles size={11} />
              {b.label}
            </span>
          ))}
        </div>

        {/* Headline */}
        <h1
          className="editorial-title"
          style={{
            fontSize: 'clamp(1.9rem, 4.8vw, 3.2rem)',
            fontWeight: 800,
            lineHeight: 1.18,
            marginBottom: '16px',
            width: '100%',
          }}
        >
          Autonomous <span className="editorial-italic">Clinical</span> Intake
        </h1>

        <p
          style={{
            fontSize: 'clamp(0.92rem, 2vw, 1.05rem)',
            color: 'var(--medi-text-secondary)',
            lineHeight: 1.65,
            width: '100%',
            maxWidth: '580px',
            marginBottom: '32px',
          }}
        >
          Transforming India's OPD experience — patients narrate symptoms in Hindi, Bhojpuri, or English.
          AI structures clinical records. Doctors see live summaries instantly.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
          <GlassButton primary icon={<Mic size={17} />} onClick={onStartKiosk}>
            Start Patient Intake
          </GlassButton>
          <GlassButton icon={<Stethoscope size={17} />} onClick={onOpenDoctor}>
            Open Doctor Dashboard
          </GlassButton>
        </div>

        {/* Stats Row */}
        <div className="landing-stats-grid" style={{ width: '100%', maxWidth: '700px', marginTop: '40px' }}>
          {[
            { metric: '70%', label: 'Shorter Queue', color: '#6366F1' },
            { metric: '3+', label: 'Regional Languages', color: '#06B6D4' },
            { metric: 'FHIR R4', label: 'ABDM Compliant', color: '#10B981' },
            { metric: 'AI-First', label: 'Allopathic + AYUSH', color: '#8B5CF6' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: 'var(--medi-glass-card)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: 'var(--medi-radius-md)',
                padding: '16px 12px',
                border: 'var(--medi-border-glass)',
                textAlign: 'center',
              }}
            >
              <div className="editorial-metric" style={{ fontSize: '1.45rem', color: stat.color }}>
                {stat.metric}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--medi-text-secondary)', marginTop: '4px', fontWeight: 600 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== 2. HOW IT WORKS — PATIENT FLOW ========== */}
      <section style={{ animation: 'fadeInUp 0.6s 0.1s ease both' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div className="editorial-eyebrow" style={{ marginBottom: '6px' }}>WORKFLOW // 3 AUTONOMOUS STEPS</div>
          <h2 className="editorial-title" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)' }}>
            How <span className="editorial-italic">Patient Intake</span> Works
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--medi-text-secondary)', marginTop: '6px' }}>
            A 3-step guided process, fully autonomous
          </p>
        </div>

        <div className="landing-cards-grid">
          {[
            {
              step: '01',
              icon: <ShieldCheck size={22} color="#6366F1" />,
              title: 'Verify Identity',
              desc: 'Enter ABHA Health ID or scan the QR code. Select your preferred language — Hindi, Bhojpuri, or English.',
              color: '#6366F1',
            },
            {
              step: '02',
              icon: <Mic size={22} color="#06B6D4" />,
              title: 'Speak Symptoms',
              desc: 'Talk to the AI voice orb. Narrate your pain, when it started, and where it is. Rate severity 1–10.',
              color: '#06B6D4',
            },
            {
              step: '03',
              icon: <ScanLine size={22} color="#10B981" />,
              title: 'Upload Records',
              desc: 'Photograph old prescriptions. OCR extracts active medicines and past diagnoses automatically.',
              color: '#10B981',
            },
            {
              step: '04',
              icon: <Stethoscope size={22} color="#8B5CF6" />,
              title: 'Doctor Reviews',
              desc: 'Physician sees a pre-structured summary with red flag alerts before you even enter the room.',
              color: '#8B5CF6',
            },
          ].map((s, i) => (
            <GlassCard key={i}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--medi-radius-md)',
                    background: `${s.color}20`,
                    border: `1px solid ${s.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {s.icon}
                </div>
                <span
                  className="editorial-step-num"
                  style={{
                    fontSize: '1.9rem',
                    color: s.color,
                    opacity: 0.4,
                  }}
                >
                  {s.step}
                </span>
              </div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--medi-text-primary)', marginBottom: '8px' }}>
                {s.title}
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--medi-text-secondary)', lineHeight: 1.6 }}>
                {s.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ========== 3. THE PROBLEM ========== */}
      <section style={{ animation: 'fadeInUp 0.6s 0.2s ease both' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span
            className="editorial-eyebrow"
            style={{
              display: 'inline-block',
              padding: '4px 14px',
              borderRadius: 'var(--medi-radius-full)',
              background: 'rgba(239,68,68,0.12)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#EF4444',
              marginBottom: '10px',
            }}
          >
            SYSTEMIC CHALLENGES // INDIAN HEALTHCARE
          </span>
          <h2 className="editorial-title" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)' }}>
            The Reality of <span className="editorial-italic-warm">Hospital OPDs</span>
          </h2>
        </div>

        <div className="landing-cards-grid">
          {[
            { icon: <Clock size={22} color="#EF4444" />, title: '2–3 Hour Wait Times', desc: 'Patients spend hours in queues only to get 2 minutes with the doctor.' },
            { icon: <Languages size={22} color="#6366F1" />, title: 'Language Barriers', desc: 'Bhojpuri & Maithili speakers cannot describe symptoms accurately in English.' },
            { icon: <FileText size={22} color="#F59E0B" />, title: 'Lost Prescriptions', desc: 'Handwritten slips get lost, causing repeated tests and drug interaction risks.' },
            { icon: <Activity size={22} color="#06B6D4" />, title: 'Missed Red Flags', desc: 'Critical cardiac warnings sit undetected in a queue until it is too late.' },
          ].map((p, i) => (
            <GlassCard key={i}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--medi-radius-md)',
                  background: 'var(--medi-surface-sunken)',
                  border: 'var(--medi-border-glass)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                {p.icon}
              </div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--medi-text-primary)', marginBottom: '6px' }}>{p.title}</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--medi-text-secondary)', lineHeight: 1.6 }}>{p.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ========== 4. CTA FOOTER ========== */}
      <section style={{ animation: 'fadeInUp 0.6s 0.3s ease both' }}>
        <div
          style={{
            background: 'var(--medi-glass-card)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: 'var(--medi-border-glass)',
            borderRadius: 'var(--medi-radius-xl)',
            padding: '48px 24px',
            textAlign: 'center',
            boxShadow: '0 0 80px rgba(99,102,241,0.1), var(--medi-shadow-card)',
          }}
        >
          <div className="editorial-eyebrow" style={{ marginBottom: '8px', color: 'var(--medi-primary)' }}>
            GET STARTED // PRODUCTION READY
          </div>
          <h3
            className="editorial-title"
            style={{
              fontSize: 'clamp(1.35rem, 3.5vw, 1.95rem)',
              marginBottom: '12px',
            }}
          >
            Ready to <span className="editorial-italic">Transform</span> Clinical Intake?
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--medi-text-secondary)', marginBottom: '28px' }}>
            Try the live kiosk or review structured patient summaries in the doctor panel.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <GlassButton primary icon={<Users size={18} />} onClick={onStartKiosk}>
              Launch Patient Kiosk
            </GlassButton>
            <GlassButton icon={<Stethoscope size={18} />} onClick={onOpenDoctor}>
              Doctor OPD Dashboard
            </GlassButton>
          </div>
        </div>
      </section>
    </div>
  );
};
