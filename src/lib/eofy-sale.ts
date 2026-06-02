// EOFY 50%-off sale — DISPLAY ONLY. Net price charged is unchanged; the
// "regular" price is computed (net × 2) purely for the struck-through display.
// isSaleActive() auto-reverts every surface after the end date — no deploy needed.

export const EOFY_SALE = {
  label: 'EOFY Sale',
  discountPercent: 50,
  regularMultiplier: 2,
  // End of 30 June 2026, AEST (UTC+10).
  endsAt: new Date('2026-06-30T23:59:59+10:00'),
  badge: '50% OFF · EOFY SALE · ENDS JUNE 30',
} as const

export function isSaleActive(now: Date = new Date()): boolean {
  return now.getTime() <= EOFY_SALE.endsAt.getTime()
}

export function regularPrice(net: number): number {
  return net * EOFY_SALE.regularMultiplier
}
