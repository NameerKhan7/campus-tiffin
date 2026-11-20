export function formatPrice(amount) {
  return 'Rs ' + amount.toLocaleString('en-PK');
}

export function stockLabel(stock) {
  if (stock === 0) return 'Sold out';
  if (stock <= 5) return 'Only ' + stock + ' left';
  return 'In stock';
}

export function spiceLabel(level) {
  const names = ['Not spicy', 'Mild', 'Medium', 'Hot'];
  return names[level] || 'Not spicy';
}

export function dietLabel(diet) {
  return diet === 'veg' ? 'Vegetarian' : 'Contains chicken';
}
