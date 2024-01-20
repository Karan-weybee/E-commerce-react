import React, { useState } from 'react';
import logo from '../img/logos/logo.png'
import logout from '../img/icones/check-out.png'
import signup from '../img/icones/login.png'
import login from '../img/icones/user.png'
import '../css/Header.scss'

function Header() {
    const [user, setUser] = useState("null");

    function openModel() {

        document.getElementById("myModal").style.display = "block";
    }
    function openLoginModel(){
        document.getElementById("myLoginModal").style.display = "block";
    }
    function closeModel() {
        console.log("closeModel")
        document.getElementById("myModal").style.display = "none";
    }
    function closeLoginModel(){
        document.getElementById("myLoginModal").style.display = "none";
    }
    return (
        <header>
            <section class="container header">
                <div class="menu-hamburger">
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <div class="line3"></div>
                </div>
                <h1 style={{zIndex:4}}>
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
                        user == null && (
                            <>
                               <button id="myBtn" onClick={openLoginModel}><img src={login} alt='' className='signup-icon' /></button>
                                <button id="myBtn" onClick={openModel}> <img src={signup} alt='' className='signup-icon' /></button>

                                <div id="myLoginModal" class="modal">
                                    <div class="modal-content container">
                                        <div className="heading">
                                            <span class="close"><button id="closeLoginBtn" onClick={closeLoginModel}>X</button></span>
                                            <p>Login</p>
                                        </div>
                                        <div className="contents">
                                            <form action="" class="form-container">
                                                <label for="email" className='label'>Email</label>
                                                <input type="text" placeholder="Enter Email" name="email" required />

                                                <label for="psw" className='label'>Password</label>
                                                <input type="password" placeholder="Enter Password" name="psw" required />

                                                <button type="submit" class="btn">Login</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
 
                                <div id="myModal" class="modal">
                                    <div class="modal-content container">
                                        <div className="heading">
                                            <span class="close"><button id="closeBtn" onClick={closeModel}>X</button></span>
                                            <p>Sign Up</p>
                                        </div>
                                        <div className="contents">
                                            <form action="" class="form-container">
                                                <label for="name" className='label'>Name</label>
                                                <input type="text" placeholder="Enter Name" name="name" required />

                                                <label for="email" className='label'>Email</label>
                                                <input type="text" placeholder="Enter Email" name="email" required />

                                                <label for="psw" className='label'>Password</label>
                                                <input type="password" placeholder="Enter Password" name="psw" required />

                                                <button type="submit" class="btn">Sign Up</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    {user != null && (
                        <>
                            <a class="icon-cart" href="">
                                <i class="bi bi-cart"></i><span>1</span></a>
                                <button id="logoutBtn" onClick={()=>(setUser(null))}><img src={logout} alt='' className='logout-icon' /></button>
                        </>
                    )
                    }


                </article>
            </section>
        </header>
    );
}

export default Header;


