import React, {useEffect, useState} from "react";
import Image from "next/image";
// INTERNAL IMPORT
import Style from "./Card.module.css";
import { ethers } from "ethers";
import images from "../Image/client/index";

const Card = ({ image }) => {
  const [fileType, setFileType] = useState("");

  useEffect(() => {
    const checkFileType = async () => {
      try {
        const response = await fetch(image.image);
        const contentType = response.headers.get("Content-Type");
        setFileType(contentType);
      } catch (error) {
        console.error("Error fetching file type:", error);
      }
    };

    checkFileType();
  }, [image.image]);

  return (
    <div className={Style.Card}>
      <div className={Style.image}>
        {fileType === "image/png" || fileType === "image/jpg" || fileType === "image/jpeg" ? (
          <img
            className={Style.image_img}
            src={image.image}
            alt="image"
          />
        ) : (
          <Image
            className={Style.image_img}
            src={images[`client0`]}
            alt="image"
          />
        )}
      </div>
      <div className={Style.detail}>
        <h1>{image.title}</h1>
        <p className={Style.info}>
          <span>Image ID: #{image.imageID}</span> {""}{" "}
        </p>
        <p className={Style.info}>
          <span>Category: {image.category}</span> {""}{" "}
        </p>
      </div>
      <div className={Style.donation}>
        <h3 className={Style.donation_title}>Your donation receipt history</h3>
        <div>
          {image.donations.map((donation, i) => (
            <div key={i} className={Style.donationItem}>
              <p><strong>Donor:</strong> {donation.donor}</p>
              <p><strong>Amount:</strong> {ethers.utils.formatEther(donation.amount)} tBNB</p>
              <p><strong>Date:</strong> {new Date(donation.timestamp * 1000).toDateString()}</p>
              <p>*****</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
