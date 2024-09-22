import React, { useEffect, useState } from "react";

import TopHeader from "./TopHeader";
import Nav from "./Nav";

import Slide1 from "./images/slide1.png";
import Slide2 from "./images/slide2.png";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import { TypeAnimation } from "react-type-animation";

const Slides = [
      {
            thumbnail: Slide1,
            text: "SOPHISTICATED ALPINE RESORT IN VIETNAM'S HEARTLAND",
      },
      {
            thumbnail: Slide2,
            text: "EXCLUSIVE HIGH-ALTITUDE SANCTUARY AND ADVENTURE RESORT",
      },
];

const Header = () => {
      const [currentIndex, setCurrentIndex] = useState(0);

      useEffect(() => {
            const timer = setInterval(nextSlide, 5000);

            return () => clearInterval(timer);
      }, []);

      const nextSlide = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % Slides.length);
      };

      const prevSlide = () => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + Slides.length) % Slides.length);
      };

      return (
            <header
                  style={{
                        position: "relative",
                        backgroundImage: `url(${Slides[currentIndex].thumbnail})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "800px",
                  }}
                  className="carousel animation-effect">
                  <TopHeader />
                  <Nav />

                  <div className="carousel-content mb-10">
                        <h2 className="text-white text-center animation-effect">
                              <TypeAnimation
                                    sequence={[Slides[0].text, 1000, Slides[1].text, 1000]}
                                    speed={50}
                                    repeat={Infinity}
                              />
                        </h2>
                  </div>
                  {/* Left Arrow */}
                  <MdOutlineKeyboardArrowLeft
                        className="position-absolute"
                        style={{
                              top: "50%",
                              left: "4%",
                              transform: "translateY(-50%)",
                              zIndex: 10,
                              cursor: "pointer",
                              fontSize: "3rem",
                              color: "#fff",
                              opacity: 0.6,
                        }}
                        onClick={prevSlide}
                  />
                  {/* Right Arrow */}
                  <MdOutlineKeyboardArrowRight
                        className="position-absolute"
                        style={{
                              top: "50%",
                              right: "4%",
                              transform: "translateY(-50%)",
                              zIndex: 10,
                              cursor: "pointer",
                              fontSize: "3rem",
                              color: "#fff",
                              opacity: 0.6,
                        }}
                        onClick={nextSlide}
                  />
            </header>
      );
};

export default Header;
