import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OrderSummary from '../components/OrderSummary.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { validateOrderForm } from '../utils/validateForm.js';
import { getOrderIssues, TIME_SLOTS, DELIVERY_AREAS, MIN_DELIVERY_ORDER, DELIVERY_FEE, FREE_DELIVERY_FROM } from '../rules/orderRules.js';


function CheckoutPage({ lines, summary, form, onFormChange, onPlaceOrder }) {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Checkout | Campus Tiffin';
  }, []);

  if (lines.length === 0) {
    return (
      <div className="container">
        <EmptyState title="Nothing to check out" text="Your order is empty. Add items from the menu first.">
          <Link to="/menu" className="btn btn-primary">Browse the menu</Link>
        </EmptyState>
      </div>
    );
  }

  // Derived values: recalculated on every render from current state.
  const errors = submitted ? validateOrderForm(form) : {};
  const issues = getOrderIssues(lines, form);
  const errorList = Object.values(errors);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    const formErrors = validateOrderForm(form);
    if (Object.keys(formErrors).length > 0 || issues.length > 0) {
      return; // stay on the page; the messages are shown and the typed values are kept
    }
    onPlaceOrder(lines, summary);
    navigate('/confirmation');
  }

  return (
    <div className="container">
      <h1>Checkout</h1>
      <p className="small">This is a simulated checkout. Do not enter real personal or payment details.</p>

      {issues.length > 0 && (
        <div className="notice notice-warn" role="alert">
          <h2 className="notice-title">Fix these before placing the order</h2>
          <ul>
            {issues.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
          <Link to="/cart">Change my order</Link>
        </div>
      )}

      {errorList.length > 0 && (
        <div className="notice notice-error" role="alert">
          <h2 className="notice-title">Please correct the form</h2>
          <ul>
            {errorList.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="two-col">
        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="nickname">Order name (a nickname is fine)</label>
            <input id="nickname" type="text" value={form.nickname} onChange={(e) => onFormChange('nickname', e.target.value)}
              aria-invalid={errors.nickname ? 'true' : 'false'} aria-describedby={errors.nickname ? 'nickname-error' : 'nickname-hint'} />
            <p id="nickname-hint" className="hint">2 to 20 letters or numbers. We call this out at collection or delivery.</p>
            {errors.nickname && <p id="nickname-error" className="error-text">Error: {errors.nickname}</p>}
          </div>

          <fieldset className="field">
            <legend>How do you want to get your order?</legend>
            <label className="choice">
              <input type="radio" name="method" value="pickup" checked={form.method === 'pickup'} onChange={() => onFormChange('method', 'pickup')} />
              Pickup from our H-11 kitchen (no fee, no minimum)
            </label>
            <label className="choice">
              <input type="radio" name="method" value="delivery" checked={form.method === 'delivery'} onChange={() => onFormChange('method', 'delivery')} />
              Delivery (minimum Rs {MIN_DELIVERY_ORDER}, fee Rs {DELIVERY_FEE}, free from Rs {FREE_DELIVERY_FROM})
            </label>
          </fieldset>

          {form.method === 'delivery' && (
            <div className="field">
              <label htmlFor="area">Delivery area</label>
              <select id="area" value={form.area} onChange={(e) => onFormChange('area', e.target.value)}
                aria-invalid={errors.area ? 'true' : 'false'} aria-describedby={errors.area ? 'area-error' : 'area-hint'}>
                <option value="">Choose an area</option>
                {DELIVERY_AREAS.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
              <p id="area-hint" className="hint">We only deliver to these sectors. Other areas: please choose pickup.</p>
              {errors.area && <p id="area-error" className="error-text">Error: {errors.area}</p>}
            </div>
          )}

          <div className="field">
            <label htmlFor="slot">{form.method === 'delivery' ? 'Delivery' : 'Pickup'} time slot</label>
            <select id="slot" value={form.slot} onChange={(e) => onFormChange('slot', e.target.value)}
              aria-invalid={errors.slot ? 'true' : 'false'} aria-describedby={errors.slot ? 'slot-error' : undefined}>
              <option value="">Choose a time slot</option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            {errors.slot && <p id="slot-error" className="error-text">Error: {errors.slot}</p>}
          </div>

          <div className="field">
            <label className="choice">
              <input type="checkbox" checked={form.nutAllergy} onChange={(e) => onFormChange('nutAllergy', e.target.checked)} aria-describedby="allergy-hint" />
              I have a nut allergy
            </label>
            <p id="allergy-hint" className="hint">If ticked, you cannot order items marked "Contains nuts".</p>
          </div>

          <div className="field">
            <label htmlFor="notes">Notes for the kitchen (optional)</label>
            <textarea id="notes" rows="3" value={form.notes} onChange={(e) => onFormChange('notes', e.target.value)}
              aria-invalid={errors.notes ? 'true' : 'false'} aria-describedby={errors.notes ? 'notes-error' : 'notes-hint'} />
            <p id="notes-hint" className="hint">{form.notes.length} / 100 characters</p>
            {errors.notes && <p id="notes-error" className="error-text">Error: {errors.notes}</p>}
          </div>

          <button type="submit" className="btn btn-primary btn-large">Place order (simulated)</button>
        </form>

        <OrderSummary summary={summary} method={form.method} />
      </div>
    </div>
  );
}

export default CheckoutPage;
