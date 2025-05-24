import { useState, useEffect } from "react";
import Image from "next/image";
// INTERNAL IMPORT
import images from "../Image/index";
import Style from "./Filter.module.css";
const Filter = (
  {
    activeSelect,
    setActiveSelect,
    setImagesCopy,
    imagesCopy,
    setAllImages,
    allImages,
    oldImages,
  }
) => {
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  //TEMPLATE SEARCH FUNCTION
  const onHandleSearch = (value) => {
    const filteredImages = allImages.filter(({ owner }) =>
      owner.toLowerCase().includes(value.toLowerCase())
    );
    if (filteredImages.length === 0) {
      setAllImages(imagesCopy);
    } else {
      setAllImages(filteredImages);
    }
  };

  const onClearSearch = () => {
    if (allImages.length && imagesCopy.length) {
      setAllImages(imagesCopy);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setSearch(debouncedSearch), 1000);

    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  useEffect(() => {
    setAllImages(oldImages);
    setImagesCopy(oldImages);
    if (search) {
      onHandleSearch(search);
    } else {
      onClearSearch();
    }
  }, [search]);

  const filter = [
    {
      name: "Old Files",
    },
    {
      name: "Recent Files",
    },
  ];

  useEffect(() => {
    if (activeSelect == "Old Files") {
      setAllImages(oldImages);
    } else {
      setAllImages(oldImages.reverse());
    }
  }, [activeSelect]);

  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <Image alt="image-1" src={images.search} width={20} height={20} />
        <input 
          type="text" 
          placeholder="search address" 
          onChange={(e) => setDebouncedSearch(e.target.value)} 
          value={debouncedSearch} 
        />
      </div>
      <div className={Style.filter} onClick={() => (toggle ? setToggle(false) : setToggle(true))} >
        <div className={Style.filter_title}>
          <h4>{activeSelect}</h4>
          <Image alt="image-2" src={images.arrow} width={10} height={10} />
        </div>
        {
          toggle && (
            <div className={Style.filter_box}>
              {filter.map((el, i) => (
                <p key={i} onClick={() => setActiveSelect(el.name)}>{el.name}</p>
              ))}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Filter;
