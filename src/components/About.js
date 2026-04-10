import React from 'react';

function About() {
  return (
    <section className="about" aria-labelledby="about-title" id="about">
      <div className="container">
        <div>
          <h2 id="about-title">Little Lemon</h2>
          <h3>Chicago</h3>
          <p>
            Founded by two Italian brothers, Mario and Adrian, who immigrated
            to the United States to pursue their shared dream of owning a
            restaurant. To craft their menu, the chefs draw inspiration from
            Italian, Greek, and Turkish cuisine.
          </p>
          <p>
            The two brothers continue to oversee the Little Lemon restaurant
            nearly three decades after the doors first opened.
          </p>
        </div>
        <div className="about-images" aria-hidden="true">
          <div className="img img-back" />
          <div className="img img-front" />
        </div>
      </div>
    </section>
  );
}

export default About;
