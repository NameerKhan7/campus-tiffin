import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState.jsx';
import { formatPrice } from '../utils/format.js';

function ConfirmationPage({ order }) {
  useEffect(() => {
    document.title = 'Order confirmed | Campus Tiffin';
  }, []);

  if (!order) {
    return (
      <div className="container">
        <EmptyState title="No recent order found" text="Place an order first and your confirmation will appear here.">
          <Link to="/menu" className="btn btn-primary">Browse the menu</Link>
        </EmptyState>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="notice notice-success" role="status">
        <h1>Order placed, {order.nickname}!</h1>
        <p>Success: your simulated order <strong>{order.id}</strong> is confirmed. No payment was taken and no real food will be prepared.</p>
      </div>

      <div className="two-col">
        <section aria-labelledby="items-heading">
          <h2 id="items-heading">What you ordered</h2>
          <ul className="plain-list">
            {order.lines.map((line) => (
              <li key={line.id}>{line.qty} × {line.name} — {formatPrice(line.lineTotal)}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="details-heading">
          <h2 id="details-heading">Order details</h2>
          <dl className="details-list">
            <div><dt>Method</dt><dd>{order.method === 'delivery' ? 'Delivery to ' + order.area : 'Pickup from H-11 kitchen'}</dd></div>
            <div><dt>Time slot</dt><dd>{order.slot}</dd></div>
            <div><dt>Subtotal</dt><dd>{formatPrice(order.summary.subtotal)}</dd></div>
            <div><dt>Delivery fee</dt><dd>{order.method === 'delivery' ? (order.summary.deliveryFee === 0 ? 'Free' : formatPrice(order.summary.deliveryFee)) : 'No fee'}</dd></div>
            <div><dt>Total to pay</dt><dd><strong>{formatPrice(order.summary.total)}</strong></dd></div>
            <div><dt>Nut allergy noted</dt><dd>{order.nutAllergy ? 'Yes' : 'No'}</dd></div>
            {order.notes && <div><dt>Notes</dt><dd>{order.notes}</dd></div>}
          </dl>
        </section>
      </div>

      <p><Link to="/menu" className="btn btn-primary">Order again</Link></p>
    </div>
  );
}

export default ConfirmationPage;
