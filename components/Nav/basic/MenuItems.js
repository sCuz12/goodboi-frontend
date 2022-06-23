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
    </>
  );
}

export default MenuItems;
