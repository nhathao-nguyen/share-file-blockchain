import React, { useState } from "react";
import axios from "axios";

// INTERNAL IMPORT
import { Lock, FormSVG } from "../SVG/index";
import Style from "./Login.module.css";
import { Notification } from "../index";
import { useStateContext } from "../../Context/NFTs";

const Login = ({
  setLogin, setSignup, notification, setNotification
}) => {

  const {
    address,
  } = useStateContext();

  //API LOGIN
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setUser({ ...user, [fieldName]: e.target.value })
  };

  const apiLogin = async (e) => {
    e.preventDefault();

    if (user.email == "" || user.password == "") {
      return setNotification("Please provide email and password");
    }
    try {
      const response = await axios({
        method: "POST",
        url: `/api/v1/user/login`,
        withCredentials: true,
        data: {
          email: user.email,
          password: user.password,
        },
      });

      if (response.data.status == "success") {
        setNotification("You have successfully login");
        localStorage.setItem("NFTApi Token", response.data.token);
        const userData = {
          email: response.data.data.user.email,
          address: response.data.data.user.address,
          name: response.data.data.user.name,
        };
        localStorage.setItem("NFTApi User", JSON.stringify(userData));
        setLogin(false);
        console.log(response.data.data.user);
        if (response.data.data.user.role == "admin"){
          window.location.href = "/dashboard"
        } else {
          window.location.reload();
        }
      } else {
        setNotification("Something went wrong, try again later")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div class={Style.card}>
        <div class={Style.card2}>
          <form class={Style.form}>
            <p id="heading" className={Style.heading}>Login</p>
            <div class={Style.field}>
              <FormSVG styleClass={Style.input_icon} />
              <input
                type="text"
                class={Style.input_field}
                placeholder="Email"
                autoComplete="off"
                onChange={(e) => handleFormFieldChange("email", e)}
              />
            </div>
            <div class={Style.field}>
              <Lock styleClass={Style.input_icon} />
              <input
                type="password"
                class={Style.input_field}
                placeholder="Password"
                autoComplete="off"
                onChange={(e) => handleFormFieldChange("password", e)}
              />
            </div>
            <div class={Style.btn}>
              <button class={Style.button1} onClick={() => setLogin(false)}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
              <button
                class={Style.button2}
                onClick={() => (setLogin(false), setSignup(true))}>
                Sign up
              </button>
            </div>
            <button class={Style.button3} onClick={(e) => apiLogin(e)}>
              Login
            </button>
          </form>
        </div>
      </div>

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

export default Login;
