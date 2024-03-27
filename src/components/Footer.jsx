import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {

    const navigate = useNavigate()

    return (
        <footer className="footer">
            <ul className="menuItems">
                    <li onClick={() => navigate("/contactus")} className="menuItem">Contact Us</li>
                    <li onClick={() => navigate("/feedback")} className="menuItem">Feedback</li>
                </ul>
                <div className="infoText">
                <strong>Movix</strong> is a web application designed to help users make informed decisions about which movies to watch. By aggregating reviews from multiple sources, the app provides a comprehensive overview of a movie's critical reception, allowing users to gauge its quality before deciding whether to watch it.
                </div>
                <div className="socialIcons">
                    <a href="https://www.facebook.com/tusharsharma19?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="icon">
                        <FaFacebookF />
                    </a>
                    <a href="https://www.instagram.com/tushar__sharma?igsh=MWZ5NW1vZXBoc25tbA==" target="_blank" rel="noopener noreferrer" className="icon">
                        <FaInstagram />
                    </a>
                    <a href="https://www.linkedin.com/in/tushar-gautam-5476b2266?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app " target="_blank" rel="noopener noreferrer" className="icon">
                        <FaLinkedin />
                    </a>
                </div>
        </footer>
    );
};

export default Footer;
