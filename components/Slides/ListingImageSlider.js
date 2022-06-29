import React, { useState, useEffect } from "react";

function ListingImageSlider({ listingImages }) {
  const [currentIndex, setCurrentIndex] = useState(0);

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
  const slideStyles = {
    backgroundImage: `url(${listingImages[currentIndex].url})`,
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

  return (
    <div className="relative flex items-center justify-center justify-between w-full h-full p-2 rounded-3xl">
      <div style={leftArrowStyles} onClick={goToPrevious}>
        ❮
      </div>
      <div style={rightArrowStyles} onClick={goToNext}>
        ❯
      </div>
      <div className="flex flex-col items-center w-full h-full ">
        <div
          className="w-full h-full bg-center bg-cover rounded-3xl"
          style={slideStyles}
        ></div>
        {/**doTs */}
        <div className="flex justify-center pt-2">
          {listingImages.map((slide, slideIndex) => {
            return slideIndex === currentIndex ? (
              <p key={currentIndex}>&#9670;</p>
            ) : (
              <p key={currentIndex}>&#9671;</p>
            );
          })}
        </div>
        {/**Next photos section */}
        <div></div>
      </div>
    </div>
  );
}

export default ListingImageSlider;
