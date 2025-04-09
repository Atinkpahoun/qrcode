import React from "react";
import { FaQrcode } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="flex flex-col space-y-6 items-center px-5 md:px-14">
            <div className="flex flex-col space-y-6 gap-x-1 items-center text-xl lg:text-3xl">
                <div className="flex items-center">
                    <FaQrcode  color="blue" />
                    <Link to="/" className=" font-bold text-[#0000FF]">
                        QREasy
                    </Link>
                </div>
                <p>@ 2025. All rights reserved</p>
            </div>
            <ul className="flex space-x-4">
                <li><a href="">How it works</a></li>
                <li><a href="">Privacy</a></li>
                <li><a href="">About</a></li>
                <li><a href="">QREasy</a></li>
                <li><a href="">Contact Us</a></li>
            </ul>
        </div>
    )
}

export default Footer