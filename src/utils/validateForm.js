import { DELIVERY_AREAS, TIME_SLOTS } from '../rules/orderRules.js';

// Field-level validation for the checkout form. Returns an object like { nickname: 'message' }.
export function validateOrderForm(form) {
  const errors = {};
  const nickname = form.nickname.trim();

  if (nickname === '') {
    errors.nickname = 'Enter a name for the order, for example a nickname.';
  } else if (nickname.length < 2 || nickname.length > 20) {
    errors.nickname = 'Order name must be 2 to 20 characters long.';
  } else if (!/^[A-Za-z0-9 ]+$/.test(nickname)) {
    errors.nickname = 'Use only letters, numbers and spaces in the order name.';
  }

  if (!['pickup', 'delivery'].includes(form.method)) {
    errors.method = 'Choose pickup or delivery.';
  }

  if (form.method === 'delivery' && !DELIVERY_AREAS.includes(form.area)) {
    errors.area = 'Choose your delivery area.';
  }

  if (!TIME_SLOTS.includes(form.slot)) {
    errors.slot = 'Choose a time slot.';
  }

  if (form.notes.length > 100) {
    errors.notes = 'Notes can be at most 100 characters. You have ' + form.notes.length + '.';
  }

  return errors;
}
