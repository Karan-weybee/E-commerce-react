import React, { useEffect, useState } from 'react';
import { auth, fs } from '../Config/Config'
import { addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { useDispatch, useSelector } from 'react-redux'
import { resetUserId, userSelector } from '../slices/userSlice';
import { setUserId } from '../slices/userSlice'
import { useNavigate } from 'react-router-dom';
import logo from '../img/logos/logo.png'
import logout from '../img/icones/check-out.png'
import signup from '../img/icones/login.png'
import login from '../img/icones/user.png'
import { Link } from 'react-router-dom';
import '../css/Header.scss'

function Header() {
    const nevigate = useNavigate();
    const dispatch = useDispatch();
    var user = useSelector((state) => state.userSlice.user)
    const cartItems = useSelector((state) => state.productSlice.cartItems)
    function openModel() {
        document.getElementById("myModal").style.display = "block";
    }
    function closeModel() {
        console.log("closeModel")
        document.getElementById("myModal").style.display = "none";
    }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loginText, setLoginText] = useState('Sign Up')

    async function signUpForm(e) {
        e.preventDefault();
        console.log(name, email, password);

        if(loginText == 'Sign Up'){
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            const docRef = await addDoc(collection(fs, "users"), {
                Name: name,
                Email: email,
                Password: password
            });
            setSuccessMsg("SignUp Successful !!")
            setName('');
            setEmail('');
            setPassword('');
            setErrorMsg('');

            const uid = docRef.firestore._authCredentials.currentUser.uid;
            dispatch(setUserId({ uid }))
            setTimeout((
                closeModel()), 3000)
            setSuccessMsg("");

        } catch (e) {
            setErrorMsg(e.message)
            console.log(errorMsg)
        }
    }
    else{
        try {
            signInWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    console.log(user)
                    setSuccessMsg("Login Successful !!")
                    setEmail('');
                    setPassword('');
                    setErrorMsg('');

                    const uid = user.user.uid;
                    dispatch(setUserId({ uid }))
                    setTimeout(closeLoginModel, 10000);
                    setSuccessMsg('');
                }).catch((e) => {
                    setErrorMsg(e.message)
                })


        } catch (e) {
            setErrorMsg(e.message)
            console.log(errorMsg)
        }
    }

    }

    // function loginForm(e) {
    //     e.preventDefault();
    //     console.log(email, password);
    //     try {
    //         signInWithEmailAndPassword(auth, email, password)
    //             .then((user) => {
    //                 console.log(user)
    //                 setSuccessMsg("Login Successful !!")
    //                 setEmail('');
    //                 setPassword('');
    //                 setErrorMsg('');

    //                 const uid = user.user.uid;
    //                 dispatch(setUserId({ uid }))
    //                 setTimeout(closeLoginModel, 10000);
    //                 setSuccessMsg('');
    //             }).catch((e) => {
    //                 setErrorMsg(e.message)
    //             })


    //     } catch (e) {
    //         setErrorMsg(e.message)
    //         console.log(errorMsg)
    //     }
    // }

    function changeLogin(){
        if(loginText == 'Sign Up'){
            setLoginText('Login')
        }
        else{
            setLoginText('Sign Up')
        }
    }
    return (
        <header>
            <section class="container header">
                <div class="menu-hamburger">
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <div class="line3"></div>
                </div>
                <h1 style={{ zIndex: 4 }}>
                    <Link to="/"><figure>
                        <img src={logo}
                            alt="logo candleaf" />
                    </figure>
                    </Link>
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
                                {/* <button id="myBtn" onClick={openLoginModel}><img src={login} alt='' className='signup-icon' /></button> */}
                                <button id="myBtn" onClick={openModel}> <img src={login} alt='' className='signup-icon' /></button>

                                {/* <div id="myLoginModal" class="modal">
                                    <div class="modal-content container">
                                        <div className="heading">
                                            <span class="close"><button id="closeLoginBtn" onClick={closeLoginModel}>X</button></span>
                                            <p>Login</p>
                                        </div>
                                        <div className="contents">
                                            {successMsg && (
                                                <div className='successMsg'>{successMsg}</div>
                                            )}
                                            <form class="form-container" onSubmit={(e) => loginForm(e)}>
                                                <label for="email" className='label'>Email</label>
                                                <input type="text" placeholder="Enter Email"
                                                    onChange={(e) => setEmail(e.target.value)} value={email}
                                                    name="email" required />

                                                <label for="psw" className='label'>Password</label>
                                                <input type="password" placeholder="Enter Password"
                                                    onChange={(e) => setPassword(e.target.value)} value={password}
                                                    name="psw" required />

                                                <button type="submit" class="btn">Login</button>
                                            </form>
                                            {errorMsg && (
                                                <div className='errorMsg'>{errorMsg}</div>
                                            )}
                                        </div>
                                    </div>
                                </div> */}

                                <div id="myModal" class="modal">
                                    <div class="modal-content container">
                                        <div className="heading">
                                            <span class="close"><button id="closeBtn" onClick={closeModel}>X</button></span>
                                            <p>{loginText}</p>
                                        </div>
                                        <div className="contents">
                                            {successMsg && (
                                                <div className='successMsg'>{successMsg}</div>
                                            )}
                                            <form class="form-container" onSubmit={(e) => signUpForm(e)} autoComplete='off'>
                                               
                                               {loginText == 'Sign Up' && ( 
                                                 <>
                                                    <label for="name" className='label'>Name</label>
                                                    <input type="text" placeholder="Enter Name" name="name"
                                                        onChange={(e) => setName(e.target.value)} value={name}
                                                        required />
                                                </>
                                                )}
                                                <label for="email" className='label'>Email</label>
                                                <input type="text" placeholder="Enter Email"
                                                    onChange={(e) => setEmail(e.target.value)} value={email}
                                                    name="email" required />

                                                <label for="psw" className='label'>Password</label>
                                                <input type="password" placeholder="Enter Password"
                                                    onChange={(e) => setPassword(e.target.value)} value={password}
                                                    name="psw" required />

                                                <button type="submit" class="btn" style={{fontSize:'18px'}}> {loginText}</button>
                                                <div className="forLogin">
                                                {loginText == 'Sign Up' ? ( <p>If already account then <button onClick={changeLogin}>Login</button></p>):
                                                     ( <p>Create new account <button onClick={changeLogin}>Sign Up</button></p>)}
                                                </div>
                                            </form>
                                            {errorMsg && (
                                                <div className='errorMsg'>{errorMsg}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    {user != null && (
                        <>
                            <Link class="icon-cart" to="/cart">
                                <i class="bi bi-cart"></i><span>{cartItems && cartItems}</span></Link>
                            <button id="logoutBtn" onClick={() => {
                                dispatch(resetUserId())
                                nevigate('/')
                            }}><img src={logout} alt='' className='logout-icon' /></button>
                        </>
                    )
                    }


                </article>
            </section>
        </header>
    );
}

export default Header;


