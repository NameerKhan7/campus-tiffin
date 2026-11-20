import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState.jsx';

function NotFoundPage() {
  return (
    <div className="container">
      <EmptyState title="Page not found" text="The page you opened does not exist. Use the menu or go back to the home page.">
        <p>
          <Link to="/" className="btn btn-secondary">Home</Link>{' '}
          <Link to="/menu" className="btn btn-primary">Browse the menu</Link>
        </p>
      </EmptyState>
    </div>
  );
}

export default NotFoundPage;
