import React from "react";
import { FaQrcode } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (

        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-6 items-center px-5 md:px-14 pb-5">
            <div className="flex flex-col md:flex-row space-x-2 space-y-6 gap-x-1 items-center text-xl">
                <div className="flex items-center">
                    <FaQrcode  color="blue" />
                    <Link to="/" className=" font-bold text-[#0000FF] lg:text-3xl">
                        QREasy
                    </Link>
                </div>
                <p>@ 2025. All rights reserved</p>
            </div>
            <ul className="flex flex-wrap justify-center space-x-4">
                <li><a href="" className="hover:text-[#0000FF]">How it works</a></li>
                <li><a href="" className="hover:text-[#0000FF]">Privacy</a></li>
                <li><a href="" className="hover:text-[#0000FF]">About</a></li>
                <li><a href="" className="hover:text-[#0000FF]">QREasy</a></li>
                <li><a href="" className="hover:text-[#0000FF]">Contact Us</a></li>
            </ul>
        </div>
    )
}

export default Footer