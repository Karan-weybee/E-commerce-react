import React, { useState } from 'react';
import logo from '../img/logos/logo.png'
import logout from '../img/icones/check-out.png'
import login from '../img/icones/login.png'
import '../css/Header.scss'

function Header() {
    const [user,setUser]=useState("null");
    return (
        <header>
            <section class="container header">
                <div class="menu-hamburger">
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <div class="line3"></div>
                </div>
                <h1>
                    <a href="./"><figure>
                        <img src={logo}
                            alt="logo candleaf" />
                    </figure>
                    </a>
                </h1>
                <nav>
                    <ul class="menu">
                        <li class="sub-menu">
                            <p>Discovery<i class="bi bi-chevron-down"></i></p>
                            <ul>
                                <li><a href="./#products">products</a></li>
                                <li><a href="./#benefits">Beneficios</a></li>
                                <li><a href="./#popular">popular</a></li>
                            </ul>
                        </li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact us</a></li>
                    </ul>
                </nav>
                <article class="icons-menu">
                    {
                        user==null && (
                            <>
                            <a href="#"><i class="bi bi-person"></i></a>
                            <img src={login} alt='' className='login-icon'/>
                            </>
                        )}
                       { user!=null && (
                            <>
                             <a class="icon-cart" href="./cart.html">
                        <i class="bi bi-cart"></i><span>1</span></a>
                          <img src={logout} alt='' className='logout-icon' />
                            </>
                        )
                    }
                    
                   
                </article>
            </section>
        </header>
    );
}

export default Header;
