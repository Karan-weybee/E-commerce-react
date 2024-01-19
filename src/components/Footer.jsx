import React from 'react';
import logo from '../img/logos/logo-footer.png'
import '../css/Footer.scss'

const Footer = () => {
    return (
        
      <footer>
      <section class="container">
        <article>
          <article class="logo-footer">
            <figure>
              <img src={logo} alt="logo footer" />
            </figure>
            <p>
              Your natural candle made for your home and for your
              wellness.
            </p>
          </article>

          <article class="footer-links">
            <div>
              <h3>Discovery</h3>
              <ul>
                <li><a href="#">New season</a></li>
                <li><a href="#"> Most searched </a></li>
                <li><a href="#"> Most selled </a></li>
              </ul>
            </div>
            <div class="about">
              <h3>About</h3>
              <ul>
                <li><a href="#"> Help </a></li>
                <li><a href="#"> Shipping </a></li>
                <li><a href="#"> Affiliate </a></li>
              </ul>
            </div>
            <div>
              <h3>Info</h3>
              <ul>
                <li><a href="#"> Contact us </a></li>
                <li><a href="#"> Privacy Policies </a></li>
                <li><a href="#"> Terms & Conditions </a></li>
              </ul>
            </div>
          </article>
        </article>
      </section>
      <p>©Candleaf All Rights Reserved.</p>
    </footer>
    );
}

export default Footer;
