import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ItemImage from '../components/ItemImage.jsx';
import QuantityControl from '../components/QuantityControl.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { formatPrice, stockLabel, spiceLabel, dietLabel } from '../utils/format.js';
import { checkQuantity, MAX_PER_ITEM } from '../rules/orderRules.js';

function ItemDetailsPage({ items, cart, onAdd, onDecrease }) {
  const { id } = useParams();
  const item = items.find((menuItem) => menuItem.id === id);

  useEffect(() => {
    document.title = (item ? item.name : 'Item not found') + ' | Campus Tiffin';
  }, [item]);

  // Invalid id in the URL: explain and give a next step.
  if (!item) {
    return (
      <div className="container">
        <EmptyState title="We could not find that item" text={'There is no menu item with the id "' + id + '". It may have been removed or the link may be wrong.'}>
          <Link to="/menu" className="btn btn-primary">Back to the menu</Link>
        </EmptyState>
      </div>
    );
  }

  const entry = cart.find((cartEntry) => cartEntry.id === item.id);
  const qty = entry ? entry.qty : 0;
  const nextCheck = checkQuantity(qty + 1, item.stock);

  return (
    <div className="container">
      <p><Link to="/menu">← Back to the menu</Link></p>
      <div className="details">
        <ItemImage item={item} />
        <div>
          <h1>{item.name}</h1>
          <p className="price price-large">{formatPrice(item.price)}</p>
          <p>{item.description || 'No description has been added for this item yet.'}</p>

          <h2>Good to know</h2>
          <ul className="facts">
            <li>Calories: {item.calories} kcal</li>
            <li>Diet: {dietLabel(item.diet)}</li>
            <li>Spice level: {spiceLabel(item.spice)}</li>
            <li>Nuts: {item.hasNuts ? 'Contains nuts' : 'No nuts'}</li>
            <li>Availability: {stockLabel(item.stock)}</li>
            <li>Category: {item.category}</li>
          </ul>

          <h2>What is included</h2>
          <ul className="facts">
            {item.includes.map((part) => (
              <li key={part}>{part}</li>
            ))}
          </ul>

          <h2>Order this item</h2>
          <p className="small">Limit: {MAX_PER_ITEM} per order{item.stock > 0 && item.stock < MAX_PER_ITEM ? ', and only ' + item.stock + ' left' : ''}.</p>
          {qty === 0 ? (
            <button type="button" className="btn btn-primary" onClick={() => onAdd(item.id)} disabled={!nextCheck.valid}>
              Add to order
            </button>
          ) : (
            <QuantityControl name={item.name} qty={qty} canIncrease={nextCheck.valid} onIncrease={() => onAdd(item.id)} onDecrease={() => onDecrease(item.id)} />
          )}
          {!nextCheck.valid && <p className="limit-note">{nextCheck.message}</p>}
          {qty > 0 && <p><Link to="/cart" className="btn btn-primary">Review order</Link></p>}
        </div>
      </div>
    </div>
  );
}

export default ItemDetailsPage;
