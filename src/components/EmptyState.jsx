function EmptyState({ title, text, children }) {
  return (
    <div className="state-box">
      <h2>{title}</h2>
      <p>{text}</p>
      {children}
    </div>
  );
}

export default EmptyState;
