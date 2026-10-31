import type { Perk, Service } from '@core/interfaces/site.interface';

/** Preços ilustrativos: este é um site de demonstração. */
export const SERVICES: readonly Service[] = [
  { name: 'Corte clássico', description: 'Tesoura e máquina, do jeito que você gosta.', price: 'R$ 45' },
  { name: 'Barba na toalha quente', description: 'Navalha, toalha quente e hidratação.', price: 'R$ 35' },
  { name: 'Corte + barba', description: 'O combo completo, com desconto.', price: 'R$ 70' },
  { name: 'Pezinho e acabamento', description: 'Para manter o corte alinhado entre as visitas.', price: 'R$ 15' },
  { name: 'Sobrancelha', description: 'Na navalha, com acabamento natural.', price: 'R$ 15' },
  { name: 'Pigmentação de barba', description: 'Preenche falhas e realça o contorno.', price: 'R$ 40' },
];

export const PERKS: readonly Perk[] = [
  { icon: '🗓️', title: 'Hora marcada', description: 'Agende pelo WhatsApp e chegue na hora. Sem fila.' },
  { icon: '🥃', title: 'Ambiente climatizado', description: 'Cafezinho, cerveja gelada e boa música enquanto você espera.' },
  { icon: '🧴', title: 'Produtos de qualidade', description: 'Pomadas, óleos e cuidados para levar para casa.' },
];

export const OPEN_STATUS_REFRESH_MS = 60_000;
