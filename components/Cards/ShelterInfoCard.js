import React from "react";
import Image from "next/image";
import { GoLocation } from "react-icons/go";
import CtaButton from "../Buttons/CtaButton";

function ShelterInfoCard({ shelter_id, name, description, cover_image, city }) {
  return (
    <div className="flex flex-col sm:align-center">
      <div className="justify-center h-full sm:w-full lg:w-3/4 bg-roz rounded-xl lg:h-120">
        <div className="flex flex-col justify-center h-full">
          <h1 className="flex justify-center text-2xl text-center">
            Shelter Info
          </h1>
          <div className="flex justify-center w-full text-center rounded-3xlr">
            <Image
              src={cover_image ? cover_image : "/default2.png"}
              className="text-center rounded-3xl"
              height={200}
              width={400}
            />
          </div>

          <div className="flex flex-col pl-4">
            <p className="pt-3 text-lg font-bold">{name}</p>
            <p className="">{description}</p>
            <span className="flex inline">
              <GoLocation color="pink" size={25} />
              <p className="pl-2 font-bold">{city}</p>
            </span>
          </div>
          <div className="flex justify-center pt-12 text-center">
            <div className="justify-center w-2/4 pb-4 text-center">
              <CtaButton
                title="Find More"
                bgColor="bg-basicPurple"
                link={"/shelters/view/" + shelter_id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShelterInfoCard;
