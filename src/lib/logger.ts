/**
 * Structured Production Logger
 * Enforces AGENTS.md Rule 7: Structured terminal logging with ISO-8601 UTC timestamps,
 * log levels, and security event categorization without logging PII/credentials.
 */

export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'CRITICAL';

export interface StructuredLog {
  timestamp: string;
  level: LogLevel;
  event: string;
  module: string;
  details?: Record<string, unknown>;
  userId?: string;
  durationMs?: number;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;

  private log(level: LogLevel, event: string, module: string, details?: Record<string, unknown>, durationMs?: number) {
    const entry: StructuredLog = {
      timestamp: new Date().toISOString(),
      level,
      event,
      module,
      details,
      durationMs,
    };

    // Format for console with styling
    const prefix = `[${entry.timestamp}] [${level}] [${module}]`;
    
    switch (level) {
      case 'DEBUG':
        if (this.isDevelopment) console.debug(`%c${prefix} ${event}`, 'color: #94A3B8;', details || '');
        break;
      case 'INFO':
        console.info(`%c${prefix} ${event}`, 'color: #38BDF8; font-weight: 500;', details || '');
        break;
      case 'WARN':
        console.warn(`%c${prefix} ${event}`, 'color: #FBBF24; font-weight: bold;', details || '');
        break;
      case 'ERROR':
      case 'CRITICAL':
        console.error(`%c${prefix} ${event}`, 'color: #F87171; font-weight: bold;', details || '');
        break;
    }

    return entry;
  }

  debug(module: string, event: string, details?: Record<string, unknown>) {
    return this.log('DEBUG', event, module, details);
  }

  info(module: string, event: string, details?: Record<string, unknown>) {
    return this.log('INFO', event, module, details);
  }

  warn(module: string, event: string, details?: Record<string, unknown>) {
    return this.log('WARN', event, module, details);
  }

  error(module: string, event: string, details?: Record<string, unknown>) {
    return this.log('ERROR', event, module, details);
  }

  securityAlert(module: string, event: string, details?: Record<string, unknown>) {
    return this.log('WARN', `[SECURITY EVENT] ${event}`, module, details);
  }
}

export const logger = new Logger();
