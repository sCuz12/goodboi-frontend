import Link from "next/link";
import React from "react";

function FooterNav() {
  return (
    <div className="">
      <Link href="/">
        <a className="text-lg lg:text-xl footer_nav">Home</a>
      </Link>
      <Link href="/listings/animals">
        <a className="text-lg lg:text-xl footer_nav">Find Your Dog</a>
      </Link>
      <Link href="/listings/shelters">
        <a className="text-lg lg:text-xl footer_nav">Find Shelter</a>
      </Link>
    </div>
  );
}

export default FooterNav;
