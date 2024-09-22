import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
      return (
            <footer className="border-top mt-5" style={{ backgroundColor: "rgb(243,243,242)" }}>
                  <div className="container mx-auto d-flex align-items-center justify-content-between py-3">
                        <p>© Luxestay. All Rights Reserved.</p>
                        <Link to="/policy" className="customer-primary-color-hover animation-effect">
                              Privacy Policy
                        </Link>
                  </div>
            </footer>
      );
};

export default Footer;
