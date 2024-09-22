import React from "react";

import { FiPhoneOutgoing } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMailOpenOutline } from "react-icons/io5";

const TopHeader = () => {
      return (
            <div className="d-lg-flex d-none align-items-center justify-content-between border-bottom border-secondary px-5 py-1 text-white">
                  <div className="d-flex align-items-center justify-content-start gap-2">
                        <FiPhoneOutgoing className="cursor-pointer" />
                        <p>Call us: (617) 623 2338</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-start gap-3">
                        <FaFacebook className="cursor-pointer" />
                        <FaInstagram className="cursor-pointer" />
                        <FaLinkedin className="cursor-pointer" />
                        <FaXTwitter className="cursor-pointer" />
                  </div>
                  <div className="d-flex align-items-center justify-content-start gap-2">
                        <IoMailOpenOutline className="cursor-pointer" />
                        <p>Mail us: info@luxstay.com</p>
                  </div>
            </div>
      );
};

export default TopHeader;
