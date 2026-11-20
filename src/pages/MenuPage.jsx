import { useEffect } from 'react';
import FilterBar from '../components/FilterBar.jsx';
import ItemCard from '../components/ItemCard.jsx';
import CartBar from '../components/CartBar.jsx';
import CartNotices from '../components/CartNotices.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { filterAndSort } from '../utils/filterItems.js';
import { MIN_DELIVERY_ORDER, FREE_DELIVERY_FROM, DELIVERY_FEE } from '../rules/orderRules.js';

function MenuPage({ items, filters, onFilterChange, onClearFilters, cart, summary, onAdd, notices, onDismissNotices }) {
  useEffect(() => {
    document.title = 'Menu | Campus Tiffin';
  }, []);

  // Empty dataset (nothing to show at all) is different from "no matches".
  if (items.length === 0) {
    return (
      <div className="container">
        <h1>Menu</h1>
        <EmptyState title="The menu is empty right now" text="We have not published today's menu yet. Please check again later or go back to the home page." />
      </div>
    );
  }

  const categories = ['All', ...new Set(items.map((item) => item.category))];
  const visibleItems = filterAndSort(items, filters);
  // Items already in the order but hidden by the current filters.
  const hiddenInOrder = cart.filter((entry) => !visibleItems.some((item) => item.id === entry.id)).length;

  return (
    <div className="container">
      <h1>Menu</h1>
      <p className="conditions">
        Delivery: minimum Rs {MIN_DELIVERY_ORDER}, fee Rs {DELIVERY_FEE}, free from Rs {FREE_DELIVERY_FROM}. Pickup: no minimum, no fee.
        Limit: 5 of one item per order.
      </p>

      <CartNotices notices={notices} onDismiss={onDismissNotices} />

      <FilterBar
        filters={filters}
        categories={categories}
        onChange={onFilterChange}
        onClear={onClearFilters}
        shownCount={visibleItems.length}
        totalCount={items.length}
      />

      {hiddenInOrder > 0 && (
        <p className="notice notice-info" role="status">
          {hiddenInOrder} item{hiddenInOrder > 1 ? 's' : ''} in your order {hiddenInOrder > 1 ? 'are' : 'is'} hidden by the current filters. Your order is safe.
        </p>
      )}

      {visibleItems.length === 0 ? (
        <EmptyState title="No items match your search" text="Try a different word, or remove a filter to see more items.">
          <button type="button" className="btn btn-primary" onClick={onClearFilters}>Clear all filters</button>
        </EmptyState>
      ) : (
        <ul className="card-grid">
          {visibleItems.map((item) => {
            const entry = cart.find((cartEntry) => cartEntry.id === item.id);
            return <ItemCard key={item.id} item={item} qtyInCart={entry ? entry.qty : 0} onAdd={onAdd} />;
          })}
        </ul>
      )}

      <CartBar summary={summary} />
    </div>
  );
}

export default MenuPage;
