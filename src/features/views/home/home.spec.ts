import { TestBed } from '@angular/core/testing';

import { Home } from '@features/views/home/home';

describe('Home', () => {
  async function render(): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('should show every service with its price', async () => {
    const page = await render();

    const items = page.querySelectorAll('.menu__item');
    expect(items.length).toBe(6);
    expect(items[0]?.textContent).toContain('Corte clássico');
    expect(items[0]?.textContent).toContain('R$ 45');
  });

  it('should send every booking button to the creator WhatsApp with a prefilled message', async () => {
    const page = await render();

    const links = [...page.querySelectorAll<HTMLAnchorElement>('a[href^="https://wa.me/"]')];
    expect(links.length).toBeGreaterThan(3);
    links.forEach((link) => {
      expect(link.href).toContain('https://wa.me/5581985837895?text=');
      expect(link.rel).toContain('noopener');
    });
  });

  it('should tell the visitor that this is a demo site', async () => {
    const page = await render();

    expect(page.querySelector('.ribbon')?.textContent).toContain('Site de exemplo');
    expect(page.querySelector('.footer')?.textContent).toContain('negócio fictício');
  });

  it('should show whether the barbershop is open', async () => {
    const page = await render();

    expect(page.querySelector('.hero__status')?.textContent).toMatch(/Aberto agora|Fechado/);
  });
});
