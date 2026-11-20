// Applies search + category + diet filters, then sorts. Search and filters work together.
export function filterAndSort(items, filters) {
  const text = filters.search.trim().toLowerCase();

  const result = items.filter((item) => {
    const haystack = (item.name + ' ' + item.description + ' ' + item.category + ' ' + item.includes.join(' ')).toLowerCase();
    const matchesText = text === '' || haystack.includes(text);
    const matchesCategory = filters.category === 'All' || item.category === filters.category;
    const matchesDiet = filters.diet === 'All' || item.diet === filters.diet;
    return matchesText && matchesCategory && matchesDiet;
  });

  if (filters.sort === 'price-low') return [...result].sort((a, b) => a.price - b.price);
  if (filters.sort === 'price-high') return [...result].sort((a, b) => b.price - a.price);
  if (filters.sort === 'calories') return [...result].sort((a, b) => a.calories - b.calories);
  if (filters.sort === 'name') return [...result].sort((a, b) => a.name.localeCompare(b.name));
  return result; // "featured" keeps the original order
}
