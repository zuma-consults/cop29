import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "../custom-hooks/useAuth";
import { useState, useEffect } from "react";

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
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null); // Use state to track the user

  const { mutate: logout } = useLogout();

  useEffect(() => {
    // Check localStorage for user profile on mount
    const storedUser = JSON.parse(localStorage.getItem("userProfile") as string);
    setUser(storedUser);
  }, [localStorage]); // Empty dependency array ensures this runs only on mount

  const links = [
    // {
    //   title: "Find Events",
    //   path: "/events",
    // },
    {
      title: "Schedule Meeting",
      path: "/create-event",
    },
    {
      title: "FAQs",
      path: "/faq",
    },
    {
      title: "Contact Us",
      path: "/contact-us",
    },
  ];

  if (user) {
    links.push({
      title: "Your Profile",
      path: "/profile",
    });
  }
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.clear();
    logout();
    setUser(null); // Clear user state on logout
    navigate("/login");
  };

  return (
    <>
      {direction === "row" && !toggle ? (
        <div className="flex items-center justify-center gap-5">
          {links.map((link, index) => (
            <Link
              to={link.path}
              key={index}
              className={`px-3 py-2 rounded-full text-green-800 font-normal ${
                isActive(link.path) ? "bg-green-100" : "hover:bg-gray-100"
              }`}
            >
              {link.title}
            </Link>
          ))}
          {user ? (
            <button
              onClick={handleLogout}
              className={`bg-gray-800 text-white px-3 py-[6px] rounded hover:bg-gray-600`}
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className={`bg-gray-800 text-white px-3 py-[6px] rounded ${
                  location.pathname === "/login"
                    ? "bg-gray-600"
                    : "hover:bg-gray-600"
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`bg-green-800 text-white px-3 py-[6px] rounded ${
                  location.pathname === "/signup"
                    ? "bg-green-900"
                    : "hover:bg-green-900"
                }`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      ) : (
        <div className="p-6 bg-[#F3F8FF] w-[250px] h-200px fixed top-[73px] right-0 z-50">
          <div className="flex flex-col items-start gap-5">
            {links.map((link, index) => (
              <Link
                to={link.path}
                key={index}
                className={`w-full py-4 rounded-lg border-b ${
                  isActive(link.path)
                    ? "bg-slate-600 text-white"
                    : "hover:bg-slate-600"
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
            {user ? (
              <button
                onClick={handleLogout}
                className={`w-full py-4 rounded-lg border-b bg-gray-800 text-white hover:bg-gray-600`}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`w-full py-4 rounded-lg border-b ${
                    location.pathname === "/login"
                      ? "bg-slate-600 text-white"
                      : "hover:bg-slate-600"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`w-full py-4 rounded-lg ${
                    location.pathname === "/signup"
                      ? "bg-slate-600 text-white"
                      : "hover:bg-slate-600"
                  }`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Links;
