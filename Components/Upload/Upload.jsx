import React from "react";
import Image from "next/image";

// INTERNAL IMPORT
import { Delete, UploadIcon, File } from "../SVG/index";
import Style from "./Upload.module.css";

const Upload = ({ onImageChange, display, retrieveFile, title }) => {
  return (
    <div class={Style.container}>
      <div class={Style.header}>
        {display == null ? (
          <>
            <UploadIcon />
            {/* <p>Browse file to upload!</p> */}
            <p>{title}</p>
          </>
        ) : (
          <p>
            <Image
              className={Style.image}
              src={display}
              alt="image"
              width={200}
              height={200}
            />
          </p>
        )}
      </div>
      <label htmlFor="file" className={Style.footer}>
        <File />
        <p>Not selected file</p>
        <Delete />
      </label>
      <input type="file" id="file" onChange={(e) => (onImageChange(e), retrieveFile(e))} className={Style.file} />
    </div>
  );
};

export default Upload;
