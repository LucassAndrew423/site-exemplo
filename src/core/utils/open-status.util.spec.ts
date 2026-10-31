import { WEEK_SCHEDULE } from '@core/constants/schedule.const';
import { getOpenStatus } from '@core/utils/open-status.util';

/** Recife fica em UTC-3, sem horário de verão. 2026-11-02 é uma segunda-feira. */
function recife(isoLocal: string): Date {
  return new Date(`${isoLocal}-03:00`);
}

describe('getOpenStatus', () => {
  it('should be open during business hours and say when it closes', () => {
    expect(getOpenStatus(recife('2026-11-02T12:00:00'), WEEK_SCHEDULE)).toEqual({
      isOpen: true,
      label: 'Aberto agora · fecha às 20h',
    });
  });

  it('should say it opens later today before opening time', () => {
    expect(getOpenStatus(recife('2026-11-02T07:30:00'), WEEK_SCHEDULE)).toEqual({
      isOpen: false,
      label: 'Fechado · abre hoje às 9h',
    });
  });

  it('should say it opens tomorrow after closing time', () => {
    expect(getOpenStatus(recife('2026-11-02T21:00:00'), WEEK_SCHEDULE).label).toBe('Fechado · abre amanhã às 9h');
  });

  it('should skip Sunday and name the next opening day', () => {
    expect(getOpenStatus(recife('2026-10-31T19:00:00'), WEEK_SCHEDULE).label).toBe('Fechado · abre segunda às 9h');
  });

  it('should be closed all day on Sunday', () => {
    expect(getOpenStatus(recife('2026-11-01T12:00:00'), WEEK_SCHEDULE)).toEqual({
      isOpen: false,
      label: 'Fechado · abre amanhã às 9h',
    });
  });

  it('should use the barbershop time zone, not the visitor one', () => {
    // 12:00 em Recife é 15:00 UTC; mesmo instante, qualquer fuso de quem visita
    expect(getOpenStatus(new Date('2026-11-02T15:00:00Z'), WEEK_SCHEDULE).isOpen).toBe(true);
  });
});
