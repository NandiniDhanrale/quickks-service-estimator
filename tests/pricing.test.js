import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateEstimate, SERVICES, SERVICE_RATES, MIN_HOURS, MAX_HOURS, EMERGENCY_FEE, formatRupees } from '../src/utils/pricing.js';
for (const [service, { label, rate }] of Object.entries(SERVICES)) {
  test(`${service}: synchronized label and rate`, () => {
    assert.equal(SERVICE_RATES[service], rate);
    assert.equal(calculateEstimate(service, 1).serviceLabel, label);
  });
  test(`${service}: minimum hours`, () => {
    assert.equal(calculateEstimate(service, MIN_HOURS).totalPrice, rate);
  });
  test(`${service}: maximum hours inclusive`, () => {
    assert.equal(calculateEstimate(service, MAX_HOURS).totalPrice, rate * MAX_HOURS);
  });
  test(`${service}: flat emergency fee and breakdown`, () => {
    const result = calculateEstimate(service, 3, true);
    assert.equal(result.rate, rate);
    assert.equal(result.hours, 3);
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
for (const hours of [0, -1, -5, '', '  ', 'abc', '1.5', 1.5, NaN, Infinity, null, undefined, {}, Number.MAX_SAFE_INTEGER + 1, 25, '25', 100]) {
  test(`invalid hours ${String(hours)} rejected`, () => {
    assert.throws(() => calculateEstimate('electrician', hours));
  });
}
test('max hours error is specific', () => {
  assert.throws(() => calculateEstimate('plumber', 25), /cannot exceed 24/);
});
test('invalid service rejected', () => {
  assert.throws(() => calculateEstimate('painter', 2));
  assert.throws(() => calculateEstimate('__proto__', 2));
});
test('invalid emergency flag rejected', () => {
  assert.throws(() => calculateEstimate('plumber', 2, 'yes'));
});
test('INR formatting', () => {
  assert.equal(formatRupees(1100), '₹1,100');
});
