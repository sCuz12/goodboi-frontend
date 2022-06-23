import React from "react";
import Link from "next/link";

function MenuItems() {
  return (
    <>
      <a>
        <Link href="/listings/animals">
          <a className="nav_link_text"> Find your Dog</a>
        </Link>
      </a>
      <a>
        <Link href="/listings/shelters">
          <a className="nav_link_text">Find Shelter</a>
        </Link>
      </a>
    </>
  );
}

export default MenuItems;
