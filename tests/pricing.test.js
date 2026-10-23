import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateEstimate, SERVICE_RATES, EMERGENCY_FEE, formatRupees } from '../src/utils/pricing.js';
for (const [service, rate] of Object.entries(SERVICE_RATES)) {
  test(service + ': minimum one hour', () => {
    assert.equal(calculateEstimate(service, 1).totalPrice, rate);
  });
  test(service + ': emergency fee charged once', () => {
    const result = calculateEstimate(service, 3, true);
    assert.equal(result.basePrice, rate * 3);
    assert.equal(result.emergencyFee, EMERGENCY_FEE);
    assert.equal(result.totalPrice, rate * 3 + EMERGENCY_FEE);
  });
}
test('plumber four hours emergency = 1100', () => {
  assert.equal(calculateEstimate('plumber', 4, true).totalPrice, 1100);
});
test('HTML string hours accepted', () => {
  assert.equal(calculateEstimate('carpenter', '2').totalPrice, 700);
});
for (const hours of [0, -1, -5, '', '  ', 'abc', '1.5', 1.5, NaN, Infinity, null, undefined, {}, Number.MAX_SAFE_INTEGER + 1]) {
  test('invalid hours ' + String(hours) + ' rejected', () => {
    assert.throws(() => calculateEstimate('electrician', hours));
  });
}
test('invalid service rejected', () => {
  assert.throws(() => calculateEstimate('painter', 2));
  assert.throws(() => calculateEstimate('__proto__', 2));
});
test('invalid emergency flag rejected', () => {
  assert.throws(() => calculateEstimate('plumber', 2, 'yes'));
});
test('unsafe total rejected', () => {
  assert.throws(() => calculateEstimate('carpenter', Number.MAX_SAFE_INTEGER, true));
});
test('INR formatting', () => {
  assert.equal(formatRupees(1100), '₹1,100');
});
