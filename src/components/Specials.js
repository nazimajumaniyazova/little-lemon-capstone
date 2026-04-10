import React from 'react';
import SpecialCard from './SpecialCard';

const specials = [
  {
    id: 1,
    title: 'Greek Salad',
    price: '$12.99',
    description:
      'Crispy lettuce, peppers, olives and Chicago-style feta cheese, garnished with crunchy garlic and rosemary croutons.'
  },
  {
    id: 2,
    title: 'Bruschetta',
    price: '$5.99',
    description:
      'Grilled bread smeared with garlic and seasoned with salt and olive oil, topped with fresh basil.'
  },
  {
    id: 3,
    title: 'Lemon Dessert',
    price: '$5.00',
    description:
      "This comes straight from grandma's recipe book — every last ingredient has been sourced and is as authentic as can be imagined."
  }
];

function Specials() {
  return (
    <section className="specials" aria-labelledby="specials-title">
      <div className="container">
        <div className="specials-header">
          <h2 id="specials-title">This week's specials!</h2>
          <button type="button">Online Menu</button>
        </div>
        <div className="specials-grid">
          {specials.map((s) => (
            <SpecialCard key={s.id} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Specials;
