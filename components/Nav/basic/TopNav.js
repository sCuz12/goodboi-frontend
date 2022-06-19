import { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../../../context";
import Image from "next/image";
import { useRouter } from "next/router";
import { Transition } from "@tailwindui/react";
import Link from "next/link";
import axiosInstance from "../../../helpers/axios";
import NavButton from "../../Buttons/NavButton";

function TopNav() {
  console.log(process.env.NEXT_PUBLIC_API);
  const { state, dispatch } = useContext(Context);
  const [isOpen, setOpen] = useState(false);
  const { user } = state;
  const router = useRouter();

  const container = useRef(null);

  const dropDownOpenHandler = () => {
    console.log("asda11");
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
    <div className="h-1">
      <header className="fixed top-0 z-50 flex items-center justify-between w-screen transition duration-300 ease-out bg-white md:px-10">
        {/* left */}
        <div
          onClick={() => router.push("/")}
          className="relative flex items-center my-auto cursor-pointer h-28 w-28"
        >
          <Image
            key={1}
            src="https://links.papareact.com/qd3"
            layout="fill"
            alt="Header Logo"
            objectFit="contain"
            objectPosition="left"
          />
        </div>

        {/* middle of footer*/}
        <div className=" rounded-full mx-4 lg:ml-24 p-2 w-[400px] bg-white">
          <div className="flex space-x-10">
            <Link href="/listings/animals">
              <a className="nav_link_text"> Find your Dog</a>
            </Link>
            <Link href="/listings/shelters">
              <a className="nav_link_text">Find Shelter</a>
            </Link>
          </div>
        </div>

        {/* Right of footer*/}

        <div className="flex items-center justify-end space-x-4 text-black">
          {user === null && (
            <>
              <NavButton title="Become Shelter" link="/shelter/register" />
              <NavButton title="Become Hero" link="/register" />
              <NavButton title="Sign In" withBackground={true} link="/login" />
            </>
          )}
        </div>
        {user !== null && (
          <div ref={container} className="w-12 h-12">
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
                    <a className="block px-4 py-2 hover:bg-green-500 hover:text-green-100">
                      Update Details
                    </a>
                  </Link>
                )}

                {/* If user is shelter */}
                {user.user_type.includes("shelter") && (
                  <>
                    <Link href="/shelter/listing/create">
                      <a className="block px-4 py-2 hover:bg-green-500 hover:text-green-100">
                        List a Dog
                      </a>
                    </Link>
                    <Link href="/shelter/">
                      <a className="block px-4 py-2 hover:bg-green-500 hover:text-green-100">
                        Dashboard
                      </a>
                    </Link>
                  </>
                )}
                <Link href="">
                  <a
                    onClick={logout}
                    className="block px-4 py-2 hover:bg-green-500 hover:text-green-100"
                  >
                    Logout
                  </a>
                </Link>
              </div>
            </Transition>
          </div>
        )}
      </header>
    </div>
  );
}

export default TopNav;
