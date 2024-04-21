import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";

const Navbar = () => {
  return (
    <div className="h-12 text-yellow-500 p-4 flex items-center justify-between border-b-2 border-b-yellow-500 uppercase md:h-24 px-5 xl:px-20">
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">Homepage</Link>
        <Link href="/menu">Menu</Link>
      </div>
      {/* LOGO */}
      <div className="text-xl md:font-bold flex-1 md:text-center">
        <Link href="/">CHROMOLITEBITE</Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <div className="md:absolute top-1.5 r-2 lg:static flex items-center gap-2 cursor-pointer bg-[#fdba74d9] px-1.5 rounded-md w-[125px] h-[35px]">
          <Image src="/phone.png" alt="" width={20} height={20} />
          <span className="text-white font-bold">123&nbsp;456&nbsp;78</span>
        </div>
        <UserLinks/>
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;
