import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { Helmet } from 'react-helmet';
// INTERNAL IMPORT
import {
  Card,
  Upload,
  Button,
  Profile,
  Header,
  Footer,
  Notification,
  Loader,
  Filter,
  Form,
} from "../Components";
import { useStateContext } from "../Context/NFTs";
import images from "../Components/Image/client/index";

const Home = () => {
  // STATE VARIABLE
  const {
    address,
    disconnect,
    contract,
    connect,
    userBlance,
    uploadImage,
    getUploadedImages,
    setLoading,
    loading,
    // API
    getAllNftsAPI,
  } = useStateContext();
  const [openProfile, setOpenProfile] = useState(false);
  const [closeForm, setCloseForm] = useState(true);
  const [file, setFile] = useState(null);
  const [display, setDisplay] = useState(null);
  const [notification, setNotification] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [activeSelect, setActiveSelect] = useState("Old Files");
  const [imagesCopy, setImagesCopy] = useState([]);

  // GET DATA
  const oldImages = [];
  const fetchImages = async () => {
    const images = await getUploadedImages();

    // API NFTs
    // const apiImages = await getAllNftsAPI();
    const apiImages = await axios.get(`/api/v1/nfts`);
    const differentImages = [];
    images.forEach(image => {
        apiImages.data.data.nfts.forEach(nft => {
          if (image.title === nft.title) {
              differentImages.push(image);
          }
        });
    });

    // console.log("=== images");
    // console.log(images);
    // console.log("=== apiImages");
    // console.log(apiImages.data.data.nfts);
    // console.log("=== differentImages");
    // console.log(differentImages);

    setAllImages(differentImages);
  };

  useEffect(() => {
    if (contract) fetchImages();
  }, [address, contract]);

  if (allImages.length == 0) {
    console.log("Loading");
  } else {
    allImages.map((el) => oldImages.push(el));
  }

  // IMAGE DATA
  const [category, setCategory] = useState("");
  const [imageInfo, setImageInfo] = useState({
    title: "",
    description: "",
    email: "",
    category: "",
    image: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setImageInfo({ ...imageInfo, [fieldName]: e.target.value });
  };

  // UPLOAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCloseForm(false);
    setLoading(true);
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "POST",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `dc71e76904c3ad56af22`,
            pinata_secret_api_key: `cdcfff532f8fb630637ce9389f4f35a428ebb84209775da9afa6aa810e765600`,
            "Content-Type": "multipart/form-data",
          },
        });

        const image = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        await uploadImage({
          ...imageInfo,
          image: image,
          category: category,
        });
        setFile(null);
      } catch (error) {
        console.log(error);
      }
    }
    setFile(null);
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    e.preventDefault();
  };

  // TAKE IMAGE
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setDisplay(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="home">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Header notification={notification} setNotification={setNotification} />
      <div className="header">
        <h1>Create free document sharing</h1>
      </div>
      {/* UPLOAD */}
      <div className="upload">
        <Upload
          onImageChange={onImageChange}
          display={display}
          address={address}
          retrieveFile={retrieveFile}
          title={"Browse poster to upload!"}
        />
        <div className="upload-info">
          <h1>Welcome to NFTs IPFS upload</h1>
          <p>
            Our products help you securely distribute any type of media at scale-freeing you from restrictive platforms, middlemen, and algorithms that limit your creative agency.
          </p>
          <div className="avatar">
            <Button
              address={address}
              disconnect={disconnect}
              connect={connect}
              file={file}
            />
            {address && (
              <p>
                <Image
                  className="avatar_img"
                  src={images.client1}
                  width={40}
                  height={40}
                  onClick={() => setOpenProfile(true)}
                />
              </p>
            )}
          </div>
        </div>
      </div>
      <h1 className="subheading">All documents</h1>
      {/* CARD */}
      {allImages.length == 0 ? (
        <Loader />
      ) : allImages == undefined ? (
        <h1>No images</h1>
      ) : (
        <>
          <Filter
            setImagesCopy={setImagesCopy}
            imagesCopy={imagesCopy}
            setAllImages={setAllImages}
            allImages={allImages}
            oldImages={oldImages}
            activeSelect={activeSelect}
            setActiveSelect={setActiveSelect}
          />
          <div className="card">
            {allImages.map((image, i) => (
              <Card
                key={i + 1}
                index={i}
                image={image}
                setNotification={setNotification}
              />
            ))}
          </div>
        </>
      )}
      {/* FOOTER */}
      <Footer />
      {/* NOTIFICATION */}
      {notification != "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
      {/* PROFILE */}
      {openProfile && (
        <div className="profile">
          <Profile
            setOpenProfile={setOpenProfile}
            userBlance={userBlance}
            address={address}
          />
        </div>
      )}
      {/* LOADER */}
      {loading && (
        <div className="loader">
          <Loader />
        </div>
      )}
      {/* FORM */}
      {file && closeForm && (
        <div className="form">
          <div className="form_inner">
            <Form
              setFile={setFile}
              setDisplay={setDisplay}
              handleFormFieldChange={handleFormFieldChange}
              handleSubmit={handleSubmit}
              setCategory={setCategory}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
