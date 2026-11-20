import { useState } from 'react';

// Shows the photo if there is one. If it is missing or fails to load, show a labelled fallback.
function ItemImage({ item }) {
  const [failed, setFailed] = useState(false);

  if (!item.image || failed) {
    return (
      <div className="img-fallback" role="img" aria-label={'No photo available for ' + item.name}>
        <span aria-hidden="true">{item.emoji}</span>
      </div>
    );
  }
  return <img className="item-img" src={item.image} alt={item.name} onError={() => setFailed(true)} />;
}

export default ItemImage;
