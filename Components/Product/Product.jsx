import React, { useState, useEffect } from "react";
import Image from "next/image";
import { saveAs } from "file-saver";

// INTERNAL IMPORT
import Style from "./Product.module.css";
import BTNStyle from "../Button/Button.module.css";
import client from "../Image/client/index";
import { Donate } from "../index";

const Product = ({
  setNotification,
  setSupport,
  donateAmount,
  setLoading,
  image,
}) => {
  const handleClick = () => {
    let url = `${image?.imageURL}`;
    saveAs(url, `${image?.title}`)
  };

  const [donate, setDonate] = useState(false);
  const [fileType, setFileType] = useState("");

  useEffect(() => {
    const checkFileType = async () => {
      try {
        const response = await fetch(image.imageURL);
        const contentType = response.headers.get("Content-Type");
        setFileType(contentType);
      } catch (error) {
        console.error("Error fetching file type:", error);
      }
    };

    checkFileType();
  }, [image.image]);

  return (
    <div className={Style.Product}>
      <div className={Style.image}>
        
        {fileType === "image/png" || fileType === "image/jpg" || fileType === "image/jpeg" ? (
              <img className={Style.image_img} src={image?.imageURL} alt="image" />
            ) : (
              <Image
                className={Style.image_img}
                src={client[`client0`]}
                alt="image"
              />
            )}
      </div>
      <div className={Style.detail}>
        <div className={Style.detail_box}>
          <h1>{image?.title}</h1>
          <p className={Style.info}>
            <span>Category: {image?.category}</span> {""}{" "}
            <span>Image ID: #{image?.imageId}</span> {""}{" "}
            <span>CreatedAt: {new Date(image?.createdAt * 1000).toDateString()} </span>
          </p>
          <p className={Style.info}>
            <span>
              Donation:{""} {image?.fundRaised} tBNB
            </span>{" "}
            {""}{" "}
          </p>
          <p>Contact creator: {image?.email}</p>
          <span class={Style.para}>
            <Image alt="image-2" className="avatar_img" src={client[`client${image.imageId}`]} width={40} height={40} />
            <small
              className={Style.para_small}
              onClick={() => (
                setNotification("Successfully copied"),
                navigator.clipboard.writeText(image?.creator)
              )}
            >{image?.creator}</small>
          </span>
          <h3>Description:</h3>
          <p>{image?.description}</p>
        </div>
        <button onClick={() => (
          setNotification("Image URL is successfully copied"),
          navigator.clipboard.writeText(image?.imageURL)
        )}
          className={BTNStyle.button}
        >
          <span className={`${BTNStyle.button_content} ${Style.btn}`}>
            Copy URL{" "}
          </span>
        </button>

        {/* DOWNLOAD */}
        <span className={Style.space}></span>
        <button onClick={() => navigator.clipboard.writeText(setNotification("Thanhs for downloading"))} className={BTNStyle.button}>
          <span  onClick={handleClick} className={`${BTNStyle.button_content} ${Style.btn}`}>Download image{" "}</span>
        </button>

        {/* DONATE */}
        <span className={Style.space}></span>
        <button onClick={() => setDonate(true)} className={BTNStyle.button}>
          <span className={`${BTNStyle.button_content} ${Style.btn}`}>Donate</span>
        </button>
      </div>
      {donate && (
        <div className="form">
          <div className="form_inner">
            <Donate
              setLoading={setLoading}
              donateAmount={donateAmount}
              setDonate={setDonate}
              setSupport={setSupport}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
