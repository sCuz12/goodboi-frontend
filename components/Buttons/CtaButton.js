import React from "react";

function CallButton({ title, bgColor, link }) {
  return (
    <div
      className={`px-3 py-1.5 border ${bgColor} rounded-3xl border-1 m-1  text-center`}
    >
      <a
        href={link}
        className="font-medium text-center text-white cursor-pointer md:inline-flex w-max"
      >
        {title}
      </a>
    </div>
  );
}

export default CallButton;
