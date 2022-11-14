import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "../../../../utils/hooks";
import axiosInstance from "../../../../helpers/axios";
import Image from "next/image";
import Heart from "../../../../components/Icons/Heart";
import SolidPaw from "../../../../components/Icons/SolidPaw";
import ShowOnerInfo from "../../../../components/Buttons/CallOwner";
import Telephone from "../../../../components/Modals/Telephone";
import SocialShare from "../../../../components/Sections/SocialShare";
import { Tabs } from "antd";
import LostDogInfo from "../../../../components/Mobile/LostDogInfo";
import UserInfoCard from "../../../../components/Cards/UserInfoCard";
import ListingImageSlider from "../../../../components/Slides/ListingImageSlider";
import FoundDogInfo from "../../../../components/Mobile/FoundDogInfo";

const { TabPane } = Tabs;

function FoundAnimalListingView() {
  const [animal, setAnimal] = useState({});
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [currentUrl, setCurrentUrl] = useState("");
  const [listingImages, setListingImages] = useState([]);
  const [listingsImagesUrls, setListingsImagesUrls] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  // Check wether is on mobileview
  const isMobile = useMediaQuery("(max-width: 960px)");

  useEffect(() => {
    if (!router.isReady) return;
    loadListingInfo();
    getCurrentUrl();
  }, [id]);

  const loadListingInfo = async () => {
    const { data } = await axiosInstance.get("/api/animals/found-dogs/" + id);
    console.log(data.data);
    setAnimal(data.data);
    setUserInfo(data.data.user);
    prepareListingImages(data.data.listing_images);
  };

  function getCurrentUrl() {
    setCurrentUrl(window.location.href);
  }

  /*This method prepares listing image and assign them to state array
   * prepares also the Image for the fslightbox into div and next image component
   */
  const prepareListingImages = async (listingImages) => {
    let slides = [];
    let urls = [];
    listingImages.map((image) => {
      let obj = {};
      obj["url"] = image;
      const element = image;
      slides.push(obj);
      urls.push(element);
    });

    setListingsImagesUrls(urls);
    setListingImages(slides);
  };

  /** Handlers */
  const showInfoHandler = () => {
    setShowInfoModal(true);
  };

  return (
    <>
      {animal.name && (
        <div>
          <div className="min-h-screen pt-10 lg:pl-6">
            <div className="w-full">
              <section className="flex flex-col lg:pt-10 lg:flex-row ">
                {/* Image Div*/}
                <div className="grid p-6 lg:w-2/5 place-items-center">
                  {/* Photo container */}
                  <div className="flex-shrink-0 pt-3 pb-2 pl-2 pr-2 rounded-full lg:m-12 bg-roz">
                    <Image
                      src={
                        animal.cover_image
                          ? animal.cover_image
                          : "/default2.png"
                      }
                      className="border rounded-full "
                      height={450}
                      width={450}
                    />
                  </div>
                </div>
                <div className="grid w-full pt-12 lg:w-3/5">
                  <div className="flex flex-col items-center lg:items-start">
                    {/*Upper info */}
                    <h1 className="text-4xl font-semibold font-cherryBomb lg:w-full">
                      <div className="flex items-start text-center">
                        This is {animal.name}
                        <div className="">
                          <Heart />
                        </div>
                      </div>
                    </h1>
                    <div className="p-5 lg:p-0">
                      <p className="animal_description_text">
                        {animal.description}
                      </p>
                    </div>
                    <div className="flex-col justify-center w-5/5 lg:w-full">
                      {!isMobile ? (
                        <div className="flex flex-col items-start w-full">
                          <div className="pt-4 lg:w-2/5">
                            <ShowOnerInfo
                              telephone={animal.user.phone}
                              onclick={showInfoHandler}
                            />
                          </div>

                          <SolidPaw />
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-center pt-4">
                            <ShowOnerInfo
                              telephone={animal.user.phone}
                              onclick={showInfoHandler}
                            />
                          </div>
                        </>
                      )}
                      <div className="pt-4 lg:w-2/5">
                        <SocialShare currentUrl={currentUrl} />
                      </div>
                    </div>
                  </div>
                </div>
                {isMobile ? (
                  //Mobile Tabs
                  <div className="p-8 pt-20 w-4/4 round">
                    <Tabs defaultActiveKey="1" centered>
                      <TabPane tab="Dog Info" key="1">
                        <FoundDogInfo dog={animal} />
                      </TabPane>
                      <TabPane tabBarStyle={"color:black"} tab="User" key="2">
                        <UserInfoCard user={userInfo} />
                      </TabPane>
                      <TabPane tab="Photos" key="3">
                        {/** All pictures section */}
                        <div className="items-center justify-center w-full p-3 bg-center h-80 bg-blue rounded-3xl">
                          <ListingImageSlider
                            listingImages={listingImages}
                            listingImagesUrls={listingsImagesUrls}
                          />
                        </div>
                      </TabPane>
                    </Tabs>
                  </div>
                ) : null}
              </section>
              {/* Section for Desktop */}
              <section className="hidden pt-10 lg:flex lg:flex-row">
                <div className="grid w-full lg:w-3/5">
                  {/*Characterestic skills*/}
                  <div className="flex ">
                    <div className="w-2/4">
                      <p className="charectiristics_labels">
                        Dog Name :{" "}
                        <span className="charectiristics_values">
                          {animal.name}
                        </span>
                      </p>
                      <p className="charectiristics_labels">
                        City Found:{" "}
                        <span className="charectiristics_values">
                          {animal.city}
                        </span>
                      </p>

                      <SolidPaw />
                    </div>
                    <p className="mr-5 text-roz h-5/5 border-x-2"></p>
                    <div className="w-2/4">
                      <p className="flex charectiristics_labels">
                        Date Found:{" "}
                        <span className="flex items-center pl-2 pr-2 align-middle charectiristics_values">
                          {animal.found_date}
                        </span>
                      </p>
                      <p className="flex charectiristics_labels">
                        Region Found:{" "}
                        <span className="flex items-center pl-2 pr-2 align-middle charectiristics_values">
                          {animal.found_at}
                        </span>
                      </p>
                      <Heart />
                    </div>
                  </div>
                </div>
                {/* Shelter info section right*/}
                <div className="grid lg:mr-10 lg:w-2/5 lg:pl-16 lg:w-26 lg:h-96 sm:h-80">
                  <UserInfoCard user={userInfo} />
                </div>
                {/*Next column*/}
              </section>
              {/** All pictures section */}
              <div className="items-center justify-center hidden p-8 bg-center lg:flex lg:w-3/5 md:w-3/5 sm:w-5/5 h-120 bg-blue rounded-3xl">
                <ListingImageSlider
                  listingImages={listingImages}
                  listingImagesUrls={listingsImagesUrls}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {showInfoModal && (
        <Telephone
          phone={userInfo.phone}
          email={userInfo.email}
          onclose={() => setShowInfoModal(false)}
        />
      )}
    </>
  );
}

export default FoundAnimalListingView;
