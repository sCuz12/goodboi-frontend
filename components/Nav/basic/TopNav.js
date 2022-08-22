import { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../../../context";
import Image from "next/image";
import { useRouter } from "next/router";
import { Transition } from "@tailwindui/react";
import Link from "next/link";
import axiosInstance from "../../../helpers/axios";
import NavButton from "../../Buttons/NavButton";
import MenuItems from "./MenuItems";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileMenuItems from "./MobileMenuItems";
import TopNavButton from "../../Buttons/TopNavButton";

function TopNav() {
  const { state, dispatch } = useContext(Context);
  const [isOpen, setOpen] = useState(false);
  const [mobMenuOpen, setMobMenuOpen] = useState(false);

  const { user } = state;
  const router = useRouter();

  const container = useRef(null);

  const dropDownOpenHandler = () => {
    setOpen(true);
  };

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
    const { data } = await axiosInstance.post("/api/logout");
    router.push("/login");
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      //prevent error if user is unauthenticated
      if (user == null) {
        return;
      }
      if (container.current != null) {
        if (!container.current.contains(e.target)) {
          if (!isOpen) return;
          setOpen(false);
        }
      }
    };

    if (user != null) {
      window.addEventListener("click", handleOutsideClick);
      return () => {
        window.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [isOpen, container]);

  return (
    <div className="w-full ">
      <nav>
        <div className="max-w-full px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center w-2/4">
              {/*Logo section */}
              <div className="flex-shrink-0 w-1/2">
                <a href="/">
                  <Image
                    key={1}
                    src="/assets/logo/GOODBOILOGO.png"
                    alt="Header Logo"
                    objectFit="contain"
                    height={150}
                    width={150}
                  />
                </a>
              </div>
              <div className="hidden md:block">
                <div className="flex items-baseline space-x-4">
                  <MenuItems />
                </div>
              </div>
            </div>
            <div className="flex items-end">
              <div className="hidden md:flex">
                {/* Right of footer*/}

                <div className="flex items-center justify-end w-3/4 space-x-4 text-black">
                  {user === null ? (
                    <>
                      <TopNavButton
                        title="Become Shelter"
                        link="/shelter/register"
                      />
                      <TopNavButton title="Become Hero" link="/register" />
                      <TopNavButton
                        title="Sign In"
                        withBackground={true}
                        link="/login"
                      />
                    </>
                  ) : (
                    <div ref={container} className="hidden w-12 h-12 md:flex">
                      <button
                        onClick={dropDownOpenHandler}
                        className="flex block w-8 h-8 overflow-hidden border-gray-500 rounded-full focus:outline-none focus:border-black"
                      >
                        <img
                          className="object-cover w-full h-full"
                          src={user.cover_photo}
                        />
                      </button>

                      <Transition
                        show={isOpen}
                        enter=" ease-out duration-100 "
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in duration-75 "
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="absolute right-0 w-48 py-2 mt-1 origin-top-right rounded shadow-md">
                          {/* if user is normal*/}
                          {user.user_type.includes("user") && (
                            <Link href="/user/profile/update">
                              <a className="top_nav_a">Update Profile</a>
                            </Link>
                          )}

                          {/* If user is shelter */}
                          {user.user_type.includes("shelter") && (
                            <>
                              <Link href="/shelter/">
                                <a className="top_nav_a">Dashboard</a>
                              </Link>
                              <Link href="/shelter/listing/create">
                                <a className="top_nav_a">List Dog</a>
                              </Link>
                              <Link href="/shelter/mylistings/view">
                                <a className="top_nav_a">My Listings</a>
                              </Link>
                            </>
                          )}
                          <Link href="/user/favourites/">
                            <a className="top_nav_a">My Favourites</a>
                          </Link>
                          <Link href="">
                            <a onClick={logout} className="top_nav_a">
                              Logout
                            </a>
                          </Link>
                        </div>
                      </Transition>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* mob*/}
            <div className="flex md:hidden">
              <GiHamburgerMenu
                className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-900 rounded-md hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setMobMenuOpen(!mobMenuOpen)}
              />
              {!mobMenuOpen ? (
                <GiHamburgerMenu className="w-5 h-5" />
              ) : (
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Transition
        show={mobMenuOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="md:hidden" id="mobile-menu">
            <div
              ref={ref}
              className="flex w-full pt-2 pb-3 space-y-1 text-center bg-roz"
            >
              <MobileMenuItems
                user={user}
                logout={logout}
                closeHamburger={setMobMenuOpen}
              />
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
}

export default TopNav;
