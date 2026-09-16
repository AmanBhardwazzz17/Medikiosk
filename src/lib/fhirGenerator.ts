/**
 * ABDM FHIR R4 Clinical Document Generator
 * Formats clinical intake, vitals, and diagnoses into a standardized
 * HL7 FHIR R4 Bundle compliant with Ayushman Bharat Digital Mission (ABDM) specifications.
 */

import { ClinicalCaseSummary } from '../types/clinical';

export function generateAbdmFhirBundle(clinicalSummary: ClinicalCaseSummary) {
  const bundleId = `bundle-opd-${Date.now()}`;
  const timestamp = new Date().toISOString();

  return {
    resourceType: 'Bundle',
    id: bundleId,
    meta: {
      versionId: '1',
      lastUpdated: timestamp,
      profile: [
        'https://nrces.in/ndhm/fhir/r4/StructureDefinition/OPConsultRecord',
      ],
    },
    identifier: {
      system: 'https://ndhm.in/phr/fhir/bundle',
      value: bundleId,
    },
    type: 'document',
    timestamp: timestamp,
    entry: [
      // 1. Composition Header
      {
        fullUrl: `urn:uuid:composition-${clinicalSummary.patient.queueNo}`,
        resource: {
          resourceType: 'Composition',
          status: 'final',
          type: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '371530004',
                display: 'Clinical consultation report',
              },
            ],
            text: 'OPD Clinical Intake & Case Summary',
          },
          subject: {
            reference: `urn:uuid:patient-${clinicalSummary.patient.abhaId}`,
            display: clinicalSummary.patient.name,
          },
          date: timestamp,
          title: 'MediKiosk Automated Patient Intake Record',
        },
      },
      // 2. Patient Resource
      {
        fullUrl: `urn:uuid:patient-${clinicalSummary.patient.abhaId}`,
        resource: {
          resourceType: 'Patient',
          identifier: [
            {
              type: {
                coding: [
                  {
                    system: 'https://nrces.in/ndhm/fhir/r4/StructureDefinition/IdentifierType',
                    code: 'ABHA',
                    display: 'Ayushman Bharat Health Account',
                  },
                ],
              },
              system: 'https://healthid.ndhm.gov.in',
              value: clinicalSummary.patient.abhaId,
            },
          ],
          name: [
            {
              use: 'official',
              text: clinicalSummary.patient.name,
            },
          ],
          gender: clinicalSummary.patient.gender.toLowerCase(),
          birthDate: `${new Date().getFullYear() - clinicalSummary.patient.age}-01-01`,
        },
      },
      // 3. Condition / Diagnosis
      {
        fullUrl: 'urn:uuid:condition-001',
        resource: {
          resourceType: 'Condition',
          clinicalStatus: {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
                code: 'active',
              },
            ],
          },
          verificationStatus: {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status',
                code: 'provisional',
              },
            ],
          },
          code: {
            text: clinicalSummary.finalDiagnosis,
          },
          subject: {
            reference: `urn:uuid:patient-${clinicalSummary.patient.abhaId}`,
          },
          note: [
            {
              text: `SOCRATES Intake: ${clinicalSummary.socrates.site}. Severity: ${clinicalSummary.socrates.severity}/10.`,
            },
            {
              text: `AYUSH Dashavidha: Prakriti: ${clinicalSummary.dashavidha.prakriti}, Agni: ${clinicalSummary.dashavidha.agni}.`,
            },
          ],
        },
      },
      // 4. Observation (Vitals: Blood Pressure)
      {
        fullUrl: 'urn:uuid:observation-vitals',
        resource: {
          resourceType: 'Observation',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://terminology.hl7.org/CodeSystem/observation-category',
                  code: 'vital-signs',
                  display: 'Vital Signs',
                },
              ],
            },
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '85354-9',
                display: 'Blood pressure panel with all children optional',
              },
            ],
          },
          component: [
            {
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '8480-6',
                    display: 'Systolic blood pressure',
                  },
                ],
              },
              valueQuantity: {
                value: clinicalSummary.vitals.bloodPressureSys,
                unit: 'mmHg',
                system: 'http://unitsofmeasure.org',
                code: 'mm[Hg]',
              },
            },
            {
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '8462-4',
                    display: 'Diastolic blood pressure',
                  },
                ],
              },
              valueQuantity: {
                value: clinicalSummary.vitals.bloodPressureDia,
                unit: 'mmHg',
                system: 'http://unitsofmeasure.org',
                code: 'mm[Hg]',
              },
            },
          ],
        },
      },
    ],
  };
}
