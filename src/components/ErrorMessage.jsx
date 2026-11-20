function ErrorMessage({ message, onRetry }) {
  return (
    <div className="state-box state-error" role="alert">
      <h2>Something went wrong</h2>
      <p>{message}</p>
      <button type="button" className="btn btn-primary" onClick={onRetry}>Try again</button>
    </div>
  );
}

export default ErrorMessage;
