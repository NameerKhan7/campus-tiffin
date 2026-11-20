import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/format.js';
import { getDeliveryHint } from '../rules/orderRules.js';

// Sticky bar on the menu page: shows the running total and delivery conditions BEFORE checkout.
function CartBar({ summary }) {
  if (summary.itemCount === 0) return null;
  return (
    <aside className="cart-bar" aria-label="Order summary">
      <div className="container cart-bar-inner">
        <div>
          <p className="cart-bar-total">{summary.itemCount} items · {formatPrice(summary.subtotal)}</p>
          <p className="cart-bar-hint">{getDeliveryHint(summary.subtotal)}</p>
        </div>
        <Link to="/cart" className="btn btn-primary">Review order</Link>
      </div>
    </aside>
  );
}

export default CartBar;
