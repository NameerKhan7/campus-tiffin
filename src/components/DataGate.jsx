import Loading from './Loading.jsx';
import ErrorMessage from './ErrorMessage.jsx';

// Shows loading / error / retry for pages that need the menu data.
function DataGate({ status, error, onRetry, children }) {
  if (status === 'loading') return <Loading />;
  if (status === 'error') return <ErrorMessage message={error} onRetry={onRetry} />;
  return children;
}

export default DataGate;
