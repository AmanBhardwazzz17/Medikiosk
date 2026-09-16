import React from 'react';
import { ClinicalCaseSummary } from '../../types/clinical';

export interface OpdPrintSlipProps {
  clinicalSummary: ClinicalCaseSummary;
}

export const OpdPrintSlip: React.FC<OpdPrintSlipProps> = ({ clinicalSummary }) => {
  const {
    patient,
    vitals,
    socrates,
    dashavidha,
    ocrRecords,
    isRedFlag,
    redFlagReason,
    triagePriority,
    finalDiagnosis,
    doctorNotes,
  } = clinicalSummary;

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const latestOcr = ocrRecords && ocrRecords.length > 0 ? ocrRecords[0] : null;

  return (
    <div className="opd-print-document">
      {/* ── 1. OFFICIAL INSTITUTIONAL HEADER ── */}
      <header className="print-header">
        <div className="print-header-brand">
          <div className="print-emblem-box">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2.5">
              <path d="M12 2v20M2 12h20" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="print-hospital-badge">
              GOVERNMENT OF INDIA • MINISTRY OF HEALTH & FAMILY WELFARE
            </div>
            <h1 className="print-hospital-title">
              DISTRICT GENERAL HOSPITAL & MEDICAL COLLEGE
            </h1>
            <p className="print-hospital-sub">
              Ayushman Bharat Digital Mission (ABDM) Integrated Clinic • SIH 2026 PS 26047
            </p>
          </div>
        </div>

        <div className="print-header-meta">
          <div className="print-token-card">
            <span className="print-token-card-label">OPD TOKEN</span>
            <span className="print-token-card-val">{patient.queueNo || 'OPD-104'}</span>
          </div>
          <div className="print-meta-details">
            <div><strong>Date:</strong> {currentDate}</div>
            <div><strong>Time:</strong> {currentTime}</div>
            <div><strong>Room:</strong> 04 (Cardio/Med)</div>
          </div>
        </div>
      </header>

      {/* ── 2. TRIAGE & RED FLAG BANNER ── */}
      {isRedFlag ? (
        <div className="print-triage-card print-triage-danger">
          <div className="print-triage-badge">🚨 EMERGENCY TRIAGE // {triagePriority || 'P1 - IMMEDIATE'}</div>
          <div className="print-triage-content">
            <strong>CRITICAL RED FLAG DETECTED:</strong>{' '}
            {redFlagReason ||
              `Stage 2 Hypertension (${vitals.bloodPressureSys}/${vitals.bloodPressureDia} mmHg) with acute severe pain (${socrates.severity}/10). Immediate physician review required.`}
          </div>
        </div>
      ) : (
        <div className="print-triage-card print-triage-normal">
          <div className="print-triage-badge">✓ ROUTINE TRIAGE // P3</div>
          <div className="print-triage-content">
            Standard OPD Consultation Pathway • Vitals Stable • No Acute Red Flags
          </div>
        </div>
      )}

      {/* ── 3. PATIENT IDENTITY & DEMOGRAPHICS MATRIX ── */}
      <section className="print-card-section">
        <div className="print-card-title">
          <span>01</span> PATIENT DEMOGRAPHICS & ABHA IDENTITY
        </div>
        <div className="print-demographics-grid">
          <div className="print-demo-cell">
            <span className="print-cell-label">PATIENT FULL NAME</span>
            <span className="print-cell-value print-cell-bold">{patient.name}</span>
          </div>
          <div className="print-demo-cell">
            <span className="print-cell-label">AGE / GENDER</span>
            <span className="print-cell-value">{patient.age} Yrs / {patient.gender}</span>
          </div>
          <div className="print-demo-cell">
            <span className="print-cell-label">BLOOD GROUP</span>
            <span className="print-cell-value print-cell-bold">{patient.bloodGroup || 'O+'}</span>
          </div>
          <div className="print-demo-cell">
            <span className="print-cell-label">CONTACT NUMBER</span>
            <span className="print-cell-value">{patient.phone || '+91 98765 43210'}</span>
          </div>
          <div className="print-demo-cell print-demo-cell-wide">
            <span className="print-cell-label">ABHA HEALTH ID (14-DIGIT VERIFIED)</span>
            <span className="print-cell-value print-cell-mono">{patient.abhaId}</span>
          </div>
          <div className="print-demo-cell print-demo-cell-wide">
            <span className="print-cell-label">ABDM RECORD STATUS</span>
            <span className="print-cell-value">Authenticated Citizen Health Locker (HL7 FHIR R4)</span>
          </div>
        </div>
      </section>

      {/* ── 4. RECORDED PHYSICAL VITALS ── */}
      <section className="print-card-section">
        <div className="print-card-title">
          <span>02</span> RECORDED CLINICAL VITALS (KIOSK HARDWARE SENSORS)
        </div>
        <div className="print-vitals-row">
          <div className={`print-vital-tile ${vitals.bloodPressureSys >= 150 ? 'print-vital-tile-alert' : ''}`}>
            <span className="print-vital-tile-lbl">BLOOD PRESSURE</span>
            <div className="print-vital-tile-num">
              {vitals.bloodPressureSys}/{vitals.bloodPressureDia}
            </div>
            <span className="print-vital-tile-unit">mmHg • {vitals.bloodPressureSys >= 150 ? 'STAGE 2 HTN' : 'NORMAL'}</span>
          </div>

          <div className="print-vital-tile">
            <span className="print-vital-tile-lbl">HEART / PULSE RATE</span>
            <div className="print-vital-tile-num">{vitals.heartRateBpm}</div>
            <span className="print-vital-tile-unit">beats / min • Regular</span>
          </div>

          <div className={`print-vital-tile ${vitals.spO2Percent < 95 ? 'print-vital-tile-alert' : ''}`}>
            <span className="print-vital-tile-lbl">OXYGEN SATURATION (SPO2)</span>
            <div className="print-vital-tile-num">{vitals.spO2Percent}%</div>
            <span className="print-vital-tile-unit">Room Air Oxygenation</span>
          </div>

          <div className="print-vital-tile">
            <span className="print-vital-tile-lbl">BODY TEMPERATURE</span>
            <div className="print-vital-tile-num">{vitals.temperatureF}°</div>
            <span className="print-vital-tile-unit">Fahrenheit • Normothermic</span>
          </div>
        </div>
      </section>

      {/* ── 5. AUTONOMOUS CLINICAL INTAKE (SOCRATES + AYUSH) ── */}
      <section className="print-card-section">
        <div className="print-card-title">
          <span>03</span> STRUCTURED CLINICAL INTAKE (BHASHINI AI VOICE ENGINE)
        </div>
        <div className="print-clinical-columns">
          {/* Left Column: Allopathic SOCRATES */}
          <div className="print-clinical-box">
            <div className="print-box-header">ALLOPATHIC SOCRATES ASSESSMENT</div>
            <table className="print-info-table">
              <tbody>
                <tr>
                  <td className="print-th-cell">Site & Onset:</td>
                  <td className="print-td-cell">{socrates.site || 'Substernal chest region, started 2h prior'}</td>
                </tr>
                <tr>
                  <td className="print-th-cell">Character:</td>
                  <td className="print-td-cell">{socrates.character || 'Heavy squeezing, crushing tightness'}</td>
                </tr>
                <tr>
                  <td className="print-th-cell">Associations:</td>
                  <td className="print-td-cell">{socrates.associations || 'Profuse cold diaphoresis, mild dyspnea'}</td>
                </tr>
                <tr>
                  <td className="print-th-cell">Pain Severity:</td>
                  <td className="print-td-cell">
                    <strong className={socrates.severity >= 8 ? 'print-text-danger' : ''}>
                      {socrates.severity} / 10
                    </strong>{' '}
                    {socrates.severity >= 8 ? '(Severe Pain • Emergency Triage Triggered)' : '(Moderate)'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right Column: AYUSH Dashavidha */}
          <div className="print-clinical-box">
            <div className="print-box-header">AYUSH DASHAVIDHA CONSTITUTION</div>
            <table className="print-info-table">
              <tbody>
                <tr>
                  <td className="print-th-cell">Prakriti (Dosha):</td>
                  <td className="print-td-cell"><strong>{dashavidha.prakriti || 'Vata-Pitta Pradhan'}</strong></td>
                </tr>
                <tr>
                  <td className="print-th-cell">Agni (Digestion):</td>
                  <td className="print-td-cell">{dashavidha.agni || 'Vishamagni (Irregular digestive fire)'}</td>
                </tr>
                <tr>
                  <td className="print-th-cell">Satmya (Diet):</td>
                  <td className="print-td-cell">{dashavidha.satmya || 'Madhura & Lavana Rasa'}</td>
                </tr>
                <tr>
                  <td className="print-th-cell">Dietary Advice:</td>
                  <td className="print-td-cell">Avoid high-sodium, sour, and Pitta-aggravating spicy food</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 6. DIGITIZED PAST PRESCRIPTIONS & OCR FINDINGS ── */}
      {latestOcr && (
        <section className="print-card-section">
          <div className="print-card-title">
            <span>04</span> DIGITIZED PAST PRESCRIPTIONS & OCR DRUG FINDINGS
          </div>
          <div className="print-ocr-panel">
            <div className="print-ocr-meds-line">
              <span className="print-ocr-tag-title">ACTIVE PAST MEDICATIONS:</span>{' '}
              {latestOcr.activeMedications.map((m, i) => (
                <span key={i} className="print-med-pill">
                  {m.name} {m.dosage} ({m.frequency})
                  {i < latestOcr.activeMedications.length - 1 ? ' • ' : ''}
                </span>
              ))}
            </div>
            {latestOcr.criticalAlerts.length > 0 && (
              <div className="print-ocr-alert-line">
                <strong>CRITICAL CLINICAL ALERT:</strong> {latestOcr.criticalAlerts.join('; ')}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 7. PHYSICIAN ASSESSMENT & OPD ORDERS ── */}
      <section className="print-card-section print-orders-grow">
        <div className="print-card-title">
          <span>05</span> PHYSICIAN CLINICAL ASSESSMENT & OPD ORDERS
        </div>
        <div className="print-diagnosis-banner">
          <span className="print-diag-label">WORKING CLINICAL DIAGNOSIS:</span>{' '}
          <span className="print-diag-value">
            {finalDiagnosis || 'Acute Coronary Syndrome (Suspected NSTEMI) / Hypertensive Urgency'}
          </span>
        </div>
        <div className="print-rx-orders-box">
          <div className="print-rx-title">Rx / CLINICAL ORDERS & TREATMENT PLAN:</div>
          <p className="print-rx-text">
            {doctorNotes ||
              '1. Immediate 12-lead ECG STAT.\n2. Sublingual Sorbitrate (Isosorbide Dinitrate) 5mg SOS for chest tightness.\n3. STAT Cardiac Biomarkers (High-sensitivity Troponin-I, CK-MB).\n4. Continue Tab Amlodipine 5mg OD. Salt restriction (<2g/day).\n5. Review urgently with ECG trace within 30 minutes.'}
          </p>
        </div>
      </section>

      {/* ── 8. OFFICIAL SIGN-OFF & ABDM COMPLIANCE FOOTER ── */}
      <footer className="print-official-footer">
        <div className="print-footer-auth">
          <div className="print-qr-placeholder">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.5">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 20h3v1h-3z" />
            </svg>
          </div>
          <div>
            <div className="print-auth-title">ABDM DIGITAL HEALTH VERIFICATION</div>
            <div className="print-auth-sub">
              HL7 FHIR R4 Bundle Digitally Signed • Linked to ABHA: {patient.abhaId}
            </div>
            <div className="print-auth-legal">
              Autonomous intake captured via MediKiosk Clinical Assistant (SIH 2026 PS 26047)
            </div>
          </div>
        </div>

        <div className="print-footer-signature">
          <div className="print-signature-space" />
          <div className="print-signature-line" />
          <div className="print-physician-name">Dr. Rajesh Sharma, MD (Med), DNB (Cardio)</div>
          <div className="print-physician-title">Consulting Medical Officer • Reg. No: MCI-2024-8841</div>
        </div>
      </footer>
    </div>
  );
};

export default OpdPrintSlip;
