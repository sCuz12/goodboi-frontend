import Image from "next/image";
import React, { useState, useEffect } from "react";
import FsLightbox from "fslightbox-react";

function ListingImageSlider({ listingImages, listingImagesUrls }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [toggler, setToggler] = useState(false);

  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0,-50%)",
    left: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };
  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0,-50%)",
    right: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? listingImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === listingImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleToggler = (value) => {
    setToggler(value);
  };

  return (
    <>
      <div className="relative flex-col items-center w-full h-full rounded-3xl">
        <div style={leftArrowStyles} onClick={goToPrevious}>
          ❮
        </div>
        <div style={rightArrowStyles} onClick={goToNext}>
          ❯
        </div>

        <div className="flex flex-col items-center ">
          <div className="w-full bg-center h-3/5 rounded-3xl">
            <button onClick={() => handleToggler(!toggler)}>
              <Image
                className="object-cover shadow-inner rounded-2xl"
                src={`${listingImages[currentIndex].url}`}
                layout="fill"
              />
            </button>
          </div>

          <FsLightbox toggler={toggler} sources={listingImagesUrls} />
          {/**Next photos section */}
          <div></div>
          {/**doTs */}
          <div className="z-50 flex justify-center w-full pt-8">
            {listingImages.map((slide, slideIndex) => {
              return slideIndex === currentIndex ? (
                <p key={slideIndex}>&#9670;</p>
              ) : (
                <p key={slideIndex}>&#9671;</p>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListingImageSlider;
