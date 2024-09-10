import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#162415] w-full py-10 px-6 md:px-10 xl:px-40 flex flex-col items-center">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-end">
          {/* <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse bg-white py-3 px-2"
          >
            <img src="/images/flagicon.svg" className="h-8" alt=" Logo" />
            <img src="/images/logo.svg" className="h-8" alt=" Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
              COP29 Nigeria
            </span>
          </a> */}
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link className="hover:underline me-4 md:me-6" to="/faq">
                Frequently asked questions
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline me-4 md:me-6"
                to="/terms-and-conditions"
              >
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline me-4 md:me-6"
                to="/faq#how-it-works"
              >
                How it works
              </Link>

            </li>
            <li>
            <Link
                className="hover:underline me-4 md:me-6"
                to="/contact-us"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          {/* Made with ❤️ by Okike Consults */}
          The National Council on Climate Change Secretariat (NCCCS)
        </span>
      </div>
    </footer>
  );
};

export default Footer;
