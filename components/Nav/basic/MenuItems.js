import React from "react";
import Link from "next/link";

function MenuItems() {
  return (
    <>
      <Link href="/listings/animals">
        <a className="nav_link_text"> Find your Dog</a>
      </Link>

      <Link href="/listings/shelters">
        <a className="nav_link_text">Find Shelter</a>
      </Link>
      <Link href="/about_us">
        <a className="nav_link_text">About us</a>
      </Link>
    </>
  );
}

export default MenuItems;
