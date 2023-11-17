import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import HeaderCart from "./HeaderCart";
import { HeaderProfile } from "./HeaderProfile";
import Search from "./Search";
const Header: React.FC = () => {
  return (
    <header
      className="bg-secondary w-full grid py-3"
      style={{ gridTemplateColumns: "1fr 3fr 1.2fr" }}
    >
      <Link href="/" className="flex justify-center items-center">
        <Image
          src="/img/logo.png"
          width={180}
          height={40}
          className="h-auto"
          alt="Amazon Extended"
          priority
        />
      </Link>
      <Search />
      <div className="flex items-center justify-end gap-10 pr-12">
        <Link href="/favorites" className="text-white">
          <FaRegHeart size={"1.5em"} />
        </Link>
        <HeaderCart />
        <HeaderProfile />
      </div>
    </header>
  );
};

export default Header;
