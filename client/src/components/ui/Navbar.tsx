import React, { useState } from "react";
import Links from "./Links";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGetProfile, useLogout } from "../custom-hooks/useAuth";
import Loader from "./Loader";
import { toast } from "react-toastify";

const Navbar: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const { data: user, isLoading } = useGetProfile();
  const { mutate: logout, isLoading: logoutloading } = useLogout();
  if (isLoading || logoutloading) {
    return <Loader />;
  }
  // if (!user) {
  //   toast.warn("You have to be logged in to view your profile");
  //   navigate("/login");
  // }
  return (
    <nav className="w-full flex items-center justify-between md:p-4 bg-white shadow-sm h-[70px]">
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="flex gap-2 items-center">
          <img
            src="/images/coat.png"
            alt="Logo"
            className="rounded-lg"
            width={50}
            height={10}
          />
          <div className="flex gap-1 items-center">
            <h1 className="text-green-800 text-[24px] font-bold">COP29</h1>
            <h1 className="text-green-800 text-[24px] font-bold hidden md:flex">
              Nigeria
            </h1>
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
