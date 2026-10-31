export interface WhatsappUrlParams {
  readonly phone: string;
  readonly message: string;
}

export interface Service {
  readonly name: string;
  readonly description: string;
  readonly price: string;
}

export interface Perk {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}

/** Horário de funcionamento de um dia, em horas (ex.: 9 e 20 = das 9h às 20h). */
export interface DayHours {
  readonly opens: number;
  readonly closes: number;
}

export interface HoursRow {
  readonly days: string;
  readonly hours: string;
}

export interface OpenStatus {
  readonly isOpen: boolean;
  readonly label: string;
}
