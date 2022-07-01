import React from "react";

function StatsCard({ title, count, url }) {
  return (
    <div className="px-4 py-8 text-center border rounded-lg border-divider bg-roz hover:bg-basicPurple">
      <a href={url} className="text-black hover:text-white ">
        <span className="text-5xl leading-none text-primary la la-sun"></span>
        <p className="mt-2">{title}</p>
        <div className="mt-5 text-3xl leading-none text-primary">{count}</div>
      </a>
    </div>
  );
}

export default StatsCard;
