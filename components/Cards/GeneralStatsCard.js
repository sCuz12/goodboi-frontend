import React from "react";
import CountUp from "react-countup";

function GeneralStatsCard({ title, count }) {
  return (
    <div className="px-4 py-8 text-center border-4 rounded-lg border-divider border-roz hover:bg-basicPurple h-60">
      <>
        <p className="mt-2 text-4xl font-cherryBomb">{title}</p>

        {
          <div className="mt-5 leading-none text-7xl text-primary">
            <CountUp duration={2} end={count} />
          </div>
        }
      </>
    </div>
  );
}

export default GeneralStatsCard;
