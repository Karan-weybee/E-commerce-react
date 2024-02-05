import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { resetUserId, userSelector } from "../slices/userSlice";
import { setUserId } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import logo from "../img/logos/logo.png";
import logout from "../img/icones/check-out.png";
import login from "../img/icones/user.png";
import { Link } from "react-router-dom";
import "../css/Header.scss";
import { createUser } from "../firebase/api/auth";
import { loginUser } from "../firebase/api/auth";

function Header() {
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  var user = useSelector((state) => state.userSlice.user);
  const cartItems = useSelector((state) => state.productSlice.cartItems);
  function openModel() {
    document.getElementById("myModal").style.display = "block";
  }
  function closeModel() {
    console.log("closeModel");
    document.getElementById("myModal").style.display = "none";
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  // const [successMsg, setSuccessMsg] = useState('');
  const [loginText, setLoginText] = useState("Sign Up");

  async function signUpForm(e) {
    e.preventDefault();
    console.log(name, email, password);

    if (loginText == "Sign Up") {
      try {
        const docRef = await createUser(name, email, password);
        // setSuccessMsg("SignUp Successful !!")
        setName("");
        setEmail("");
        setPassword("");
        setErrorMsg("");

        const uid = docRef.firestore._authCredentials.currentUser.uid;
        dispatch(setUserId({ uid }));
        setTimeout(closeModel(), 3000);
        toast("User successfully sign up");
        // setSuccessMsg("");
      } catch (e) {
        setErrorMsg(e.message);
      }
    } else {
      try {
        const user = await loginUser(email, password);
        console.log(user);
        setEmail("");
        setPassword("");
        setErrorMsg("");

        const uid = user.user.uid;
        dispatch(setUserId({ uid }));
        closeModel();
        // setSuccessMsg('');
        toast("User successfully login");
      } catch (e) {
        setErrorMsg(e.message);
        console.log(errorMsg);
      }
    }
  }

  function changeLogin() {
    if (loginText == "Sign Up") {
      setLoginText("Login");
    } else {
      setLoginText("Sign Up");
    }
  }

  function showProfileDropDown() {
    $(".profile-dropDown").toggleClass("show");
  }

  function showDropDown() {
    $(".menu-hamburger, nav").toggleClass("show");
  }

  function toggleShow() {
    $(".subMenu").toggleClass("showSub");
  }
  return (
    <header>
      <section className="container header">
        <div className="menu-hamburger" onClick={showDropDown}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <h1 style={{ zIndex: 4 }}>
          <Link to="/">
            <figure>
              <img src={logo} alt="logo candleaf" />
            </figure>
          </Link>
        </h1>
        <nav>
          <ul className="menu">
            <li className="sub-menu" onClick={{ toggleShow }}>
              <p>
                Discovery<i className="bi bi-chevron-down"></i>
              </p>
              <ul className="subMenu" style={{ paddingLeft: "38px" }}>
                <li>
                  <a href="./#products">products</a>
                </li>
                <li>
                  <a href="./#benefits">Beneficios</a>
                </li>
                <li>
                  <a href="./#popular">popular</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact us</a>
            </li>
          </ul>
        </nav>
        <article className="icons-menu">
          {user == null && (
            <>
              {/* <button id="myBtn" onClick={openLoginModel}><img src={login} alt='' className='signup-icon' /></button> */}
              <button id="myBtn" onClick={openModel}>
                {" "}
                <img src={login} alt="" className="signup-icon" />
              </button>

              {}

              <div id="myModal" className="modal">
                <div className="modal-content container">
                  <div className="heading">
                    <span className="close">
                      <button
                        id="closeBtn"
                        onClick={closeModel}
                        style={{ cursor: "pointer" }}
                      >
                        X
                      </button>
                    </span>
                    <p>{loginText}</p>
                  </div>
                  {loginText == "Sign Up" && (
                    <div className="contents">
                      <form
                        className="form-container"
                        onSubmit={(e) => signUpForm(e)}
                        autoComplete="off"
                      >
                        <label for="name" className="label">
                          Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Name"
                          name="name"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          required
                        />

                        <label for="email" className="label">
                          Email
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Email"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          name="email"
                          required
                        />

                        <label for="psw" className="label">
                          Password
                        </label>
                        <input
                          type="password"
                          placeholder="Enter Password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          name="psw"
                          required
                        />

                        <button
                          type="submit"
                          className="btn"
                          style={{ fontSize: "18px" }}
                        >
                          Sign Up
                        </button>
                        <div className="forLogin">
                          <p>
                            If already account then{" "}
                            <button onClick={changeLogin}>Login</button>
                          </p>
                        </div>
                      </form>
                      {errorMsg && <div className="errorMsg">{errorMsg}</div>}
                    </div>
                  )}
                  {loginText == "Login" && (
                    <div className="contents">
                      <form
                        className="form-container"
                        onSubmit={(e) => signUpForm(e)}
                        autoComplete="off"
                      >
                        <label for="email" className="label">
                          Email
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Email"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          name="email"
                          required
                        />

                        <label for="psw" className="label">
                          Password
                        </label>
                        <input
                          type="password"
                          placeholder="Enter Password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          name="psw"
                          required
                        />

                        <button
                          type="submit"
                          className="btn"
                          style={{ fontSize: "18px" }}
                        >
                          Login
                        </button>
                        <div className="forLogin">
                          <p>
                            Create new account{" "}
                            <button onClick={changeLogin}>Sign Up</button>
                          </p>
                        </div>
                      </form>
                      {errorMsg && <div className="errorMsg">{errorMsg}</div>}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {user != null && (
            <>
              <Link
                className="icon-cart"
                to="/cart"
                style={{ marginTop: "-3px" }}
              >
                <i className="bi bi-cart"></i>
                <span>{cartItems && cartItems}</span>
                <div
                  style={{
                    color: "#56B180",
                    fontSize: "13px",
                    marginTop: "9px",
                  }}
                >
                  Bag
                </div>
              </Link>
              <button
                id="logoutBtn"
                className="sub-menu-profile"
                onClick={showProfileDropDown}
              >
                <>
                  <img src={login} alt="" className="profile-icon" />
                  <div style={{ color: "#56B180", marginLeft: "10px" }}>
                    Profile
                  </div>
                </>
                <ul className="profile-dropDown">
                  <li>
                    <a href="./#products">Profile</a>
                  </li>
                  <li>
                    <Link to="/orders">Orders</Link>
                  </li>
                  <li
                    onClick={() => {
                      dispatch(resetUserId());
                      nevigate("/");
                    }}
                  >
                    <a href="#" style={{ display: "flex", paddingTop: "0px" }}>
                      Logout
                      <img src={logout} alt="" className="logout-icon" />
                    </a>
                  </li>
                </ul>
              </button>
            </>
          )}

          {/* onClick={() => {
                                dispatch(resetUserId())
                                nevigate('/')
                            }} */}
        </article>
      </section>

      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </header>
  );
}

export default Header;
