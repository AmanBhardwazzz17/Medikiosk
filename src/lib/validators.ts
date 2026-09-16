/**
 * Strict Input Validators using Zod
 * Enforces zero-compromise input validation per AGENTS.md Rule 8.
 */

import { z } from 'zod';

// ABHA ID format: 14 digits, typically formatted as XX-XXXX-XXXX-XXXX
export const abhaIdRegex = /^\d{2}-\d{4}-\d{4}-\d{4}$/;

export const PatientRegistrationSchema = z.object({
  abhaId: z
    .string()
    .trim()
    .refine((val) => abhaIdRegex.test(val) || /^\d{14}$/.test(val.replace(/\D/g, '')), {
      message: 'ABHA ID must be a valid 14-digit number (e.g. 12-3456-7890-1234)',
    }),
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  age: z.number().int().min(1, 'Age must be positive').max(125, 'Invalid age'),
  gender: z.enum(['Male', 'Female', 'Other']),
  preferredLanguage: z.enum(['en', 'hi', 'bh']),
});

export const SocratesIntakeSchema = z.object({
  site: z.string().trim().min(2, 'Please describe where you feel the discomfort'),
  onset: z.string().trim().optional().default(''),
  character: z.string().trim().optional().default(''),
  radiation: z.string().trim().optional().default(''),
  associations: z.string().trim().optional().default(''),
  timeCourse: z.string().trim().optional().default(''),
  exacerbating: z.string().trim().optional().default(''),
  severity: z.number().min(1).max(10),
});

export const FileUploadSecuritySchema = z.object({
  fileName: z
    .string()
    .max(255)
    .refine((name) => !name.includes('..') && !name.includes('/') && !name.includes('\\'), {
      message: 'Invalid file name (path traversal detected)',
    }),
  fileSize: z.number().max(10 * 1024 * 1024, 'File size exceeds maximum 10MB limit'),
  mimeType: z.enum([
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
  ]),
});

/**
 * Universal HTML Sanitization helper to protect against XSS injection
 */
export function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
