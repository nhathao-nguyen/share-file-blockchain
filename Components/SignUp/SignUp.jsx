import React, { useState } from "react";
import axios from "axios";

// INTERNAL IMPORT
import { Lock, FormSVG } from "../SVG/index";
import Style from "./SignUp.module.css";
import { Notification } from "../index";
import { useStateContext } from "../../Context/NFTs";

const SignUp = ({
  setLogin, setSignup, notification, setNotification
}) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const {
    address,
  } = useStateContext();

  const handleFormFieldChange = (fieldName, e) => {
    setUser({ ...user, [fieldName]: e.target.value });
  };

  const createAccount = async (e) => {
    e.preventDefault();
    if (
      user.email == "" ||
      user.password == "" ||
      user.name == "" ||
      user.passwordConfirm == ""
    ) {
      return setNotification("Please provide all the detail");
    }
    setNotification("Wait creating account...");
    try {
      // API CALL
      const response = await axios({
        method: "POST",
        url: `api/v1/user/signup`,
        withCredentials: true,
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          passwordConfirm: user.passwordConfirm,
          address: address
        },
      });
      if (response.data.status == "success") {
        setNotification("Account is successfully created");
        localStorage.setItem("NFTApi Token", response.data.token);
        const userData = {
          email: response.data.data.user.email,
          address: response.data.data.user.address,
          name: response.data.data.user.name,
        };
        localStorage.setItem("NFTApi User", JSON.stringify(userData));
        setSignup(false);
        setNotification("");
        window.location.reload();
      } else {
        setNotification("Something went wrong, try again later")
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>
      <div className={Style.card}>
        <div className={Style.card2}>
          <form className={Style.form}>
            <p id="heading" className={Style.heading}>SignUp</p>
            <div className={Style.field}>
              <FormSVG styleClass={Style.input_icon} />
              <input type="text" className={Style.input_field} placeholder="Name" autoComplete="off" onChange={(e) => handleFormFieldChange("name", e)} />
            </div>
            <div className={Style.field}>
              <FormSVG styleClass={Style.input_icon} />
              <input type="text" className={Style.input_field} placeholder="Email" autoComplete="off" onChange={(e) => handleFormFieldChange("email", e)} />
            </div>
            <div className={Style.field}>
              <Lock styleClass={Style.input_icon} />
              <input type="password" className={Style.input_field} placeholder="Password" autoComplete="off" onChange={(e) => handleFormFieldChange("password", e)} />
            </div>
            <div className={Style.field}>
              <Lock styleClass={Style.input_icon} />
              <input type="password" className={Style.input_field} placeholder="Password Confirm" autoComplete="off" onChange={(e) => handleFormFieldChange("passwordConfirm", e)} />
            </div>
            <div className={Style.btn}>
              <button className={Style.button1} onClick={() => (setLogin(true), setSignup(false))}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
              <button className={Style.button2} onClick={() => setSignup(false)}>
                Close
              </button>
            </div>
            <button className={Style.button3} onClick={(e) => createAccount(e)}>
              create
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

export default SignUp;
