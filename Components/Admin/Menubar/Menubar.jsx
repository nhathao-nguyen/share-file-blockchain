import React from "react";
import Style from "./Menubar.module.css";
import images from "../../Image/client/index";
import Image from "next/image";
import { useRouter } from "next/router";

const Menubar = () => {
    const router = useRouter();
    const currentPath = router.pathname;

    return (
        <>
            <h1 className={Style.heading}>Admin Dashboard</h1>
            <div className={Style.menubar}>
                {currentPath !== '/admin/users' && (
                    <a className={Style.menuitem} href="/admin/users">
                        <Image
                            className={Style.image}
                            src={images[`muser`]}
                            alt="Manage Users"
                            width={50}
                            height={50}
                        />
                        <span className={Style.text}>Manage Users</span>
                    </a>
                )}
                {currentPath !== '/admin/posts' && (
                    <a className={Style.menuitem} href="/admin/posts">
                    <Image
                        className={Style.image}
                        src={images[`mpost`]}
                        alt="Manage Posts"
                        width={50}
                        height={50}
                    />
                    <span className={Style.text}>Manage Posts</span>
                </a>
                )}
                {currentPath !== '/admin/comments' && (
                    <a className={Style.menuitem} href="/admin/comments">
                        <Image
                            className={Style.image}
                            src={images[`mcomment`]}
                            alt="Manage Comments"
                            width={50}
                            height={50}
                        />
                        <span className={Style.text}>Manage Comments</span>
                    </a>
                )}
            </div>
        </>
    );
}

export default Menubar;
