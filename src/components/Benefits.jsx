import React from "react";
import benefitImage1 from "../img/fotos/cosmeticos-candleaf-mobile.png";
import benefitImage2 from "../img/fotos/cosmeticos-candleaf.png";
import "../css/Benefits.scss";

const Benefits = () => {
  return (
    <section id="benefits" className="section-benefits">
      <section className="container">
        <article className="title">
          <h2>Clean and fragrant soy wax</h2>
          <p>Made for your home and for your wellness</p>
        </article>
        <div>
          <article>
            <ul>
              <li>
                <strong>Eco-sustainable:</strong> All recyclable materials, 0%
                CO2 emissions
              </li>
              <li>
                <strong>Hyphoallergenic:</strong> 100% natural, human friendly
                ingredients
              </li>
              <li>
                <strong>Handmade:</strong> All candles are craftly made with
                love.
              </li>
              <li>
                <strong>Long burning:</strong> No more waste. Created for last
                long.
              </li>
            </ul>
            <p>
              <a className="button" href="#">
                Learn more
              </a>
            </p>
          </article>
          <figure>
            <picture>
              <source media="(max-width:668px)" srcset={benefitImage1} />
              <img src={benefitImage2} alt="cosmeticos candleaf" />
            </picture>
          </figure>
        </div>
      </section>
    </section>
  );
};

export default Benefits;
