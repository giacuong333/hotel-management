import React, { useRef } from "react";

import Room from "./Room";

import Room1 from "../images/room1.png";
import Room2 from "../images/room2.png";
import Room3 from "../images/room3.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

const carouselSettings = {
      infinite: true,
      speed: 2000,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
            {
                  breakpoint: 1024,
                  settings: {
                        slidesToShow: 2,
                  },
            },
            {
                  breakpoint: 600,
                  settings: {
                        slidesToShow: 1,
                  },
            },
      ],
};

const RoomList = () => {
      const slideRef = useRef(null);

      return (
            <div className="position-relative">
                  <Slider {...carouselSettings} ref={slideRef}>
                        <Room image={Room1} price={399} name="Beach Room" area={60} guest={8} bed={3} />
                        <Room image={Room2} price={299} name="Hill Room" area={30} guest={2} bed={1} />
                        <Room image={Room3} price={265} name="City Room" area={50} guest={5} bed={2} />
                  </Slider>
                  <div
                        className="position-absolute"
                        tabIndex="0"
                        role="button"
                        aria-label="Previous slide"
                        style={{
                              top: "50%",
                              left: 12,
                              transform: "translateY(-50%)",
                        }}
                        onClick={() => slideRef.current.slickPrev()}>
                        <svg
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              width="22.25px"
                              height="41.25px"
                              viewBox="0 0 22.25 41.25"
                              enableBackground="new 0 0 22.25 41.25"
                              xmlSpace="preserve">
                              <polyline
                                    fill="none"
                                    stroke="#000000"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    points="21.67,5.45 21.67,0.67 0.67,20.67 21.67,40.67 21.67,35.88 "></polyline>
                        </svg>
                  </div>
            </div>
      );
};

export default RoomList;
