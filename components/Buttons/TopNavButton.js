import React from "react";

function TopNavButton({ title, link, withBackground = false }) {
  return (
    <button className="px-3 py-1.5 border border-basicPurple rounded-3xl border-1 m-1 hover:bg-basicPurple">
      <a href={link} className="buttons_links_text">
        {title}
      </a>
    </button>
  );
}

export default TopNavButton;
