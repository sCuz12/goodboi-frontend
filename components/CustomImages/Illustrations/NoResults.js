import Image from "next/image";

import React from "react";

function NoResults() {
  return (
    <div className="flex flex-col justify-center">
      <p className="no_found_message">No Results found</p>
      <Image
        src={`/assets/illustrations/no-results-paws.png`}
        height={120}
        width={100}
      />
    </div>
  );
}

export default NoResults;
