import React from "react";
import image1 from "../img/fotos/luisa.png";
import image2 from "../img/fotos/Stars.png";
import image3 from "../img/fotos/eduardo.png";
import image4 from "../img/fotos/mart.png";
import "../css/Testimonial.scss";

const Testimonial = () => {
  return (
    <section className="section-testimoials">
      <section className="container">
        <section className="title-section">
          <h2>Testimonials</h2>
          <p>Some quotes from our happy customers</p>
        </section>
        <section className="wrapper">
          <section className="testimoials">
            <section className="testimoial">
              <figure>
                <img src={image1} alt="profile picture luisa" />
              </figure>
              <img src={image2} alt="icones de estrelas" />
              <article className="description">
                <p>
                  “I love it! No more air fresheners”<span>Luisa</span>
                </p>
              </article>
            </section>
            <section className="testimoial">
              <figure>
                <img src={image3} alt="profile picture eduardo" />
              </figure>
              <img src={image2} alt="stars" />

              <article className="description">
                <p>
                  “Raccomended for everyone”
                  <span>Eduardo</span>
                </p>
              </article>
            </section>

            <section className="testimoial">
              <figure>
                <img src={image4} alt="stars" />
              </figure>
              <img src={image2} alt="stars" />
              <article className="description">
                <p>
                  “Looks very natural, the smell is awesome” <span>Mart</span>
                </p>
              </article>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
};

export default Testimonial;
