import { formatPrice } from '../utils/format.js';

function OrderSummary({ summary, method }) {
  return (
    <section className="summary" aria-labelledby="summary-heading">
      <h2 id="summary-heading">Order summary</h2>
      <dl>
        <div><dt>Items</dt><dd>{summary.itemCount}</dd></div>
        <div><dt>Subtotal</dt><dd>{formatPrice(summary.subtotal)}</dd></div>
        <div>
          <dt>{method === 'delivery' ? 'Delivery fee' : 'Pickup'}</dt>
          <dd>{method === 'delivery' ? (summary.deliveryFee === 0 ? 'Free' : formatPrice(summary.deliveryFee)) : 'No fee'}</dd>
        </div>
        <div className="summary-total"><dt>Total</dt><dd>{formatPrice(summary.total)}</dd></div>
      </dl>
      <p className="small">Pay on {method === 'delivery' ? 'delivery' : 'collection'} (simulated, no real payment).</p>
    </section>
  );
}

export default OrderSummary;
