import { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../../../context";
import Image from "next/image";
import { useRouter } from "next/router";
import { Transition } from "@tailwindui/react";
import Link from "next/link";
import axiosInstance from "../../../helpers/axios";
import MenuItems from "./MenuItems";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileMenuItems from "./MobileMenuItems";
import TopNavButton from "../../Buttons/TopNavButton";
import { BiDownArrowAlt } from "react-icons/bi";
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
        <div className="max-w-full mx-auto ">
          <div className="flex items-center justify-between h-20 border-b-2 shadow-xl rounded-2xl border-roz">
            <div className="flex items-center w-3/5">
              {/*Logo section */}
              <div className="w-2/2 lg:w-2/4">
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
              <div className="hidden lg:block">
                <div className="flex items-baseline space-x-4">
                  <MenuItems />
                </div>
              </div>
            </div>
            <div className="flex items-end">
              <div className="hidden lg:flex">
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
                    <div
                      ref={container}
                      className="hidden w-12 h-12 lg:flex lg:flex-col"
                    >
                      <button
                        onClick={dropDownOpenHandler}
                        className="flex block w-10 h-10 overflow-hidden border-gray-500 rounded-full focus:outline-none focus:border-black"
                      >
                        <img
                          className="object-cover w-full h-full"
                          src={user.cover_photo}
                        />
                      </button>
                      <div className="flex justify-center">
                        <BiDownArrowAlt />
                      </div>
                      <Transition
                        show={isOpen}
                        enter=" ease-out duration-100 "
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in duration-75 "
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="absolute right-0 z-40 w-48 py-2 mt-1 font-medium origin-top-right rounded shadow-md">
                          {/* if user is normal*/}
                          {user.user_type.includes("user") && (
                            <div className="z-99">
                              <Link href="/user">
                                <a className="top_nav_a">Dashboard</a>
                              </Link>
                              <Link href="/user/profile/update">
                                <a className="top_nav_a">Update Profile</a>
                              </Link>
                              <Link href="/user/favourites">
                                <a className="top_nav_a">My Favourites</a>
                              </Link>
                              <Link href="/user/lost-dogs/create">
                                <a className="top_nav_a">Post Lost Dog</a>
                              </Link>
                              <Link href="/user/found-dogs/create">
                                <a className="top_nav_a">Post Found Dog</a>
                              </Link>
                              <Link href="/user/mylistings">
                                <a className="top_nav_a">My Listings</a>
                              </Link>
                            </div>
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
            <div className="flex pr-6 lg:hidden">
              {!mobMenuOpen ? (
                <GiHamburgerMenu
                  className="w-6 h-6"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                  onClick={() => setMobMenuOpen(!mobMenuOpen)}
                />
              ) : (
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                  onClick={() => setMobMenuOpen(false)}
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
          <div className="lg:hidden" id="mobile-menu">
            <div
              ref={ref}
              className="flex justify-center w-full pt-2 pb-3 space-y-1 text-center bg-roz"
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
