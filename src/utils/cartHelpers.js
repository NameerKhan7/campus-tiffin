import { checkDelivery } from '../rules/orderRules.js';

// cart = [{ id, qty }]  ->  lines = [{ item, qty, lineTotal }] using the current menu data.
export function getCartLines(cart, items) {
  const lines = [];
  cart.forEach((entry) => {
    const item = items.find((menuItem) => menuItem.id === entry.id);
    if (item) {
      lines.push({ item, qty: entry.qty, lineTotal: item.price * entry.qty });
    }
  });
  return lines;
}

export function calculateSummary(lines, method) {
  const itemCount = lines.reduce((sum, line) => sum + line.qty, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const delivery = checkDelivery(subtotal, method);
  const deliveryFee = method === 'delivery' && subtotal > 0 ? delivery.fee : 0;
  return { itemCount, subtotal, deliveryFee, total: subtotal + deliveryFee };
}
