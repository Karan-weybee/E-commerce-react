import React from 'react';
import principle_mobile from '../img/fotos/img-banner-principal-mobile.png'
import principle from '../img/fotos/img-banner-principal.png'
import seedling from '../img/icones/seedling.png'
import '../css/Banner.scss'

const Banner = () => {
    return (
        <section className="banner-principal">
          <figure>
            <picture>
              <source media="(max-width:468px)"
                srcset={principle_mobile}
              />
              <img
                src={principle}
                alt="Banner candleaf"
              />
            </picture>
          </figure>
          <article>
            <h3>
              <img src={seedling}
                alt="emoji seedling"
              />The nature candle
            </h3>
            <p>
              All handmade with natural soy wax, Candleaf is a
              companion for all your pleasure moments</p>
            <p><a href="#products" className="button"
            >Discovery our collection</a>
            </p>
          </article>
        </section>

    );
}

export default Banner;
