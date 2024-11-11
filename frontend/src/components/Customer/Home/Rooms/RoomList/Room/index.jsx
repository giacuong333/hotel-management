import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaDollarSign } from "react-icons/fa6";
import { BiArea } from "react-icons/bi";
import { IoBedOutline } from "react-icons/io5";

const Room = ({ image, price, name, area, bed, id}) => {
      const navigate = useNavigate();

      const handleRoomClick = () => {
            if (id) {
                  navigate(`/room/${id}`, { state: { id } }); 
            } else {
                  console.error("Room ID is undefined.");
            }
      };

      return (
            <div className="w-full px-4">
                  <div
                        style={{
                              background: `url(${image})`,
                              backgroundPosition: "bottom",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                              width: "100%",
                              height: "400px",
                              padding: "1.4rem",
                              display: "block",
                        }}
                        onClick = {handleRoomClick}
                        >
                        <div className="d-flex flex-column align-items-start justify-content-end w-full h-full gap-3 cursor-pointer">
                              <div className="bg-white d-inline-flex align-items-center gap-2 px-3 py-2">
                                    <span className="text-uppercase">From </span>
                                    <span className="d-flex align-items-center">
                                          <p className="font-weight-bold">
                                                {price.toLocaleString('en-US')} VND
                                          </p>
                                    </span>
                              </div>
                              <div
                                    className="p-4 d-flex align-items-center justify-content-between gap-4 text-white w-full"
                                    style={{
                                          backgroundColor: "#223546",
                                    }}>
                                    <h4
                                          className="text-truncate"
                                          style={{
                                                maxWidth: "200px",
                                          }}>
                                          {name}
                                    </h4>
                                    <span className="d-flex flex-nowrap align-items-center gap-2">
                                          <BiArea />
                                          {area}m2
                                    </span>
                                    <span className="d-flex flex-nowrap align-items-center gap-2">
                                          <IoBedOutline />
                                          {bed} Bed
                                    </span>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Room;
