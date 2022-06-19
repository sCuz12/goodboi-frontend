import React from "react";
import Image from "next/image";

function SolidPaw({ height, width }) {
  if (!height) {
    height = 80;
  }
  if (!width) {
    width = 80;
  }
  return (
    <div>
      <Image src="/assets/icons/solid_paw.png" height={height} width={width} />
    </div>
  );
}

export default SolidPaw;
