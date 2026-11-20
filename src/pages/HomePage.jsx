import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MIN_DELIVERY_ORDER, FREE_DELIVERY_FROM, DELIVERY_FEE, DELIVERY_AREAS } from '../rules/orderRules.js';

function HomePage() {
  useEffect(() => {
    document.title = 'Campus Tiffin | Home-style lunch for students';
  }, []);

  return (
    <div className="container">
      <section className="hero">
        <h1>Home-style lunch, packed for students in Islamabad</h1>
        <p className="lead">
          Campus Tiffin cooks daal, karahi, biryani and weekly lunch bundles for university students.
          Collect from our kitchen in H-11 or get it delivered to selected sectors.
        </p>
        <Link to="/menu" className="btn btn-primary btn-large">Browse the menu</Link>
      </section>

      <section className="info-grid" aria-label="How ordering works">
        <div className="info-box">
          <h2>Who we cook for</h2>
          <p>Students on a budget. Meals start at Rs 300 and every item shows calories, spice level and nut warnings.</p>
        </div>
        <div className="info-box">
          <h2>Delivery conditions</h2>
          <p>
            Minimum Rs {MIN_DELIVERY_ORDER} for delivery. Fee Rs {DELIVERY_FEE}, free from Rs {FREE_DELIVERY_FROM}.
            Pickup has no minimum and no fee.
          </p>
        </div>
        <div className="info-box">
          <h2>Where we deliver</h2>
          <p>{DELIVERY_AREAS.join(', ')}.</p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
