import React from "react";
import { FaQrcode } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className=" px-5 md:px-14">
            <div className="flex gap-x-1 items-center text-xl lg:text-3xl text-[#0000FF]">
                <FaQrcode  color="blue" />
                <Link to="/" className=" font-bold ">
                      QREasy
                </Link>
                <p>@</p>
            </div>
        </div>
    )
}

export default Footer