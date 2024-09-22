import React from "react";

import ServiceBackground from "./images/services_bg.png";
import Question from "./images/24th.png";
import Restaurant from "./images/restaurant.png";
import Room from "./images/superior_room.png";
import Transport from "./images/airport_transfer.png";
import Outdoor from "./images/outdoor_activities.png";
import Wellness from "./images/spa_and_wellness.png";
import Video from "./images/services_img.png";

const Services = () => {
      return (
            <section
                  style={{
                        backgroundImage: `url(${ServiceBackground})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        height: "fit-content",
                  }}>
                  <div className="container pt-5">
                        <div className="row">
                              <div className="col-lg-4 d-flex flex-column justify-content-center pb-5 pe-lg-4 gap-4">
                                    <div className="d-flex flex-column align-items-end gap-3">
                                          <img src={Question} alt="" />
                                          <h4 className="customer-primary-color">24h Front Desk</h4>
                                          <p className="text-end text-secondary">
                                                Eventum nobis nunc et leo urgeant eos etiam sint et vel stante at vel
                                                itaque iste modestia.
                                          </p>
                                    </div>
                                    <div className="d-flex flex-column align-items-end gap-3">
                                          <img src={Restaurant} alt="" />
                                          <h4 className="customer-primary-color">Restaurants</h4>
                                          <p className="text-end text-secondary">
                                                Eventum nobis nunc et leo urgeant eos etiam sint et vel stante at vel
                                                itaque iste modestia.
                                          </p>
                                    </div>
                                    <div className="d-flex flex-column align-items-end gap-3">
                                          <img src={Room} alt="" />
                                          <h4 className="customer-primary-color">24h Front Desk</h4>
                                          <p className="text-end text-secondary">
                                                Eventum nobis nunc et leo urgeant eos etiam sint et vel stante at vel
                                                itaque iste modestia.
                                          </p>
                                    </div>
                              </div>
                              <div className="col-lg-4 d-flex align-items-end">
                                    <img
                                          src={Video}
                                          alt=""
                                          style={{
                                                objectFit: "contain",
                                                objectPosition: "bottom",
                                                width: "100%",
                                                height: "100%",
                                          }}
                                    />
                                    {/* <video
                                          class="elementor-background-video-hosted elementor-html5-video"
                                          autoPlay
                                          muted
                                          playsInline
                                          loop
                                          src="https://luxestay.siswebapp.com/wp-content/uploads/2024/07/video2.mp4"
                                          style={{
                                                width: "100%",
                                                height: "auto",
                                          }}></video> */}
                              </div>
                              <div className="col-lg-4 d-flex flex-column justify-content-center pb-5 ps-lg-4 gap-4">
                                    <div className="d-flex flex-column align-items-start gap-3">
                                          <img src={Transport} alt="" />
                                          <h4 className="customer-primary-color">Airport Transfers</h4>
                                          <p className="text-start text-secondary">
                                                Eventum nobis nunc et leo urgeant eos etiam sint et vel stante at vel
                                                itaque iste modestia.
                                          </p>
                                    </div>
                                    <div className="d-flex flex-column align-items-start gap-3">
                                          <img src={Outdoor} alt="" />
                                          <h4 className="customer-primary-color">Outdoor Activities</h4>
                                          <p className="text-start text-secondary">
                                                Eventum nobis nunc et leo urgeant eos etiam sint et vel stante at vel
                                                itaque iste modestia.
                                          </p>
                                    </div>
                                    <div className="d-flex flex-column align-items-start gap-3">
                                          <img src={Wellness} alt="" />
                                          <h4 className="customer-primary-color">Spa & Wellness</h4>
                                          <p className="text-start text-secondary">
                                                Eventum nobis nunc et leo urgeant eos etiam sint et vel stante at vel
                                                itaque iste modestia.
                                          </p>
                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default Services;
