import React from "react";
import { Link, useLocation } from "react-router-dom";

interface LinksProps {
  direction?: "row" | "column" | "col";
  toggle: boolean;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Links: React.FC<LinksProps> = ({
  direction = "row",
  toggle,
  setToggle,
}) => {
  const location = useLocation();

  const links = [
    {
      title: "Find Events",
      path: "/events",
    },
    {
      title: "Create Event",
      path: "/create-event",
    },
    {
      title: "FAQs",
      path: "/faq",
    },
    {
      title: "Your Profile",
      path: "/profile",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {direction === "row" && !toggle ? (
        <div className="flex items-center justify-center gap-5">
          {links.map((link, index) => (
            <Link
              to={link.path}
              key={index}
              className={`px-3 py-2 rounded-full text-green-800 font-normal ${isActive(link.path) ? "bg-green-100" : "hover:bg-gray-100"
                }`}
            >
              {link.title}
            </Link>
          ))}
          <Link
            to="/login"
            className={`bg-gray-800 text-white px-3 py-[6px] rounded ${location.pathname === "/login" ? "bg-gray-600" : "hover:bg-gray-600"
              }`}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={`bg-green-800 text-white px-3 py-[6px] rounded ${location.pathname === "/signup" ? "bg-green-900" : "hover:bg-green-900"
              }`}
          >
            Sign Up
          </Link>
        </div>
      ) : (
        <div className="p-6 bg-[#F3F8FF] w-[250px] h-200px fixed top-[73px] right-0 z-50">
          <div className="flex flex-col items-start gap-5">
            {links.map((link, index) => (
              <Link
                to={link.path}
                key={index}
                className={`w-full py-4 rounded-lg border-b ${isActive(link.path) ? "bg-slate-600 text-white" : "hover:bg-slate-600"
                  }`}
                onClick={() => {
                  if (setToggle) {
                    setToggle(false);
                  }
                }}
              >
                {link.title}
              </Link>
            ))}
            <Link
              to="/login"
              className={`w-full py-4 rounded-lg border-b ${location.pathname === "/login" ? "bg-slate-600 text-white" : "hover:bg-slate-600"
                }`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`w-full py-4 rounded-lg ${location.pathname === "/signup" ? "bg-slate-600 text-white" : "hover:bg-slate-600"
                }`}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Links;
