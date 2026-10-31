import { WHATSAPP_BASE_URL } from '@core/constants/contact.const';
import type { WhatsappUrlParams } from '@core/interfaces/site.interface';

export function buildWhatsappUrl({ phone, message }: WhatsappUrlParams): string {
  return `${WHATSAPP_BASE_URL}/${phone}?text=${encodeURIComponent(message)}`;
}
