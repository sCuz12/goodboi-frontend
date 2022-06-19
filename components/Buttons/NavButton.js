import React from "react";

function NavButton({ title, link, withBackground = false }) {
  if (withBackground) {
    return (
      <button className="px-3 py-1.5 bg-basicPurple border rounded-3xl border-1">
        <a
          href={link}
          className="hidden text-white cursor-pointer md:inline-flex w-max"
        >
          {title}
        </a>
      </button>
    );
  } else {
    return (
      <button className="px-3 py-1.5 border border-basicPurple rounded-3xl border-1 m-1 hover:bg-basicPurple ">
        <a
          href={link}
          className="hidden text-black cursor-pointer hover:text-white md:inline-flex w-max"
        >
          {title}
        </a>
      </button>
    );
  }
}

export default NavButton;
