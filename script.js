'use strict';
const form = document.getElementById('estimate-form');
const serviceInput = document.getElementById('service');
const hoursInput = document.getElementById('hours');
const emergencyInput = document.getElementById('emergency');
const errorEl = document.getElementById('hours-error');
const resultEl = document.getElementById('result');
const money = amount => `₹${amount.toLocaleString('en-IN')}`;
const labels = { electrician: 'Electrician', plumber: 'Plumber', carpenter: 'Carpenter' };

function clearError() {
  errorEl.hidden = true;
  errorEl.textContent = '';
  hoursInput.removeAttribute('aria-invalid');
}
function showError(message) {
  errorEl.textContent = message;
  errorEl.hidden = false;
  hoursInput.setAttribute('aria-invalid', 'true');
  resultEl.hidden = true; // Never show a stale price after invalid input.
}
function clearStaleEstimate() {
  clearError();
  resultEl.hidden = true;
}
[serviceInput, hoursInput, emergencyInput].forEach(input => {
  input.addEventListener('input', clearStaleEstimate);
  input.addEventListener('change', clearStaleEstimate);
});

form.addEventListener('submit', event => {
  event.preventDefault();
  clearError();
  try {
    const estimate = QuickksPricing.calculateEstimate(
      serviceInput.value,
      hoursInput.value,
      emergencyInput.checked
    );
    document.getElementById('result-service').textContent = labels[estimate.service];
    document.getElementById('result-base').textContent =
      `${money(estimate.rate)} × ${estimate.hours} = ${money(estimate.basePrice)}`;
    document.getElementById('result-fee').textContent = money(estimate.emergencyFee);
    document.getElementById('result-total').textContent = money(estimate.totalPrice);
    resultEl.hidden = false;
  } catch (error) {
    showError(error.message);
  }
});
