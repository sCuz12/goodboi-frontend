import React from "react";
import Link from "next/link";

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
    ...BASIC_URLS,
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
    <div>
      {/* Logout Users */}
      {!user &&
        user === null &&
        LOGOUT_USERS_URLS.map((item) => (
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
    </div>
  );
}

export default MobileMenuItems;
