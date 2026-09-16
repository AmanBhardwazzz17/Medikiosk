import { create } from 'zustand';
import { ClinicalCaseSummary, PatientProfile, SocratesIntake, DashavidhaIntake, OcrExtractedRecord, ClinicalVitals } from '../types/clinical';
import { INITIAL_CASE_SUMMARY } from '../mocks/data'; // We will use this as a fallback/initial template for now, but in a real app this would start empty.

interface ClinicalStoreState {
  activeCase: ClinicalCaseSummary | null;
  setActiveCase: (caseData: ClinicalCaseSummary) => void;
  updatePatient: (patient: Partial<PatientProfile>) => void;
  updateSocrates: (socrates: Partial<SocratesIntake>) => void;
  updateDashavidha: (dashavidha: Partial<DashavidhaIntake>) => void;
  updateVitals: (vitals: Partial<ClinicalVitals>) => void;
  addOcrRecord: (record: OcrExtractedRecord) => void;
  updateDoctorNotes: (notes: string) => void;
  updateDiagnosis: (diagnosis: string, isRedFlag: boolean, redFlagReason?: string) => void;
  clearActiveCase: () => void;
}

export const useClinicalStore = create<ClinicalStoreState>((set) => ({
  activeCase: INITIAL_CASE_SUMMARY, // Starting with mock data for easy UI development, to be replaced with `null` eventually

  setActiveCase: (caseData) => set({ activeCase: caseData }),

  updatePatient: (patient) => set((state) => ({
    activeCase: state.activeCase ? {
      ...state.activeCase,
      patient: { ...state.activeCase.patient, ...patient }
    } : null
  })),

  updateSocrates: (socrates) => set((state) => ({
    activeCase: state.activeCase ? {
      ...state.activeCase,
      socrates: { ...state.activeCase.socrates, ...socrates }
    } : null
  })),

  updateDashavidha: (dashavidha) => set((state) => ({
    activeCase: state.activeCase ? {
      ...state.activeCase,
      dashavidha: { ...state.activeCase.dashavidha, ...dashavidha }
    } : null
  })),

  updateVitals: (vitals) => set((state) => ({
    activeCase: state.activeCase ? {
      ...state.activeCase,
      vitals: { ...state.activeCase.vitals, ...vitals }
    } : null
  })),

  addOcrRecord: (record) => set((state) => ({
    activeCase: state.activeCase ? {
      ...state.activeCase,
      ocrRecords: [...state.activeCase.ocrRecords, record]
    } : null
  })),

  updateDoctorNotes: (notes) => set((state) => ({
    activeCase: state.activeCase ? {
      ...state.activeCase,
      doctorNotes: notes
    } : null
  })),

  updateDiagnosis: (diagnosis, isRedFlag, redFlagReason) => set((state) => ({
    activeCase: state.activeCase ? {
      ...state.activeCase,
      finalDiagnosis: diagnosis,
      isRedFlag,
      redFlagReason
    } : null
  })),

  clearActiveCase: () => set({ activeCase: null })
}));
