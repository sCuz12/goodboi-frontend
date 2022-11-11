import Image from "next/image";
import React, { Component } from "react";
import { GoLocation } from "react-icons/go";
import Slider from "react-slick";
import { GrPrevious, GrNext } from "react-icons/gr";
import Link from "next/link";

export default class SwipeCarouselSlider extends Component {
  render() {
    const { listings } = this.props;

    function CustomPrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <GrPrevious
          className={className}
          style={{ ...style, display: "block", color: "blue" }}
          onClick={onClick}
        />
      );
    }

    function CustomNextArrow(props) {
      const { className, style, onClick } = props;
      return (
        <GrNext
          className={className}
          style={{ ...style, display: "block", color: "blue" }}
          onClick={onClick}
        />
      );
    }

    // Set preferred slidesToShow
    const totalListings = listings.length;
    let showDots = true;
    let slidesToShow = 4;

    if (totalListings > 10) {
      showDots = false;
    } else {
      slidesToShow = totalListings;
    }

    const settings = {
      className: "center pl-8",
      infinite: true,
      centerPadding: "40px",
      slidesToShow: slidesToShow,
      dots: showDots,
      prevArrow: <CustomPrevArrow />,
      nextArrow: <CustomNextArrow />,
      width: 1204,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: showDots,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
      afterChange: function (index) {
        console.log(
          `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        );
      },
    };
    {
    }
    return (
      <div className="carousel_container">
        <Slider {...settings}>
          {/* items within sliders */}
          {listings.map((item) => (
            <div key={item.id} className="">
              <div className="w-72 bg-roz hover:bg-basicPurple hover:text-white h-100 rounded-xl">
                <Link href={`/animals/view/${item.id}`}>
                  <div className="items-center text-center">
                    <div className="p-2 transition duration-300 ease-out transform cursor-pointer hover:scale-105">
                      <Image
                        key={item.id}
                        className="object-cover shadow-inner rounded-2xl"
                        src={item.cover_image}
                        alt={item.name}
                        width="100%"
                        height="100%"
                        layout="responsive"
                      />
                    </div>
                  </div>
                </Link>
                {/* */}
                <div className="grid justify-center gap-px text-center gird-cols-2 gap-x-1">
                  <div className="grid grid-cols-5 pt-3 pl-7 text-l">
                    <p className="col-span-4 text-lg font-bold ">{item.name}</p>
                  </div>

                  <div className="container mx-auto">
                    <span className="font-thin">Age:</span>
                    <span className="pl-1 font-medium font-bold">
                      {item.age} years old
                    </span>
                  </div>
                  <div className="flex items-center mx-auto ">
                    <span className="pr-2">
                      <GoLocation />
                    </span>
                    <span>{item.city}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
