import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';

import { BarberPole } from '@core/components/barber-pole/barber-pole';
import { BUSINESS, DEMO_CONTACT } from '@core/constants/contact.const';
import { HOURS_TABLE, WEEK_SCHEDULE } from '@core/constants/schedule.const';
import { Reveal } from '@core/directives/reveal.directive';
import { getOpenStatus } from '@core/utils/open-status.util';
import { buildWhatsappUrl } from '@core/utils/whatsapp.util';
import { OPEN_STATUS_REFRESH_MS, PERKS, SERVICES } from '@features/views/home/home.const';

@Component({
  selector: 'app-home',
  imports: [BarberPole, Reveal],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  public readonly business = BUSINESS;
  public readonly creator = DEMO_CONTACT;
  public readonly services = SERVICES;
  public readonly perks = PERKS;
  public readonly hoursTable = HOURS_TABLE;
  public readonly currentYear = new Date().getFullYear();

  public readonly whatsappRibbonUrl = buildWhatsappUrl({
    phone: DEMO_CONTACT.whatsappNumber,
    message: DEMO_CONTACT.ribbonMessage,
  });
  public readonly whatsappBookingUrl = buildWhatsappUrl({
    phone: DEMO_CONTACT.whatsappNumber,
    message: DEMO_CONTACT.bookingMessage,
  });

  public readonly openStatus = signal(getOpenStatus(new Date(), WEEK_SCHEDULE));

  constructor() {
    const timer = setInterval(() => this.openStatus.set(getOpenStatus(new Date(), WEEK_SCHEDULE)), OPEN_STATUS_REFRESH_MS);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }
}
