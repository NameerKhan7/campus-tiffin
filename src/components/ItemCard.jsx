import { Link } from 'react-router-dom';
import ItemImage from './ItemImage.jsx';
import { formatPrice, stockLabel, spiceLabel, dietLabel } from '../utils/format.js';
import { checkQuantity } from '../rules/orderRules.js';

// One menu card. The card shows everything needed to compare items (price, calories, diet, spice, nuts, stock).
function ItemCard({ item, qtyInCart, onAdd }) {
  const soldOut = item.stock === 0;
  const nextCheck = checkQuantity(qtyInCart + 1, item.stock);

  return (
    <li className="card">
      <ItemImage item={item} />
      <div className="card-body">
        <h3 className="card-title">
          <Link to={'/items/' + item.id}>{item.name}</Link>
        </h3>
        <p className="price">{formatPrice(item.price)}</p>

        <ul className="tags">
          <li className="tag">{item.calories} kcal</li>
          <li className="tag">{dietLabel(item.diet)}</li>
          <li className="tag">{spiceLabel(item.spice)}</li>
          {item.hasNuts && <li className="tag tag-warn">Contains nuts</li>}
          <li className={soldOut ? 'tag tag-bad' : item.stock <= 5 ? 'tag tag-warn' : 'tag tag-good'}>{stockLabel(item.stock)}</li>
        </ul>

        {qtyInCart > 0 && <p className="in-order">In your order: {qtyInCart}</p>}

        <button type="button" className="btn btn-primary" onClick={() => onAdd(item.id)} disabled={!nextCheck.valid} aria-label={'Add ' + item.name + ' to order'}>
          Add to order
        </button>
        {!nextCheck.valid && !soldOut && <p className="limit-note">{nextCheck.message}</p>}
      </div>
    </li>
  );
}

export default ItemCard;
