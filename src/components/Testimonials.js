import React from 'react';

const reviews = [
  { id: 1, name: 'Sarah M.', rating: 5, text: 'Absolutely delicious! Best Mediterranean food in Chicago.' },
  { id: 2, name: 'David K.', rating: 5, text: 'Cozy atmosphere, fantastic service, and unforgettable flavors.' },
  { id: 3, name: 'Lisa R.', rating: 4, text: 'The lemon dessert is worth the trip alone. Highly recommend.' },
  { id: 4, name: 'Michael T.', rating: 5, text: 'A consistent favorite for date night. Never disappoints.' }
];

function Testimonials() {
  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <h2 id="testimonials-title">Testimonials</h2>
        <div className="testimonials-grid">
          {reviews.map((r) => (
            <article className="testimonial-card" key={r.id}>
              <div className="stars" aria-label={`${r.rating} out of 5 stars`}>
                {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
              </div>
              <div className="who">
                <div className="avatar" aria-hidden="true" />
                <strong>{r.name}</strong>
              </div>
              <p>{r.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
