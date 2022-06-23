import React from "react";
import Link from "next/link";

function MobileMenuItems({ user, logout }) {
  return (
    <div>
      <Link href="/listings/animals">
        <a className="block px-3 py-2 text-base font-medium text-black rounded-md nav_link_text hover:bg-gray-700">
          Find your Dog
        </a>
      </Link>
      <Link href="/listings/shelters">
        <a className="block px-3 py-2 text-base font-medium text-black rounded-md nav_link_text hover:bg-gray-700">
          Find Shelter
        </a>
      </Link>
      {user && user.user_type === "shelter" && (
        <>
          <Link href="/shelter/">
            <a className="block px-3 py-2 text-base font-medium text-black rounded-md nav_link_text hover:bg-gray-700">
              Dashboard
            </a>
          </Link>
          <Link href="/shelter/listing/create">
            <a className="block px-3 py-2 text-base font-medium text-black rounded-md nav_link_text hover:bg-gray-700">
              List a Dog
            </a>
          </Link>
        </>
      )}
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
