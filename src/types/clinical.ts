/**
 * Clinical Domain Types for MediKiosk
 * Covers Allopathic (SOCRATES), AYUSH (Dashavidha), OCR, and ABDM FHIR models.
 */

export type LanguageCode = 'en' | 'hi' | 'bh';

export interface PatientProfile {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  abhaId: string;
  queueNo: string;
  phone?: string;
  bloodGroup?: string;
}

export interface SocratesIntake {
  site: string;           // Kahan takleef hai (Site of pain)
  onset: string;          // Kab se shuru hua (Onset: sudden/gradual)
  character: string;      // Kaisa dard hai (Sharp, dull, squeezing, burning)
  radiation: string;      // Kahi aur fail raha hai (Radiation)
  associations: string;   // Saath me kya hai (Sweating, nausea, shortness of breath)
  timeCourse: string;     // Kab badhta hai (Constant, intermittent)
  exacerbating: string;   // Kisse aaram ya takleef hoti hai (Rest, exertion)
  severity: number;       // 1-10 pain scale
}

export interface DashavidhaIntake {
  prakriti: 'Vata Pradhan' | 'Pitta Pradhan' | 'Kapha Pradhan' | 'Vata-Pitta' | 'Pitta-Kapha' | 'Tridoshaja';
  agni: 'Mandagni (Sluggish)' | 'Tikshnagni (Intense)' | 'Vishamagni (Irregular)' | 'Samagni (Balanced)';
  satmya: 'Madhura & Lavana Rasa' | 'Katu & Tikta' | 'Sarva Rasa Satmya';
  sara: 'Pravara (Superior)' | 'Madhyama (Medium)' | 'Avara (Inferior)';
  aharaShakti: 'Abhyavaharana (Good Appetite)' | 'Jarana Shakti (Moderate Digestion)' | 'Hina (Poor Digestion)';
}

export interface OcrExtractedRecord {
  id: string;
  fileName: string;
  fileSize: number;
  scanDate: string;
  recordType: 'Prescription' | 'Lab Report' | 'Discharge Summary';
  confidenceScore: number; // 0 - 100%
  extractedDiagnosis: string;
  activeMedications: Array<{
    name: string;
    dosage: string;
    frequency: string;
  }>;
  criticalAlerts: string[];
  rawTextPreview: string;
}

export interface ClinicalVitals {
  bloodPressureSys: number;
  bloodPressureDia: number;
  heartRateBpm: number;
  spO2Percent: number;
  temperatureF: number;
}

export interface ClinicalCaseSummary {
  patient: PatientProfile;
  vitals: ClinicalVitals;
  socrates: SocratesIntake;
  dashavidha: DashavidhaIntake;
  ocrRecords: OcrExtractedRecord[];
  doctorNotes: string;
  finalDiagnosis: string;
  isRedFlag: boolean;
  redFlagReason?: string;
  triagePriority: 'P1 - Immediate' | 'P2 - Urgent' | 'P3 - Standard';
  status: 'In Queue' | 'Under Review' | 'Completed' | 'Pushed to ABDM';
}
