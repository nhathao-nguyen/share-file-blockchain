import React, { useState, useEffect } from "react";
import Link from "next/link";

// INTERNAL IMPORT
import Style from "./Header.module.css";
import { Logo, Login, SignUp } from "../index";

const Header = ({ notification, setNotification }) => {
  
  const menuList = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "API",
      link: "/nfts-api",
    },
  ];

  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  
  const openModel = (el) => {
    if (el == "Login") {
      setLogin(true);
      setSignup(false);
    } else if (el == "Signup") {
      setSignup(true);
      setLogin(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("NFTApi Token");
    const user = JSON.parse(localStorage.getItem("NFTApi User"));
    setToken(token);
    setUser(user);
  }, []);

  const logout = () => {
    localStorage.removeItem("NFTApi Token");
    localStorage.removeItem("NFTApi User");
    window.location.reload();
  };

  return (
    <>
      <div className={Style.Header}>
        <a href="/">
          <Logo />
        </a>
        <div className={Style.menu}>
          {menuList.map((el, i) => (
            <Link className={Style.link} href={el.link} key={i + 1}>
              <p>{el.name}</p>
            </Link>
          ))}
          {token ? (
            <div>
              <a className={Style.linkuser} href="/profile">
                <p>Hello, {user.name}</p>
              </a>
              <p onClick={() => logout()}>Logout</p>
            </div>
          ) : (
            <div>
              <p onClick={() => openModel("Login")}>Login</p>
              <p onClick={() => openModel("Signup")}>Signup</p>
            </div>
          )}
        </div>
      </div>

      {/* Signup */}
      {signup && (
        <div className={Style.form}>
          <div className={Style.form_inner}>
            <SignUp
              setLogin={setLogin}
              setSignup={setSignup}
              notification={notification}
              setNotification={setNotification}
            />
          </div>
        </div>
      )}

      {/* Login */}
      {login && (
        <div className={Style.form}>
          <div className={Style.form_inner}>
            <Login
              setLogin={setLogin}
              setSignup={setSignup}
              notification={notification}
              setNotification={setNotification}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
