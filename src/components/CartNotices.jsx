// Explains changes made to a saved order when the menu data changed (sold out, removed, lower stock).
function CartNotices({ notices, onDismiss }) {
  if (notices.length === 0) return null;
  return (
    <div className="notice notice-warn" role="alert">
      <h2 className="notice-title">We updated your saved order</h2>
      <ul>
        {notices.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
      <button type="button" className="btn btn-secondary" onClick={onDismiss}>Got it</button>
    </div>
  );
}

export default CartNotices;
