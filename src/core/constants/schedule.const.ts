import type { DayHours, HoursRow } from '@core/interfaces/site.interface';

export const BUSINESS_TIME_ZONE = 'America/Recife';
export const MINUTES_PER_HOUR = 60;
export const DAYS_IN_WEEK = 7;

export const WEEKDAY_INDEX: Readonly<Record<string, number>> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
export const WEEKDAY_NAMES: readonly string[] = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

/** Do domingo (0) ao sábado (6). Dia sem horário = fechado. */
export const WEEK_SCHEDULE: readonly (DayHours | undefined)[] = [
  undefined,
  { opens: 9, closes: 20 },
  { opens: 9, closes: 20 },
  { opens: 9, closes: 20 },
  { opens: 9, closes: 20 },
  { opens: 9, closes: 20 },
  { opens: 8, closes: 18 },
];

export const HOURS_TABLE: readonly HoursRow[] = [
  { days: 'Segunda a sexta', hours: '9h às 20h' },
  { days: 'Sábado', hours: '8h às 18h' },
  { days: 'Domingo', hours: 'Fechado' },
];
