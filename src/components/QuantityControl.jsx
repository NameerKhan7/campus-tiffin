function QuantityControl({ name, qty, canIncrease, onIncrease, onDecrease }) {
  return (
    <div className="qty" role="group" aria-label={'Quantity of ' + name}>
      <button type="button" className="btn btn-secondary qty-btn" onClick={onDecrease} aria-label={'Decrease quantity of ' + name}>−</button>
      <span className="qty-value" aria-live="polite">{qty}</span>
      <button type="button" className="btn btn-secondary qty-btn" onClick={onIncrease} disabled={!canIncrease} aria-label={'Increase quantity of ' + name}>+</button>
    </div>
  );
}

export default QuantityControl;
