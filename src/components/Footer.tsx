import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex-wrap sm:flex-nowrap h-12 md:h-24 p-4 lg:px-20 xl:px-40 text-yellow-600 flex items-center justify-between">
      <Link href="/" className="font-bold text-xl">CHROMOLITEBITE</Link>
      <p>© ALL RIGHTS RESERVED.</p>
    </div>
  );
};

export default Footer;
