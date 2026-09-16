import React from 'react';
import { UserCheck, Stethoscope, FileText, Check } from 'lucide-react';

export interface StepStepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export const StepStepper: React.FC<StepStepperProps> = ({ currentStep, onStepClick }) => {
  const steps = [
    { number: 1, label: 'Registration', fullLabel: 'ABHA Registration', icon: <UserCheck size={16} /> },
    { number: 2, label: 'Symptoms', fullLabel: 'Symptoms & Intake', icon: <Stethoscope size={16} /> },
    { number: 3, label: 'Reports', fullLabel: 'Document OCR Scan', icon: <FileText size={16} /> },
  ];

  const currentStepObj = steps[currentStep - 1] || steps[0];
  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div
      style={{
        backgroundColor: 'var(--medi-surface-card)',
        padding: '14px 18px',
        borderRadius: 'var(--medi-radius-xl)',
        boxShadow: 'var(--medi-shadow-card)',
        border: '1px solid var(--medi-border-subtle)',
        marginBottom: '20px',
      }}
    >
      {/* Mobile View: Compact Step Header + Progress Bar */}
      <div className="mobile-stepper-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--medi-gradient-primary)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 700,
              }}
            >
              {currentStep}
            </span>
            <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--medi-text-primary)' }}>
              {currentStepObj.fullLabel}
            </span>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--medi-text-muted)', fontWeight: 600 }}>
            Step {currentStep} of {steps.length}
          </span>
        </div>

        {/* Smooth Track Line */}
        <div
          style={{
            height: '5px',
            backgroundColor: 'var(--medi-bg-subtle)',
            borderRadius: 'var(--medi-radius-full)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progressPercent === 0 ? 15 : progressPercent}%`,
              height: '100%',
              background: 'var(--medi-gradient-primary)',
              borderRadius: 'var(--medi-radius-full)',
              transition: 'var(--medi-spring)',
            }}
          />
        </div>

        {/* Mini Pill Step Navigators */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
          {steps.map((s) => (
            <button
              key={s.number}
              type="button"
              onClick={() => onStepClick(s.number)}
              style={{
                flex: 1,
                padding: '6px 4px',
                borderRadius: 'var(--medi-radius-full)',
                border: 'none',
                backgroundColor: currentStep === s.number ? 'rgba(99, 102, 241, 0.12)' : 'var(--medi-bg-subtle)',
                color: currentStep === s.number ? 'var(--medi-primary)' : 'var(--medi-text-muted)',
                fontWeight: 600,
                fontSize: '0.74rem',
                cursor: 'pointer',
                transition: 'var(--medi-ease)',
              }}
            >
              0{s.number}. {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop View: Full 3-Step Pill Stepper */}
      <div className="desktop-stepper-container" style={{ display: 'none', alignItems: 'center', justifyContent: 'space-between' }}>
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;

          return (
            <React.Fragment key={step.number}>
              <div
                onClick={() => onStepClick(step.number)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  opacity: isActive || isCompleted ? 1 : 0.6,
                  transition: 'var(--medi-ease)',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--medi-radius-full)',
                    background: isCompleted
                      ? 'var(--medi-emerald)'
                      : isActive
                      ? 'var(--medi-gradient-primary)'
                      : 'var(--medi-bg-subtle)',
                    color: isActive || isCompleted ? '#FFFFFF' : 'var(--medi-text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.86rem',
                    boxShadow: isActive
                      ? '0 6px 16px rgba(99, 102, 241, 0.35)'
                      : 'var(--medi-shadow-sm)',
                    transition: 'var(--medi-spring)',
                  }}
                >
                  {isCompleted ? <Check size={16} /> : step.icon}
                </div>
                <div>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      color: isActive ? 'var(--medi-primary)' : 'var(--medi-text-muted)',
                      display: 'block',
                    }}
                  >
                    Step 0{step.number}
                  </span>
                  <span
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'var(--medi-text-primary)' : 'var(--medi-text-secondary)',
                    }}
                  >
                    {step.fullLabel}
                  </span>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: '3px',
                    backgroundColor: isCompleted ? 'var(--medi-emerald)' : 'var(--medi-border-subtle)',
                    margin: '0 12px',
                    borderRadius: 'var(--medi-radius-full)',
                    transition: 'var(--medi-ease)',
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
