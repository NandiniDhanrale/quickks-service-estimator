const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateEstimate, RATES, EMERGENCY_FEE } = require('../pricing.js');

for (const [service, rate] of Object.entries(RATES)) {
  test(`${service}: minimum one hour`, () => {
    assert.equal(calculateEstimate(service, 1, false).totalPrice, rate);
  });
  test(`${service}: emergency fee charged once`, () => {
    const result = calculateEstimate(service, 3, true);
    assert.equal(result.basePrice, rate * 3);
    assert.equal(result.emergencyFee, EMERGENCY_FEE);
    assert.equal(result.totalPrice, rate * 3 + EMERGENCY_FEE);
  });
}
test('plumber four hours emergency = 1100', () => {
  assert.equal(calculateEstimate('plumber', 4, true).totalPrice, 1100);
});
test('numeric string hours from HTML is accepted', () => {
  assert.equal(calculateEstimate('carpenter', '2', false).totalPrice, 700);
});
for (const hours of [0, -1, -5, '', '  ', 'abc', '1.5', 1.5, NaN, Infinity, null, undefined, {}, Number.MAX_SAFE_INTEGER + 1]) {
  test(`invalid hours ${String(hours)} rejected`, () => {
    assert.throws(() => calculateEstimate('electrician', hours, false));
  });
}
test('invalid service rejected', () => {
  assert.throws(() => calculateEstimate('painter', 2, false));
  assert.throws(() => calculateEstimate('__proto__', 2, false));
});
test('invalid emergency flag rejected', () => {
  assert.throws(() => calculateEstimate('plumber', 2, 'yes'));
});
test('unreasonably large totals rejected', () => {
  assert.throws(() => calculateEstimate('carpenter', Number.MAX_SAFE_INTEGER, true));
});
