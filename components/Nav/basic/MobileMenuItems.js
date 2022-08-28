import React from "react";
import Link from "next/link";
import Heart from "../../Icons/Heart";
import PawIcon from "../../Icons/SolidPaw";
import CtaButton from "../../Buttons/CtaButton";
import TopNavButton from "../../Buttons/TopNavButton";
import DogInCicle from "../../CustomImages/DogInCircle";

function MobileMenuItems({ user, logout, closeHamburger }) {
  {
    /* Mutual Urls for all type of users*/
  }
  const BASIC_URLS = [
    {
      text: "Find Your Dog",
      url: "/listings/animals",
    },
    {
      text: "Find Shelter",
      url: "/listings/shelters",
    },
  ];

  {
    /* Navs for Logout users*/
  }
  const LOGOUT_USERS_URLS = [
    {
      text: "Become Hero",
      url: "/register",
    },
    {
      text: "Become Shelter",
      url: "/shelter/register",
    },
    {
      text: "Login",
      url: "/login",
    },
  ];

  {
    /* Navs for Shelters*/
  }
  const SHELTER_URLS = [
    ...BASIC_URLS,
    {
      text: "Dashboard",
      url: "/shelter/",
    },
    {
      text: "List Dog",
      url: "/shelter/",
    },
  ];

  {
    /* Navs for Normal users*/
  }
  const NORMAL_USER_URLS = [
    ...BASIC_URLS,
    {
      text: "Update Profile",
      url: "/user/profile/update",
    },
  ];

  return (
    <div className="pt-12 pl-28">
      {/* Logout Users */}
      {!user && user === null && (
        <>
          {BASIC_URLS.map((item) => (
            <Link href={item.url}>
              <a
                onClick={() => {
                  closeHamburger(false);
                }}
                className="block px-3 py-2 text-base rounded-md nav_link_text hover:bg-gray-700"
              >
                {item.text}
              </a>
            </Link>
          ))}
          {/* CTA buttons for register or login */}
          <div className="flex flex-col pt-8">
            <TopNavButton title="Become Shelter" link="/shelter/register" />
            <TopNavButton title="Become Hero" link="/register" />
            <CtaButton
              title="Sign in"
              bgColor="bg-basicPurple"
              link={"/login"}
            />
          </div>
        </>
      )}
      {/* Shelters */}
      {user &&
        user.user_type === "shelter" &&
        SHELTER_URLS.map((item) => (
          <Link href={item.url}>
            <a
              onClick={() => {
                closeHamburger(false);
              }}
              className="block px-3 py-2 text-base font-medium text-black rounded-md nav_link_text hover:bg-gray-700"
            >
              {item.text}
            </a>
          </Link>
        ))}

      {/* Normal users */}
      {user &&
        user.user_type === "user" &&
        NORMAL_USER_URLS.map((item) => (
          <>
            <Link href={item.url}>
              <a
                onClick={() => {
                  closeHamburger(false);
                }}
                className="block px-3 py-2 text-base font-medium text-black rounded-md nav_link_text hover:bg-gray-700"
              >
                {item.text}
              </a>
            </Link>
          </>
        ))}
      {/* Logout for the logged in users*/}
      {user && (
        <Link href="">
          <a
            onClick={logout}
            className="block px-3 py-2 text-base font-medium text-black rounded-md nav_link_text hover:bg-gray-700"
          >
            Logout
          </a>
        </Link>
      )}
      <Heart />
      <DogInCicle circleColor="bg-lightPink" />
    </div>
  );
}

export default MobileMenuItems;
