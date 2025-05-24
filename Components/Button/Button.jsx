import React, { useState, useEffect } from "react";
// INTERNAL IMPORT
import Style from "./Button.module.css";
// INTERNAL IMPORT
import {
  Notification
} from "../index";
const Button = ({ disconnect, connect, address, file }) => {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("NFTApi User"));
    setUser(user);
  }, []);

  useEffect(() => {
    if (user && user.address && address && address !== user.address) {
      setNotification("The contract address does not match the registered account contract!");
    }
  }, [user, address]);

  return (
    <>
      {user && user.address ? (
        address === user.address ? (
          <button onClick={() => disconnect()} className={Style.button}>
            <span className={Style.button_content}>
              {file ? "Upload" : "Disconnect"}
            </span>
          </button>
        ) : (
          <button onClick={() => connect()} className={Style.button}>
            <span className={Style.button_connect}>
              Connect
            </span>
          </button>
        )
      ) : (
        address ? (
          <button onClick={() => disconnect()} className={Style.button}>
            <span className={Style.button_content}>
              {file ? "Upload" : "Disconnect"}
            </span>
          </button>
        ) : (
          <button onClick={() => connect()} className={Style.button}>
            <span className={Style.button_connect}>
              Connect
            </span>
          </button>
        )
      )}
      {/* NOTIFICATION */}
      {notification != "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
    </>
  );
};

export default Button;
