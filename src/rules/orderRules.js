// Business rules for Campus Tiffin. Plain JavaScript (no React) so they can be tested with node:test.
//
// RULE 1 (availability): max 5 of one item per order, and never more than the stock left.
// RULE 2 (eligibility):  a customer with a nut allergy cannot order items that contain nuts.
// RULE 3 (pricing/fulfilment): delivery needs a Rs 800 minimum; fee is Rs 150, free from Rs 2000.
//                              Pickup has no minimum and no fee. Delivery only to listed areas.

export const TIME_SLOTS = ['12:00 PM - 12:30 PM', '12:30 PM - 1:00 PM', '1:00 PM - 1:30 PM', '1:30 PM - 2:00 PM'];
export const MAX_PER_ITEM = 5;
export const MIN_DELIVERY_ORDER = 800;
export const FREE_DELIVERY_FROM = 2000;
export const DELIVERY_FEE = 150;
export const DELIVERY_AREAS = ['G-11', 'H-11', 'H-12', 'I-8', 'F-10'];

// Rule 1
export function checkQuantity(qty, stock) {
  const limit = Math.min(MAX_PER_ITEM, stock);

  if (stock === 0) {
    return { valid: false, limit: 0, message: 'This item is sold out.' };
  }
  if (!Number.isInteger(qty) || qty < 1) {
    return { valid: false, limit, message: 'Quantity must be at least 1.' };
  }
  if (qty > limit) {
    if (stock < MAX_PER_ITEM) {
      return { valid: false, limit, message: 'Only ' + stock + ' left, so you can order at most ' + stock + '.' };
    }
    return { valid: false, limit, message: 'You can order at most ' + MAX_PER_ITEM + ' of one item.' };
  }
  return { valid: true, limit, message: '' };
}

// Rule 2
export function findNutConflicts(hasNutAllergy, lines) {
  if (!hasNutAllergy) return [];
  return lines.filter((line) => line.item.hasNuts).map((line) => line.item.name);
}

// Rule 3
export function checkDelivery(subtotal, method) {
  if (method !== 'delivery') {
    return { allowed: true, fee: 0, message: '' };
  }
  const fee = subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
  if (subtotal < MIN_DELIVERY_ORDER) {
    return {
      allowed: false,
      fee,
      message: 'Delivery needs a minimum order of Rs ' + MIN_DELIVERY_ORDER + '. Add Rs ' + (MIN_DELIVERY_ORDER - subtotal) + ' more or choose pickup.',
    };
  }
  return { allowed: true, fee, message: '' };
}

// Text shown on the menu and cart so customers see the delivery conditions early.
export function getDeliveryHint(subtotal) {
  if (subtotal < MIN_DELIVERY_ORDER) {
    return 'Add Rs ' + (MIN_DELIVERY_ORDER - subtotal) + ' more to reach the Rs ' + MIN_DELIVERY_ORDER + ' delivery minimum (pickup has no minimum).';
  }
  if (subtotal < FREE_DELIVERY_FROM) {
    return 'Add Rs ' + (FREE_DELIVERY_FROM - subtotal) + ' more for free delivery.';
  }
  return 'You qualify for free delivery.';
}

// Collects every reason the order cannot be placed right now.
export function getOrderIssues(lines, form) {
  const issues = [];

  if (lines.length === 0) {
    issues.push('Your order is empty. Add at least one item.');
  }

  lines.forEach((line) => {
    const result = checkQuantity(line.qty, line.item.stock);
    if (!result.valid) {
      issues.push(line.item.name + ': ' + result.message);
    }
  });

  const nutItems = findNutConflicts(form.nutAllergy, lines);
  if (nutItems.length > 0) {
    issues.push('You marked a nut allergy, but your order has: ' + nutItems.join(', ') + '. Remove these items to continue.');
  }

  const subtotal = lines.reduce((sum, line) => sum + line.item.price * line.qty, 0);
  const delivery = checkDelivery(subtotal, form.method);
  if (!delivery.allowed) {
    issues.push(delivery.message);
  }

  return issues;
}
