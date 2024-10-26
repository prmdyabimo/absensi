import React, { useState } from "react";
import LogoBMG from "../assets/images/logo_bmg.png";
import LogoDefault from "../assets/images/default.png";
import AuthHook from "../hooks/AuthHook";

const Navbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { handleLogout } = AuthHook.Logout();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1035] bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <div
          className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
          id="navbarSupportedContent1"
        >
          <a
            className="mb-4 ml-2 mr-5 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
            href="/dashboard"
          >
            <img
              src={LogoBMG}
              style={{ height: "45px", paddingRight: "5px" }}
              alt="Logo"
              loading="lazy"
            />
            BMG Indonesia
          </a>
        </div>

        <button
          className="inline-block rounded bg-primary mx-3 px-5 py-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
          onClick={toggleSidebar}
        >
          <span className="block [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        <div className="relative flex items-center">
          <div className="relative">
            <button
              className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
              type="button"
              onClick={toggleDropdown}
              aria-expanded={dropdownOpen}
            >
              <img
                src={LogoDefault}
                className="rounded-full"
                style={{ height: "35px", width: "35px" }}
                alt=""
                loading="lazy"
              />
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 z-[1000] m-0 list-none min-w-[150px] rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700">
                <li>
                  <a
                    className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                    href="/"
                    onClick={handleLogout}
                  >
                    Keluar
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
