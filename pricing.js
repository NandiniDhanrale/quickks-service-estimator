/* Independent business logic: no DOM or browser dependencies. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.QuickksPricing = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const RATES = Object.freeze({ electrician: 300, plumber: 250, carpenter: 350 });
  const EMERGENCY_FEE = 100;

  function calculateEstimate(service, hours, emergency = false) {
    if (typeof service !== 'string' || !Object.prototype.hasOwnProperty.call(RATES, service)) {
      throw new Error('Please select a valid service.');
    }
    // Reject blank, nonnumeric, fractional, infinite and unsafe integer inputs.
    if (typeof hours === 'string' && hours.trim() === '') {
      throw new Error('Please enter working hours (minimum 1).');
    }
    if (typeof hours !== 'number' && typeof hours !== 'string') {
      throw new Error('Please enter valid working hours.');
    }
    const numericHours = Number(hours);
    if (!Number.isSafeInteger(numericHours) || numericHours < 1) {
      throw new Error('Working hours must be a whole number of at least 1.');
    }
    if (typeof emergency !== 'boolean') {
      throw new Error('Emergency booking must be true or false.');
    }
    const rate = RATES[service];
    const basePrice = rate * numericHours;
    const emergencyFee = emergency ? EMERGENCY_FEE : 0;
    const totalPrice = basePrice + emergencyFee;
    if (!Number.isSafeInteger(totalPrice)) {
      throw new Error('Working hours are too large.');
    }
    return { service, hours: numericHours, rate, basePrice, emergencyFee, totalPrice };
  }
  return { RATES, EMERGENCY_FEE, calculateEstimate };
});
