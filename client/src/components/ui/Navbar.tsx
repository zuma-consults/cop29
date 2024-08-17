import React, { useState } from "react";
import Links from "./Links";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <nav className="w-full flex items-center justify-between md:p-4 bg-white shadow-sm h-[70px]">
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="flex gap-2 items-center">
          <img
            src="/images/logo.svg"
            alt="Logo"
            className="rounded-lg"
            width={50}
            height={10}
          />
          <div className="flex gap-1 items-center">
            <div className="flex items-center">
              <span className="text-green-800 text-[30px] font-bold">C</span>
              <img
                src="/images/flagicon.svg"
                alt="Icon"
                className="inline-block"
                width={33}
                height={20}
              />
              <span className="text-green-800 text-[30px] font-bold">P29</span>
            </div>
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
