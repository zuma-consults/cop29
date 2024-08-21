import React, { useState } from "react";
import Links from "./Links";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <nav className="w-full flex items-center justify-between md:p-4 bg-white shadow-sm h-[70px]">
      <div className="flex items-center justify-between w-full">
      <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/flagicon.svg"
            alt="Logo"
            className="h-[50px]"
          />
           {/* <img
            src="/images/logo.svg"
            alt="Logo"
            className="h-[50px]"
          /> */}
          <div className="flex flex-col items-start">
            <div className="flex items-center">
              <span className="text-black text-[20px] font-bold">NIGERIA COP</span>
              <span className="text-cyan-800 text-[20px] font-bold">29</span>
            </div>
            <span className="text-sm text-gray-600">Baku Azerbaijan</span>
          </div>
        </Link>

        <ul className="flex-row sm:flex hidden justify-end items-center flex-1 font-semibold">
          <Links direction="row" toggle={toggle} />
        </ul>

        <div className="sm:hidden flex justify-end items-center hover:bg-gray-100 px-3 py-2 rounded-full w-max">
          {toggle ? (
            <IoClose
              className="text-[#31363F] text-2xl cursor-pointer"
              size={30}
              onClick={() => setToggle(!toggle)}
            />
          ) : (
            <IoMenu
              className="text-[#31363F] text-2xl cursor-pointer"
              onClick={() => setToggle(!toggle)}
            />
          )}
        </div>
      </div>

      {toggle && (
        <Links direction="col" toggle={toggle} setToggle={setToggle} />
      )}
    </nav>
  );
};

export default Navbar;
