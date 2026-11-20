import { NavLink, Link } from 'react-router-dom';

function Header({ cartCount }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">Campus Tiffin</Link>
        <nav aria-label="Main navigation">
          <ul className="nav-list">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/menu">Menu</NavLink></li>
            <li><NavLink to="/cart">My order ({cartCount})</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
