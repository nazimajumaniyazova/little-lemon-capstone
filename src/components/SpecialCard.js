import React from 'react';

function SpecialCard({ title, price, description }) {
  return (
    <article className="special-card" aria-labelledby={`special-${title}`}>
      <div
        className="special-card-image"
        role="img"
        aria-label={`Photo of ${title}`}
      />
      <div className="special-card-body">
        <div className="special-card-title">
          <h3 id={`special-${title}`}>{title}</h3>
          <span className="price">{price}</span>
        </div>
        <p>{description}</p>
        <a href="/order" className="order-link">
          Order a delivery →
        </a>
      </div>
    </article>
  );
}

export default SpecialCard;
