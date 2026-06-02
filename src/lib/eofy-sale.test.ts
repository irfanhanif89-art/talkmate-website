import assert from 'node:assert'
import { EOFY_SALE, isSaleActive, regularPrice } from './eofy-sale'

assert.equal(regularPrice(299), 598)
assert.equal(regularPrice(2990), 5980)
assert.equal(regularPrice(799), 1598)
assert.equal(EOFY_SALE.discountPercent, 50)
assert.equal(EOFY_SALE.badge, '50% OFF · EOFY SALE · ENDS JUNE 30')
assert.equal(isSaleActive(new Date('2026-06-15T12:00:00+10:00')), true)
assert.equal(isSaleActive(new Date('2026-06-30T23:00:00+10:00')), true)
assert.equal(isSaleActive(new Date('2026-07-01T00:00:01+10:00')), false)
console.log('eofy-sale (website) ok')
