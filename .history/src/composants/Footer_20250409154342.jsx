import React
const Footer = () => {
    return (
        <div className=" w-96 h-96 bg-black">
            <div className="flex gap-x-1 items-center text-xl lg:text-3xl text-[#0000FF]">
                    <FaQrcode  color="blue" />
                    <Link to="/" className=" font-bold ">
                      QREasy
                    </Link>
                  </div>
        </div>
    )
}

export default Footer