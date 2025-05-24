import React, { useEffect } from "react";
// INTERNAL IMPORT
import Style from "./Notification.module.css";

const Notification = ({
  setNotification, notification
}) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <div onClick={() => setNotification("")} className={Style.alert}>
      {notification}
      <span>&times;</span>
    </div>
  );
};

export default Notification;
