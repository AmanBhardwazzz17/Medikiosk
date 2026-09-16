import { useState, useEffect } from 'react';
import { MediSplashView } from './components/medi/MediSplashView';
import { MediIntakeView } from './components/medi/MediIntakeView';
import { MediOcrView } from './components/medi/MediOcrView';
import { MediDoctorView } from './components/medi/MediDoctorView';
import { MediAiModal } from './components/medi/MediAiModal';
import { OpdPrintSlip } from './components/common/OpdPrintSlip';
import { LanguageCode, OcrExtractedRecord, PatientProfile, SocratesIntake, DashavidhaIntake } from './types/clinical';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { LandingPage } from './components/landing/LandingPage';
import { useClinicalStore } from './store/useClinicalStore';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'kiosk' | 'doctor'>('home');
  const [kioskStep, setKioskStep] = useState<'splash' | 'intake' | 'ocr'>('splash');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const {
    activeCase: clinicalCase,
    updatePatient,
    updateSocrates,
    updateDashavidha,
    addOcrRecord,
    updateDoctorNotes,
    updateDiagnosis,
  } = useClinicalStore();

  // Sync theme attribute to HTML root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Recalculate Red Flag condition reactively
  useEffect(() => {
    if (!clinicalCase) return;
    const isCriticalSeverity = clinicalCase.socrates.severity >= 8;
    const isCriticalBp =
      clinicalCase.vitals.bloodPressureSys >= 150 ||
      clinicalCase.vitals.bloodPressureDia >= 95;
    const redFlagTriggered = isCriticalSeverity || isCriticalBp;

    let reason = '';
    if (isCriticalSeverity && isCriticalBp) {
      reason = `Stage 2 Hypertension (${clinicalCase.vitals.bloodPressureSys}/${clinicalCase.vitals.bloodPressureDia} mmHg) with severe pain (${clinicalCase.socrates.severity}/10). Immediate triage!`;
    } else if (isCriticalSeverity) {
      reason = `High pain severity (${clinicalCase.socrates.severity}/10) reported during intake.`;
    } else if (isCriticalBp) {
      reason = `Elevated blood pressure (${clinicalCase.vitals.bloodPressureSys}/${clinicalCase.vitals.bloodPressureDia} mmHg) detected.`;
    }

    updateDiagnosis(clinicalCase.finalDiagnosis, redFlagTriggered, reason || undefined);
  }, [clinicalCase?.socrates.severity, clinicalCase?.vitals.bloodPressureSys, clinicalCase?.vitals.bloodPressureDia]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const navigate = (view: 'home' | 'kiosk' | 'doctor', step?: 'splash' | 'intake' | 'ocr') => {
    setCurrentView(view);
    if (step) setKioskStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!clinicalCase) return null;

  return (
    <div className="medi-app-root">
      {/* === GLOBAL ANIMATED GLASS BACKGROUND === */}
      <div className="medi-bg-orbs" aria-hidden="true">
        <div className="medi-bg-orb medi-bg-orb-1" />
        <div className="medi-bg-orb medi-bg-orb-2" />
        <div className="medi-bg-orb medi-bg-orb-3" />
      </div>

      {/* === TOP NAVBAR === */}
      <Navbar
        currentView={currentView}
        onSelectView={(view) => navigate(view, view === 'kiosk' ? 'splash' : undefined)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* === MAIN CONTENT === */}
      <main className="medi-app-wrapper">

        {/* VIEW: HOME / LANDING */}
        {currentView === 'home' && (
          <LandingPage
            onStartKiosk={() => navigate('kiosk', 'splash')}
            onOpenDoctor={() => navigate('doctor')}
          />
        )}

        {/* VIEW: KIOSK — STEP 1: PATIENT IDENTITY */}
        {currentView === 'kiosk' && kioskStep === 'splash' && (
          <MediSplashView
            patient={clinicalCase.patient}
            language={language}
            onUpdatePatient={(updated: Partial<PatientProfile>) => updatePatient(updated)}
            onUpdateLanguage={(l: LanguageCode) => setLanguage(l)}
            onStartFlow={() => navigate('kiosk', 'intake')}
          />
        )}

        {/* VIEW: KIOSK — STEP 2: SYMPTOM INTAKE */}
        {currentView === 'kiosk' && kioskStep === 'intake' && (
          <MediIntakeView
            patient={clinicalCase.patient}
            socrates={clinicalCase.socrates}
            dashavidha={clinicalCase.dashavidha}
            language={language}
            onUpdateSocrates={(updated: Partial<SocratesIntake>) => updateSocrates(updated)}
            onUpdateDashavidha={(updated: Partial<DashavidhaIntake>) => updateDashavidha(updated)}
            onBack={() => navigate('kiosk', 'splash')}
            onProceedToOcr={() => navigate('kiosk', 'ocr')}
          />
        )}

        {/* VIEW: KIOSK — STEP 3: PRESCRIPTION OCR */}
        {currentView === 'kiosk' && kioskStep === 'ocr' && (
          <MediOcrView
            ocrRecords={clinicalCase.ocrRecords}
            onAddOcrRecord={(record: OcrExtractedRecord) => addOcrRecord(record)}
            onBack={() => navigate('kiosk', 'intake')}
            onProceedToDoctor={() => navigate('doctor')}
          />
        )}

        {/* VIEW: DOCTOR OPD DASHBOARD */}
        {currentView === 'doctor' && (
          <MediDoctorView
            clinicalSummary={clinicalCase}
            onUpdateNotes={(notes: string) => updateDoctorNotes(notes)}
            onUpdateDiagnosis={(diag: string) =>
              updateDiagnosis(diag, clinicalCase.isRedFlag, clinicalCase.redFlagReason)
            }
            onMarkPushed={() =>
              updateDiagnosis(clinicalCase.finalDiagnosis, clinicalCase.isRedFlag, clinicalCase.redFlagReason)
            }
          />
        )}
      </main>

      {/* === UNIFIED BOTTOM NAV — all views === */}
      <MobileNav
        currentView={currentView}
        kioskStep={kioskStep}
        onSelectView={(view) => navigate(view, view === 'kiosk' ? 'splash' : undefined)}
        onQuickVoice={() => setIsAiModalOpen(true)}
        isVoiceActive={isAiModalOpen}
      />

      {/* === AI VOICE MODAL === */}
      <MediAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        language={language}
        onAppendSymptom={(s: string) => {
          const existing = clinicalCase.socrates.site;
          updateSocrates({ site: existing ? `${existing} ${s}` : s });
          navigate('kiosk', 'intake');
        }}
      />

      {/* === OPD PRINT SLIP (hidden, for @media print) === */}
      <OpdPrintSlip clinicalSummary={clinicalCase} />
    </div>
  );
}

export default App;
