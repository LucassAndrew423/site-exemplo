import {
  BUSINESS_TIME_ZONE,
  DAYS_IN_WEEK,
  MINUTES_PER_HOUR,
  WEEKDAY_INDEX,
  WEEKDAY_NAMES,
} from '@core/constants/schedule.const';
import type { DayHours, OpenStatus } from '@core/interfaces/site.interface';

interface LocalMoment {
  readonly day: number;
  readonly minutes: number;
}

/** Dia da semana e minutos desde a meia-noite no fuso da barbearia, não no do visitante. */
function readLocalMoment(now: Date): LocalMoment {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: BUSINESS_TIME_ZONE,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(now);
  const read = (type: string): string => parts.find((part) => part.type === type)?.value ?? '';
  return {
    day: WEEKDAY_INDEX[read('weekday')] ?? 0,
    minutes: Number(read('hour')) * MINUTES_PER_HOUR + Number(read('minute')),
  };
}

function formatHour(hour: number): string {
  const wholeHours = Math.floor(hour);
  const minutes = Math.round((hour - wholeHours) * MINUTES_PER_HOUR);
  return minutes === 0 ? `${wholeHours}h` : `${wholeHours}h${String(minutes).padStart(2, '0')}`;
}

export function getOpenStatus(now: Date, schedule: readonly (DayHours | undefined)[]): OpenStatus {
  const { day, minutes } = readLocalMoment(now);
  const today = schedule[day];

  if (today && minutes >= today.opens * MINUTES_PER_HOUR && minutes < today.closes * MINUTES_PER_HOUR) {
    return { isOpen: true, label: `Aberto agora · fecha às ${formatHour(today.closes)}` };
  }
  if (today && minutes < today.opens * MINUTES_PER_HOUR) {
    return { isOpen: false, label: `Fechado · abre hoje às ${formatHour(today.opens)}` };
  }
  for (let offset = 1; offset <= DAYS_IN_WEEK; offset += 1) {
    const nextDay = (day + offset) % DAYS_IN_WEEK;
    const next = schedule[nextDay];
    if (next) {
      const when = offset === 1 ? 'amanhã' : (WEEKDAY_NAMES[nextDay] ?? '');
      return { isOpen: false, label: `Fechado · abre ${when} às ${formatHour(next.opens)}` };
    }
  }
  return { isOpen: false, label: 'Fechado' };
}
