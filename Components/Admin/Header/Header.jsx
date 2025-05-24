import React, { useState, useEffect } from "react";
import Style from './Header.module.css';
import { Logo } from "../../index";
import Link from "next/link";

const Header = () => {
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

    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("NFTApi Token");
        const user = JSON.parse(localStorage.getItem("NFTApi User"));
        setToken(token);
        setUser(user);
    }, []);

    const logout = () => {
        localStorage.removeItem("NFTApi Token");
        localStorage.removeItem("NFTApi User");
        window.location.href = "/";
    };
    return (
        <div className={Style.header}>
            <a href="/dashboard">
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
                        <p>Login with account admin!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
