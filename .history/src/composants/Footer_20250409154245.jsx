const Footer = () => {
    return (
        <div className=" W">
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