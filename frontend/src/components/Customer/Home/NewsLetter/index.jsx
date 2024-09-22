import React from "react";
import { Link } from "react-router-dom";

import Best from "./images/best.png";
import Off from "./images/off.png";

import Background from "./images/your_comfort_bg2.png";
import LeftImage from "./images/your_comfort_img1.png";
import LeavesImage from "./images/your_comfort_graphic.png";
import RightImage from "./images/your_comfort_img2.png";

const NewsLetter = () => {
      return (
            <div>
                  <div className="container mx-auto">
                        <div className="row">
                              <div
                                    className="col-lg-6 d-flex align-items-center justify-content-end gap-3 pe-5 py-5"
                                    style={{
                                          fontSize: "1.4rem",
                                          letterSpacing: ".2rem",
                                    }}>
                                    <img src={Best} alt="" />
                                    <p>Best mountain retreat award 2024</p>
                              </div>
                              <div
                                    className="col-lg-6 d-flex align-items-center justify-content-start gap-3 ps-5 py-5"
                                    style={{
                                          borderLeft: "1px solid #ccc",
                                          fontSize: "1.4rem",
                                          letterSpacing: ".2rem",
                                    }}>
                                    <img src={Off} alt="" />
                                    <p>Get 20% off on first booking</p>
                              </div>
                        </div>
                        <div className="row">
                              <div className="position-relative">
                                    <div className="newsletter-image-left py-lg-0 py-3">
                                          <img src={LeftImage} alt="" />
                                          <div className="newsletter-image-leaves">
                                                <img src={LeavesImage} alt="" />
                                          </div>
                                    </div>
                                    <div
                                          className="col-lg-8 mx-auto d-flex flex-column align-items-center gap-4"
                                          style={{
                                                padding: "4rem 6rem",
                                                backgroundImage: `url(${Background})`,
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "center",
                                                backgroundSize: "cover",
                                          }}>
                                          {/* Left image */}

                                          {/* Left image */}
                                          <p
                                                className="text-uppercase text-center"
                                                style={{
                                                      fontSize: "3.4rem",
                                                }}>
                                                YOUR COMFORT IS OUR PRIORITY
                                          </p>
                                          <p
                                                className="text-center"
                                                style={{ letterSpacing: ".1rem", lineHeight: "2rem" }}>
                                                Our Comfort Is Our Priority" expresses a commitment to providing the
                                                highest level of comfort and satisfaction for our customers. Whether
                                                you're staying with us, using our services, or purchasing our products,
                                                we prioritize your needs and ensure a relaxing and enjoyable experience.
                                          </p>
                                          <p
                                                className="text-center"
                                                style={{ letterSpacing: ".1rem", lineHeight: "2rem" }}>
                                                From cozy accommodations and personalized services to high-quality
                                                products designed with your comfort in mind, everything we do is
                                                centered around making you feel at ease and valued. Your comfort isn't
                                                just our goal—it's our top priority.
                                          </p>
                                          <Link
                                                className="text-uppercase text-center py-1 secondary-button-hover"
                                                style={{
                                                      fontSize: "1.2rem",
                                                      width: "fit-content",
                                                }}>
                                                See more
                                          </Link>
                                          {/* Right image */}
                                    </div>
                                    <div className="newsletter-image-right py-lg-0 py-3">
                                          <img src={RightImage} alt="" />
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default NewsLetter;
