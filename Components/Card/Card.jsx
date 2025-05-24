import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// INTERNAL IMPORT
import Style from "./Card.module.css";
import images from "../Image/client/index";
import imagesNFT from "../Image/index";

const Card = ({ setNotification, image, index }) => {
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
    <div class={Style.card}>
      <div class={Style.content}>
        <a href={`/image/${image.imageID}`}>
        <p>
            {fileType === "image/png" || fileType === "image/jpg" || fileType === "image/jpeg" ? (
              <img
                className={Style.image}
                src={image.image}
                alt="image"
                width={250}
                height={200}
              />
            ) : (
              <Image
                className={Style.image}
                src={images[`client0`]}
                alt="image"
                width={250}
                height={200}
              />
            )}
          </p>
        </a>
        <span class={Style.para}>
          <Image
            className="avatar_img"
            src={images[`client${index + 1}`]}
            alt="image"
            width={40}
            height={40}
          />
          <small
            className={Style.para_small}
            onClick={() => {
              setNotification("Address contract is successfully copied"),
                navigator.clipboard.writeText(image.owner)
            }}
          >
            {image.owner.slice(0, 25)}...
          </small>
        </span>
        <span>
          CreatedAt: {new Date(image.createdAt * 1000).toDateString()}
          <small className={Style.number}>#{image.imageID}</small>
        </span>
        <small className={Style.para}>{image.title.slice(0, 80)}...</small>
        <button
          onClick={() => (
            setNotification("Image URL is successfully copied"),
            navigator.clipboard.writeText(image.image)
          )}
          className={Style.btn}
        >
          Copy URL
        </button>
      </div>
    </div>
  );
};

export default Card;
