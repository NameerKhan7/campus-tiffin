import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuantityControl from '../components/QuantityControl.jsx';
import OrderSummary from '../components/OrderSummary.jsx';
import CartNotices from '../components/CartNotices.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { formatPrice } from '../utils/format.js';
import { checkQuantity, getDeliveryHint } from '../rules/orderRules.js';

function CartPage({ lines, summary, form, onAdd, onDecrease, onRemove, notices, onDismissNotices }) {
  useEffect(() => {
    document.title = 'My order | Campus Tiffin';
  }, []);

  return (
    <div className="container">
      <h1>My order</h1>
      <CartNotices notices={notices} onDismiss={onDismissNotices} />

      {lines.length === 0 ? (
        <EmptyState title="Your order is empty" text="Pick something from the menu and it will appear here.">
          <Link to="/menu" className="btn btn-primary">Browse the menu</Link>
        </EmptyState>
      ) : (
        <div className="two-col">
          <ul className="cart-list">
            {lines.map((line) => {
              const check = checkQuantity(line.qty + 1, line.item.stock);
              return (
                <li key={line.item.id} className="cart-line">
                  <div>
                    <h2 className="cart-name"><Link to={'/items/' + line.item.id}>{line.item.name}</Link></h2>
                    <p className="small">{formatPrice(line.item.price)} each</p>
                    {line.item.hasNuts && <p className="tag tag-warn inline-tag">Contains nuts</p>}
                    {!check.valid && <p className="limit-note">{check.message}</p>}
                  </div>
                  <QuantityControl name={line.item.name} qty={line.qty} canIncrease={check.valid} onIncrease={() => onAdd(line.item.id)} onDecrease={() => onDecrease(line.item.id)} />
                  <p className="line-total">{formatPrice(line.lineTotal)}</p>
                  <button type="button" className="btn btn-secondary" onClick={() => onRemove(line.item.id)} aria-label={'Remove ' + line.item.name + ' from order'}>Remove</button>
                </li>
              );
            })}
          </ul>

          <div>
            <OrderSummary summary={summary} method={form.method} />
            <p className="notice notice-info">{getDeliveryHint(summary.subtotal)}</p>
            <Link to="/checkout" className="btn btn-primary btn-large btn-block">Continue to checkout</Link>
            <p><Link to="/menu">Add more items</Link></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
