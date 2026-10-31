import { buildWhatsappUrl } from '@core/utils/whatsapp.util';

describe('buildWhatsappUrl', () => {
  it('should encode the message in the wa.me link', () => {
    const url = buildWhatsappUrl({ phone: '5581985837895', message: 'Olá, Lucas! Quero um site.' });

    expect(url).toBe('https://wa.me/5581985837895?text=Ol%C3%A1%2C%20Lucas!%20Quero%20um%20site.');
  });
});
