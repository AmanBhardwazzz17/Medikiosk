// MOCK DATA — REMOVE BEFORE PRODUCTION
// In accordance with AGENTS.md Rule 11: Strictly separated mock datasets
// for development, demonstration, and offline kiosk simulations.

import { ClinicalCaseSummary, PatientProfile } from '../types/clinical';

export const SAMPLE_PATIENTS: PatientProfile[] = [
  {
    name: 'Rajesh Kumar',
    age: 42,
    gender: 'Male',
    abhaId: '12-3456-7890-1234',
    queueNo: 'OPD-104',
    phone: '+91 98765 43210',
    bloodGroup: 'B+',
  },
  {
    name: 'Sunita Devi',
    age: 38,
    gender: 'Female',
    abhaId: '14-5512-8874-9021',
    queueNo: 'OPD-105',
    phone: '+91 91234 56789',
    bloodGroup: 'O+',
  },
  {
    name: 'Anand Verma',
    age: 56,
    gender: 'Male',
    abhaId: '82-3341-9921-6543',
    queueNo: 'OPD-106',
    phone: '+91 94567 89012',
    bloodGroup: 'A+',
  },
];

export const INITIAL_CASE_SUMMARY: ClinicalCaseSummary = {
  patient: {
    name: 'Rajesh Kumar',
    age: 42,
    gender: 'Male',
    abhaId: '12-3456-7890-1234',
    queueNo: 'OPD-104',
    phone: '+91 98765 43210',
    bloodGroup: 'B+',
  },
  vitals: {
    bloodPressureSys: 160,
    bloodPressureDia: 100,
    heartRateBpm: 104,
    spO2Percent: 96,
    temperatureF: 98.6,
  },
  socrates: {
    site: 'Substernal retrosternal chest region, radiates to left shoulder & jaw',
    onset: 'Acute onset, sudden onset started 2 hours ago during morning walk',
    character: 'Heavy squeezing, crushing tightness, pressure sensation',
    radiation: 'Left shoulder, medial aspect of left arm',
    associations: 'Profuse cold diaphoresis (sweating), lightheadedness, nausea',
    timeCourse: 'Progressively worsening, persistent for past 45 minutes',
    exacerbating: 'Worse on minimal exertion; no relief upon sitting down',
    severity: 8,
  },
  dashavidha: {
    prakriti: 'Vata-Pitta',
    agni: 'Mandagni (Sluggish)',
    satmya: 'Madhura & Lavana Rasa',
    sara: 'Madhyama (Medium)',
    aharaShakti: 'Jarana Shakti (Moderate Digestion)',
  },
  ocrRecords: [
    {
      id: 'ocr-doc-001',
      fileName: 'Prescription_DrMehta_Oct2025.jpg',
      fileSize: 1420500,
      scanDate: '2025-10-12',
      recordType: 'Prescription',
      confidenceScore: 94,
      extractedDiagnosis: 'Essential Hypertension (Stage II) with Mild Angina',
      activeMedications: [
        { name: 'Amlodipine', dosage: '5mg', frequency: 'OD (Once Daily) - Morning' },
        { name: 'Aspirin', dosage: '75mg', frequency: 'OD - Post Lunch' },
        { name: 'Atorvastatin', dosage: '20mg', frequency: 'HS (Bedtime)' },
      ],
      criticalAlerts: [
        'Hypertension history flagged in prior records',
        'Patient reports missed doses for 3 consecutive days',
      ],
      rawTextPreview: 'Rx: Tab Amlodipine 5mg OD, Tab Ecosprin 75mg OD. Advised ECG & Lipid Profile. Review in 1 month.',
    },
  ],
  doctorNotes: 'Patient presents with classic anginal pain and elevated blood pressure (160/100). Immediate 12-lead ECG ordered. Sublingual nitrates administered. Troponin-I sent for urgent stat evaluation.',
  finalDiagnosis: 'Acute Coronary Syndrome (Suspected NSTEMI) / Hypertensive Urgency',
  isRedFlag: true,
  redFlagReason: 'Severe substernal chest pain (Severity 8/10) with Stage 2 Hypertension (160/100 mmHg) and tachycardia.',
  triagePriority: 'P1 - Immediate',
  status: 'In Queue',
};
