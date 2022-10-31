import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axiosInstance from "../../../helpers/axios";
import Image from "next/image";
import Heart from "../../../components/Icons/Heart";
import { AiOutlineMail } from "react-icons/ai";
import { FiFacebook } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { BsTelephone, BsInstagram } from "react-icons/bs";
import SolidPaw from "../../../components/Icons/SolidPaw";
import SwipeCarouselSlider from "../../../components/Slides/SwipeCarouselSlider";
import { useMediaQuery } from "../../../utils/hooks";
import { Tabs } from "antd";
import SingleShlterInfo from "../../../components/Mobile/singleShelterInfo";
import ListingCard from "../../../components/Cards/ListingCard";
import { Context } from "../../../context";
import LoginActionModal from "../../../components/Modals/LoginActionModal";

const { TabPane } = Tabs;

function ShelterProfileView() {
  const [shelterInfo, setShelterInfo] = useState({});
  const [shelterListings, setShelterListings] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { state, dispatch } = useContext(Context);

  const { user } = state;

  // Check wether is on mobileview
  const isMobile = useMediaQuery("(max-width: 960px)");

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!user) {
      //pop up login modal
      setTimeout(() => {
        setShowLoginModal(true);
      }, 5000);
    }

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

  /*
   *Handle click of contact info whole div
   *(Display LoginModal if user is not login)
   */
  const handleContactClick = async () => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      return;
    }
  };

  const disableUserViewInfo = !user ? "blur-sm select-none" : "";

  return (
    <>
      {shelterInfo.shelter_name && (
        <div className="min-h-screen pt-10 lg:pl-10">
          <div className="w-full">
            <section className="flex flex-col pt-10 lg:flex-row">
              <div className="grid p-6 lg:w-2/5 sm:w-1/5 place-items-center">
                {" "}
                {/* Photo container */}
                <div className="flex-shrink-0 pt-3 pb-2 pl-2 pr-2 rounded-full lg:m-12 bg-roz">
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
              <div className="grid pt-12 lg:w-3/5 sm:w-4/5 lg:pl-6">
                <div className="">
                  {/* column of name,description , info */}
                  <div className="flex flex-col items-center lg:items-start">
                    {/*Upper info */}
                    <div className="">
                      <h1 className="header_titles">
                        <div className="flex items-center text-center">
                          {shelterInfo.shelter_name}{" "}
                          <div>
                            <Heart />
                          </div>{" "}
                        </div>
                      </h1>
                      <p className="items-start flex-grow break-all animal_description_text">
                        {shelterInfo.description}
                      </p>
                    </div>
                    {/* Information of shelter*/}
                    {isMobile ? (
                      <div className="pt-20">
                        <Tabs defaultActiveKey="1" centered>
                          <TabPane tab="Contact details" key="1">
                            <div
                              onClick={handleContactClick}
                              className={` ${disableUserViewInfo} p-8`}
                            >
                              <SingleShlterInfo shelter={shelterInfo} />
                            </div>
                          </TabPane>
                          <TabPane tab="Shelter Listings" key="2">
                            <div className="lg:w-4/5 sm:w-3/5 max-w-7xl sm:px-16 lg:pr-8">
                              <h1 className="header_titles font-cherryBomb">
                                My Dogs
                              </h1>
                              <div className="grid grid-cols-2 gap-2">
                                {shelterListings.map((item) => (
                                  <div
                                    key={item.id}
                                    className="p-0 overflow-hidden rounded-2xl lg:p-0 md:p-0 sm:p-30"
                                  >
                                    <ListingCard
                                      name={item.name}
                                      image={item.cover_image}
                                      city={item.city}
                                      id={item.id}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TabPane>
                        </Tabs>
                      </div>
                    ) : null}

                    {/**Displayed only on desktop */}
                    <div
                      className={`hidden lg:block lg:pt-4 lg:space-y-4 lg:flex-col lg:w-2/5 ${disableUserViewInfo} `}
                      onClick={handleContactClick}
                    >
                      <div className="flex w-full description_text">
                        <div className="flex w-1/5">
                          <AiOutlineMail size={30} />
                        </div>
                        <div className="w-4/5 select-none">
                          {shelterInfo.email}
                        </div>
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
                      {/**Social media */}

                      <div className="flex pt-12 space-x-5">
                        {shelterInfo.instagram && (
                          <div>
                            <a
                              className="a"
                              target="_blank"
                              href={shelterInfo.instagram}
                            >
                              <BsInstagram size={30} />
                            </a>
                          </div>
                        )}

                        {shelterInfo.facebook && (
                          <div>
                            <a
                              className="a"
                              target="_blank"
                              href={shelterInfo.facebook}
                            >
                              <FiFacebook size={30} />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    {/**Displayed only on desktop */}
                    <div className="justify-end hidden w-4/5 lg:flex ">
                      <SolidPaw width={200} height={200} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="hidden lg:block">
              <h3 className="pb-5 header_titles">My Dogs</h3>
              <SwipeCarouselSlider listings={shelterListings} />
            </section>
          </div>
          {showLoginModal && (
            <LoginActionModal onClose={() => setShowLoginModal(false)} />
          )}
        </div>
      )}
    </>
  );
}

export default ShelterProfileView;
