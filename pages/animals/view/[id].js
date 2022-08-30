import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosInstance from "../../../helpers/axios";
import Image from "next/image";
import ShelterInfoCard from "../../../components/Cards/ShelterInfoCard";
import ListingImageSlider from "../../../components/Slides/ListingImageSlider";
import { Tag } from "antd";
import Heart from "../../../components/Icons/Heart";
import Telephone from "../../../components/Modals/Telephone";
import CallShelter from "../../../components/Buttons/CallShelter";
import UserRoute from "../../../components/Routes/UserRoutes";
import CopyLink from "../../../components/Buttons/CopyLink";
import { Tabs } from "antd";
import { useMediaQuery } from "../../../utils/hooks";
import DogInfo from "../../../components/Mobile/dogInfo";

const { TabPane } = Tabs;

const AnimalListingView = () => {
  const [animal, setAnimal] = useState({});
  const [listingImages, setListingImages] = useState([]);
  const [shelterInfo, setShelterInfo] = useState({});
  const [dogVaccinations, setDogVaccination] = useState([]);
  const [showTelModal, setShowTelModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Check wether is on mobileview
  const isMobile = useMediaQuery("(max-width: 960px)");

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    loadListingInfo();
  }, [id]);

  function copyUrlToClipboard() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  }

  /*This method loads into state the single animal and listing_images */
  const loadListingInfo = async () => {
    const { data } = await axiosInstance.get("/api/animals/" + id);
    setAnimal(data.data);
    prepareListingImages(data.data.listing_images);
    prepareShelterInfo(data.data.shelter_info);
    setDogVaccination(data.data.vaccinations);
  };

  //This method prepares listing image and assign them to state array
  const prepareListingImages = async (listingImages) => {
    let slides = [];
    listingImages.map((image) => {
      let obj = {};
      obj["url"] = image;
      slides.push(obj);
    });
    setListingImages(slides);
  };

  //prepares and appends the shelter info into state
  const prepareShelterInfo = async (shelterInfo) => {
    setShelterInfo(shelterInfo);
  };
  return (
    <UserRoute showSide={false}>
      <>
        {animal.name && listingImages && (
          <div className="min-h-screen pt-10 lg:pl-10">
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
                      height={350}
                      width={350}
                    />
                  </div>
                </div>
                <div className="grid w-full pt-12 lg:w-2/5">
                  <div className="flex flex-col items-center">
                    {/*Upper info */}
                    <h1 className="text-4xl font-semibold font-cherryBomb lg:w-full">
                      <div className="flex items-center text-center">
                        This is {animal.name}
                        <div className="">
                          <Heart />
                        </div>
                      </div>
                    </h1>
                    <p className="flex-grow lg:w-full h-44">
                      {animal.description}
                    </p>
                    <div className="justify-center w-3/5 lg:w-full">
                      <div className="pt-4 lg:w-2/5 ">
                        <CallShelter onclick={() => setShowTelModal(true)} />
                      </div>
                      <div className="pt-4 lg:w-2/5">
                        <CopyLink
                          onclick={copyUrlToClipboard}
                          copiedText={copied}
                        />
                      </div>
                    </div>
                    {isMobile ? (
                      <div className="w-3/4 pt-20 round">
                        <Tabs defaultActiveKey="1" centered>
                          <TabPane tab="Dog Info" key="1">
                            {/*Characterestic skills*/}
                            <DogInfo
                              dog={animal}
                              vaccinations={dogVaccinations}
                            />
                          </TabPane>
                          <TabPane
                            tabBarStyle={"color:black"}
                            tab="Shelter"
                            key="2"
                          >
                            <ShelterInfoCard
                              name={shelterInfo.shelter_name}
                              city={shelterInfo.city}
                              description={shelterInfo.description}
                              cover_image={shelterInfo.cover_image}
                              shelter_id={shelterInfo.id}
                            />
                          </TabPane>
                          <TabPane tab="Photos" key="3">
                            {/** All pictures section */}
                            <div className="items-center justify-center w-full p-3 bg-center h-80 bg-blue rounded-3xl">
                              <ListingImageSlider
                                listingImages={listingImages}
                              />
                            </div>
                          </TabPane>
                        </Tabs>
                      </div>
                    ) : null}
                  </div>
                </div>
                {/* TODO : Paws icons*/}
              </section>
            </div>
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
                      Age :{" "}
                      <span className="charectiristics_values">
                        {animal.age}
                      </span>
                    </p>
                  </div>
                  <p className="mr-5 text-roz h-5/5 border-x-2"></p>
                  <div className="w-2/4">
                    <p className="charectiristics_labels">
                      Vaccinations :
                      <span className="ml-3 ">
                        {dogVaccinations.map((vaccination) => (
                          <Tag key={vaccination}>{vaccination}</Tag>
                        ))}
                      </span>
                    </p>
                    <p className="charectiristics_labels">
                      Size :{" "}
                      <span className="charectiristics_values">
                        {animal.size.toUpperCase()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              {/* Shelter info section right*/}
              <div className="grid lg:mr-10 lg:w-2/5 lg:pl-16 lg:w-26 lg:h-96 sm:h-80">
                <ShelterInfoCard
                  name={shelterInfo.shelter_name}
                  city={shelterInfo.city}
                  description={shelterInfo.description}
                  cover_image={shelterInfo.cover_image}
                  shelter_id={shelterInfo.id}
                />
              </div>
              {/*Next column*/}
            </section>
            {/** All pictures section */}
            <div className="items-center justify-center hidden p-8 bg-center lg:flex lg:w-3/5 md:w-3/5 sm:w-5/5 h-120 bg-blue rounded-3xl">
              <ListingImageSlider listingImages={listingImages} />
            </div>
          </div>
        )}
        {showTelModal && (
          <Telephone
            phone={shelterInfo.phone}
            email={shelterInfo.email}
            address={shelterInfo.address}
            onclose={() => setShowTelModal(false)}
          />
        )}
      </>
    </UserRoute>
  );
};

export default AnimalListingView;
