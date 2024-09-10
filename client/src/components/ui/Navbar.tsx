import React, { useState } from "react";
import Links from "./Links";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown"; // Import the Dropdown component

const Navbar: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  // Define dropdown items for the main dropdown
  const accreditationItems = [
    { title: "Request Accreditation as Participant", path: "/profile" },
    { title: "Request Accreditation as Negotiator", path: "/profile" },
  ];

  // // Define links for the rest of the navbar
  // const otherLinks = [
  //   { title: "FAQs", path: "/faq" },
  //   { title: "Contact Us", path: "/contact-us" },
  // ];

  return (
    <nav className="w-full flex items-center justify-between md:p-4 bg-white shadow-sm h-[70px]">
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/seal.png"
            alt="Logo"
            className="h-[40px]"
          />
          <img
            src="/images/new.png"
            alt="Logo"
            className="h-[40px]"
          />
        </Link>

        <ul className="flex-row sm:flex hidden justify-end items-center flex-1 font-semibold">
          <Dropdown title="Request Accreditation" items={accreditationItems} />
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
