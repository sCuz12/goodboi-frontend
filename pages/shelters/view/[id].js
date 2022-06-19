import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axiosInstance from "../../../helpers/axios";
import Image from "next/image";
import Heart from "../../../components/Icons/Heart";
import { AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { BsTelephone } from "react-icons/bs";
import SolidPaw from "../../../components/Icons/SolidPaw";
import SwipeCarouselSlider from "../../../components/Slides/SwipeCarouselSlider";

function ShelterProfileView() {
  const [shelterInfo, setShelterInfo] = useState({});
  const [shelterListings, setShelterListings] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    loadShelterInfo();
    loadShelterListing();
  }, [id]);

  const loadShelterInfo = async () => {
    try {
      const { data } = await axiosInstance.get("/api/shelters/" + id);
      setShelterInfo(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadShelterListing = async () => {
    try {
      const { data } = await axiosInstance.get("/api/animals/shelter/" + id);
      setShelterListings(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {shelterInfo.shelter_name && (
        <div className="min-h-screen pt-10 pl-10">
          <div className="w-full">
            <section className="flex pt-24">
              <div className="grid w-2/5 place-items-center ">
                {" "}
                {/* Photo container */}
                <div className="flex-shrink-0 pt-5 pb-5 pl-5 pr-5 rounded-full m-15 bg-roz">
                  {console.log(shelterInfo.cover_image)}
                  <Image
                    src={
                      shelterInfo.cover_image
                        ? shelterInfo.cover_image
                        : "/default2.png"
                    }
                    className="border rounded-full "
                    height={500}
                    width={500}
                  />
                </div>
              </div>
              {/*Right Section of top  */}
              <div className="grid w-3/5 pt-12 pl-6">
                <div className="">
                  {/* column of name,description , info */}
                  <div className="flex flex-col">
                    {/*Upper info */}
                    <h1 className="font-semibold text-7xl font-cherryBomb text-darkPurple">
                      <div className="flex items-center text-center">
                        {shelterInfo.shelter_name}{" "}
                        <div>
                          <Heart />
                        </div>{" "}
                      </div>
                    </h1>
                    <p className="flex-grow h-44 description_text">
                      {shelterInfo.description}
                    </p>
                    {/* Information of shelter*/}
                    <div className="flex-col w-2/5 pt-4 space-y-4">
                      <div className="flex w-full description_text">
                        <div className="flex w-1/5">
                          <AiOutlineMail size={30} />
                        </div>
                        <div className="w-4/5">{shelterInfo.email}</div>
                      </div>
                      <div className="flex w-full description_text">
                        <div className="flex w-1/5">
                          <GoLocation size={30} />
                        </div>
                        <div className="w-4/5">{shelterInfo.city}</div>
                      </div>
                      <div className="flex w-full description_text">
                        <div className="flex w-1/5">
                          <BsTelephone size={30} />
                        </div>
                        <div className="w-4/5">{shelterInfo.phone}</div>
                      </div>
                    </div>
                    <div className="flex justify-end w-4/5">
                      <SolidPaw width={200} height={200} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h3 className="pb-5 header_titles">My Dogs</h3>
              <SwipeCarouselSlider listings={shelterListings} />
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default ShelterProfileView;
