import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Poste de barbeiro girando. Só decoração; o movimento usa apenas transform (leve para a GPU). */
@Component({
  selector: 'app-barber-pole',
  templateUrl: './barber-pole.html',
  styleUrl: './barber-pole.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarberPole {}
